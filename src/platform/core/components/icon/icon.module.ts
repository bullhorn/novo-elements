
import { NgModule } from '@angular/core';
import { NovoIconComponent } from './icon.component';
// import {ICON_REGISTRY_PROVIDER} from './icon-registry';

@NgModule({
    exports: [NovoIconComponent],
    declarations: [NovoIconComponent],
    // providers: [ICON_REGISTRY_PROVIDER],
})
export class NovoIconModule { }
