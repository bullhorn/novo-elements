import { Component, ViewContainerRef } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES, RouteConfig, Router } from '@angular/router-deprecated';

import {
    TOAST_PROVIDERS,
    ToastService,
    MODAL_PROVIDERS,
    ModalService
} from './../../../src/novo-elements';

import {
    Home,
    Layout,
    Typography,
    Iconography,
    Color,
    LoadingDemo,
    ButtonDemo,
    TabsDemo,
    ToastDemo,
    CardDemo,
    ModalDemo,
    UtilsDemo,
    PipesDemo,
    TooltipDemo,
    DrawerDemo,
    SelectDemo,
    HeaderDemo,
    DropdownDemo,
    ListDemo,
    TableDemo,
    SwitchDemo,
    CalendarDemo
} from './../pages';

const template = require('./App.html');

@Component({
    selector: 'demo-app',
    template: template,
    providers: [...TOAST_PROVIDERS, ...MODAL_PROVIDERS],
    directives: [
        ROUTER_DIRECTIVES,
        CORE_DIRECTIVES
    ]
})
@RouteConfig([
    // Base Pages (design system)
    {
        path: '/',
        component: Home,
        name: 'Home'
    }, {
        path: '/composition',
        component: Layout,
        name: 'Composition'
    }, {
        path: '/typography',
        component: Typography,
        name: 'Typography'
    }, {
        path: '/icons',
        component: Iconography,
        name: 'Iconography'
    }, {
        path: '/color',
        component: Color,
        name: 'Color'
    },

    // Element/Component/Service/etc.. Demos
    {
        path: '/toast',
        component: ToastDemo,
        name: 'Toast'
    }, {
        path: '/modal',
        component: ModalDemo,
        name: 'Modal'
    }, {
        path: '/button',
        component: ButtonDemo,
        name: 'Button'
    }, {
        path: '/tabs',
        component: TabsDemo,
        name: 'Tabs'
    }, {
        path: '/select',
        component: SelectDemo,
        name: 'Select'
    }, {
        path: '/dropdown',
        component: DropdownDemo,
        name: 'Dropdown'
    }, {
        path: '/loading',
        component: LoadingDemo,
        name: 'Loading'
    }, {
        path: '/cards',
        component: CardDemo,
        name: 'Cards'
    }, {
        path: '/tooltip',
        component: TooltipDemo,
        name: 'Tooltip'
    }, {
        path: '/drawer',
        component: DrawerDemo,
        name: 'Drawer'
    }, {
        path: '/switch',
        component: SwitchDemo,
        name: 'Switch'
    }, {
        path: '/header',
        component: HeaderDemo,
        name: 'Header'
    }, {
        path: '/list',
        component: ListDemo,
        name: 'List'
    }, {
        path: '/table',
        component: TableDemo,
        name: 'Table'
    }, {
        path: '/calendar',
        component: CalendarDemo,
        name: 'Calendar'
    },

    // Utils
    {
        path: '/pipes',
        component: PipesDemo,
        name: 'Pipes'
    }, {
        path: '/utils',
        component: UtilsDemo,
        name: 'Utils'
    },

    // Catch-all and redirect back to index
    {
        path: '/**',
        redirectTo: [
            'Home'
        ]
    }
])
export class DemoApp {
    constructor(router:Router, toastService:ToastService, view:ViewContainerRef, modalService:ModalService) {
        this.router = router;
        this.menuOpen = false;
        this.version = VERSION;

        toastService.defaultViewContainer = view;
        modalService.defaultViewContainer = view;

        this.designRoutes = [{
            name: 'Composition',
            path: '/composition'
        }, {
            name: 'Typography',
            path: '/typography'
        }, {
            name: 'Iconography',
            path: '/icons'
        }, {
            name: 'Color',
            path: '/color'
        }];

        this.componentRoutes = [{
            name: 'Toast',
            path: '/toast'
        }, {
            name: 'Button',
            path: '/button'
        }, {
            name: 'Tabs',
            path: '/tabs'
        }, {
            name: 'Modal',
            path: '/Modal'
        }, {
            name: 'Select',
            path: '/select'
        }, {
            name: 'Dropdown',
            path: '/dropdown'
        }, {
            name: 'Loading',
            path: '/loading'
        }, {
            name: 'Cards',
            path: '/cards'
        }, {
            name: 'Tooltip',
            path: '/tooltip'
        }, {
            name: 'Drawer',
            path: '/drawer'
        }, {
            name: 'Switch',
            path: '/switch'
        }, {
            name: 'Header',
            path: '/header'
        }, {
            name: 'List',
            path: '/list'
        }, {
            name: 'Table',
            path: '/table'
        }, {
            name: 'Calendar',
            path: '/calendar'
        }];

        this.utilRoutes = [{
            name: 'Pipes',
            path: '/pipes'
        }, {
            name: 'Utils',
            path: '/utils'
        }];

        router.subscribe(() => {
            document.body.scrollTop = 0;
            this.menuOpen = false;
        });
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
