import { HttpClient } from '@angular/common/http';
import { GlobalRef, LocalStorageService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class GooglePlacesService {
    private _http;
    private platformId;
    private _global;
    private _localStorageService;
    constructor(_http: HttpClient, platformId: Object, _global: GlobalRef, _localStorageService: LocalStorageService);
    getPredictions(url: string, query: string): Promise<any>;
    getLatLngDetail(url: string, lat: number, lng: number): Promise<any>;
    getPlaceDetails(url: string, placeId: string): Promise<any>;
    getGeoCurrentLocation(): Promise<any>;
    getGeoLatLngDetail(latlng: any): Promise<any>;
    getGeoPrediction(params: any): Promise<any>;
    getGeoPlaceDetail(placeId: string): Promise<any>;
    getGeoPaceDetailByReferance(referance: string): Promise<any>;
    addRecentList(localStorageName: string, result: any, itemSavedLength: number): any;
    getRecentList(localStorageName: string): Promise<any>;
    getPostalCodes(placeDetail: any): Promise<string>;
    private getUniqueResults;
    private geoPredictionCall;
    static ɵfac: i0.ɵɵFactoryDeclaration<GooglePlacesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GooglePlacesService>;
}
