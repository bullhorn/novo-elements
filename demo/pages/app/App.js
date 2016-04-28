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
    CardDemo,
    UtilsDemo,
    PipesDemo
} from './../pages';

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
    { path: '/tabs', component: TabsDemo, name: 'Tabs' },
    { path: '/loading', component: LoadingDemo, name: 'Loading' },
    { path: '/cards', component: CardDemo, name: 'Cards' },

    // Utils
    { path: '/pipes', component: PipesDemo, name: 'Pipes' },
    { path: '/utils', component: UtilsDemo, name: 'Utils' },

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
            { name: 'Button', path: '/button' },
            { name: 'Tabs', path: '/tabs' },
            { name: 'Loading', path: '/loading' },
            { name: 'Cards', path: '/cards' }
        ];

        this.utilRoutes = [
            { name: 'Pipes', path: '/pipes' },
            { name: 'Utils', path: '/utils' }
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
