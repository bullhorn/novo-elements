// NG2
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input } from '@angular/core';
import { EXAMPLE_COMPONENTS, LiveExample } from '../examples.module';

@Component({
  selector: 'code-example',
  template: `
    <div class="example">
      <div class="example-container">
        <ng-template [cdkPortalOutlet]="selectedPortal"></ng-template>
      </div>
      <div class="example-actions">
        <novo-button theme="icon" icon="book" (click)="toggleSourceView()"></novo-button>
      </div>
      <code-snippet [example]="example" *ngIf="showSource"></code-snippet>
    </div>
  `,
  styles: [
    `
      .example {
        position: relative;
      }
      .example-container {
        /* background-image: linear-gradient(45deg, rgb(249, 249, 250) 25%, transparent 25%),
          linear-gradient(135deg, rgb(249, 249, 250) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(249, 249, 250) 75%),
          linear-gradient(135deg, transparent 75%, rgb(249, 249, 250) 75%); */
        background-size: 20px 20px;
        background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
      }
      .example-actions {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    `,
  ],
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
