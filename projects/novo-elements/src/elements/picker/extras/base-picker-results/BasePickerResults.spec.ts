// NG2
import { ElementRef, ChangeDetectorRef } from '@angular/core';
// App
import { BasePickerResults } from './BasePickerResults';

class MockCDR {
  markForCheck() {}
  detach() {}
  detectChanges() {}
  checkNoChanges() {}
  reattach() {}
}

describe('Elements: BasePickerResults', () => {
  let elementRef = new ElementRef(document.createElement('div'));
  let component = new BasePickerResults(elementRef, new MockCDR());

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('Method: onScrollDown()', () => {
    it('should be defined.', () => {
      expect(component.onScrollDown).toBeDefined();
      // component.onScrollDown();
    });
  });

  xdescribe('Method: processSearch()', () => {
    it('should be defined.', () => {
      expect(component.processSearch).toBeDefined();
      component.processSearch();
    });
  });

  describe('Method: search()', () => {
    it('should be defined.', () => {
      expect(component.search).toBeDefined();
      // component.search();
    });
  });

  describe('Method: structureArray()', () => {
    it('should be defined.', () => {
      expect(component.structureArray).toBeDefined();
      // component.structureArray();
    });
  });

  describe('Method: filterData()', () => {
    it('should be defined.', () => {
      expect(component.filterData).toBeDefined();
      // component.filterData();
    });
  });

  describe('Method: selectActiveMatch()', () => {
    it('should be defined.', () => {
      jest.spyOn(component, 'selectMatch').mockImplementation(() => {});
      expect(component.selectActiveMatch).toBeDefined();
      component.selectActiveMatch();
    });
    it('should call selectMatch.', () => {
      jest.spyOn(component, 'selectMatch').mockImplementation(() => {});
      component.selectActiveMatch();
      expect(component.selectMatch).toHaveBeenCalled();
    });
  });

  describe('Method: prevActiveMatch()', () => {
    it('should be defined.', () => {
      expect(component.prevActiveMatch).toBeDefined();
      component.prevActiveMatch();
    });
    it('should scroll to active.', () => {
      jest.spyOn(component, 'scrollToActive').mockImplementation(() => {});
      component.prevActiveMatch();
      expect(component.scrollToActive).toHaveBeenCalled();
    });
  });

  describe('Method: nextActiveMatch()', () => {
    it('should be defined.', () => {
      expect(component.nextActiveMatch).toBeDefined();
      component.nextActiveMatch();
    });
  });

  describe('Method: scrollToActive()', () => {
    it('should be defined.', () => {
      expect(component.scrollToActive).toBeDefined();
      component.scrollToActive();
    });
  });

  describe('Method: selectActive()', () => {
    it('should be defined.', () => {
      expect(component.selectActive).toBeDefined();
      // component.selectActive();
    });
  });

  describe('Method: isActive()', () => {
    it('should be defined.', () => {
      expect(component.isActive).toBeDefined();
      // component.isActive();
    });
  });

  describe('Method: selectMatch()', () => {
    it('should be defined.', () => {
      expect(component.selectMatch).toBeDefined();
      component.selectMatch();
    });
  });

  describe('Method: escapeRegexp()', () => {
    it('should be defined.', () => {
      expect(component.escapeRegexp).toBeDefined();
      // component.escapeRegexp();
    });
  });

  describe('Method: highlight()', () => {
    it('should be defined.', () => {
      expect(component.highlight).toBeDefined();
      // component.highlight();
    });
  });

  describe('Method: preselected()', () => {
    it('should be defined.', () => {
      expect(component.preselected).toBeDefined();
      // component.preselected();
    });
  });
});
