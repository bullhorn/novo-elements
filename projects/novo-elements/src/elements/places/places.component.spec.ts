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

  describe('Method: getPrimaryText()', () => {
    it('should use the REST primaryText when present', () => {
      expect(component.getPrimaryText({ primaryText: 'Acme HQ' })).toEqual('Acme HQ');
    });

    it('should use the Google structured_formatting.main_text', () => {
      expect(component.getPrimaryText({ structured_formatting: { main_text: '100 Summer St' } })).toEqual('100 Summer St');
    });

    it('should fall back to displayAddress, then description', () => {
      expect(component.getPrimaryText({ displayAddress: '100 Summer St, Boston' })).toEqual('100 Summer St, Boston');
      expect(component.getPrimaryText({ description: '100 Summer St, Boston, MA' })).toEqual('100 Summer St, Boston, MA');
    });

    it('should prefer the REST primaryText over the Google format', () => {
      expect(component.getPrimaryText({ primaryText: 'REST', structured_formatting: { main_text: 'Google' } })).toEqual('REST');
    });

    it('should return an empty string when nothing matches', () => {
      expect(component.getPrimaryText({})).toEqual('');
    });
  });

  describe('Method: getSecondaryText()', () => {
    it('should use the REST secondaryText when present', () => {
      expect(component.getSecondaryText({ secondaryText: 'Boston, MA' })).toEqual('Boston, MA');
    });

    it('should use the Google structured_formatting.secondary_text', () => {
      expect(component.getSecondaryText({ structured_formatting: { secondary_text: 'Boston, MA, USA' } })).toEqual('Boston, MA, USA');
    });

    it('should prefer the REST secondaryText over the Google format', () => {
      expect(component.getSecondaryText({ secondaryText: 'REST', structured_formatting: { secondary_text: 'Google' } })).toEqual('REST');
    });

    it('should return an empty string when nothing matches', () => {
      expect(component.getSecondaryText({})).toEqual('');
    });
  });

  describe('Method: getPlaceLocationInfo()', () => {
    it('should resolve Google details using the camelCase placeId', () => {
      const getGeoPlaceDetail = vi.fn().mockResolvedValue(null);
      component['_googlePlacesService'] = { getGeoPlaceDetail } as any;
      component.settings = { useGoogleGeoApi: true } as any;
      component['getPlaceLocationInfo']({ placeId: 'abc' });
      expect(getGeoPlaceDetail).toHaveBeenCalledWith('abc');
    });

    it('should fall back to the snake_case place_id', () => {
      const getGeoPlaceDetail = vi.fn().mockResolvedValue(null);
      component['_googlePlacesService'] = { getGeoPlaceDetail } as any;
      component.settings = { useGoogleGeoApi: true } as any;
      component['getPlaceLocationInfo']({ place_id: 'xyz' });
      expect(getGeoPlaceDetail).toHaveBeenCalledWith('xyz');
    });

    it('should use the REST endpoint with the placeId when useGoogleGeoApi is false', () => {
      const getPlaceDetails = vi.fn().mockResolvedValue(null);
      component['_googlePlacesService'] = { getPlaceDetails } as any;
      component.settings = { useGoogleGeoApi: false, geoLocDetailServerUrl: 'https://api/detail' } as any;
      component['getPlaceLocationInfo']({ placeId: 'abc' });
      expect(getPlaceDetails).toHaveBeenCalledWith('https://api/detail', 'abc');
    });
  });
});
