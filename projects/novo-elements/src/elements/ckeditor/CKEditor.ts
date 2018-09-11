// NG2
import { Component, Input, Output, ViewChild, EventEmitter, NgZone, forwardRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// Value accessor for the component (supports ngModel)
const CKEDITOR_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoCKEditorElement),
  multi: true,
};

declare var CKEDITOR: any;

/**
 * CKEditor component
 * Usage :
 *  <novo-editor [(ngModel)]="data" [config]="{...}" debounce="500"></novo-editor>
 */
@Component({
  selector: 'novo-editor',
  providers: [CKEDITOR_CONTROL_VALUE_ACCESSOR],
  template: '<textarea [name]="name" [id]="name" #host></textarea>',
})
export class NovoCKEditorElement implements OnDestroy, AfterViewInit, ControlValueAccessor {
  @Input()
  config;
  @Input()
  debounce;
  @Input()
  name;
  @Input()
  minimal;
  @Input()
  startupFocus: boolean = false;
  @Input()
  fileBrowserImageUploadUrl: string = '';
  @Input()
  disabled: boolean = false;

  @Output()
  change = new EventEmitter();
  @Output()
  ready = new EventEmitter();
  @Output()
  blur = new EventEmitter();
  @Output()
  focus = new EventEmitter();
  @Output()
  paste = new EventEmitter();
  @Output()
  loaded = new EventEmitter();
  @ViewChild('host')
  host;

  _value: string = '';
  instance;
  debounceTimeout;

  constructor(private zone: NgZone) {}

  get value() {
    return this._value;
  }

  @Input()
  set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  ngOnDestroy() {
    if (this.instance) {
      this.instance.focusManager.blur(true); // Remove focus from editor
      setTimeout(() => {
        this.instance.removeAllListeners();
        CKEDITOR.instances[this.instance.name].destroy();
        this.instance.destroy();
        this.instance = null;
      });
    }
  }

  ngAfterViewInit() {
    let config = this.config || this.getBaseConfig();
    if (this.startupFocus) {
      config.startupFocus = true;
    }
    if (this.disabled) {
      config.readOnly = true;
    }
    this.ckeditorInit(config);
  }

  updateValue(value) {
    this.zone.run(() => {
      this.value = value;
      this.onChange(value);
      this.onTouched();
      this.change.emit(value);
    });
  }

  ckeditorInit(config) {
    if (!CKEDITOR) {
      console.error('Make sure to include CKEditor sources in your dependencies!');
      return;
    }

    // CKEditor replace textarea
    this.instance = CKEDITOR.replace(this.host.nativeElement, config);

    // Set initial value
    this.instance.setData(this.value);

    // listen for instanceReady event
    this.instance.on('instanceReady', (evt) => {
      // send the evt to the EventEmitter
      this.ready.emit(evt);
    });

    // CKEditor change event
    this.instance.on('change', () => {
      this.onTouched();
      let value = this.instance.getData();

      // Debounce update
      if (this.debounce) {
        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
          this.updateValue(value);
          this.debounceTimeout = null;
        }, parseInt(this.debounce));
      } else {
        this.updateValue(value);
      }
    });
    this.instance.on('blur', (event) => {
      this.blur.emit(event);
    });
    this.instance.on('focus', (event) => {
      this.focus.emit(event);
    });
    this.instance.on('paste', (event) => {
      this.paste.emit(event);
    });
    this.instance.on('loaded', (event) => {
      this.loaded.emit(event);
    });
  }

  getBaseConfig() {
    const baseConfig = {
      enterMode: CKEDITOR.ENTER_BR,
      shiftEnterMode: CKEDITOR.ENTER_P,
      disableNativeSpellChecker: false,
      removePlugins: 'liststyle,tabletools,contextmenu', // allows browser based spell checking
      extraAllowedContent: '*(*){*};table tbody tr td th[*];', // allows class names (*) and inline styles {*} for all and attributes [*] on tables
      font_names:
        'Arial/Arial, Helvetica, sans-serif;' +
        'Calibri/Calibri, Verdana, Geneva, sans-serif;' +
        'Comic Sans MS/Comic Sans MS, cursive;' +
        'Courier New/Courier New, Courier, monospace;' +
        'Georgia/Georgia, serif;' +
        'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
        'Tahoma/Tahoma, Geneva, sans-serif;' +
        'Times New Roman/Times New Roman, Times, serif;' +
        'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
        'Verdana/Verdana, Geneva, sans-serif',
    };

    const minimalConfig = {
      toolbar: [
        {
          name: 'basicstyles',
          items: [
            'Styles',
            'FontSize',
            'Bold',
            'Italic',
            'Underline',
            'TextColor',
            '-',
            'NumberedList',
            'BulletedList',
            'Outdent',
            'Indent',
            'Link',
          ],
        },
      ],
    };

    const extendedConfig = {
      toolbar: [
        { name: 'clipboard', items: ['Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo'] },
        {
          name: 'paragraph',
          items: [
            'NumberedList',
            'BulletedList',
            'Outdent',
            'Indent',
            'Blockquote',
            'JustifyLeft',
            'JustifyCenter',
            'JustifyRight',
            'JustifyBlock',
            'BidiLtr',
            'BidiRtl',
          ],
        },
        { name: 'links', items: ['Link'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
        { name: 'tools', items: ['Maximize', 'Source'] },
        '/', // line break
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
      ],
      filebrowserImageUploadUrl: this.fileBrowserImageUploadUrl,
    };

    return Object.assign(baseConfig, this.minimal ? minimalConfig : extendedConfig);
  }

  writeValue(value) {
    this._value = value;
    if (this.instance) {
      this.instance.setData(value);
    }
  }

  onChange(value?: any) {}

  onTouched(event?) {}

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    CKEDITOR.instances[this.instance.name].setReadOnly(disabled);
  }

  insertText(text) {
    let trimmedText = text.trim();
    this.instance.insertText(trimmedText);
  }
}
