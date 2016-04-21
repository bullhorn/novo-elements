import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, RouteConfig, Router } from 'angular2/router';

import { Home, ButtonDemo, Layout, Typography, Iconography, Color } from './../pages';

const template = require('./App.html');

@Component({
    selector: 'demo-app',
    template: template,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
@RouteConfig([
    // Base Pages (design system)
    { path: '/', component: Home, name: 'Home' },
    { path: '/composition', component: Layout, name: 'Composition' },
    { path: '/typography', component: Typography, name: 'Typography' },
    { path: '/icons', component: Iconography, name: 'Iconography' },
    { path: '/color', component: Color, name: 'Color' },

    // Element/Component/Service/etc.. Demos
    { path: '/button', component: ButtonDemo, name: 'Button' },

    // Catch-all and redirect back to index
    { path: '/**', redirectTo: ['Home'] }
])
export class DemoApp {
    constructor(router:Router) {
        this.router = router;
        this.menuOpen = false;
        this.version = VERSION;

        this.designRoutes = [
            { name: 'Composition', path: '/composition' },
            { name: 'Typography', path: '/typography' },
            { name: 'Iconography', path: '/icons' },
            { name: 'Color', path: '/color' }
        ];

        this.componentRoutes = [
            { name: 'Button', path: '/button' }
            // { name: 'Tabs', path: '/tabs' },
            // { name: 'Form', path: '/form' },
            // { name: 'Dropdown', path: '/dropdowns' },
            // { name: 'Tooltip', path: '/tooltips' },
            // { name: 'Calendar', path: '/calendar' },
            // { name: 'Table', path: '/table' },
            // { name: 'Drawer', path: '/drawer' },
            // { name: 'Switch', path: '/switch' },
            // { name: 'Modal', path: '/modal' },
            // { name: 'Toast', path: '/toast' },
            // { name: 'Loading', path: '/loading' },
            // { name: 'Dragula', path: '/dragula' },
            // { name: 'Cards', path: '/cards' },
            // { name: 'CardExamples', path: '/card-examples' },
            // { name: 'Chart', path: '/chart' },
            // { name: 'Headers', path: '/headers' }
        ];

        router.subscribe(() => {
            document.body.scrollTop = 0;
            this.menuOpen = false;
        });
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
