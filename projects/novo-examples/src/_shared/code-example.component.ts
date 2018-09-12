// NG2
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ComponentPortal } from '@angular/cdk/portal';
import { EXAMPLE_COMPONENTS, LiveExample } from '../examples.module';

@Component({
  selector: 'code-example',
  template: `
      <div class="example">
        <header theme="white" [condensed]="true">
          <h4 novo-title>{{exampleData.title}}</h4>
          <utils>
            <button theme="icon" icon="book" (click)="toggleSourceView()"></button>
            <stackblitz-button [example]="example"></stackblitz-button>
          </utils>
        </header>
        <div class="example-container">
          <ng-template [cdkPortalOutlet]="selectedPortal"></ng-template>
        </div>
        <code-snippet [example]="example" *ngIf="showSource"></code-snippet>
      </div>
    `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeExampleComponent {
  /** Component portal for the currently displayed example. */
  selectedPortal: ComponentPortal<any>;

  /** String key of the currently displayed example. */
  _example: string;

  exampleData: LiveExample;

  /** Whether the source for the example is being displayed. */
  showSource = false;

  constructor() {}

  get example() {
    return this._example;
  }

  @Input()
  set example(example: string) {
    if (example && EXAMPLE_COMPONENTS[example]) {
      this._example = example;
      this.exampleData = EXAMPLE_COMPONENTS[example];
      this.selectedPortal = new ComponentPortal(this.exampleData.component);
    } else {
      console.log('MISSING EXAMPLE: ', example);
    }
  }

  toggleSourceView(): void {
    this.showSource = !this.showSource;
  }
}
