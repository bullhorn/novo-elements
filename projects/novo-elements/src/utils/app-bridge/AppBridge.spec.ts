import { HttpClient } from '@angular/common/http';
import { AppBridge, DevAppBridge, DevAppBridgeService } from './AppBridge';
import { AppBridgeHandler, MessageType } from './interfaces';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed} from '@angular/core/testing';

// the object coming back from this function references itself.
// Crucially, this is similar to the extensive functionality/references of the Window object,
// which we never want to send through PostRobot.
function makeSelfReferentialObject() {
    const circularObject: any = {};
    circularObject.selfRef = circularObject;
    return circularObject;
}

class MockPostrobot {

    responders: { [msg in MessageType]?: (event) => Promise<any>} = {};

    lastRobotOpts: any;

    CONFIG = {};

    // In actual code these will be Window objects, but with cross-origin access blocked, all we
    // can do is compare their equality.
    mockSource = makeSelfReferentialObject();

    static readonly allPostRobots: MockPostrobot[] = [];

    // turn on to block all sending, and pretend an unexpected error occurred sending through PostRobot
    public enableGenericSendError = false;

    static clearStaticRecords() {
        MockPostrobot.allPostRobots.splice(0, MockPostrobot.allPostRobots.length);
    }

    constructor(public mockOrigin: string, public parent?: MockPostrobot) {
        MockPostrobot.allPostRobots.push(this);
    }

    on(msg: MessageType, cb: (event) => Promise<any>) {
        this.responders[msg] = cb;
    }

    sendToParent(msg: MessageType, packet: any, robotOpts: any) {
        this.lastRobotOpts = robotOpts;
        if (!this.parent) {
            throw new Error(`Tried to send message "${msg}" to parent from host`);
        }
        return this.parent.mockSendToMe(msg, packet, this);
    }

    protected mockSendToMe(msg: MessageType, data: any, from: MockPostrobot): Promise<any> {
        verifySimpleObject(data);
        if (!(this.responders[msg])) {
            throw new Error(`No responder for "${msg}".`);
        }
        const mockRobotEvent = {
            data: {...data},
            source: from.mockSource,
            origin: from.mockOrigin,
        };
        const responder = this.responders[msg];
        return Promise.resolve(responder?.(mockRobotEvent))
            .then(replyData => ({ data: {...replyData } }));
    }

    send(frameSource: object, eventType: MessageType, data: any): Promise<any> {
        verifySimpleObject(data);
        if (!frameSource) {
            throw new Error('Null frameSource on send()');
        }
        if (this.enableGenericSendError) {
            throw new Error('Could not send to parent!');
        }
        const recipient = MockPostrobot.allPostRobots.find(c => c.mockSource === frameSource);
        if (recipient) {
            return recipient.mockSendToMe(eventType, data, this);
        } else {
            throw new Error('Could not locate child to send to');
        }
    }
}

function verifySimpleObject(obj) {
    try {
        JSON.stringify(obj);
    } catch(err) {
        throw new Error('Object is not simple enough to use JSON.stringify');
    }
}

describe('MockPostrobot', () => {

    let complexObject: any;
    let mockPostRobot1: MockPostrobot;
    let mockPostRobot2: MockPostrobot;
    let putReceive: any;

    beforeEach(() => {
        complexObject = makeSelfReferentialObject();
        mockPostRobot1 = new MockPostrobot('localhost:1');
        mockPostRobot2 = new MockPostrobot('localhost:2', mockPostRobot1);
        mockPostRobot1.on('httpPUT', obj => putReceive = obj);
    });

    it('accepts normal json-like messages', async () => {
        const testObj = { a: [ 1, 2, 3], str: 'test' };
        await mockPostRobot2.send(mockPostRobot1.mockSource, 'httpPUT', testObj);
        expect(putReceive).toEqual({ data: testObj, origin: mockPostRobot2.mockOrigin, source: mockPostRobot2.mockSource });
    });

    it('rejects sent messages when they contain abnormal objects', async () => {
        try {
            await mockPostRobot2.send(mockPostRobot1.mockSource, 'httpPUT', complexObject);
            fail('should not have succeeded');
        } catch(err) {
            expect(err.message).toBe('Object is not simple enough to use JSON.stringify');
        }
    });

    it('rejects a message if it includes the source (window) object', async () => {
        try {
            await mockPostRobot2.send(mockPostRobot1.mockSource, 'httpPUT', { sendToWindow: mockPostRobot1.mockSource });
            fail('should not have succeeded');
        } catch(err) {
            expect(err.message).toBe('Object is not simple enough to use JSON.stringify');
        }
    })
})

describe('AppBridge', () => {

    let hostBridge: AppBridge;
    let frame1Bridge: AppBridge;
    let frame2Bridge: AppBridge;

    let hostRobot: MockPostrobot;
    let frame1Robot: MockPostrobot;
    let frame2Robot: MockPostrobot;

    let handleFn: jest.Mock<any, [AppBridgeHandler, any]>;

    beforeEach(() => {

        hostRobot = new MockPostrobot('localhost:111');
        frame1Robot = new MockPostrobot('localhost:222', hostRobot);
        frame2Robot = new MockPostrobot('localhost:333', frame1Robot);

        // Simulate a top-level app with two nested iframes
        hostBridge = new AppBridge('Jest Host', hostRobot);
        hostBridge.id = 'hostapp';
        frame1Bridge = new AppBridge('Jest Frame1', frame1Robot);
        frame1Bridge.id = 'childapp1';
        frame2Bridge = new AppBridge('Jest Frame2', frame2Robot);
        frame2Bridge.id = 'childapp2';
        hostBridge['windowOrigin'] = frame1Bridge['windowOrigin'] = frame2Bridge['windowOrigin'] = function() { return this.postRobot.mockOrigin };

        handleFn = jest.fn();

        // setup handlers
        for (const handlerKey of (Object.values(AppBridgeHandler)) as AppBridgeHandler[]) {
            hostBridge.handle(handlerKey, (event, cb) => {
                try {
                    return cb(handleFn(handlerKey, event));
                } catch(err) {
                    cb(null, err);
                }
            })
        }
    });

    it('should register a new app', async () => {
        handleFn.mockReturnValue('terry');
        await frame1Bridge.register();
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.REGISTER, jasmine.objectContaining({ id: 'childapp1' }));
        expect(hostBridge['_registeredFrames'].length).toBe(1);
        expect(frame1Bridge.windowName).toBe('terry');
    });

    it('opens a window', async () => {
        handleFn.mockReturnValue(true);
    });

    it('opens a list', async () => {
        handleFn.mockReturnValue(true);
        frame1Bridge.openList({
            criteria: 'small',
        });
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.OPEN_LIST, jasmine.objectContaining({ criteria: 'small' }));
    });

    // This would seem to be the correct, expected outcome of openList but it isn't happening right now.
    xit('opens a list - using type: List', () => {
        handleFn.mockReturnValue(true);
        frame1Bridge.openList({
            criteria: 'small',
            type: 'Candidate',
        });
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.OPEN_LIST, jasmine.objectContaining({ criteria: 'small', type: 'List', entityType: 'Candidate' }));
    });

    describe('Registration-dependent actions', () => {
        beforeEach(async () => {
            handleFn.mockReturnValue('terry');
            await frame1Bridge.register();
            expect(frame1Bridge.windowName).toBe('terry');
        });

        it('refreshes a window', async () => {
            handleFn.mockReturnValue(true);
            await frame1Bridge.refresh();
            expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.REFRESH, jasmine.anything());
        });

        it('pins a window', async () => {
            handleFn.mockReturnValue(true);
            await frame1Bridge.pin();
            expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.PIN, jasmine.objectContaining({ id: frame1Bridge.id, windowName: 'terry' }));
        });

        it('closes a window', async () => {
            handleFn.mockReturnValue(true);
            await frame1Bridge.close();
            expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.CLOSE, jasmine.objectContaining({ id: frame1Bridge.id, windowName: 'terry' }));
        });

        it('updates app title', async () => {
            handleFn.mockReturnValue(true);
            await frame1Bridge.update({
                title: 'x',
            });
            expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.UPDATE, jasmine.objectContaining({title: 'x', id: frame1Bridge.id, windowName: 'terry' }));
        });
    });

    it('pings the server', async () => {
        handleFn.mockReturnValue('pong');
        await frame1Bridge.ping();
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP, { verb: 'get', relativeURL: 'ping', origin: ['localhost:222'] });
    });

    describe('Failure expectations', () => {
        const cmdFunctionsWithArgs: Partial<Record<keyof AppBridge, any[]>> = {
            open: [{}],
            openList: [{}],
            close: [],
            refresh: [],
            pin: [],
            update: [{}],
        };
        function expectFalseOnAllCalls(failureImplementation: (() => any) | 'enableGenericSendError', failTerm: string) {
            for (const cmd of Object.keys(cmdFunctionsWithArgs)) {
                it(`should return false when ${cmd}() receives ${failTerm}`, async () => {
                    if (failureImplementation === 'enableGenericSendError') {
                        frame1Robot.enableGenericSendError = true;
                    } else if (typeof failureImplementation === 'function') {
                        handleFn.mockImplementation(failureImplementation);
                    }
                    try {
                        const response = await frame1Bridge[cmd].apply(frame1Bridge, cmdFunctionsWithArgs[cmd]);
                        fail(`Function passed unexpectedly when receiving ${failTerm}. Response: ${response}`);
                    } catch(result) {
                        expect(result).toBeFalsy();
                    }
                });
            }
        }
        expectFalseOnAllCalls(() => false, 'boolean false');
        expectFalseOnAllCalls(() => { throw new Error('fail'); }, 'thrown error');
        expectFalseOnAllCalls('enableGenericSendError', 'an error sending through postrobot');

        it('should return object with error when ping() receives thrown error', async () => {
            handleFn.mockImplementation(() => { throw new Error('fail'); });
            const response = await frame1Bridge.ping() as any;
            expect(response.data).toBeFalsy();
            expect(response.error.message).toBe('fail');
        });
    });

    it('should perform an httpGET from a sub-child to the parent', async () => {
        handleFn.mockReturnValue('chips');
        const result = await frame2Bridge.httpGET('snack', 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP, { verb: 'get', relativeURL: 'snack', origin: ['localhost:222', 'localhost:333'] });
        expect(frame2Robot.lastRobotOpts).toEqual({ timeout: 500 });
        expect(result).toEqual({ data: 'chips', error: undefined });
    });

    it('should correctly handle an httpGET failure', async () => {
        const err = new Error('chip bin empty');
        handleFn.mockImplementation(() => { throw err; });
        const result = await frame2Bridge.httpGET('snack', 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP, { verb: 'get', relativeURL: 'snack', origin: ['localhost:222', 'localhost:333'] });
        expect(frame2Robot.lastRobotOpts).toEqual({ timeout: 500 });
        expect(result.error).toEqual(err);
        expect(result.data).toBeFalsy();
    });

    // Should this behavior change? Won't bother testing it for other HTTP actions
    it('should reject with null when postrobot transmission to parent fails', async () => {
        const err = new Error('Something about postMessage isn\'t working');
        spyOn(frame2Robot, 'sendToParent').and.returnValue(Promise.reject(err));
        try {
            await frame2Bridge.httpGET('snack');
            fail('expected promise rejection');
        } catch(err) {
            expect(err).toBeNull();
        }
    });

    it('should perform an httpPOST from a sub-child to the parent', async () => {
        handleFn.mockReturnValue('received');
        const result = await frame2Bridge.httpPOST('mail', { bill: '$5000' }, 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP,
            { verb: 'post', relativeURL: 'mail', data: { bill: '$5000' }, origin: ['localhost:222', 'localhost:333'] });
        expect(frame2Robot.lastRobotOpts).toEqual({ timeout: 500 });
        expect(result).toEqual({ data: 'received', error: undefined });
    });

    it('should report the bridge\'s traceName when the origins match', async () => {
        handleFn.mockReturnValue('received');
        // imitate one server talking to itself through appbridge
        frame1Robot.mockOrigin = hostRobot.mockOrigin;
        const result = await frame1Bridge.httpPOST('mail', { bill: '$5000' }, 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP,
            { verb: 'post', relativeURL: 'mail', data: { bill: '$5000' }, origin: [frame1Bridge.traceName] });
        expect(result).toEqual({ data: 'received', error: undefined });
    });

    it('should use traceName instead of origin if calling httpGet from the home frame', async () => {
        handleFn.mockReturnValue('received');
        const result = await hostBridge.httpPOST('mail', { bill: '$5000' }, 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP,
            { verb: 'post', relativeURL: 'mail', data: { bill: '$5000' }, origin: [hostBridge.traceName] });
        expect(result).toEqual({ data: 'received', error: undefined });
    });

    it('should correctly handle an httpPOST failure', async () => {
        const err = new Error('no mailbox');
        handleFn.mockImplementation(() => { throw err; });
        const result = await frame2Bridge.httpPOST('mail', { bill: '$5000' }, 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP, { verb: 'post', data: { bill: '$5000' }, relativeURL: 'mail',
            origin: ['localhost:222', 'localhost:333'] });
        expect(frame2Robot.lastRobotOpts).toEqual({ timeout: 500 });
        expect(result.error).toEqual(err);
        expect(result.data).toBeFalsy();
    });

    it('should perform an httpPUT from a sub-child to the parent', async () => {
        handleFn.mockReturnValue('received');
        const result = await frame2Bridge.httpPUT('mail', { bill: '$5000' }, 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP,
            { verb: 'put', relativeURL: 'mail', data: { bill: '$5000' }, origin: ['localhost:222', 'localhost:333'] });
        expect(frame2Robot.lastRobotOpts).toEqual({ timeout: 500 });
        expect(result).toEqual({ data: 'received', error: undefined });
    });

    it('should correctly handle an httpPUT failure', async () => {
        const err = new Error('no mailbox');
        handleFn.mockImplementation(() => { throw err; });
        const result = await frame2Bridge.httpPUT('mail', { bill: '$5000' }, 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP, { verb: 'put', data: { bill: '$5000' }, relativeURL: 'mail',
            origin: ['localhost:222', 'localhost:333'] });
        expect(frame2Robot.lastRobotOpts).toEqual({ timeout: 500 });
        expect(result.error).toEqual(err);
        expect(result.data).toBeFalsy();
    });

    it('should perform an httpDELETE from a sub-child to the parent', async () => {
        handleFn.mockReturnValue('received');
        const result = await frame2Bridge.httpDELETE('searchHistory', 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP,
            { verb: 'delete', relativeURL: 'searchHistory', origin: ['localhost:222', 'localhost:333'] });
        expect(frame2Robot.lastRobotOpts).toEqual({ timeout: 500 });
        expect(result).toEqual({ data: 'received', error: undefined });
    });

    it('should correctly handle an httpDELETE failure', async () => {
        const err = new Error('currently being accessed by user: FBI');
        handleFn.mockImplementation(() => { throw err; });
        const result = await frame2Bridge.httpDELETE('searchHistory', 500);
        expect(handleFn).toHaveBeenCalledWith(AppBridgeHandler.HTTP, { verb: 'delete', relativeURL: 'searchHistory', origin: ['localhost:222', 'localhost:333'] });
        expect(frame2Robot.lastRobotOpts).toEqual({ timeout: 500 });
        expect(result.error).toEqual(err);
        expect(result.data).toBeFalsy();
    });

    it('forwards REQUEST_DATA', async () => {
        const handleResponse = { meta: '123' };
        handleFn.mockReturnValue(handleResponse);
        const result = await frame2Bridge.requestData({ type: 'all' });
        expect(result.data).toEqual(handleResponse);
    })

    it('handles REQUEST_DATA failure', async () => {
        const err = new Error('chip bin empty');
        handleFn.mockImplementation(() => { throw err; });
        try {
            await frame2Bridge.requestData({ type: 'all' });
            fail('Should not request data successfully');
        } catch(err2) {
            expect(err2).toBeFalsy();
        }
    });

    it('should process a callback', async () => {
        handleFn.mockReturnValue({ dataObj: 3 });
        const result = await frame2Bridge.callback({
            key: 'callbackTest',
            generic: false,
            options: {
                switch: 'on',
            },
        });
        expect(result).toBe(true);
    });

    it('should handle a callback failure without giving process details', async () => {
        const err = new Error('Exception in proprietary secret db');
        handleFn.mockImplementation(() => { throw err; });
        try {
            await frame2Bridge.callback({
                key: 'callbackTest',
                generic: false,
                options: {
                    switch: 'on',
                },
            });
            fail('Expected exception');
        } catch(succeed) {
            expect(succeed).toBe(false);
        }
    });

    it('should report callback failure when event.data is null', async () => {
        handleFn.mockReturnValue(null);
        try {
            await frame2Bridge.callback({
                key: 'callbackTest',
                generic: false,
                options: {
                    switch: 'on',
                },
            });
            fail('Expected exception');
        } catch(succeed) {
            expect(succeed).toBe(false);
        }
    });

    it('should fire events to children', async () => {
        await frame1Bridge.register();
        await frame2Bridge.register();
        const data = { dataContent: 1000 };
        let receivedData1;
        let receivedData2: any;
        frame1Bridge.addEventListener('test', eventData => {
            receivedData1 = eventData;
        });
        frame2Bridge.addEventListener('test', eventData => {
            receivedData2 = eventData;
        });
        hostBridge.fireEventToChildren('test', data);
        expect(receivedData1).toEqual(data);
        expect(receivedData2).toEqual(data);
    });

    it('should send an event to a single child by passing in iframe reference', async () => {
        frame1Bridge.register();
        let receivedData: any;
        frame1Bridge.addEventListener('test', eventData => {
            receivedData = eventData;
        });
        const data = { dataContent: 1000 };
        const mockIframe: any = { contentWindow: frame1Robot.mockSource };
        Object.setPrototypeOf(mockIframe, HTMLIFrameElement.prototype);
        hostBridge.fireEventToChild(mockIframe, 'test', data);
        expect(receivedData).toEqual(data);
    });

    it('should fire custom events to parents', async () => {
        let receivedEvent = false;
        frame1Bridge.addEventListener('custom', () => {
            receivedEvent = true;
        });
        await frame2Bridge.fireEvent('custom', { dataContent: 1000 });
        expect(receivedEvent).toBeTruthy();
    });

    it('should fire custom events to registered neighbor frames', async () => {
        const extraNeighborRobot = new MockPostrobot('localhost:888', hostRobot);
        const extraNeighborBridge = new AppBridge('Jest neighbor frame', extraNeighborRobot);
        let receivedObj: any;
        extraNeighborBridge.addEventListener('custom', obj => {
            receivedObj = obj;
        });
        await extraNeighborBridge.register();
        const testObj = { dataContent: 12345 };
        await frame1Bridge.fireEvent('custom', testObj);
        expect(receivedObj).toEqual(testObj);
    })

    // This behavior theoretically should be expected, but is not working yet.
    xit('should fire custom events to parents of parents', async () => {
        let receivedEvent = false;
        hostBridge.addEventListener('custom', () => {
            receivedEvent = true;
        });
        await frame2Bridge.fireEvent('custom', { dataContent: 1000 });
        expect(receivedEvent).toBeTruthy();
    });

    afterEach(() => {
        MockPostrobot.clearStaticRecords();
    });
});

describe('DevAppBridge', () => {
    let devAppBridgeService: DevAppBridgeService;
    let devAppBridge: DevAppBridge;
    let mockPostRobot: MockPostrobot;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
        });
        const httpClient = TestBed.inject(HttpClient);
        devAppBridgeService = new DevAppBridgeService(httpClient);
        mockPostRobot = new MockPostrobot('localhost:1');
        devAppBridge = devAppBridgeService.create('test', mockPostRobot);
    })
    it('should construct', () => {
        expect(devAppBridge).toBeTruthy();
    });
});
