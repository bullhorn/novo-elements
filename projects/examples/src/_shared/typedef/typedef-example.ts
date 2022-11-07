// NG2
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'typedef-content',
  template: '<ng-content></ng-content>',
  host: { class: 'typedef-content' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedefContent {}

@Component({
  selector: 'typedef-specs',
  template: '<ng-content></ng-content>',
  host: { class: 'typedef-specs' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedefSpec {}

@Component({
  selector: 'typedef-snippet',
  template: '<ng-content></ng-content>',
  host: { class: 'typedef-snippet' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedefSnippet {}

@Component({
  selector: 'typedef-example',
  templateUrl: './typedef-example.html',
  styleUrls: ['./typedef-example.scss'],
  host: { class: 'typedef-example' },
  encapsulation: ViewEncapsulation.None,
})
export class TypedefExample {}
