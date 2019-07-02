// NG2
import {ChangeDetectorRef, Component, ElementRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// App
import { NovoAutoSize } from './Control';
import { NovoControlElement } from './Control';
import {NovoFormControl} from "./NovoFormControl";
import {EntityPickerResult, FieldInteractionApi, NovoLabelService, NovoListElement, NovoTemplateService} from "../..";
import {NovoLoadingElement} from "../loading/Loading";
import {
  NovoItemAvatarElement,
  NovoItemContentElement,
  NovoItemHeaderElement,
  NovoItemTitleElement,
  NovoListItemElement
} from "../list/List";
import {DateFormatService} from "../../services/date-format/DateFormat";

@Component({
  selector: 'novo-auto-size-test-component',
  template: `
        <textarea autosize></textarea>
    `,
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
  let mockElement: ElementRef = new ElementRef(document.createElement('div'));

  it('should set decimal separator based on locale correctly', () => {
    let component = new NovoControlElement(mockElement, null, null, null, null, null, 'fr-FR');
    expect(component.decimalSeparator).toBe('.');
  });
});

@Component({
  template: `
    <div></div>
  `
})
class TestComponent {}
describe("NovoControlElement", () => {
  let component: NovoControlElement;
  let fixture: ComponentFixture<NovoControlElement>;
  beforeEach(() => {
    const elementRefStub = {
      nativeElement: { style: { height: {}, minHeight: {} }, scrollHeight: {} }
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
        { provide: NovoTemplateService, useValue: novoTemplateServiceStub }
      ]
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
      controls: [{
        maxLength: 1,
      }],
    };

    // Act
    let testBoolean = component.showCount;

    // Assert
    expect(testBoolean).toEqual(false);
  });

  it('should return true if the field has a MAX_LENGTH property but is not focused', () => {
    // Arrange
    component.control = {
      key: 0,
    };
    component.form = {
      controls: [{
        maxLength: 1,
      }],
    };

    (component as any)._focused = true;

    // Act
    let testBoolean = component.showCount;

    // Assert
    expect(testBoolean).toEqual(true);
  });
});
