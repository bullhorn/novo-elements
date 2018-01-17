import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  HostBinding,
  HostListener,
} from '@angular/core';
import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

import { NovoOverlayTemplateComponent } from '../overlay';

@Component({
  selector: 'novo-menu',
  template: `
        <ng-content select="button" #trigger></ng-content>
        <novo-overlay-template [parent]="element" [position]="align">
            <div class="novo-menu-list-conatiner">
                <ng-content></ng-content>
            </div>
        </novo-overlay-template>
    `,
})
export class NovoMenuComponent implements OnInit, OnChanges {
  @HostBinding('attr.role') public role: string = 'menu';
  @Input() public name: string;
  @Input() public align: string = 'left';
  // @Output() onSelect: EventEmitter<any> = new EventEmitter();
  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent)
  public overlay: NovoOverlayTemplateComponent;

  constructor(public element: ElementRef) {}

  public ngOnInit(): void {
    this.ngOnChanges();
    this._addButtonListener(this.element.nativeElement);
  }

  public ngOnChanges(changes?: SimpleChanges): void {
    if (this.panelOpen) {
      this.openPanel();
    }
  }

  /** BEGIN: Convienient Panel Methods. */
  public openPanel(): void {
    this.overlay.openPanel();
  }
  public closePanel(): void {
    this.overlay.closePanel();
  }
  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }
  /** END: Convienient Panel Methods. */

  protected _addButtonListener(element: HTMLElement): void {
    if (element) {
      let button: HTMLElement = this.element.nativeElement.querySelector(
        'button',
      );
      button.addEventListener('click', () => this.openPanel());
    }
  }
  /** Handle a keyboard event from the menu, delegating to the appropriate action. */
  @HostListener('keydown', ['$event'])
  protected _handleKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case ESCAPE:
        this.closePanel();
        event.stopPropagation();
        break;
      case LEFT_ARROW:
        // if (this.parentMenu && this.direction === 'ltr') {
        //     this.closePanel();
        // }
        break;
      case RIGHT_ARROW:
        // if (this.parentMenu && this.direction === 'rtl') {
        //     this.closePanel();
        // }
        break;
      default:
        // this._keyManager.onKeydown(event);
        break;
    }
  }
}
