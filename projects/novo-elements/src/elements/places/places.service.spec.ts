import { of } from 'rxjs';
import { vi } from 'vitest';
import type { PlacesSettings } from './places.component';
import { GooglePlacesService } from './places.service';

describe('GooglePlacesService', () => {
  describe('Method: loadGoogleMaps()', () => {
    let service: GooglePlacesService;
    let nativeGlobal: any;

    const build = (platformId: any = 'browser'): GooglePlacesService => {
      const http: any = {};
      const global: any = { nativeGlobal };
      const localStorage: any = {};
      return new GooglePlacesService(http, platformId, global, localStorage);
    };

    beforeEach(() => {
      nativeGlobal = {};
      service = build();
    });

    it('resolves and injects nothing when the SDK is already present', async () => {
      nativeGlobal.google = { maps: { places: {} } };
      service = build();
      const appendSpy = vi.spyOn(document.head, 'appendChild');

      await service.loadGoogleMaps({ googleApiKey: 'abc' } as PlacesSettings);

      expect(appendSpy).not.toHaveBeenCalled();
      appendSpy.mockRestore();
    });

    it('resolves without injecting when no key is configured (search-service path)', async () => {
      const appendSpy = vi.spyOn(document.head, 'appendChild');

      await service.loadGoogleMaps({ googleApiKey: '' } as PlacesSettings);

      expect(appendSpy).not.toHaveBeenCalled();
      appendSpy.mockRestore();
    });

    it('resolves without injecting on a non-browser platform', async () => {
      service = build('server');
      const appendSpy = vi.spyOn(document.head, 'appendChild');

      await service.loadGoogleMaps({ googleApiKey: 'abc' } as PlacesSettings);

      expect(appendSpy).not.toHaveBeenCalled();
      appendSpy.mockRestore();
    });

    it('injects exactly one script for concurrent calls and resolves on load', async () => {
      const script: any = {};
      const createSpy = vi.spyOn(document, 'createElement').mockReturnValue(script);
      const appendSpy = vi.spyOn(document.head, 'appendChild').mockImplementation((node: any) => node);
      const settings = { googleApiKey: 'abc', googleMapsLoaderParams: { language: 'en-US' } } as PlacesSettings;

      const first = service.loadGoogleMaps(settings);
      const second = service.loadGoogleMaps(settings);

      expect(appendSpy).toHaveBeenCalledTimes(1);
      expect(script.src).toContain('key=abc');
      expect(script.src).toContain('libraries=places');
      expect(script.src).not.toContain('loading=async');
      expect(script.src).toContain('language=en-US');

      script.onload();
      await Promise.all([first, second]);

      createSpy.mockRestore();
      appendSpy.mockRestore();
    });

    it('drops undefined loader params instead of serializing them as "undefined"', () => {
      const script: any = {};
      const createSpy = vi.spyOn(document, 'createElement').mockReturnValue(script);
      vi.spyOn(document.head, 'appendChild').mockImplementation((node: any) => node);

      service.loadGoogleMaps({ googleApiKey: 'abc', googleMapsLoaderParams: { region: undefined } } as any);

      expect(script.src).not.toContain('region');
      expect(script.src).not.toContain('undefined');
      createSpy.mockRestore();
    });

    it('warns and reuses the in-flight loader when a second, different key is requested', async () => {
      const script: any = {};
      const createSpy = vi.spyOn(document, 'createElement').mockReturnValue(script);
      const appendSpy = vi.spyOn(document.head, 'appendChild').mockImplementation((node: any) => node);
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const first = service.loadGoogleMaps({ googleApiKey: 'key-a' } as PlacesSettings);
      const second = service.loadGoogleMaps({ googleApiKey: 'key-b' } as PlacesSettings);

      expect(second).toBe(first);
      expect(appendSpy).toHaveBeenCalledTimes(1);
      expect(script.src).toContain('key=key-a');
      expect(warnSpy).toHaveBeenCalledTimes(1);

      script.onload();
      await Promise.all([first, second]);

      createSpy.mockRestore();
      appendSpy.mockRestore();
      warnSpy.mockRestore();
    });

    it('clears the cached loader so a failed load can be retried', async () => {
      const script: any = {};
      const createSpy = vi.spyOn(document, 'createElement').mockReturnValue(script);
      const appendSpy = vi.spyOn(document.head, 'appendChild').mockImplementation((node: any) => node);
      const settings = { googleApiKey: 'abc' } as PlacesSettings;

      const attempt = service.loadGoogleMaps(settings);
      script.onerror();
      await expect(attempt).rejects.toThrow('Failed to load the Google Maps JavaScript API.');

      const retry = service.loadGoogleMaps(settings);
      expect(retry).not.toBe(attempt);
      expect(appendSpy).toHaveBeenCalledTimes(2);

      script.onload();
      await retry;
      createSpy.mockRestore();
      appendSpy.mockRestore();
    });

  });

  describe('Method: getPredictions()', () => {
    let service: GooglePlacesService;
    let urls: string[];

    beforeEach(() => {
      urls = [];
      const http: any = {
        get: (url: string) => {
          urls.push(url);
          return of({ data: [] });
        },
      };
      service = new GooglePlacesService(http, 'browser', {} as any, {} as any);
    });

    it('should append the session token when one is provided', async () => {
      await service.getPredictions('https://api/predict?BhRestToken=t', 'main', 'tok-123');
      expect(urls[0]).toBe('https://api/predict?BhRestToken=t&query=main&sessionToken=tok-123');
    });

    it('should omit the session token when none is provided', async () => {
      await service.getPredictions('https://api/predict', 'main');
      expect(urls[0]).toBe('https://api/predict?query=main');
    });
  });

  describe('Method: getPlaceDetails()', () => {
    let service: GooglePlacesService;
    let urls: string[];

    beforeEach(() => {
      urls = [];
      const http: any = {
        get: (url: string) => {
          urls.push(url);
          return of({ data: [] });
        },
      };
      service = new GooglePlacesService(http, 'browser', {} as any, {} as any);
    });

    it('should append the session token when one is provided', async () => {
      await service.getPlaceDetails('https://api/detail?BhRestToken=t', 'place-1', 'tok-123');
      expect(urls[0]).toBe('https://api/detail?BhRestToken=t&query=place-1&sessionToken=tok-123');
    });

    it('should omit the session token when none is provided', async () => {
      await service.getPlaceDetails('https://api/detail', 'place-1');
      expect(urls[0]).toBe('https://api/detail?query=place-1');
    });
  });
});
