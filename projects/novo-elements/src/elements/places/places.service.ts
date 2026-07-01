import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GlobalRef, LocalStorageService } from 'novo-elements/services';
import type { PlacesSettings } from './places.component';

@Injectable()
export class GooglePlacesService {
  // Shared across the address fields that use this singleton so the SDK is injected at most once.
  private mapsLoad?: Promise<void>;
  // The key the SDK was (or is being) loaded with; the Maps JS API can only be loaded once per page.
  private mapsLoadKey?: string;

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _global: GlobalRef,
    private _localStorageService: LocalStorageService,
  ) {}

  // Ensure the Google Maps JS SDK is available before any window.google usage.
  // No-ops when the SDK is already present (host script tag) or no key is configured (search-service path).
  loadGoogleMaps(settings: PlacesSettings): Promise<void> {
    const _window: any = this._global.nativeGlobal;
    if (_window?.google?.maps?.places) {
      return Promise.resolve();
    }
    if (!isPlatformBrowser(this.platformId) || !settings?.googleApiKey) {
      return Promise.resolve();
    }
    if (!this.mapsLoad) {
      this.mapsLoadKey = settings.googleApiKey;
      this.mapsLoad = this.injectGoogleMapsScript(settings);
    } else if (this.mapsLoadKey && this.mapsLoadKey !== settings.googleApiKey) {
      // The Maps JS API can only be loaded once per page; a second, different key is ignored.
      console.warn(
        'GooglePlacesService: the Google Maps SDK is already loading with a different key; ignoring the new googleApiKey.',
      );
    }
    return this.mapsLoad;
  }

  private injectGoogleMapsScript(settings: PlacesSettings): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const _window: any = this._global.nativeGlobal;
      // Build params one at a time so undefined override values are dropped instead of serialized as "undefined".
      const params = new URLSearchParams();
      params.set('key', settings.googleApiKey);
      params.set('libraries', 'places');
      params.set('loading', 'async');
      for (const [key, value] of Object.entries(settings.googleMapsLoaderParams ?? {})) {
        if (value !== undefined && value !== null) {
          params.set(key, value);
        }
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
      script.async = true;
      script.onload = () => {
        // With loading=async, onload fires when the bootstrap loader is ready, not when the
        // places library is. importLibrary resolves only once the library is actually usable.
        if (_window?.google?.maps?.importLibrary) {
          _window.google.maps.importLibrary('places').then(
            () => resolve(),
            (err) => { this.mapsLoad = undefined; this.mapsLoadKey = undefined; reject(err); },
          );
        } else {
          resolve();
        }
      };
      script.onerror = () => {
        // Clear the cached promise so a later attempt can retry instead of resolving a failed load.
        this.mapsLoad = undefined;
        reject(new Error('Failed to load the Google Maps JavaScript API.'));
      };
      document.head.appendChild(script);
    });
  }

  getPredictions(url: string, query: string, sessionToken?: string): Promise<any> {
    return new Promise((resolve) => {
      const separator = url.includes('?') ? '&' : '?';
      const sessionParam = sessionToken ? '&sessionToken=' + sessionToken : '';
      this._http.get(url + separator + 'query=' + query + sessionParam).subscribe((data: any) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      });
    });
  }

  getLatLngDetail(url: string, lat: number, lng: number): Promise<any> {
    return new Promise((resolve) => {
      const separator = url.includes('?') ? '&' : '?';
      this._http.get(url + separator + 'lat=' + lat + '&lng=' + lng).subscribe((data: any) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      });
    });
  }

  getPlaceDetails(url: string, placeId: string, sessionToken?: string): Promise<any> {
    return new Promise((resolve) => {
      const separator = url.includes('?') ? '&' : '?';
      const sessionParam = sessionToken ? '&sessionToken=' + sessionToken : '';
      this._http.get(url + separator + 'query=' + placeId + sessionParam).subscribe((data: any) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      });
    });
  }

  getGeoCurrentLocation(): Promise<any> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        const _window: any = this._global.nativeGlobal;
        if (_window.navigator.geolocation) {
          _window.navigator.geolocation.getCurrentPosition((pos) => {
            const latlng: any = { lat: parseFloat(pos.coords.latitude + ''), lng: parseFloat(pos.coords.longitude + '') };
            resolve(latlng);
          });
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }

  getGeoLatLngDetail(latlng: any): Promise<any> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        const _window: any = this._global.nativeGlobal;
        const geocoder: any = new _window.google.maps.Geocoder();
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === 'OK') {
            this.getGeoPlaceDetail(results[0].place_id).then((result) => {
              if (result) {
                resolve(result);
              } else {
                resolve(false);
              }
            });
          } else {
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  getGeoPrediction(params: any): Promise<any> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        const _window: any = this._global.nativeGlobal;
        const placesService: any = new _window.google.maps.places.AutocompleteService();
        let queryInput: any = {};
        const promiseArr: any = [];
        if (params.countryRestriction.length) {
          queryInput = {
            input: params.query,
            componentRestrictions: { country: params.countryRestriction },
          };
        } else {
          queryInput = {
            input: params.query,
          };
        }
        if (params.geoLocation) {
          queryInput.location = new _window.google.maps.LatLng(parseFloat(params.geoLocation[0]), parseFloat(params.geoLocation[1]));
          queryInput.radius = params.radius;
        }
        if (params.geoTypes.length) {
          for (let i: number = 0; i < params.geoTypes.length; i++) {
            const _tempQuery: any = queryInput;
            _tempQuery.types = new Array(params.geoTypes[i]);
            promiseArr.push(this.geoPredictionCall(placesService, _tempQuery));
          }
        } else {
          promiseArr.push(this.geoPredictionCall(placesService, queryInput));
        }

        Promise.all(promiseArr).then((values) => {
          const val: any = values;
          if (val.length > 1) {
            let _tempArr: any = [];
            for (let j: number = 0; j < val.length; j++) {
              if (val[j] && val[j].length) {
                _tempArr = _tempArr.concat(val[j]);
              }
            }
            _tempArr = this.getUniqueResults(_tempArr);
            resolve(_tempArr);
          } else {
            resolve(values[0]);
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  async getGeoPlaceDetail(placeId: string): Promise<any> {
    const placeDetail: any = await new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        const _window: any = this._global.nativeGlobal;
        const placesService: any = new _window.google.maps.places.PlacesService(document.createElement('div'));
        placesService.getDetails({ placeId }, (result: any) => {
          if (result === null) {
            resolve(false);
          } else if (result.length === 0) {
            this.getGeoPaceDetailByReferance(result.referance).then((referanceData: any) => {
              resolve(referanceData || false);
            });
          } else {
            resolve(result);
          }
        });
      } else {
        resolve(false);
      }
    });

    if (placeDetail?.types?.includes('locality')) {
      placeDetail.postal_codes = await this.getPostalCodes(placeDetail);
    }

    return placeDetail;
  }

  getGeoPaceDetailByReferance(referance: string): Promise<any> {
    return new Promise((resolve) => {
      if (isPlatformBrowser(this.platformId)) {
        const _window: any = this._global.nativeGlobal;
        const placesService: any = new _window.google.maps.places.PlacesService();
        placesService.getDetails({ reference: referance }, (result: any, status: any) => {
          if (status === _window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(result);
          } else {
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  addRecentList(localStorageName: string, result: any, itemSavedLength: number): any {
    this.getRecentList(localStorageName).then((data: any) => {
      if (data) {
        for (let i: number = 0; i < data.length; i++) {
          if (data[i].description === result.description) {
            data.splice(i, 1);
            break;
          }
        }
        data.unshift(result);
        if (data.length > itemSavedLength) {
          data.pop();
        }
        this._localStorageService.setItem(localStorageName, JSON.stringify(data));
      }
    });
  }

  getRecentList(localStorageName: string): Promise<any> {
    return new Promise((resolve) => {
      let value: any = this._localStorageService.getItem(localStorageName);
      if (value) {
        value = JSON.parse(value);
      } else {
        value = [];
      }
      resolve(value);
    });
  }

  getPostalCodes(placeDetail: any): Promise<string> {
    const _window: any = this._global.nativeGlobal;
    const geocoder: any = new _window.google.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({ location: placeDetail.geometry.location }, (results, status) => {
        if (status === 'OK' && results.length) {
          resolve(
            results.reduce((postalCodes: string[], result: any) => {
              const postalCodeComponent = result.address_components.find((item) => item.types.includes('postal_code'));
              if (postalCodeComponent && !postalCodes.includes(postalCodeComponent.long_name)) {
                postalCodes.push(postalCodeComponent.long_name);
              }
              return postalCodes;
            }, []),
          );
        } else {
          resolve(null);
        }
      });
    });
  }

  private getUniqueResults(arr: any): any {
    return Array.from(arr.reduce((m, t) => m.set(t.place_id, t), new Map()).values());
  }

  private geoPredictionCall(placesService: any, queryInput: any): Promise<any> {
    const _window: any = this._global.nativeGlobal;
    return new Promise((resolve) => {
      placesService.getPlacePredictions(queryInput, (result: any, status: any) => {
        if (status === _window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(result);
        } else {
          resolve(false);
        }
      });
    });
  }
}
