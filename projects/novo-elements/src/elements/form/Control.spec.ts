// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, DebugElement, ElementRef, ErrorHandler, EventEmitter, Inject, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DefaultImaskFactory, IMASK_FACTORY, IMaskModule } from 'angular-imask';
import { NovoElementsModule } from 'novo-elements';
import { DateFormatService, NovoLabelService, NovoTemplateService, OptionsService } from 'novo-elements/services';
import { NovoTemplate } from '../common/novo-template/novo-template.directive';
// App
import { NovoAutoSize, NovoControlElement } from './Control';
import { NovoControlTemplates } from './ControlTemplates';
import { FieldInteractionApi } from './FieldInteractionApi';
import { NovoFormGroup } from './NovoFormGroup';
import { AddressControl, BaseControl, CheckListControl, CheckboxControl, CustomControl, DateControl, PickerControl, TextBoxControl } from './controls';
import { FormUtils } from './utils/FormUtils';

jest.mock('angular-imask');

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
    const component = new NovoControlElement(mockElement, null, null, null as any, null, null as any, 'fr-FR');
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

// While this is a laborious thing to set up individually on tests, it could be worthwhile to find a way to automatically apply this to other fixtures
class ErrorNet extends ErrorHandler {

  handleError(error: any): void {
    super.handleError(error);
    fail(`Hit error handler: ${error.stack}`);
  }
}

@Component({
  selector: 'novo-control-templates-test',
  template: `
  <novo-control-templates></novo-control-templates>
  <div *ngIf="templatesReady">
    <novo-control (change)="change.emit($event)" (focus)="focus.emit($event)" (blur)="blur.emit($event)" [form]="form" [control]="control"></novo-control>
  </div>
  `,
  providers: [{
    provide: ErrorHandler,
    useClass: ErrorNet
  }]
})
class TestComponent2 implements OnInit {
  templatesReady = false;
  form: NovoFormGroup;

  change = new EventEmitter<any>();
  focus = new EventEmitter<FocusEvent>();
  blur = new EventEmitter<Event>();

  control: BaseControl;
  
  constructor(private formUtils: FormUtils, @Inject(ErrorHandler) private net: ErrorNet) { }

  ngOnInit() {
    this.form = this.formUtils.toFormGroup([this.control]);
  }
}

describe('Novo Control with Templates', () => {
  let fixture: ComponentFixture<TestComponent2>;
  let testComponent: TestComponent2;
  let component: NovoControlElement;

  const fieldInteractionApiStub = { form: {}, currentKey: {} };

  beforeEach(async () => {
    try {
      await TestBed.configureTestingModule({
        imports: [OverlayModule, NovoElementsModule, IMaskModule],
        declarations: [TestComponent2, NovoControlElement, NovoControlTemplates, NovoTemplate],
        providers: [NovoTemplateService, FormUtils, NovoLabelService, OptionsService, DateFormatService,
          {
            provide: FieldInteractionApi,
            useValue: fieldInteractionApiStub
          },
          {
            provide: ErrorHandler,
            useClass: ErrorNet
          }
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(TestComponent2);
      testComponent = fixture.debugElement.componentInstance;
    } catch(err) {
      debugger;
    }
  });

  function makeControl(control: BaseControl) {
    try {
      testComponent.control = control;
      fixture.detectChanges();
      testComponent.templatesReady = true;
      fixture.detectChanges();
      component = fixture.debugElement.query(By.directive(NovoControlElement)).componentInstance;
      // Temp fix for a Zone.js bug: ngAfterContentInit has already run, but it used an incorrect zone setup, and does not run registered timeouts on the next tick.
      // Calling ngAfterContentInit directly, from this zone context, causes it to run fine, but doesn't match browser execution flow.
      // In the case of this test, we won't have harm in running it twice, but we are in need of a fix that correctly runs these.
      component.ngAfterContentInit();
      tick();
      fixture.detectChanges();
    } catch(err) {
      console.error(err);
      fail('could not set up Control fixture');
    }
  }

  describe('Text template', () => {
    let inputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new TextBoxControl({ key: 'text', label: 'Text Box'}));
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

  describe('Text template - Maxlength', () => {
    let inputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new TextBoxControl({ key: 'text', label: 'Text Box', maxlength: 20 }));
      inputDebug = fixture.debugElement.query(By.css('input'));
    }));

    it('should prevent changes beyond maxlength', () => {
      expect(inputDebug.query(By.css('.error-text'))).toBeFalsy();
      const changeEvent: any = { target: inputDebug.nativeElement };
      inputDebug.nativeElement.value = 'this string is over 20 characters long';
      inputDebug.triggerEventHandler('focus', {});
      inputDebug.triggerEventHandler('input', changeEvent);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.error-text'))).toBeTruthy();
    });
  });

  describe('Text template - Mask', () => {
    let inputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new TextBoxControl({
        key: 'text',
        label: 'Text Box',
        maskOptions: {
          mask: /1?2?3?4?5?/,
          keepCharPositions: true,
          guide: true
        },
        textMaskEnabled: true
      }));
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
      makeControl(new PickerControl({
        key: 'chips',
        label: 'Chips Picker',
        multiple: true,
        config: {
          options: ['a', 'b', 'c']
        }
      }));
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

  describe('DatePicker Control', () => {
    let datePickerDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new DateControl({
        key: 'datetime',
        label: 'Date picker',
      }));
      datePickerDebug = fixture.debugElement.query(By.css('novo-date-picker-input'));
    }));
    
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = new Date();
      datePickerDebug.triggerEventHandler('changeEvent', changeEvent)
      expect(lastChange).toEqual(changeEvent);
    });
  });

  // address does not emit its change event. This might be a bug.
  xdescribe('Address Control', () => {
    let addressDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new AddressControl({
        key: 'address',
        label: 'Address entry',
      }));
      addressDebug = fixture.debugElement.query(By.css('novo-address'));
    }));
    
    it('should receive change event?', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = '123 Fake St';
      addressDebug.triggerEventHandler('change', changeEvent)
      expect(lastChange).toEqual(changeEvent);
    });
  });

  // checkbox does not emit its change event. This might be a bug.
  xdescribe('Checkbox Control', () => {
    let checkboxDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new CheckboxControl({
        key: 'checkbox',
        label: 'True/False',
      }));
      checkboxDebug = fixture.debugElement.query(By.css('novo-checkbox'));
    }));
    
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = true;
      checkboxDebug.triggerEventHandler('change', changeEvent)
      expect(lastChange).toEqual(changeEvent);
    });
  });

  describe('Checklist Control', () => {
    let checklistDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new CheckListControl({
        key: 'checkbox',
        label: 'To Do',
      }));
      checklistDebug = fixture.debugElement.query(By.css('novo-check-list'));
    }));
    
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = { selected: ['tom', 'dick', 'harry']};
      checklistDebug.triggerEventHandler('onSelect', changeEvent)
      expect(lastChange).toEqual(changeEvent);
    });
  });

  describe('Native Input Control', () => {
    let nativeInputDebug: DebugElement;
    beforeEach(fakeAsync(() => {
      makeControl(new CustomControl({
        key: 'native-input',
        template: 'native-input',
        type: 'native-input',
        maxlength: 20
      }));
      nativeInputDebug = fixture.debugElement.query(By.css('input'));
    }));
    
    it('should receive change event', () => {
      let lastChange: any;
      testComponent.change.subscribe(c => lastChange = c);
      expect(lastChange).toBeFalsy();
      const changeEvent: any = { type: 'input', target: nativeInputDebug.nativeElement };
      nativeInputDebug.nativeElement.value = 'changed';
      nativeInputDebug.triggerEventHandler('input', changeEvent);
      expect(lastChange).toEqual(changeEvent);
    });
  });
});