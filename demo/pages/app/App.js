import { Component, ViewContainerRef } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { RouteConfig, Router } from '@angular/router-deprecated';

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
@RouteConfig([
    // Base Pages (design system)
    { path: '/', name: 'Home', loader: () => require('es6-promise!./../home/Home')('Home'), useAsDefault: true },
    { path: '/composition', name: 'Composition', loader: () => require('es6-promise!./../layout/Layout')('Layout') },
    { path: '/typography', name: 'Typography', loader: () => require('es6-promise!./../typography/Typography')('Typography') },
    { path: '/icons', name: 'Iconography', loader: () => require('es6-promise!./../iconography/Iconography')('Iconography') },
    { path: '/color', name: 'Color', loader: () => require('es6-promise!./../color/Color')('Color') },

    // Element/Component/Service/etc.. Demos
    { path: '/button', name: 'Button', loader: () => require('es6-promise!./../button/ButtonDemo')('ButtonDemo') },
    { path: '/radio', name: 'Radio', loader: () => require('es6-promise!./../radio/RadioDemo')('RadioDemo') },
    { path: '/quick-note', name: 'QuickNote', loader: () => require('es6-promise!./../quick-note/QuickNoteDemo')('QuickNoteDemo') },
    { path: '/modal', name: 'Modal', loader: () => require('es6-promise!./../modal/ModalDemo')('ModalDemo') },
    { path: '/form', name: 'Form', loader: () => require('es6-promise!./../form/FormDemo')('FormDemo') },
    { path: '/toast', name: 'Toast', loader: () => require('es6-promise!./../toast/ToastDemo')('ToastDemo') },
    { path: '/tooltip', name: 'Tooltip', loader: () => require('es6-promise!./../tooltip/TooltipDemo')('TooltipDemo') },
    { path: '/cards', name: 'Cards', loader: () => require('es6-promise!./../card/CardDemo')('CardDemo') },
    { path: '/loading', name: 'Loading', loader: () => require('es6-promise!./../loading/LoadingDemo')('LoadingDemo') },
    { path: '/dropdown', name: 'Dropdown', loader: () => require('es6-promise!./../dropdown/DropdownDemo')('DropdownDemo') },
    { path: '/picker', name: 'Picker', loader: () => require('es6-promise!./../picker/PickerDemo')('PickerDemo') },
    { path: '/chips', name: 'Chips', loader: () => require('es6-promise!./../chips/ChipsDemo')('ChipsDemo') },
    { path: '/select', name: 'Select', loader: () => require('es6-promise!./../select/SelectDemo')('SelectDemo') },
    { path: '/tabs', name: 'Tabs', loader: () => require('es6-promise!./../tabs/TabsDemo')('TabsDemo') },
    { path: '/table', name: 'Table', loader: () => require('es6-promise!./../table/TableDemo')('TableDemo') },
    { path: '/list', name: 'List', loader: () => require('es6-promise!./../list/ListDemo')('ListDemo') },
    { path: '/header', name: 'Header', loader: () => require('es6-promise!./../header/HeaderDemo')('HeaderDemo') },
    { path: '/switch', name: 'Switch', loader: () => require('es6-promise!./../switch/SwitchDemo')('SwitchDemo') },
    { path: '/drawer', name: 'Drawer', loader: () => require('es6-promise!./../drawer/DrawerDemo')('DrawerDemo') },
    { path: '/calendar', name: 'Calendar', loader: () => require('es6-promise!./../calendar/CalendarDemo')('CalendarDemo') },
    { path: '/dragula', name: 'Dragula', loader: () => require('es6-promise!./../dragula/DragulaDemo')('DragulaDemo') },
    { path: '/tiles', name: 'Tiles', loader: () => require('es6-promise!./../tiles/TilesDemo')('TilesDemo') },

    // Utils
    { path: '/utils', name: 'Utils', loader: () => require('es6-promise!./../utils/UtilsDemo')('UtilsDemo') },
    { path: '/pipes', name: 'Pipes', loader: () => require('es6-promise!./../pipes/PipesDemo')('PipesDemo') }
])
export class DemoApp {
    constructor(router:Router, toastService:ToastService, view:ViewContainerRef, modalService:ModalService) {
        this.router = router;
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
            { name: 'Modal', path: '/Modal' },
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

        router.subscribe(() => {
            document.body.scrollTop = 0;
            this.menuOpen = false;
        });
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
