// NG2
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// APP
import { NovoElementsDemoModule } from './novo-elements-demo.module';

// Enable prod mode
if (ENV === 'production') {
    enableProdMode();
}

/**
 * Bootstrap via function to ensure DOM is ready
 */
export function main() {
    return platformBrowserDynamic().bootstrapModule(NovoElementsDemoModule);
}

/**
 * If DEV then we bootstrap via HMR otherwise, just call directly
 */
export function bootstrapDomReady() {
    document.addEventListener('DOMContentLoaded', main);
}

// Hot Module Replacement
if (ENV === 'development' && HMR) {
    // activate hot module reload
    if (document.readyState === 'complete') {
        main();
    } else {
        bootstrapDomReady();
    }
    module.hot.accept();
} else {
    bootstrapDomReady();
}
