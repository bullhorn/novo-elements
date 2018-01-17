/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  ChangeDetectionStrategy,
  Directive,
  Input,
  HostBinding,
} from '@angular/core';

/**
 * Content of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: 'novo-card-content',
})
export class NovoCardContent {
  @HostBinding('class.novo-card-content') public _useClassName: boolean = true;
}

/**
 * Title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: `novo-card-title, [novo-card-title], [matCardTitle]`,
})
export class NovoCardTitle {
  @HostBinding('class.novo-card-title') public _useClassName: boolean = true;
}

/**
 * Sub-title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: `novo-card-subtitle, [novo-card-subtitle], [matCardSubtitle]`,
})
export class NovoCardSubtitle {
  @HostBinding('class.novo-card-subtitle') public _useClassName: boolean = true;
}

/**
 * Action section of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: 'novo-card-actions',
})
export class NovoCardActions {
  /** Position of the actions inside the card. */
  @Input() public align: 'start' | 'end' = 'start';
  @HostBinding('class.novo-card-actions-align-end')
  public get isAlignEnd(): boolean {
    return this.align === 'end';
  }
  @HostBinding('class.novo-card-actions') public _useClassName: boolean = true;
}

/**
 * Footer of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: 'novo-card-footer',
})
export class NovoCardFooter {
  @HostBinding('class.novo-card-footer') public _useClassName: boolean = true;
}

/**
 * Image used in a card, needed to add the novo- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[novo-card-image]',
})
export class NovoCardImage {
  @HostBinding('class.novo-card-image') public _useClassName: boolean = true;
}

/**
 * A basic content container component that adds the styles of a Material design card.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common card sections, including:
 * - novo-card-title
 * - novo-card-subtitle
 * - novo-card-content
 * - novo-card-actions
 * - novo-card-footer
 */
@Component({
  selector: 'novo-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <ng-content select="header"></ng-content>
      <ng-content></ng-content>
      <ng-content select="footer"></ng-content>
  `,
})
export class NovoCardComponent {
  @HostBinding('class.novo-card') public _useClassName: boolean = true;
}
