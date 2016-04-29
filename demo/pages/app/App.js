import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, RouteConfig, Router } from 'angular2/router';

const template = require('./App.html');

@Component({
    selector: 'demo-app',
    template: template,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
@RouteConfig([
    // Base Pages (design system)
    { path: '/', loader: () => require('es6-promise!./../home/Home')('Home'), name: 'Home' },
    { path: '/composition', loader: () => require('es6-promise!./../layout/Layout')('Layout'), name: 'Composition' },
    {
        path: '/typography',
        loader: () => require('es6-promise!./../typography/Typography')('Typography'),
        name: 'Typography'
    },
    {
        path: '/icons',
        loader: () => require('es6-promise!./../iconography/Iconography')('Iconography'),
        name: 'Iconography'
    },
    { path: '/color', loader: () => require('es6-promise!./../color/Color')('Color'), name: 'Color' },

    // Element/Component/Service/etc.. Demos
    { path: '/button', loader: () => require('es6-promise!./../button/ButtonDemo')('ButtonDemo'), name: 'Button' },
    { path: '/tabs', loader: () => require('es6-promise!./../tabs/TabsDemo')('TabsDemo'), name: 'Tabs' },
    { path: '/loading', loader: () => require('es6-promise!./../loading/LoadingDemo')('LoadingDemo'), name: 'Loading' },
    { path: '/cards', loader: () => require('es6-promise!./../card/CardDemo')('CardDemo'), name: 'Cards' },
    { path: '/tooltip', loader: () => require('es6-promise!./../tooltip/TooltipDemo')('TooltipDemo'), name: 'Tooltip' },

    // Utils
    { path: '/pipes', loader: () => require('es6-promise!./../pipes/PipesDemo')('PipesDemo'), name: 'Pipes' },
    { path: '/utils', loader: () => require('es6-promise!./../utils/UtilsDemo')('UtilsDemo'), name: 'Utils' },

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
            { name: 'Cards', path: '/cards' },
            { name: 'Tooltip', path: '/tooltip' }
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
