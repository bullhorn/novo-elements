// NG2
import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { Annotation, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';

// organize-imports-ignore

// APP
const CODE_EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NovoCodeEditor),
  multi: true,
};

// CodeMirror transaction annotation to show changes that came in through writeValue (FormControl value) as opposed to UI editing
const FormControlCodeWriter = Annotation.define();

// (This is a replacement for the "novo-ace-editor". Notably, we are no longer naming it based on the underlying component. It is possible, in the future,
// we decide there is another code editing component that better fits our use case - in which situation we should replace the implementation here, but keep its name)
@Component({
  selector: 'novo-code-editor',
  template: '',
  styleUrls: ['./CodeEditor.scss'],
  providers: [CODE_EDITOR_VALUE_ACCESSOR]
})
export class NovoCodeEditor implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
  @Input()
  theme: string = 'default';

  @Input()
  lineNumbers = true;

  @Input()
  name: string;

  @Output()
  blur = new EventEmitter();
  @Output()
  focus = new EventEmitter();

  private changed = new EventEmitter<string>();

  @Input() mode: string = 'javascript';

  @ViewChild('editorRoot')
  editorRoot: ElementRef<HTMLElement>;

  editorView: EditorView;
  initialValue = '';

  @HostBinding('class.editor-disabled')
  private disabled = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }

  ngAfterViewInit(): void {
    this.createEditorView();
  }

  createEditorView(): void {
    const extensions = [
      basicSetup,
      keymap.of(defaultKeymap)
    ];
    if (this.mode === 'javascript') {
      extensions.push(javascript());
    }
    const initialEditorState = EditorState.create({
      doc: this.initialValue,
      extensions,
    });
    this.editorView = new EditorView({
      state: initialEditorState,
      parent: this.elementRef.nativeElement,
      dispatch: (transaction, view) => {
        // Prevent changes if the form is disabled - unless the change came from writeValue function
        if (transaction.annotation(FormControlCodeWriter) || !(this.disabled && transaction.docChanged)) {
          view.update([transaction]);
        }
        if (transaction.docChanged) {
          this.changed.emit(view.state.doc.toString());
        }
      }
    });
  }

  @HostListener('focus')
  onFocus() {
    this.focus.emit();
  }

  @HostListener('blur')
  onBlur() {
    this.blur.emit();
  }

  // ControlValueAccessor forward implementation
  writeValue(value: any) {
    if (this.editorView) {
      this.editorView.dispatch({
        changes: {
          from: 0,
          to: this.editorView.state.doc.length,
          insert: value,
        },
        annotations: FormControlCodeWriter.of({}),
      });
    } else if (value != null) {
      this.initialValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.changed.subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.blur.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
