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
    it('should normalize and emit the matches when the prediction list updates', () => {
      let emitted: any[];
      component.matchesUpdated.subscribe((matches) => (emitted = matches));
      const predictions = [
        { place_id: '1', structured_formatting: { main_text: 'First', secondary_text: 'City A' } },
        { placeId: '2', primaryText: 'Second', secondaryText: 'City B' },
      ];

      component['updateListItem'](predictions);

      expect(component.matches.length).toBe(2);
      expect(component.matches[0]).toMatchObject({ placeId: '1', primaryText: 'First', secondaryText: 'City A' });
      expect(component.matches[1]).toMatchObject({ placeId: '2', primaryText: 'Second', secondaryText: 'City B' });
      expect(component.dropdownOpen).toBe(true);
      expect(emitted).toBe(component.matches);
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

  describe('Method: normalizePrediction()', () => {
    it('should map a Google snake_case prediction into the internal shape', () => {
      const result = component.normalizePrediction({
        place_id: 'g1',
        description: '100 Summer St, Boston, MA, USA',
        structured_formatting: { main_text: '100 Summer St', secondary_text: 'Boston, MA, USA' },
        types: ['street_address'],
      });
      expect(result).toMatchObject({
        placeId: 'g1',
        primaryText: '100 Summer St',
        secondaryText: 'Boston, MA, USA',
        displayAddress: '100 Summer St, Boston, MA, USA',
        types: ['street_address'],
      });
    });

    it('should map a REST camelCase prediction into the internal shape', () => {
      const result = component.normalizePrediction({
        placeId: 'r1',
        primaryText: 'Acme HQ',
        secondaryText: 'Boston, MA',
        displayAddress: 'Acme HQ, Boston, MA',
      });
      expect(result).toMatchObject({
        placeId: 'r1',
        primaryText: 'Acme HQ',
        secondaryText: 'Boston, MA',
        displayAddress: 'Acme HQ, Boston, MA',
      });
    });

    it('should fall back to description for primaryText (recent search shape)', () => {
      const result = component.normalizePrediction({ place_id: 'rec1', description: '12 Main St, Albany, NY' });
      expect(result.primaryText).toEqual('12 Main St, Albany, NY');
      expect(result.secondaryText).toEqual('');
    });

    it('should prefer the REST fields over the Google format', () => {
      const result = component.normalizePrediction({
        primaryText: 'REST',
        secondaryText: 'REST 2',
        structured_formatting: { main_text: 'Google', secondary_text: 'Google 2' },
      });
      expect(result.primaryText).toEqual('REST');
      expect(result.secondaryText).toEqual('REST 2');
    });

    it('should default text to empty strings when nothing matches', () => {
      const result = component.normalizePrediction({});
      expect(result.primaryText).toEqual('');
      expect(result.secondaryText).toEqual('');
    });

    it('should retain the original record on `raw` for downstream selection', () => {
      const raw = { place_id: 'g1', description: 'X', formatted_address: 'X' };
      const result = component.normalizePrediction(raw);
      expect(result.raw).toBe(raw);
    });
  });

  describe('Method: selectMatch()', () => {
    it('should resolve detail via place id for a prediction', () => {
      const spy = vi.spyOn(component as any, 'getPlaceLocationInfo').mockImplementation(() => {});
      component.recentDropdownOpen = false;
      const prediction = component.normalizePrediction({ place_id: 'g1' });
      component.selectMatch(prediction);
      expect(spy).toHaveBeenCalledWith(prediction);
    });

    it('should pass the full raw detail (not the prediction) when selecting a recent search', () => {
      const spy = vi.spyOn(component as any, 'setRecentLocation').mockImplementation(() => {});
      component.recentDropdownOpen = true;
      const raw = { place_id: 'rec1', formatted_address: '12 Main St', address_components: [] };
      const prediction = component.normalizePrediction(raw);
      component.selectMatch(prediction);
      expect(spy).toHaveBeenCalledWith(raw);
    });
  });

  describe('Method: getListQuery()', () => {
    it('loads the Maps SDK before requesting Google predictions', async () => {
      const order: string[] = [];
      const loadGoogleMaps = vi.fn().mockImplementation(() => {
        order.push('load');
        return Promise.resolve();
      });
      const getGeoPrediction = vi.fn().mockImplementation(() => {
        order.push('predict');
        return Promise.resolve([]);
      });
      component['_googlePlacesService'] = { loadGoogleMaps, getGeoPrediction } as any;
      component.settings = { useGoogleGeoApi: true, geoCountryRestriction: [], geoTypes: [], geoLocation: [] } as any;

      component['getListQuery']('100 Sum');
      await Promise.resolve();
      await Promise.resolve();

      expect(loadGoogleMaps).toHaveBeenCalledWith(component.settings);
      expect(getGeoPrediction).toHaveBeenCalled();
      expect(order).toEqual(['load', 'predict']);
    });

    it('does NOT load the Maps SDK on the search-service path', () => {
      const loadGoogleMaps = vi.fn();
      const getPredictions = vi.fn().mockResolvedValue([]);
      component['_googlePlacesService'] = { loadGoogleMaps, getPredictions } as any;
      component.settings = {
        useGoogleGeoApi: false,
        geoPredictionServerUrl: 'https://api/pred',
        serverResponseListHierarchy: [],
      } as any;

      component['getListQuery']('100 Sum');

      expect(loadGoogleMaps).not.toHaveBeenCalled();
      expect(getPredictions).toHaveBeenCalledWith('https://api/pred', '100 Sum', expect.any(String));
    });

    it('shows an empty list when the Maps SDK fails to load', async () => {
      const loadGoogleMaps = vi.fn().mockRejectedValue(new Error('boom'));
      const getGeoPrediction = vi.fn();
      component['_googlePlacesService'] = { loadGoogleMaps, getGeoPrediction } as any;
      component.settings = { useGoogleGeoApi: true, geoCountryRestriction: [], geoTypes: [], geoLocation: [] } as any;
      component['updateListItem'] = vi.fn();
      const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await component['getListQuery']('100 Sum');

      expect(getGeoPrediction).not.toHaveBeenCalled();
      expect(component['updateListItem']).toHaveBeenCalledWith([]);
      errSpy.mockRestore();
    });
  });

  describe('Method: getCurrentLocationInfo()', () => {
    it('loads the SDK, stores the detail, and clears the spinner on the Google path', async () => {
      const loadGoogleMaps = vi.fn().mockResolvedValue(undefined);
      const getGeoLatLngDetail = vi.fn().mockResolvedValue({ formattedAddress: 'x' });
      component['_googlePlacesService'] = { loadGoogleMaps, getGeoLatLngDetail } as any;
      component.settings = { useGoogleGeoApi: true } as any;
      component['setRecentLocation'] = vi.fn();
      component['gettingCurrentLocationFlag'] = true;

      await component['getCurrentLocationInfo']({ lat: 1, lng: 2 });

      expect(loadGoogleMaps).toHaveBeenCalledWith(component.settings);
      expect(getGeoLatLngDetail).toHaveBeenCalledWith({ lat: 1, lng: 2 });
      expect(component['setRecentLocation']).toHaveBeenCalledWith({ formattedAddress: 'x' });
      expect(component['gettingCurrentLocationFlag']).toBe(false);
    });

    it('clears the spinner when the Maps SDK fails to load', async () => {
      const loadGoogleMaps = vi.fn().mockRejectedValue(new Error('boom'));
      const getGeoLatLngDetail = vi.fn();
      component['_googlePlacesService'] = { loadGoogleMaps, getGeoLatLngDetail } as any;
      component.settings = { useGoogleGeoApi: true } as any;
      component['gettingCurrentLocationFlag'] = true;
      const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await component['getCurrentLocationInfo']({ lat: 1, lng: 2 });

      expect(getGeoLatLngDetail).not.toHaveBeenCalled();
      expect(component['gettingCurrentLocationFlag']).toBe(false);
      errSpy.mockRestore();
    });

    it('uses the REST endpoint and clears the spinner on the search-service path', async () => {
      const getLatLngDetail = vi.fn().mockResolvedValue(null);
      component['_googlePlacesService'] = { getLatLngDetail } as any;
      component.settings = { useGoogleGeoApi: false, geoLatLangServiceUrl: 'https://api/ll', serverResponseatLangHierarchy: [] } as any;
      component['gettingCurrentLocationFlag'] = true;

      component['getCurrentLocationInfo']({ lat: 1, lng: 2 });
      await Promise.resolve();
      await Promise.resolve();

      expect(getLatLngDetail).toHaveBeenCalledWith('https://api/ll', 1, 2);
      expect(component['gettingCurrentLocationFlag']).toBe(false);
    });
  });

  describe('Method: getPlaceLocationInfo()', () => {
    it('should load the Maps SDK before resolving Google details using the normalized placeId', async () => {
      const loadGoogleMaps = vi.fn().mockResolvedValue(undefined);
      const getGeoPlaceDetail = vi.fn().mockResolvedValue(null);
      component['_googlePlacesService'] = { loadGoogleMaps, getGeoPlaceDetail } as any;
      component.settings = { useGoogleGeoApi: true } as any;
      component['getPlaceLocationInfo']({ placeId: 'abc' });
      await Promise.resolve();
      await Promise.resolve();
      expect(loadGoogleMaps).toHaveBeenCalledWith(component.settings);
      expect(getGeoPlaceDetail).toHaveBeenCalledWith('abc');
    });

    it('should use the REST endpoint with the placeId when useGoogleGeoApi is false', () => {
      const getPlaceDetails = vi.fn().mockResolvedValue(null);
      component['_googlePlacesService'] = { getPlaceDetails } as any;
      component.settings = { useGoogleGeoApi: false, geoLocDetailServerUrl: 'https://api/detail' } as any;
      component['getPlaceLocationInfo']({ placeId: 'abc' });
      expect(getPlaceDetails).toHaveBeenCalledWith('https://api/detail', 'abc', '');
    });
  });

  describe('Google Places billing session token', () => {
    const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const REST_SETTINGS = {
      useGoogleGeoApi: false,
      geoPredictionServerUrl: 'https://api/predict',
      geoLocDetailServerUrl: 'https://api/detail',
      serverResponseListHierarchy: [],
      serverResponseDetailHierarchy: [],
    };
    const flush = () => new Promise((resolve) => setTimeout(resolve));

    it('should mint a UUID v4 token on the first prediction and reuse it across predictions', () => {
      const tokens: string[] = [];
      const getPredictions = vi.fn((_url: string, _query: string, token: string) => {
        tokens.push(token);
        return Promise.resolve([]);
      });
      component['_googlePlacesService'] = { getPredictions } as any;
      component.settings = { ...REST_SETTINGS } as any;

      component['getListQuery']('123 Main');
      component['getListQuery']('123 Main St');

      expect(tokens.length).toBe(2);
      expect(tokens[0]).toMatch(UUID_V4);
      expect(tokens[1]).toBe(tokens[0]);
    });

    it('should forward the active token to getPlaceDetails and clear it once details resolve', async () => {
      let detailToken: string;
      const getPredictions = vi.fn().mockResolvedValue([]);
      const getPlaceDetails = vi.fn((_url: string, _placeId: string, token: string) => {
        detailToken = token;
        return Promise.resolve(null);
      });
      component['_googlePlacesService'] = { getPredictions, getPlaceDetails } as any;
      component.settings = { ...REST_SETTINGS } as any;

      component['getListQuery']('123 Main');
      const minted = component['sessionToken'];
      expect(minted).toMatch(UUID_V4);

      component['getPlaceLocationInfo']({ placeId: 'abc' });
      await flush();

      expect(detailToken).toBe(minted);
      expect(component['sessionToken']).toBe('');
    });

    it('should clear the token even when the details request rejects', async () => {
      const getPredictions = vi.fn().mockResolvedValue([]);
      const getPlaceDetails = vi.fn().mockRejectedValue(new Error('details failed'));
      component['_googlePlacesService'] = { getPredictions, getPlaceDetails } as any;
      component.settings = { ...REST_SETTINGS } as any;

      component['getListQuery']('123 Main');
      expect(component['sessionToken']).toMatch(UUID_V4);

      await expect(component['getPlaceLocationInfo']({ placeId: 'abc' })).rejects.toThrow('details failed');

      expect(component['sessionToken']).toBe('');
    });

    it('should mint a fresh, distinct token for the next interaction after a selection', async () => {
      const getPredictions = vi.fn().mockResolvedValue([]);
      const getPlaceDetails = vi.fn().mockResolvedValue(null);
      component['_googlePlacesService'] = { getPredictions, getPlaceDetails } as any;
      component.settings = { ...REST_SETTINGS } as any;

      component['getListQuery']('first');
      const firstToken = component['sessionToken'];
      component['getPlaceLocationInfo']({ placeId: 'abc' });
      await flush();

      component['getListQuery']('second');
      const secondToken = component['sessionToken'];

      expect(secondToken).toMatch(UUID_V4);
      expect(secondToken).not.toBe(firstToken);
    });

    it('should refresh the token after the inactivity timeout', () => {
      const getPredictions = vi.fn().mockResolvedValue([]);
      component['_googlePlacesService'] = { getPredictions } as any;
      component.settings = { ...REST_SETTINGS } as any;

      component['getListQuery']('a');
      const firstToken = component['sessionToken'];
      component['sessionTokenStartedAt'] = Date.now() - 4 * 60 * 1000;
      component['getListQuery']('ab');

      expect(component['sessionToken']).not.toBe(firstToken);
    });

    it('should clear the token when the input is emptied', () => {
      component['sessionToken'] = 'spent-token';
      component['sessionTokenStartedAt'] = Date.now();
      component.settings = { showRecentSearch: false } as any;
      component.locationInput = '';

      component.searchinputCallback(null);

      expect(component['sessionToken']).toBe('');
    });

    it('should fall back to a locally generated UUID v4 when crypto.randomUUID is unavailable', () => {
      const original = (globalThis.crypto as any).randomUUID;
      (globalThis.crypto as any).randomUUID = undefined;
      try {
        expect(component['generateSessionToken']()).toMatch(UUID_V4);
      } finally {
        (globalThis.crypto as any).randomUUID = original;
      }
    });

    it('swallows a Maps SDK load failure without calling getGeoPlaceDetail', async () => {
      const loadGoogleMaps = vi.fn().mockRejectedValue(new Error('boom'));
      const getGeoPlaceDetail = vi.fn();
      component['_googlePlacesService'] = { loadGoogleMaps, getGeoPlaceDetail } as any;
      component.settings = { useGoogleGeoApi: true } as any;
      const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await component['getPlaceLocationInfo']({ placeId: 'abc' });

      expect(getGeoPlaceDetail).not.toHaveBeenCalled();
      errSpy.mockRestore();
    });
  });
});
