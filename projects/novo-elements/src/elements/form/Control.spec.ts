// NG2
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NovoLabelService, NovoTemplateService } from '../../services';
import { DateFormatService } from '../../services/date-format/DateFormat';
// App
import { NovoAutoSize, NovoControlElement } from './Control';
import { FieldInteractionApi } from './FieldInteractionApi';

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
