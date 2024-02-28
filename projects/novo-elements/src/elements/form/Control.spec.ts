// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, DebugElement, ElementRef, EventEmitter, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateFormatService, NovoLabelService, NovoTemplateService, OptionsService } from 'novo-elements/services';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
// App
import { NovoAutoSize, NovoControlElement } from './Control';
import { FieldInteractionApi } from './FieldInteractionApi';
import { NovoControlTemplates } from './ControlTemplates';
import { NovoFormGroup } from './NovoFormGroup';
import { FormUtils } from './utils/FormUtils';
import { BaseControl, PickerControl, TextBoxControl } from './controls';
import { last, lastValueFrom } from 'rxjs';

@Component({
  selector: 'novo-auto-size-test-component',
  template: ` <textarea autosize></textarea> `,
  styles: [
    `
      textarea {
        width: 100px;
        height: 20px;
        min-height: 20px;
        padding: 0;
        margin: 0;
        border: 0;
        line-height: 20px;
      }
    `,
  ],
})
class NovoAutoSizeTestComponent {}

describe('Elements: NovoAutoSize', () => {
  describe('Directive:', () => {
    let fixture;
    let component;
    let textarea: HTMLTextAreaElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [OverlayModule],
        declarations: [NovoAutoSize, NovoAutoSizeTestComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(NovoAutoSizeTestComponent);
      component = fixture.debugElement.componentInstance;
      textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    }));

    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
    });

    it('should grow when content is added', () => {
      const initialHeight = textarea.clientHeight;
      textarea.value = 'textarea \n should \n grow'; // Three lines of text
      textarea.dispatchEvent(new Event('input'));
      expect(textarea.clientHeight).toBe(initialHeight * 3);
    });

    it('should shrink when content is removed', () => {
      textarea.value = 'textarea \n should \n shrink'; // Three lines of text
      textarea.dispatchEvent(new Event('input'));
      const initialHeight = textarea.clientHeight;
      textarea.value = '';
      textarea.dispatchEvent(new Event('input'));
      expect(textarea.clientHeight).toBe(initialHeight / 3);
    });
  });
});

describe('Test Localization', () => {
  const mockElement: ElementRef = new ElementRef(document.createElement('div'));

  it('should set decimal separator based on locale correctly', () => {
    const component = new NovoControlElement(mockElement, null, null, null, null, null, 'fr-FR');
    expect(component.locale).toBe('fr-FR');
    expect(component.decimalSeparator).toBe(',');
  });
});

@Component({
  template: ` <div></div> `,
})
class TestComponent {}
describe('NovoControlElement', () => {
  let component: NovoControlElement;
  let fixture: ComponentFixture<NovoControlElement>;
  beforeEach(() => {
    const elementRefStub = {
      nativeElement: { style: { height: {}, minHeight: {} }, scrollHeight: {} },
    };
    const changeDetectorRefStub = { markForCheck: () => ({}) };
    const novoLabelServiceStub = { invalidIntegerInput: {} };
    const dateFormatServiceStub = {};
    const fieldInteractionApiStub = { form: {}, currentKey: {} };
    const novoTemplateServiceStub = { getAll: () => ({}) };
    TestBed.configureTestingModule({
      declarations: [NovoAutoSize, TestComponent, NovoControlElement],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NovoAutoSize,
        { provide: ElementRef, useValue: elementRefStub },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
        { provide: NovoLabelService, useValue: novoLabelServiceStub },
        { provide: DateFormatService, useValue: dateFormatServiceStub },
        { provide: FieldInteractionApi, useValue: fieldInteractionApiStub },
        { provide: NovoTemplateService, useValue: novoTemplateServiceStub },
      ],
    });
    fixture = TestBed.createComponent(NovoControlElement);
    component = fixture.componentInstance;
  });

  it('should return false if the field has a MAX_LENGTH property but is not focused', () => {
    // Arrange
    component.control = {
      key: 0,
    };
    component.form = {
      controls: [
        {
          maxLength: 1,
        },
      ],
    };

    // Act
    const testBoolean = component.showCount;

    // Assert
    expect(testBoolean).toEqual(false);
  });

  it('should return true if the field has a MAX_LENGTH property and is focused', () => {
    // Arrange
    component.control = {
      key: 'newField',
    };
    component.form = {
      controls: {
        newField: {
          maxlength: 10,
          controlType: 'textbox',
        },
      },
    };

    // (component as any)._focused = true;
    (component as any).handleFocus(new FocusEvent('input'));

    // Act
    const testBoolean = component.showCount;

    // Assert
    expect(testBoolean).toEqual(true);
  });

  it('should return false if the field does not have a MAX_LENGTH property and is focused', () => {
    // Arrange
    component.control = {
      key: 'newField',
    };
    component.form = {
      controls: {
        newField: {
          controlType: 'textbox',
        },
      },
    };

    // (component as any)._focused = true;
    (component as any).handleFocus(new FocusEvent('input'));

    // Act
    const testBoolean = component.showCount;

    // Assert
    expect(testBoolean).toEqual(false);
  });

  it('should return false if the controlType of the field is not textbox, picker, or text-area', () => {
    // Arrange
    component.control = {
      key: 'newField',
    };
    component.form = {
      controls: {
        newField: {
          maxlength: 10,
          controlType: 'test',
        },
      },
    };

    // (component as any)._focused = true;
    (component as any).handleFocus(new FocusEvent('input'));

    // Act
    const testBoolean = component.showCount;

    // Assert
    expect(testBoolean).toEqual(false);
  });
});

@Component({
  selector: 'novo-control-templates-test',
  template: `
  <novo-control-templates></novo-control-templates>
  <div *ngIf="templatesReady">
    <novo-control (change)="change.emit($event)" (focus)="focus.emit($event)" (blur)="blur.emit($event)" [form]="form" [control]="control"></novo-control>
  </div>
  `
})
class TestComponent2 implements OnInit {
  templatesReady = false;
  form: NovoFormGroup;

  change = new EventEmitter<any>();
  focus = new EventEmitter<FocusEvent>();
  blur = new EventEmitter<Event>();

  control: BaseControl;
  
  constructor(private formUtils: FormUtils) { }

  ngOnInit() {
    this.form = this.formUtils.toFormGroup([this.control]);
  }
}

xdescribe('Novo Control with Templates', () => {
  let fixture: ComponentFixture<TestComponent2>;
  let testComponent: TestComponent2;
  let component: NovoControlElement;

  const fieldInteractionApiStub = { form: {}, currentKey: {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayModule],
      declarations: [TestComponent2, NovoControlElement, NovoControlTemplates, NovoTemplate],
      providers: [NovoTemplateService, FormUtils, NovoLabelService, OptionsService, DateFormatService,
        {
          provide: FieldInteractionApi,
          useValue: fieldInteractionApiStub
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent2);
    testComponent = fixture.debugElement.componentInstance;
  });

  describe('Text template', () => {
    let inputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      testComponent.control = new TextBoxControl({ key: 'text', label: 'Text Box' });
      fixture.detectChanges();
      testComponent.templatesReady = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      component = fixture.debugElement.query(By.directive(NovoControlElement)).componentInstance;
      inputDebug = fixture.debugElement.query(By.css('input'));
    }));
  

    it('should finish readying templates', inject([NovoTemplateService], (templateService: NovoTemplateService) => {
      expect(Object.keys(templateService.getAll()).length).toBeGreaterThan(20);
      expect(component.loading).toBeFalsy();
    }));


    // TODO: What should the (change) event value be? On text values it appears to be the { KeyboardEvent }. On chips, it will be the value.
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      inputDebug.nativeElement.value = 'text';
      const changeEvent: any = { target: inputDebug.nativeElement };
      inputDebug.triggerEventHandler('input', changeEvent);
      expect(lastChange).toBe(changeEvent);
    });

    it('should receive focus event', () => {
      const focusEvt = { };
      let lastEvt: any;
      testComponent.focus.subscribe(e => lastEvt = e);
      inputDebug.triggerEventHandler('focus', focusEvt);
      expect(lastEvt).toBe(focusEvt);
    });

    it('should receive blur event', () => {
      const blurEvt = { };
      let lastEvt: any;
      testComponent.blur.subscribe(e => lastEvt = e);
      inputDebug.triggerEventHandler('blur', blurEvt);
      expect(lastEvt).toBe(blurEvt);
    });
  });

  describe('Text template - Mask', () => {
    let inputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      testComponent.control = new TextBoxControl({
        key: 'text',
        label: 'Text Box',
        maskOptions: {
          mask: /1?2?3?4?5?/,
          keepCharPositions: true,
          guide: true
        },
        textMaskEnabled: true
      });
      fixture.detectChanges();
      testComponent.templatesReady = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      component = fixture.debugElement.query(By.directive(NovoControlElement)).componentInstance;
      inputDebug = fixture.debugElement.query(By.css('input'));
    }));
  

    it('should finish readying templates', inject([NovoTemplateService], (templateService: NovoTemplateService) => {
      expect(Object.keys(templateService.getAll()).length).toBeGreaterThan(20);
      expect(component.loading).toBeFalsy();
    }));


    it('should ignore native change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      inputDebug.nativeElement.value = 'text';
      const changeEvent: any = { target: inputDebug.nativeElement };
      inputDebug.triggerEventHandler('input', changeEvent);
      expect(lastChange).toBeFalsy();
    });

    it('should respond to imask "accept" event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      inputDebug.nativeElement.value = 'text';
      const changeEvent = '12345';
      inputDebug.triggerEventHandler('accept', changeEvent);
      expect(lastChange).toBe(changeEvent);
    });
  });

  describe('Picker (Multiple) Control', () => {
    let chipsDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      testComponent.control = new PickerControl({
        key: 'chips',
        label: 'Chips Picker',
        multiple: true,
        config: {
          options: ['a', 'b', 'c']
        }
      });
      fixture.detectChanges();
      testComponent.templatesReady = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      chipsDebug = fixture.debugElement.query(By.css('novo-chips'));
    }));

    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      // add 'b' to chips
      const changeEvent: any = { value: ['b'], rawValue: ['a'] };
      chipsDebug.triggerEventHandler('changed', changeEvent);
      expect(lastChange).toEqual(['b']);
    });
  });
});