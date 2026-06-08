import { Key } from 'novo-elements/utils';
import { vi } from 'vitest';
import { PlacesListComponent } from './places.component';

describe('Elements: PlacesListComponent', () => {
  let component: PlacesListComponent;

  beforeEach(() => {
    const elmRef: any = { nativeElement: document.createElement('div') };
    const cdr: any = { detectChanges: () => {} };
    component = new PlacesListComponent('browser', elmRef, {} as any, {} as any, cdr);
  });

  describe('Output: matchesUpdated', () => {
    it('should emit the matches when the prediction list updates', () => {
      let emitted: any[];
      component.matchesUpdated.subscribe((matches) => (emitted = matches));
      const predictions = [{ placeId: '1' }, { placeId: '2' }];

      component['updateListItem'](predictions);

      expect(component.matches).toEqual(predictions);
      expect(component.dropdownOpen).toBe(true);
      expect(emitted).toEqual(predictions);
    });

    it('should emit an empty array when there are no predictions', () => {
      let emitted: any[];
      component.matchesUpdated.subscribe((matches) => (emitted = matches));

      component['updateListItem'](null);

      expect(component.matches).toEqual([]);
      expect(emitted).toEqual([]);
    });

    it('should reset the active match when the list refreshes', () => {
      component.activeMatch = { placeId: 'stale' };
      component['updateListItem']([{ placeId: '1' }]);
      expect(component.activeMatch).toBeUndefined();
    });
  });

  describe('Method: onKeyDown()', () => {
    it('should NOT select on Enter when no prediction is highlighted', () => {
      const selectSpy = vi.spyOn(component, 'selectMatch');
      component.dropdownOpen = true;
      component.activeMatch = undefined;
      expect(() => component.onKeyDown({ key: Key.Enter } as KeyboardEvent)).not.toThrow();
      expect(selectSpy).not.toHaveBeenCalled();
    });

    it('should select on Enter when a prediction is highlighted', () => {
      const selectSpy = vi.spyOn(component, 'selectMatch').mockImplementation(() => {});
      component.dropdownOpen = true;
      component.activeMatch = { placeId: '1' };
      component.onKeyDown({ key: Key.Enter } as KeyboardEvent);
      expect(selectSpy).toHaveBeenCalledWith({ placeId: '1' });
    });
  });
});
