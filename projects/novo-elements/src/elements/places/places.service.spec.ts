import { of } from 'rxjs';
import { GooglePlacesService } from './places.service';

describe('Elements: GooglePlacesService', () => {
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

  describe('Method: getPredictions()', () => {
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
