import { Component } from '@angular/core';

@Component({
    template: ` <novo-select (change)="onChange($event)"></novo-select> `,
    standalone: false
})
class A {}
