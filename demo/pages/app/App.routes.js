import { Home } from './../home/Home';

export const routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },

    // Make sure you match the component type string to the require in asyncRoutes
    // Base Pages (design system)
    { path: 'color', component: 'Color' },
    { path: 'composition', component: 'Layout' },
    { path: 'typography', component: 'Typography' },
    { path: 'icons', component: 'Iconography' },

    // Element/Component/Service/etc.. Demos
    { path: 'button', component: 'ButtonDemo' },
    { path: 'radio', component: 'RadioDemo' },
    { path: 'quick-note', component: 'QuickNoteDemo' },
    { path: 'modal', component: 'ModalDemo' },
    { path: 'form', component: 'FormDemo' },
    { path: 'toast', component: 'ToastDemo' },
    { path: 'tooltip', component: 'TooltipDemo' },
    { path: 'cards', component: 'CardDemo' },
    { path: 'loading', component: 'LoadingDemo' },
    { path: 'dropdown', component: 'DropdownDemo' },
    { path: 'picker', component: 'PickerDemo' },
    { path: 'chips', component: 'ChipsDemo' },
    { path: 'select', component: 'SelectDemo' },
    { path: 'tabs', component: 'TabsDemo' },
    { path: 'table', component: 'TableDemo' },
    { path: 'list', component: 'ListDemo' },
    { path: 'header', component: 'HeaderDemo' },
    { path: 'switch', component: 'SwitchDemo' },
    { path: 'drawer', component: 'DrawerDemo' },
    { path: 'calendar', component: 'CalendarDemo' },
    { path: 'dragula', component: 'DragulaDemo' },
    { path: 'tiles', component: 'TilesDemo' },
    { path: 'slides', component: 'SlidesDemo' },

    // Utils
    { path: 'utils', component: 'UtilsDemo' },
    { path: 'pipes', component: 'PipesDemo' },

    // Catch All
    { path: '**', component: Home }
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly
export const asyncRoutes = {
    // We have to use the alternative syntax for es6-promise-loader to grab the routes
    // Base Pages (design system)
    'Color': require('es6-promise-loader!./../color/Color'),
    'Layout': require('es6-promise-loader!./../layout/Layout'),
    'Typography': require('es6-promise-loader!./../typography/Typography'),
    'Iconography': require('es6-promise-loader!./../iconography/Iconography'),

    // Element/Component/Service/etc.. Demos
    'ButtonDemo': require('es6-promise-loader!./../button/ButtonDemo'),
    'RadioDemo': require('es6-promise-loader!./../radio/RadioDemo'),
    'QuickNoteDemo': require('es6-promise-loader!./../quick-note/QuickNoteDemo'),
    'ModalDemo': require('es6-promise-loader!./../modal/ModalDemo'),
    'FormDemo': require('es6-promise-loader!./../form/FormDemo'),
    'ToastDemo': require('es6-promise-loader!./../toast/ToastDemo'),
    'TooltipDemo': require('es6-promise-loader!./../tooltip/TooltipDemo'),
    'CardDemo': require('es6-promise-loader!./../card/CardDemo'),
    'LoadingDemo': require('es6-promise-loader!./../loading/LoadingDemo'),
    'DropdownDemo': require('es6-promise-loader!./../dropdown/DropdownDemo'),
    'PickerDemo': require('es6-promise-loader!./../picker/PickerDemo'),
    'ChipsDemo': require('es6-promise-loader!./../chips/ChipsDemo'),
    'SelectDemo': require('es6-promise-loader!./../select/SelectDemo'),
    'TabsDemo': require('es6-promise-loader!./../tabs/TabsDemo'),
    'TableDemo': require('es6-promise-loader!./../table/TableDemo'),
    'ListDemo': require('es6-promise-loader!./../list/ListDemo'),
    'HeaderDemo': require('es6-promise-loader!./../header/HeaderDemo'),
    'SwitchDemo': require('es6-promise-loader!./../switch/SwitchDemo'),
    'DrawerDemo': require('es6-promise-loader!./../drawer/DrawerDemo'),
    'CalendarDemo': require('es6-promise-loader!./../calendar/CalendarDemo'),
    'DragulaDemo': require('es6-promise-loader!./../dragula/DragulaDemo'),
    'TilesDemo': require('es6-promise-loader!./../tiles/TilesDemo'),
    'SlidesDemo': require('es6-promise-loader!./../slides/SlidesDemo'),

    // Utils
    'UtilsDemo': require('es6-promise-loader!./../utils/UtilsDemo'),
    'PipesDemo': require('es6-promise-loader!./../pipes/PipesDemo')
};

// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks = [
    // Most high traffic routes will go here, will make sure they are loaded after bootstrapping
];
