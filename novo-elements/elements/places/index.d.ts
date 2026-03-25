import * as i0 from '@angular/core';
import { OnInit, OnChanges, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as i3 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { BasePickerResults } from 'novo-elements/elements/picker';
import { GlobalRef, LocalStorageService } from 'novo-elements/services';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as i2 from '@angular/common';
import * as i4 from 'novo-elements/elements/list';

declare class GooglePlacesService {
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

interface Settings {
    geoPredictionServerUrl?: string;
    geoLatLangServiceUrl?: string;
    geoLocDetailServerUrl?: string;
    geoCountryRestriction?: any;
    geoTypes?: any;
    geoLocation?: any;
    geoRadius?: number;
    serverResponseListHierarchy?: any;
    serverResponseatLangHierarchy?: any;
    serverResponseDetailHierarchy?: any;
    resOnSearchButtonClickOnly?: boolean;
    useGoogleGeoApi?: boolean;
    inputPlaceholderText?: string;
    inputString?: string;
    showSearchButton?: boolean;
    showRecentSearch?: boolean;
    showCurrentLocation?: boolean;
    recentStorageName?: string;
    noOfRecentSearchSave?: number;
    currentLocIconUrl?: string;
    searchIconUrl?: string;
    locationIconUrl?: string;
}
declare class PlacesListComponent extends BasePickerResults implements OnInit, OnChanges, ControlValueAccessor {
    private platformId;
    private _elmRef;
    private _global;
    private _googlePlacesService;
    private cdr;
    userSettings: Settings;
    termChange: EventEmitter<any>;
    select: EventEmitter<any>;
    locationInput: string;
    gettingCurrentLocationFlag: boolean;
    dropdownOpen: boolean;
    recentDropdownOpen: boolean;
    isSettingsError: boolean;
    settingsErrorMsg: string;
    settings: Settings;
    private moduleinit;
    private selectedDataIndex;
    private recentSearchData;
    private userSelectedOption;
    private defaultSettings;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(platformId: Object, _elmRef: ElementRef, _global: GlobalRef, _googlePlacesService: GooglePlacesService, cdr: ChangeDetectorRef);
    ngOnInit(): any;
    ngOnChanges(): any;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    searchinputClickCallback(event: any): any;
    searchinputCallback(event: any): any;
    activeListNode(index: number): any;
    selectedListNode(event: MouseEvent, index: number): any;
    selectMatch(match: any): any;
    closeAutocomplete(event: any): any;
    userQuerySubmit(selectedOption?: any): any;
    currentLocationSelected(): any;
    private moduleInit;
    private processSearchQuery;
    private setUserSettings;
    private getListQuery;
    private extractServerList;
    private updateListItem;
    private showRecentSearch;
    private getCurrentLocationInfo;
    private getPlaceLocationInfo;
    private setRecentLocation;
    private getRecentLocations;
    onKeyDown(event: KeyboardEvent): void;
    search(term: any, mode?: any): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlacesListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PlacesListComponent, "google-places-list", never, { "userSettings": { "alias": "userSettings"; "required": false; }; }, { "termChange": "termChange"; "select": "select"; }, never, never, false, never>;
}

declare class GooglePlacesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<GooglePlacesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GooglePlacesModule, [typeof PlacesListComponent], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.NovoListModule], [typeof PlacesListComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GooglePlacesModule>;
}

export { GooglePlacesModule, GooglePlacesService, PlacesListComponent };
export type { Settings };
