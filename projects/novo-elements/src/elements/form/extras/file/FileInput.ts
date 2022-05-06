// NG2
import { FocusKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { NovoDragulaService } from '../../../../elements/dragula/DragulaService';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { CanUpdateErrorStateCtor, ErrorStateMatcher, mixinErrorState } from '../../../common';
import { NovoFieldControl } from '../../../field';
import { NovoFile } from './extras/file/File';

// Value accessor for the component (supports ngModel)
// const FILE_VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => NovoFileInputElement),
//   multi: true,
// };

const LAYOUT_DEFAULTS = { order: 'default', download: true, removable: true, labelStyle: 'default', draggable: false };
// make file-input ids unique
let nextId = 0;

class NovoFileInputBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
  ) {}
}
const NovoFileInputMixins: CanUpdateErrorStateCtor & typeof NovoFileInputBase = mixinErrorState(NovoFileInputBase);

@Component({
  selector: 'novo-file-input',
  providers: [{ provide: NovoFieldControl, useExisting: NovoFileInputElement }],
  template: `
    <div #container></div>
    <ng-template #fileInput>
      <div class="file-input-group" [class.disabled]="disabled" [class.active]="active">
        <input
          #inputElement
          *ngIf="!layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="check($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <input
          #inputElement
          *ngIf="layoutOptions.customActions"
          type="file"
          [name]="name"
          [attr.id]="name"
          (change)="customCheck($event)"
          [attr.multiple]="multiple"
          tabindex="-1"
          [attr.data-feature-id]="dataFeatureId"
        />
        <section [ngSwitch]="layoutOptions.labelStyle">
          <label *ngSwitchCase="'no-box'" [attr.for]="name" class="no-box">
            <div>
              <i class="bhi-dropzone"></i>{{ placeholder || labels.chooseAFile }} {{ labels.or }}
              <strong class="link">{{ labels.clickToBrowse }}</strong>
            </div>
          </label>
          <label *ngSwitchDefault [attr.for]="name" class="boxed">
            <span>{{ placeholder || labels.chooseAFile }}</span>
            <small
              >{{ labels.or }} <strong class="link">{{ labels.clickToBrowse }}</strong></small
            >
          </label>
        </section>
      </div>
    </ng-template>
    <ng-template #fileOutput>
      <div class="file-output-group" [dragula]="fileOutputBag" [dragulaModel]="files">
        <div class="file-item" *ngFor="let file of files" [class.disabled]="disabled">
          <i *ngIf="layoutOptions.draggable" class="bhi-move"></i>
          <label *ngIf="file.link"
            ><span
              ><a href="{{ file.link }}" target="_blank">{{ file.name | decodeURI }}</a></span
            ><span *ngIf="file.description">||</span><span>{{ file.description }}</span></label
          >
          <label *ngIf="!file.link">{{ file.name | decodeURI }}</label>
          <div class="actions" [attr.data-automation-id]="'file-actions'" *ngIf="file.loaded">
            <div *ngIf="!layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="download(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled && (layoutOptions.removable || (!layoutOptions.removable && layoutOptions.removableWhenNew && !file.link))"
                type="button"
                theme="icon"
                icon="close"
                (click)="remove(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
            <div *ngIf="layoutOptions.customActions">
              <button
                *ngIf="layoutOptions.edit && !disabled"
                type="button"
                theme="icon"
                icon="edit"
                (click)="customEdit(file)"
                [attr.data-automation-id]="'file-edit'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="layoutOptions.download"
                type="button"
                theme="icon"
                icon="save"
                (click)="customSave(file)"
                [attr.data-automation-id]="'file-download'"
                tabindex="-1"
              ></button>
              <button
                *ngIf="!disabled"
                type="button"
                theme="icon"
                icon="close"
                (click)="customDelete(file)"
                [attr.data-automation-id]="'file-remove'"
                tabindex="-1"
              ></button>
            </div>
          </div>
          <novo-loading *ngIf="!file.loaded"></novo-loading>
        </div>
      </div>
    </ng-template>
`,
})
export class NovoFileInputElement extends NovoFileInputMixins implements NovoFieldControl<any>, ControlValueAccessor, OnInit, OnDestroy {
  private _uniqueId: string = `novo-file-input-${++nextId}`;
  /** The aria-describedby attribute on the chip list for improved a11y. */
  _ariaDescribedby: string;
  /** Tab index for the chip list. */
  _tabIndex = 0;
  /** User defined tab index. */
  _userTabIndex: number | null = null;
  /** The FocusKeyManager which handles focus. */
  _keyManager: FocusKeyManager<NovoFileInputElement>;

  readonly controlType: string = 'file-input';
  /** @docs-private Implemented as part of NovoFieldControl. */
  lastKeyValue: string = null;
  /** @docs-private Implemented as part of NovoFieldControl.*/
  lastCaretPosition: number | null;

  @Input() id: string = this._uniqueId;
  @Input() tabindex: number = 0;
  /** An object used to control when error messages are shown. */
  @Input() errorStateMatcher: ErrorStateMatcher;

  // ----------
  @ViewChild('fileInput', { static: true })
  fileInput: TemplateRef<any>;
  @ViewChild('fileOutput', { static: true })
  fileOutput: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;

  @Input()
  multiple: boolean = false;

  @Input()
  layoutOptions: {
    order?: string;
    download?: boolean;
    edit?: boolean;
    labelStyle?: string;
    draggable?: boolean;
    customActions: boolean;
    removable?: boolean;
    customValidation?: { action: string; fn: Function }[];
    removableWhenNew?: boolean;
  };
  @Input()
  value: Array<any> = [];
  @Input()
  dataFeatureId: string;

  @Output()
  edit: EventEmitter<any> = new EventEmitter();
  @Output()
  save: EventEmitter<any> = new EventEmitter();
  @Output()
  delete: EventEmitter<any> = new EventEmitter();
  @Output()
  upload: EventEmitter<any> = new EventEmitter();

  elements: Array<any> = [];
  files: Array<any> = [];
  model: any;
  active: boolean = false;
  commands: any;
  visible: boolean;
  target: any;
  fileOutputBag: string;

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @HostBinding('class.disabled')
  @Input()
  get disabled(): boolean {
    return this.ngControl ? !!this.ngControl.disabled : this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  /**
   * Implemented as part of NovoFieldControl.
   * @docs-private
   */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  /** Implemented as part of NovoFieldControl. */
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
  }

  protected _name: string = this._uniqueId;
  protected _value: boolean = false;
  protected _required: boolean = false;
  protected _disabled: boolean = false;
  protected _placeholder: string;

  constructor(
    private element: ElementRef,
    public labels: NovoLabelService,
    private dragula: NovoDragulaService,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() @Self() _ngControl: NgControl,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl);
    if (_ngControl) {
      _ngControl.valueAccessor = this;
    }
    this.commands = {
      dragenter: this.dragEnterHandler.bind(this),
      dragleave: this.dragLeaveHandler.bind(this),
      dragover: this.dragOverHandler.bind(this),
      drop: this.dropHandler.bind(this),
    };
  }

  ngOnInit() {
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((type) => {
      this.element.nativeElement.addEventListener(type, this.commands[type]);
    });
    this.updateLayout();
    this.initializeDragula();
    this.setInitialFileList();
    this.dataFeatureId = this.dataFeatureId ? this.dataFeatureId : this.name;
  }

  ngOnDestroy() {
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((type) => {
      this.element.nativeElement.removeEventListener(type, this.commands[type]);
    });
    const dragulaHasFileOutputBag =
      this.dragula.bags.length > 0 && this.dragula.bags.filter((x) => x.name === this.fileOutputBag).length > 0;
    if (dragulaHasFileOutputBag) {
      this.dragula.destroy(this.fileOutputBag);
    }
  }

  updateLayout() {
    this.layoutOptions = Object.assign({}, LAYOUT_DEFAULTS, this.layoutOptions);
    this.insertTemplatesBasedOnLayout();
  }

  insertTemplatesBasedOnLayout() {
    let order;
    switch (this.layoutOptions.order) {
      case 'displayFilesBelow':
        order = ['fileInput', 'fileOutput'];
        break;
      default:
        order = ['fileOutput', 'fileInput'];
    }
    order.forEach((template) => {
      this.container.createEmbeddedView(this[template], 0);
    });
    return order;
  }

  initializeDragula() {
    this.fileOutputBag = `file-output-${this.dragula.bags.length}`;
    this.dragula.setOptions(this.fileOutputBag, {
      moves: (el, container, handle) => {
        return this.layoutOptions.draggable;
      },
    });
  }

  setInitialFileList() {
    if (this.value) {
      this.files = this.value;
    }
  }

  dragEnterHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    this.target = event.target;
    this.active = true;
  }

  dragLeaveHandler(event) {
    event.preventDefault();
    if (this.target === event.target) {
      this.active = false;
    }
  }

  dragOverHandler(event) {
    event.preventDefault();
    // no-op
  }

  dropHandler(event) {
    event.preventDefault();
    this.visible = false;
    if (event.dataTransfer.types[0] !== 'Files') {
      return;
    }
    const options: any = this.layoutOptions;
    const filelist = Array.from(event.dataTransfer.files);
    if (options.customActions) {
      this.upload.emit(this.multiple ? filelist : [filelist[0]]);
    } else {
      this.process(this.multiple ? filelist : [filelist[0]]);
    }
    this.active = false;
  }

  writeValue(model: any): void {
    this.model = model;
    // If model is cleared programmatically (E.g. form.patchValue({file: undefined})), empty file list.
    this.files = !model ? [] : this.files;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  check(event) {
    this.process(Array.from(event.target.files));
    // After processing file upload, clear input element value. Allows for delete and upload of same file.
    event.target.value = '';
  }

  validate(files): boolean {
    let passedValidation = true;
    if (this.layoutOptions.customValidation) {
      this.layoutOptions.customValidation
        .filter((validation) => validation.action === 'upload')
        .forEach((uploadValidation) => {
          passedValidation = uploadValidation.fn(files) && passedValidation;
        });
    }
    return passedValidation;
  }

  process(filelist) {
    if (this.validate(filelist)) {
      Promise.all(filelist.map((file) => this.readFile(file))).then((files) => {
        if (this.multiple) {
          this.files.push(...files);
        } else {
          this.files = files;
        }
        this.model = this.files;
        this.onModelChange(this.model);
      });
    }
  }

  download(file) {
    window.open(file.dataURL, '_blank');
  }

  remove(file) {
    this.files.splice(
      this.files.findIndex((f) => f.name === file.name && f.size === file.size),
      1,
    );
    this.model = this.files;
    this.onModelChange(this.model);
  }

  readFile(file) {
    return new NovoFile(file).read();
  }

  customEdit(file) {
    this.edit.emit(file);
  }

  customSave(file) {
    this.save.emit(file);
  }

  customDelete(file) {
    this.delete.emit(file);
  }

  customCheck(event) {
    this.upload.emit(event);
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  /** Whether any radio buttons has focus. */
  get focused(): boolean {
    // todo: implement this.
    return false;
  }

  /** Implemented as part of NovoFieldControl. */
  get empty(): boolean {
    return this.value === null;
  }

  /** Implemented as part of NovoFieldControl. */
  get shouldLabelFloat(): boolean {
    return !this.empty || this.focused;
  }

  /** Implemented as part of NovoFieldControl. */
  setDescribedByIds(ids: string[]) {
    this._ariaDescribedby = ids.join(' ');
  }

  /** Implemented as part of NovoFieldControl. */
  onContainerClick(event: MouseEvent) {
    this.focus();
  }

  /**
   * Focuses the first non-disabled chip in this chip list, or the associated input when there
   * are no eligible chips.
   */
  focus(options?: FocusOptions): void {
    if (this.disabled) {
      return;
    }
    // TODO
  }
}
