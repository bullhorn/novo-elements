import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Http } from '@angular/http';
import { GlobalRef } from '../../services/global/global.service';
import { LocalStorageService } from '../../services/storage/local-storage.service';
import 'rxjs/add/operator/map';

@Injectable()
export class GooglePlacesService {
    constructor(
        private _http: Http,
        @Inject(PLATFORM_ID) private platformId: Object,
        private _global: GlobalRef,
        private _localStorageService: LocalStorageService,
    ) { }

    public getPredictions(url: string, query: string): Promise<any> {
        return new Promise((resolve: any) => {
            this._http.get(url + '?query=' + query,
            ).map((res: any) => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                });
        });
    }

    public getLatLngDetail(url: string, lat: number, lng: number): Promise<any> {
        return new Promise((resolve: any) => {
            this._http.get(url + '?lat=' + lat + '&lng=' + lng,
            ).map((res: any) => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                });
        });
    }

    public getPlaceDetails(url: string, placeId: string): Promise<any> {
        return new Promise((resolve: any) => {
            this._http.get(url + '?query=' + placeId,
            ).map((res: any) => res.json())
                .subscribe((data: any) => {
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(false);
                    }
                });
        });
    }

    public getGeoCurrentLocation(): Promise<any> {
        return new Promise((resolve: any) => {
            if (isPlatformBrowser(this.platformId)) {
                let _window: any = this._global.nativeGlobal;
                if (_window.navigator.geolocation) {
                    _window.navigator.geolocation.getCurrentPosition((pos: any) => {
                        let latlng: any = { lat: parseFloat(pos.coords.latitude + ''), lng: parseFloat(pos.coords.longitude + '') };
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

    public getGeoLatLngDetail(latlng: any): Promise<any> {
        return new Promise((resolve: any) => {
            if (isPlatformBrowser(this.platformId)) {
                let _window: any = this._global.nativeGlobal;
                let geocoder: any = new _window.google.maps.Geocoder();
                geocoder.geocode({ 'location': latlng }, (results: any, status: any) => {
                    if (status === 'OK') {
                        this.getGeoPlaceDetail(results[0].place_id).then((result: any) => {
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

    public getGeoPrediction(params: any): Promise<any> {
        return new Promise((resolve: any) => {
            if (isPlatformBrowser(this.platformId)) {
                let _window: any = this._global.nativeGlobal;
                let placesService: any = new _window.google.maps.places.AutocompleteService();
                let queryInput: any = {};
                let promiseArr: any = [];
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
                        let _tempQuery: any = queryInput;
                        _tempQuery['types'] = new Array(params.geoTypes[i]);
                        promiseArr.push(this.geoPredictionCall(placesService, _tempQuery));
                    }
                } else {
                    promiseArr.push(this.geoPredictionCall(placesService, queryInput));
                }

                Promise.all(promiseArr).then((values: any) => {
                    let val: any = values;
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

    public getGeoPlaceDetail(placeId: string): Promise<any> {
        return new Promise((resolve: any) => {
            if (isPlatformBrowser(this.platformId)) {
                let _window: any = this._global.nativeGlobal;
                let placesService: any = new _window.google.maps.places.PlacesService(document.createElement('div'));
                placesService.getDetails({ 'placeId': placeId }, (result: any, status: any) => {
                    if (result === null || result.length === 0) {
                        this.getGeoPaceDetailByReferance(result.referance).then((referanceData: any) => {
                            if (!referanceData) {
                                resolve(false);
                            } else {
                                resolve(referanceData);
                            }
                        });
                    } else {
                        resolve(result);
                    }
                });
            } else {
                resolve(false);
            }
        });
    }

    public getGeoPaceDetailByReferance(referance: string): Promise<any> {
        return new Promise((resolve: any) => {
            if (isPlatformBrowser(this.platformId)) {
                let _window: any = this._global.nativeGlobal;
                let placesService: any = new _window.google.maps.places.PlacesService();
                placesService.getDetails({ 'reference': referance }, (result: any, status: any) => {
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

    public addRecentList(localStorageName: string, result: any, itemSavedLength: number): any {
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

    public getRecentList(localStorageName: string): Promise<any> {
        return new Promise((resolve: any) => {
            let value: any = this._localStorageService.getItem(localStorageName);
            if (value) {
                value = JSON.parse(value);
            } else {
                value = [];
            }
            resolve(value);
        });
    }

    private getUniqueResults(arr: any): any {
        return Array.from(arr.reduce((m: any, t: any) => m.set(t.place_id, t), new Map()).values());
    }

    private geoPredictionCall(placesService: any, queryInput: any): Promise<any> {
        let _window: any = this._global.nativeGlobal;
        return new Promise((resolve: any) => {
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
