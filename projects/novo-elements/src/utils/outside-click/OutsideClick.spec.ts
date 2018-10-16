// NG2
import { ElementRef } from '@angular/core';
// APP
import { OutsideClick } from './OutsideClick';

describe('Util: OutsideClick', () => {
  let outsideClick;
  let mockElement: ElementRef = new ElementRef(document.createElement('div'));
  let mockEvent;

  beforeEach(() => {
    outsideClick = new OutsideClick(mockElement);
    mockEvent = new Event('click');
  });

  it('should has default values', () => {
    expect(outsideClick.active).toEqual(false);
    expect(outsideClick.element).toEqual(mockElement);
  });

  describe('Method: toggleActive(event,forceValue)', () => {
    it('should be defined', () => {
      expect(outsideClick.toggleActive).toBeDefined();
    });

    it('should toggle the active property of outsideClick', () => {
      outsideClick.toggleActive(mockEvent);
      expect(outsideClick.active).toBe(true);
      outsideClick.toggleActive(mockEvent);
      expect(outsideClick.active).toBe(false);
    });

    it('should set active to force value if passed', () => {
      outsideClick.toggleActive(mockEvent, false);
      expect(outsideClick.active).toBe(false);
      outsideClick.toggleActive(mockEvent, true);
      expect(outsideClick.active).toBe(true);
    });
  });

  describe('Method: handleOutsideClick(event)', () => {
    it('should be defined', () => {
      expect(outsideClick.handleOutsideClick).toBeDefined();
    });
  });
});
