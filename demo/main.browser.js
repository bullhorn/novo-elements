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

document.addEventListener('DOMContentLoaded', main);
