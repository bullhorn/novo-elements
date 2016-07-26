import { Component, ViewContainerRef } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';

import { TOAST_PROVIDERS, ToastService, MODAL_PROVIDERS, ModalService } from './../../../src/novo-elements';

@Component({
    selector: 'demo-app',
    template: require('./App.html'),
    providers: [
        ...TOAST_PROVIDERS,
        ...MODAL_PROVIDERS
    ],
    directives: [
        CORE_DIRECTIVES
    ]
})
export class DemoApp {
    constructor(router:Router, toastService:ToastService, view:ViewContainerRef, modalService:ModalService) {
        this.menuOpen = false;
        this.version = VERSION;

        toastService.parentViewContainer = view;
        modalService.parentViewContainer = view;

        this.designRoutes = [
            { name: 'Composition', path: '/composition' },
            { name: 'Typography', path: '/typography' },
            { name: 'Iconography', path: '/icons' },
            { name: 'Color', path: '/color' }
        ].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        this.componentRoutes = [
            { name: 'QuickNote', path: '/quick-note' },
            { name: 'Radio', path: '/radio' },
            { name: 'Toast', path: '/toast' },
            { name: 'Button', path: '/button' },
            { name: 'Form', path: '/form' },
            { name: 'Tabs', path: '/tabs' },
            { name: 'Modal', path: '/modal' },
            { name: 'Select', path: '/select' },
            { name: 'Picker', path: '/picker' },
            { name: 'Chips', path: '/chips' },
            { name: 'Dropdown', path: '/dropdown' },
            { name: 'Loading', path: '/loading' },
            { name: 'Cards', path: '/cards' },
            { name: 'Tooltip', path: '/tooltip' },
            { name: 'Drawer', path: '/drawer' },
            { name: 'Switch', path: '/switch' },
            { name: 'Header', path: '/header' },
            { name: 'List', path: '/list' },
            { name: 'Table', path: '/table' },
            { name: 'Calendar', path: '/calendar' },
            { name: 'Dragula', path: '/dragula' },
            { name: 'Tiles', path: '/tiles' }
        ].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        this.utilRoutes = [
            { name: 'Pipes', path: '/pipes' },
            { name: 'Utils', path: '/utils' }
        ].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        router.routerEvents.subscribe(() => {
            document.body.scrollTop = 0;
            this.menuOpen = false;
        });
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
