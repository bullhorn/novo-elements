// NG2
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { NovoOverlayTemplateComponent } from '../overlay/Overlay';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { NovoLabelService } from '../../services/novo-label-service';
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoSelectElement),
  multi: true,
};

@Component({
  selector: 'novo-select',
  providers: [SELECT_VALUE_ACCESSOR],
  template: `
    <div (click)="openPanel()" tabIndex="0" type="button" [class.empty]="empty">{{selected.label}}<i class="bhi-collapse"></i></div>
    <novo-overlay-template [parent]="element" position="center">
      <ul class="novo-select-list" tabIndex="-1" [class.header]="headerConfig" [class.active]="panelOpen">
        <ng-content></ng-content>
        <li *ngIf="headerConfig" class="select-header" [class.open]="header.open">
          <button *ngIf="!header.open" (click)="toggleHeader($event); false" tabIndex="-1" type="button" class="header"><i class="bhi-add-thin"></i>&nbsp;{{headerConfig.label}}
          </button>
          <div *ngIf="header.open" [ngClass]="{active: header.open}">
            <input autofocus type="text" [placeholder]="headerConfig.placeholder" [attr.id]="name" autocomplete="false" [(ngModel)]="header.value"
                   [ngClass]="{invalid: !header.valid}"/>
            <footer>
              <button (click)="toggleHeader($event, false)">{{labels.cancel}}</button>
              <button (click)="saveHeader()" class="primary">{{labels.save}}</button>
            </footer>
          </div>
        </li>
        <li *ngFor="let option of filteredOptions; let i = index" [ngClass]="{active: option.active}"
            (click)="setValueAndClose({value: option, index: i})" [attr.data-automation-value]="option.label">
          <span [innerHtml]="highlight(option.label, filterTerm)"></span>
          <i *ngIf="option.active" class="bhi-check"></i>
        </li>
      </ul>
    </novo-overlay-template>
  `,
  host: {
    '(keydown)': 'onKeyDown($event)',
  },
})
export class NovoSelectElement implements OnInit, OnChanges {
  @Input() name: string;
  @Input() options: Array<any>;
  @Input() placeholder: string = 'Select...';
  @Input() readonly: boolean;
  @Input() headerConfig: any;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  selectedIndex: number = -1;
  empty: boolean = true;
  header: any = {
    open: false,
    valid: true,
    value: '',
  };
  createdItem: any;
  selected: any;
  model: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};
  filterTerm: string = '';
  filterTermTimeout;
  filteredOptions: any;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild(NovoOverlayTemplateComponent) overlay: NovoOverlayTemplateComponent;

  constructor(public element: ElementRef, public labels: NovoLabelService, public ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges(changes?: SimpleChanges) {
    this.readonly = this.readonly === true;
    if (this.options && this.options.length && typeof this.options[0] === 'string') {
      this.filteredOptions = this.options.map((item) => {
        return { value: item, label: item };
      });
    } else {
      this.filteredOptions = (this.options || []).filter((item) => {
        return !item.readOnly;
      });
      this.filteredOptions.forEach((element) => {
        element.active = false;
      });
    }

    if (!this.model && !this.createdItem) {
      this.clear();
    } else if (this.createdItem) {
      let item = this.options.find((i) => i.label === this.createdItem);
      let index = this.options.indexOf(item);
      this.select(item, index);
    } else {
      this.writeValue(this.model);
    }

    if (this.panelOpen) {
      this.openPanel();
    }
  }

  /** BEGIN: Convenient Panel Methods. */
  openPanel(): void {
    this.overlay.openPanel();
  }

  closePanel(): void {
    this.overlay.closePanel();
  }

  get panelOpen(): boolean {
    return this.overlay && this.overlay.panelOpen;
  }

  /** END: Convenient Panel Methods. */

  /**
   * This method closes the panel, and if a value is specified, also sets the associated
   * control to that value. It will also mark the control as dirty if this interaction
   * stemmed from the user.
   */
  public setValueAndClose(event: any | null): void {
    if (event.value && event.index >= 0) {
      this.select(event.value, event.index);
    }
    this.closePanel();
  }

  select(option, i, fireEvents: boolean = true) {
    if (this.selected) {
      this.selected.active = false;
    }
    this.selectedIndex = i;
    this.selected = option;
    this.selected.active = true;
    this.empty = false;
    if (fireEvents) {
      this.onModelChange(this.selected.value);
      this.onSelect.emit({ selected: this.selected.value });
    }
  }

  clear() {
    this.selected = {
      label: this.placeholder,
      value: null,
      active: false,
    };
    this.header = {
      open: false,
      valid: true,
      value: '',
    };
    this.selectedIndex = -1;
    this.empty = true;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.panelOpen) {
      if (!this.header.open) {
        // Prevent Scrolling
        event.preventDefault();
      }
      // Close popup on escape key
      if (event.keyCode === KeyCodes.ESC) {
        this.closePanel();
        return;
      }
      if (event.keyCode === KeyCodes.ENTER) {
        if (this.header.open && this.header.value) {
          this.saveHeader();
          return;
        }
        this.setValueAndClose({ value: this.filteredOptions[this.selectedIndex], index: this.selectedIndex });
        return;
      }

      if (event.keyCode === KeyCodes.UP && this.selectedIndex > 0) {
        this.selectedIndex--;
        this.select(this.filteredOptions[this.selectedIndex], this.selectedIndex);
        this.scrollToSelected();
      } else if (event.keyCode === KeyCodes.DOWN && this.selectedIndex < this.filteredOptions.length - 1) {
        this.selectedIndex++;
        this.select(this.filteredOptions[this.selectedIndex], this.selectedIndex);
        this.scrollToSelected();
        if (this.header.open) {
          this.toggleHeader(null, false);
        }
      } else if (event.keyCode === KeyCodes.UP && this.selectedIndex === 0) {
        this.selectedIndex--;
        this.toggleHeader(null, true);
      } else if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode === KeyCodes.SPACE) {
        clearTimeout(this.filterTermTimeout);
        this.filterTermTimeout = setTimeout(() => {
          this.filterTerm = '';
        }, 2000);
        let char = String.fromCharCode(event.keyCode);
        this.filterTerm = this.filterTerm.concat(char);
        // let element = this.element.nativeElement;
        // let list = element.querySelector('.novo-select-list');
        // let item = element.querySelector(`[data-automation-value^="${this.filterTerm}" i]`);
        let item = this.filteredOptions.find((i) => i.label.toUpperCase().indexOf(this.filterTerm) === 0);
        if (item) {
          this.select(item, this.filteredOptions.indexOf(item));
          this.scrollToSelected();
        }
      } else if ([KeyCodes.BACKSPACE, KeyCodes.DELETE].includes(event.keyCode)) {
        clearTimeout(this.filterTermTimeout);
        this.filterTermTimeout = setTimeout(() => {
          this.filterTerm = '';
        }, 2000);
        this.filterTerm = this.filterTerm.slice(0, -1);
      }
    } else {
      if ([KeyCodes.DOWN, KeyCodes.UP].includes(event.keyCode)) {
        this.panelOpen ? this.closePanel() : this.openPanel();
      }
    }
  }

  scrollToSelected() {
    this.scrollToIndex(this.selectedIndex);
  }

  scrollToIndex(index: number) {
    let element = this.overlay.overlayRef.overlayElement;
    let list = element.querySelector('.novo-select-list');
    let items = list.querySelectorAll('li');
    let item = items[this.headerConfig ? index + 1 : index];
    if (item) {
      list.scrollTop = item.offsetTop;
    }
  }

  toggleHeader(event, forceValue) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    // Reverse the active property (if forceValue, use that)
    this.header = {
      open: forceValue !== undefined ? forceValue : !this.header.open,
      value: '',
      valid: true,
    };
  }

  highlight(match, query) {
    // Replaces the capture string with a the same string inside of a "strong" tag
    return query ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
  }

  escapeRegexp(queryToEscape) {
    // Ex: if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  saveHeader() {
    if (this.header.value) {
      this.headerConfig.onSave(this.header.value);
      this.createdItem = this.header.value;
      this.closePanel();
    } else {
      this.header.valid = false;
    }
  }

  writeValue(model: any): void {
    this.model = model;
    if (this.options) {
      let item = this.filteredOptions.find((i) => i.value === model);
      if (!item && !Helpers.isEmpty(model)) {
        item = {
          label: model,
          value: model,
        };
        if (!item.readOnly) {
          this.options.unshift(item);
        }
      }
      if (item) {
        this.select(item, this.filteredOptions.indexOf(item), false);
        this.empty = false;
      } else {
        this.clear();
      }
    }
    this.ref.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
