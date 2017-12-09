// // NG2
// import { Component, Input, EventEmitter, Output, HostBinding, HostListener } from '@angular/core';

// @Component({
//     selector: 'novo-tab-button',
//     template: '<ng-content></ng-content>',
// })
// export class NovoTabButtonComponent {
//     @HostBinding('class.active') @Input() public active: boolean = false;
//     @HostBinding('class.disabled') @Input() public disabled: boolean = false;

//     public nav: any;

//     constructor(nav: NovoNavComponent) {
//         this.nav = nav;
//         this.nav.add(this);
//     }

//     @HostListener('click')
//     public select(): void {
//         if (!this.disabled) {
//             this.nav.select(this);
//         }
//     }
// }
