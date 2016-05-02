import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, RouteConfig, Router } from 'angular2/router';

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
    UtilsDemo,
    PipesDemo,
    TooltipDemo,
    DrawerDemo,
    SelectDemo
} from './../pages';

const template = require('./App.html');

@Component({
    selector: 'demo-app',
    template: template,
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
        name: 'Toast' },
    {
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
    constructor(router: Router) {
        this.router = router;
        this.menuOpen = false;
        this.version = VERSION;

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

        this.componentRoutes = [
            {
                name: 'Toast',
                path: '/toast'
            }, {
                name: 'Button',
                path: '/button'
            }, {
                name: 'Tabs',
                path: '/tabs'
            }, {
                name: 'Select',
                path: '/select'
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
            }
            // { name: 'Form', path: '/form' },
            // { name: 'Dropdown', path: '/dropdowns' },
            // { name: 'Tooltip', path: '/tooltips' },
            // { name: 'Calendar', path: '/calendar' },
            // { name: 'Table', path: '/table' },
            // { name: 'Drawer', path: '/drawer' },
            // { name: 'Switch', path: '/switch' },
            // { name: 'Modal', path: '/modal' },
            // { name: 'Loading', path: '/loading' },
            // { name: 'Dragula', path: '/dragula' },
            // { name: 'Cards', path: '/cards' },
            // { name: 'CardExamples', path: '/card-examples' },
            // { name: 'Chart', path: '/chart' },
            // { name: 'Headers', path: '/headers' }
        ];

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
