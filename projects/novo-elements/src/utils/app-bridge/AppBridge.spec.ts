import { AppBridge } from './AppBridge';
import { AppBridgeHandler, MessageType } from './interfaces';

class MockPostrobot {

    responders: { [msg in MessageType]?: (event) => Promise<any>} = {};

    lastRobotOpts: any;

    CONFIG = {};

    // In actual code these will be Window objects, but with cross-origin access blocked, all we
    // can do is compare their equality.
    mockSource = Symbol();

    static allPostRobots: MockPostrobot[] = [];

    constructor(public mockOrigin: string, public parent?: MockPostrobot) {
        MockPostrobot.allPostRobots.push(this);
    }

    on(msg: MessageType, cb: (event) => Promise<any>) {
        this.responders[msg] = cb;
    }

    sendToParent(msg: MessageType, packet: any, robotOpts: any) {
        this.lastRobotOpts = robotOpts;
        if (!this.parent) {
            debugger;
            throw new Error(`Tried to send message "${msg}" to parent from host`);
        }
        return this.parent.mockSendToMe(msg, packet, this);
    }

    protected mockSendToMe(msg: MessageType, data: any, from: MockPostrobot): Promise<any> {
        if (!(this.responders[msg])) {
            throw new Error(`No responder for "${msg}".`);
        }
        const mockRobotEvent = {
            data: {...data},
            source: from.mockSource,
            origin: from.mockOrigin
        };
        return Promise.resolve(this.responders[msg]!(mockRobotEvent))
            .then(replyData => ({ data: {...replyData } }));
    }

    send(frameSource: Symbol, eventType: MessageType, data: any): Promise<any> {
        if (!frameSource) {
            throw new Error('Null frameSource on send()');
        }
        const recipient = MockPostrobot.allPostRobots.find(c => c.mockSource === frameSource);
        if (recipient) {
            return recipient.mockSendToMe(eventType, data, this);
        } else {
            throw new Error('Could not locate child to send to');
        }
    }
}

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
        for (let handlerKey of (Object.values(AppBridgeHandler)) as AppBridgeHandler[]) {
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
        // TODO
    });

    it('opens a list', async () => {
        // TODO
    });

    it('closes a window', async () => {
        // TODO
    });

    it('refreshes a window', async () => {
        // TODO
    });

    it('pins a window', async () => {
        // TODO
    });

    it('pings a window', async () => {
        // TODO
    });

    it('updates app title', async () => {
        // TODO
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
                switch: 'on'
            }
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
                    switch: 'on'
                }
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
                    switch: 'on'
                }
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
        let receivedData1, receivedData2: any;
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

    it('should fire custom events to parents', async () => {
        let receivedEvent = false;
        frame1Bridge.addEventListener('custom', () => {
            receivedEvent = true;
        });
        await frame2Bridge.fireEvent('custom', { dataContent: 1000 });
        expect(receivedEvent).toBeTruthy();
    });

    // This behavior theoretically should be expected, but is not working yet.
    xit('should fire custom events to parents of parents', async () => {
        let receivedEvent = false;
        hostBridge.addEventListener('custom', () => {
            receivedEvent = true;
        });
        await frame2Bridge.fireEvent('custom', { dataContent: 1000 });
        expect(receivedEvent).toBeTruthy();
    });
});