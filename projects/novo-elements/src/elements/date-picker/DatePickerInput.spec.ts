// NG2
import { EventEmitter } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { TAB, ENTER, ESCAPE } from '@angular/cdk/keycodes';
// App
import { NovoDatePickerInputElement } from './DatePickerInput';
import { NovoLabelService } from '../../services/novo-label-service';
import { NovoDatePickerModule } from './DatePicker.module';
import { DateFormatService } from '../../services/date-format/DateFormat';

describe('Elements: NovoDatePickerInputElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [
      //     NovoDatePickerInputElement
      // ],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }, DateFormatService],
      imports: [NovoDatePickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoDatePickerInputElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: openPanel()', () => {
    it('should open the Calendar picker panel if the field has not been disabled', () => {
      // Arrange
      component.disabled = false;
      spyOn(component.overlay, 'openPanel');
      // Act
      component.openPanel();
      // Assert
      expect(component.overlay.openPanel).toHaveBeenCalled();
    });

    it('should not open the Calendar picker panel if the field has been disabled', () => {
      // Arrange
      component.disabled = true;
      spyOn(component.overlay, 'openPanel');
      // Act
      component.openPanel();
      // Assert
      expect(component.overlay.openPanel).not.toHaveBeenCalled();
    });
  });

  describe('Method: _handleKeydown(event)', () => {
    let keyboardEvent: Pick<KeyboardEvent, 'keyCode' | 'target' | 'stopPropagation'>;
    beforeEach(async () => {
      keyboardEvent = { keyCode: undefined, target: new EventTarget(), stopPropagation: () => {} };
      spyOn(component, 'openPanel').and.callFake(() => {});
      spyOn(component, 'closePanel').and.callFake(() => {});
      spyOn(component, 'formatDate');
      spyOn(keyboardEvent, 'stopPropagation');
    });

    it('should call formatDate if the Enter key has been pressed', () => {
      // Arrange
      const enterEvent: Pick<KeyboardEvent, 'keyCode' | 'target' | 'stopPropagation'> = {
        ...keyboardEvent,
        keyCode: ENTER,
      };
      // Act
      component._handleKeydown(enterEvent);
      // Assert
      expect(component.formatDate).toHaveBeenCalled();
      expect(enterEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should call formatDate if the Tab key has been pressed', () => {
      // Arrange
      const tabEvent: Pick<KeyboardEvent, 'keyCode' | 'target' | 'stopPropagation'> = {
        ...keyboardEvent,
        keyCode: TAB,
      };
      // Act
      component._handleKeydown(tabEvent);
      // Assert
      expect(component.formatDate).toHaveBeenCalled();
      expect(tabEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should call closePanel if the Tab key has been pressed', () => {
      // Arrange
      const tabEvent: Pick<KeyboardEvent, 'keyCode' | 'target' | 'stopPropagation'> = {
        ...keyboardEvent,
        keyCode: TAB,
      };
      // Act
      component._handleKeydown(tabEvent);
      // Assert
      expect(component.closePanel).toHaveBeenCalled();
      expect(tabEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should set value that appears in the field to the value it had before edits were made if the Escape key has been pressed', () => {
      // Arrange
      const escapeEvent: Pick<KeyboardEvent, 'keyCode' | 'target' | 'stopPropagation'> = {
        ...keyboardEvent,
        keyCode: ESCAPE,
      };
      component.formattedValue = 'Test1';
      component.currentValue = 'Test2';
      // Act
      component._handleKeydown(escapeEvent);
      // Assert
      expect(component.formattedValue).toBe('Test2');
      expect(escapeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should call closePanel if the Escape key has been pressed', () => {
      // Arrange
      const escapeEvent: Pick<KeyboardEvent, 'keyCode' | 'target' | 'stopPropagation'> = {
        ...keyboardEvent,
        keyCode: ESCAPE,
      };
      // Act
      component._handleKeydown(escapeEvent);
      // Assert
      expect(component.closePanel).toHaveBeenCalled();
      expect(escapeEvent.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('Method: _handleBlur()', () => {
    let blurEvent: Pick<FocusEvent, 'type'> = { type: 'blur' };
    it('should reset the value in the field if it is different from the original', () => {
      // Arrange
      spyOn(component.blurEvent, 'emit');
      component.currentValue = 'Test1';
      component.formattedValue = 'Test2';
      // Act
      component._handleBlur(blurEvent);
      // Assert
      expect(component.formattedValue).toBe('Test1');
    });
  });

  describe('Method: _handleFocus()', () => {
    let focusEvent: Pick<FocusEvent, 'type'> = { type: 'focus' };

    it('should set the current value to that which is currently in the field upon focusing', () => {
      // Arrange
      spyOn(component.focusEvent, 'emit');
      spyOn(component, 'openPanel').and.callFake(() => {});
      component.currentValue = 'Test1';
      component.formattedValue = 'Test2';
      // Act
      component._handleFocus(focusEvent);
      // Assert
      expect(component.currentValue).toBe('Test2');
    });
  });

  describe('Method: _setFormValue()', () => {
    it('should set the currentValue and formattedValue to the same upon saving when this.value is defined', () => {
      // Arrange
      component.value = '06/07/2008';
      component.formattedValue = '';
      component.currentValue = '';
      spyOn(component, 'formatDateValue').and.returnValue(component.value);
      // Act
      component._setFormValue(component.value);
      // Assert
      expect(component.currentValue).toBe('06/07/2008');
      expect(component.formattedValue).toBe('06/07/2008');
    });
  });

  describe('Method: formatDate()', () => {
    it('should call parseString from the dateFormatService and then dispatchOnChange.', () => {
      spyOn(component.dateFormatService, 'parseString').and.callThrough();
      spyOn(component, 'dispatchOnChange');
      let mockValue: String = '01/01/2020';
      component.formatDate(mockValue, true);
      expect(component.dateFormatService.parseString).toHaveBeenCalled();
      expect(component.dispatchOnChange).toHaveBeenCalled();
    });
  });
});
