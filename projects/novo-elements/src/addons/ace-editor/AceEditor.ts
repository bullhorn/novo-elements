// NG2
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
// organize-imports-ignore
import * as ace from 'brace';
import 'brace/ext/language_tools.js';
import 'brace/mode/javascript';
import 'brace/theme/chrome';
// APP
import { Helpers, notify } from 'novo-elements/utils';

const ACE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoAceEditor),
  multi: true,
};

/**
 * @deprecated Use NovoCodeEditor instead
 */
@Component({
  selector: 'novo-ace-editor',
  template: '',
  styleUrls: ['./AceEditor.scss'],
  providers: [ACE_VALUE_ACCESSOR],
})
export class NovoAceEditor implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  set theme(theme: any) {
    this.setTheme(theme);
  }

  @Input()
  set options(options: any) {
    this.setOptions(options);
  }

  @Input()
  set mode(mode: any) {
    this.setMode(mode);
  }

  @Input()
  name: string;
  @Output()
  blur = new EventEmitter();
  @Output()
  focus = new EventEmitter();

  private _options: any = {
    showPrintMargin: false,
    displayIndentGuides: true,
  };
  private _theme: string = 'chrome';
  private _mode: string = 'javascript';

  private text: string = '';
  private oldText: string;
  private editor: any;

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef) {
    notify('[Deprecated]: The ace editor component is deprecated. Please migrate to novo-code-editor!');
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  ngOnInit() {
    this.initializeEditor();
    this.initializeOptions();
    this.initializeEvents();
  }

  private initializeEditor() {
    const el = this.elementRef.nativeElement;
    this.editor = ace.edit(el);
    this.editor.$blockScrolling = Infinity;
  }

  private initializeOptions() {
    this.setOptions(this._options || {});
    this.setTheme(this._theme);
    this.setMode(this._mode);
  }

  private initializeEvents() {
    this.editor.on('focus', (event) => this.focus.emit(event));
    this.editor.on('blur', (event) => this.focus.emit(event));
    this.editor.on('change', () => this.updateText());
    this.editor.on('paste', () => this.updateText());
  }

  private updateText() {
    const newVal = this.editor.getValue();

    if (newVal === this.oldText) {
      return;
    }

    this.text = newVal;
    this.onChange(newVal);
    this.oldText = newVal;
  }

  private setText(text: string) {
    if (Helpers.isBlank(text)) {
      text = '';
    }
    if (this.text !== text) {
      this.text = text;
      this.editor.setValue(text);
      this.onChange(text);
      this.editor.clearSelection();
    }
  }

  private setOptions(options: any) {
    this._options = options;
    this.editor.setOptions(options || {});
  }

  private setTheme(theme: string) {
    this._theme = theme;
    this.editor.setTheme(`ace/theme/${theme}`);
  }

  private setMode(mode: any) {
    this._mode = mode;
    this.editor.getSession().setMode(`ace/mode/${this._mode}`);
  }

  writeValue(value: any) {
    this.setText(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
