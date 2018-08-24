// NG2
import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  forwardRef,
  ElementRef,
  AfterContentInit,
  OnChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
// APP
import { Helpers } from '../../utils/Helpers';

// Value accessor for the component (supports ngModel)
const TILES_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoTilesElement),
  multi: true,
};

@Component({
  selector: 'novo-tiles',
  providers: [TILES_VALUE_ACCESSOR],
  template: `
        <div class="tile-container" [class.active]="focused" [class.disabled]="disabled">
            <div class="tile" *ngFor="let option of _options; let i = index" [ngClass]="{active: option.checked, disabled: option.disabled}" (click)="select($event, option, i)" [attr.data-automation-id]="option.label || option">
                <input class="tiles-input" [name]="name" type="radio" [value]="option.checked || option" [attr.id]="name + i" (change)="select($event, option, i)" (focus)="setFocus(true)" (blur)="setFocus(false)" [disabled]="disabled">
                <label [attr.for]="name + i" [attr.data-automation-id]="option.label || option">
                    {{ option.label || option }}
                </label>
            </div>
            <span class="active-indicator" [@tileState]="state" [hidden]="activeTile === undefined || activeTile === null"></span>
        </div>
    `,
  animations: [
    trigger('tileState', [
      state(
        'inactive',
        style({
          opacity: '0',
        }),
      ),
      state(
        'active',
        style({
          opacity: '1',
        }),
      ),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoTilesElement implements ControlValueAccessor, AfterContentInit, OnChanges {
  @Input()
  name: string = new Date().getTime().toString();
  @Input()
  options: any;
  @Input()
  required: boolean;
  @Input('controlDisabled')
  disabled: boolean = false;
  @Output()
  onChange: EventEmitter<any> = new EventEmitter();
  @Output()
  onSelectedOptionClick: EventEmitter<any> = new EventEmitter();
  @Output()
  onDisabledOptionClick: EventEmitter<any> = new EventEmitter();

  _options: Array<any> = [];
  public activeTile: any = null;
  public state: String = 'inactive';
  public focused: boolean = false;

  model: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(private element: ElementRef, private ref: ChangeDetectorRef) {}

  public setFocus(focus: boolean): void {
    this.focused = focus;
  }

  ngAfterContentInit() {
    this.name = this.name || '';
    this.setupOptions();
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['options'] && change['options'].currentValue && !change['options'].firstChange) {
      this.name = this.name || '';
      this._options = [];
      this.setupOptions();
    }
  }

  setupOptions() {
    if (this.options && this.options.length && (this.options[0].value === undefined || this.options[0].value === null)) {
      this._options = this.options.map((x) => {
        let item = { value: x, label: x, checked: this.model === x };
        if (item.checked) {
          this.setTile(item);
        }
        return item;
      });
    } else {
      this._options = this.options.map((x) => {
        x.checked = this.model === x.value;
        if (x.checked) {
          this.setTile(x);
        }
        return x;
      });
    }
    this.ref.markForCheck();
  }

  select(event, item) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (!item.disabled) {
      if (item.checked) {
        this.onSelectedOptionClick.emit(item);
        return;
      }

      for (let option of this._options) {
        option.checked = false;
      }

      item.checked = !item.checked;
      this.onChange.emit(item.value);
      this.onModelChange(item.value);
      this.setTile(item);
      this.model = item.value;
    } else {
      this.onDisabledOptionClick.emit(item);
    }
    this.ref.markForCheck();
  }

  setTile(item) {
    if (item) {
      this.activeTile = item.value;
      this.moveTile();
    }
  }

  moveTile() {
    setTimeout(() => {
      let ind = this.element.nativeElement.querySelector('.active-indicator');
      let el = this.element.nativeElement.querySelector('.tile.active');
      if (ind && el) {
        let w: number = el.clientWidth;
        let left: number = el.offsetLeft - el.offsetTop; // Removes the border width that Firefox adds without affecting other browsers
        ind.style.width = `calc(${w}px + 0.32em)`;
        ind.style.left = `${left}px`;
        this.state = 'active';
        this.ref.markForCheck();
      }
    });
  }

  writeValue(model: any): void {
    this.model = model;
    if (!Helpers.isBlank(model)) {
      this.setupOptions();
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
