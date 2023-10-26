// NG2
import { FocusKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { CanUpdateErrorStateCtor, ErrorStateMatcher, mixinErrorState } from 'novo-elements/elements/common';
import { NovoFieldControl } from 'novo-elements/elements/field';
import { GlobalRef, NovoLabelService } from 'novo-elements/services';
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
  templateUrl: './FileInput.html',
  styleUrls: ['./FileInput.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NovoFileInputElement extends NovoFileInputMixins implements NovoFieldControl<any>, ControlValueAccessor, OnInit {
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
    customActions?: boolean;
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

  files: NovoFile[] = [];
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
    public labels: NovoLabelService,
    private globalRef: GlobalRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() @Self() _ngControl: NgControl,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl);
    if (_ngControl) {
      _ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.updateLayout();
    this.setInitialFileList();
    this.dataFeatureId = this.dataFeatureId ? this.dataFeatureId : this.name;
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

  get outputFileDraggingDisabled(): boolean {
    const draggable = this.layoutOptions?.draggable;
    return draggable != null && !draggable;
  }

  private setInitialFileList() {
    if (this.value) {
      this.files = this.value;
    }
  }

  @HostListener('dragenter', ['$event'])
  dragEnterHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    this.target = event.target;
    this.active = true;
  }

  @HostListener('dragleave', ['$event'])
  dragLeaveHandler(event) {
    event.preventDefault();
    if (this.target === event.target) {
      this.active = false;
    }
  }

  @HostListener('dragover', ['$event'])
  dragOverHandler(event) {
    event.preventDefault();
    // no-op
  }

  @HostListener('drop', ['$event'])
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

  dropOutputItem(event: CdkDragDrop<NovoFile[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
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

  private process(filelist) {
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
    // Using an injected instance of window to make sure that unit tests do not open a new window, even accidentally
    this.globalRef.nativeWindow.open(file.dataURL, '_blank');
  }

  remove(file) {
    this.files.splice(
      this.files.findIndex((f) => f.name === file.name && f.size === file.size),
      1,
    );
    this.model = this.files;
    this.onModelChange(this.model);
  }

  private readFile(file) {
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
