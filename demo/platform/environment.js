import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

// Environment Providers
let PROVIDERS = [
    // common env directives
];

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateComponentRef = function identity(value) {
    return value;
};

if (ENV === 'production') {
    // Production
    disableDebugTools();
    enableProdMode();

    PROVIDERS = [
        ...PROVIDERS
        // custom providers in production
    ];
} else {
    _decorateComponentRef = (cmpRef) => {
        let _ng = window.ng;
        enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return cmpRef;
    };

    // Development
    PROVIDERS = [
        ...PROVIDERS
        // custom providers in development
    ];
}

export const decorateComponentRef = _decorateComponentRef;
export const ENV_PROVIDERS = [
    ...PROVIDERS
];
