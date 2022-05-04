import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[compHost]',
})
export class CompHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}