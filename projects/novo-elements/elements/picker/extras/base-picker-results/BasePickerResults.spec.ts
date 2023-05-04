// NG2
import { ElementRef } from '@angular/core';
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
  const elementRef = new ElementRef(document.createElement('div'));
  const component = new BasePickerResults(elementRef, new MockCDR());

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
      expect(component.selectActiveMatch).toBeDefined();
    });
    it('should call selectMatch.', () => {
      let spy = jest.spyOn(component, 'selectMatch');
      component.selectActiveMatch();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Method: prevActiveMatch()', () => {
    it('should be defined.', () => {
      expect(component.prevActiveMatch).toBeDefined();
      component.prevActiveMatch();
    });
    it('should scroll to active.', () => {
      jest.spyOn(component, 'scrollToActive');
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
    it('should prevent events from bubbling up', () => {
      const mockEvent: any = {
        stopPropagation: jest.fn(() => true),
        preventDefault: jest.fn(() => true),
      };
      component.selectMatch(mockEvent);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
    it('should set value', () => {
      component.parent = {};
      component.activeMatch = 'Stuff';
      component.selectMatch();
      expect(component.parent.value).toEqual('Stuff');
    });
    it('should handle closeOnSelect', () => {
      component.parent = {
        closeOnSelect: true,
        hideResults: jest.fn(() => true),
      };
      component.activeMatch = 'Stuff';
      component.selectMatch();
      expect(component.parent.hideResults).toHaveBeenCalled();
    });
  });

  describe('Method: escapeRegexp()', () => {
    it('should be defined.', () => {
      expect(component.escapeRegexp).toBeDefined();
      // component.escapeRegexp();
    });
  });

  describe('Method: highlight(match, query)', () => {
    it('should insert strong tags where matching occurs', () => {
      expect(component.highlight('Testing stuff...', 'stuff ')).toEqual('Testing <strong>stuff</strong>...');
    });
  });

  describe('Method: preselected()', () => {
    beforeAll(() => {
      component.config = {
        preselected: undefined,
      };
    });
    it('should be defined.', () => {
      expect(component.preselected).toBeDefined();
      // component.preselected();
    });
    it('should match by id when applicable', () => {
      component.selected = [
        { id: 1, value: 'test0' },
        { id: 2, value: 'test1' },
      ];
      expect(component.preselected({ id: 1, value: 'test0' })).toEqual(true);
      expect(component.preselected({ id: 5, value: 'not a match' })).toEqual(false);
    });
    it('should match by the nested value property when an object', () => {
      component.selected = [
        { id: 1, value: { value: 'test0' } },
        { id: 2, value: { value: 'test1' } },
      ];
      expect(component.preselected({ value: 'test0' })).toEqual(true);
      expect(component.preselected({ value: 'not a match' })).toEqual(false);
    });
    it('should match by the value property when applicable', () => {
      component.selected = [
        { id: 1, value: 'test0' },
        { id: 2, value: 'test1' },
      ];
      expect(component.preselected({ value: 'test0' })).toEqual(true);
      expect(component.preselected({ value: 'not a match' })).toEqual(false);
    });
    it('should use custom preselect when applicable', () => {
      component.config.preselected = (match, item) => {
        return match.testVal === item.testVal;
      };
      component.selected = [
        { id: 1, testVal: 'test0' },
        { id: 2, testVal: 'test1' },
      ];
      expect(component.preselected({ testVal: 'test0' })).toEqual(true);
      expect(component.preselected({ testVal: 'not a match' })).toEqual(false);
    });
  });
});
