// NG2
import { Component, OnInit } from '@angular/core';
// Vendor
import { AppBridge, AppBridgeHandler, AppBridgeService } from './../../../../index';

@Component({
    selector: 'app-bridge-demo',
    template: require('./AppBridgeDemo.html')
})
export class AppBridgeDemoComponent implements OnInit {
    appBridge: AppBridge;

    constructor(private appBridgeService: AppBridgeService) { }

    public ngOnInit(): void {
        // This is how to setup a parent, if you are a third-party developer then
        // you will not have to do these steps, look in the Bullhorn starter repositories
        // for how to setup this on your custom components
        this.appBridge = this.appBridgeService.create('NovoElements(Parent)');
        this.appBridge.register();
        this.appBridge.tracing = true;

        // Handle things
        this.appBridge.handle(AppBridgeHandler.OPEN, (packet, callback) => {
            console.log('[NovoElements(Parent)] - Received open handler', packet); // tslint:disable-line
            callback(true);
        });
        this.appBridge.handle(AppBridgeHandler.HTTP, (event, callback) => {
            console.log('[NovoElements(Parent)] - Received http handler', event); // tslint:disable-line
            if (event.data) {
                console.log('[NovoElements(Parent)] - Data', event.data); // tslint:disable-line
            }
            callback([1, 2, 3, 4, 5]);
        });
    }

    public fireEvent() {
        this.appBridge.fireEventToChildren('SUPER_CUSTOM_EVENT', 'I CAN ALSO PASS DATA');
    }
}
