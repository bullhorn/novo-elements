import * as i0 from '@angular/core';
import { OnInit, OnChanges, EventEmitter, ElementRef, ChangeDetectorRef, InjectionToken } from '@angular/core';
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
    private mapsLoad?;
    private mapsLoadKey?;
    constructor(_http: HttpClient, platformId: Object, _global: GlobalRef, _localStorageService: LocalStorageService);
    loadGoogleMaps(settings: PlacesSettings): Promise<void>;
    private injectGoogleMapsScript;
    getPredictions(url: string, query: string, sessionToken?: string): Promise<any>;
    getPlaceDetails(url: string, placeId: string, sessionToken?: string): Promise<any>;
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

interface PlacesSettings {
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
    /** Bullhorn-managed key; when set, the library lazy-loads the Maps JS SDK with it instead of relying on a host script tag. */
    googleApiKey?: string;
    /** Extra Maps JS loader query params, merged over the defaults (libraries=places, loading=async). */
    googleMapsLoaderParams?: Record<string, string>;
    /** When false/undefined, the address-block inline autocomplete overlay is suppressed even when this config is present. */
    addressBlockEnabled?: boolean;
}
/** Normalized address prediction; raw provider records are mapped into this via normalizePrediction. */
interface AddressLookupPrediction {
    placeId?: string;
    primaryText?: string;
    secondaryText?: string;
    displayAddress?: string;
    types?: string[];
    /** Original provider record, retained so recent-search selection re-emits full detail. */
    raw?: any;
}
declare class PlacesListComponent extends BasePickerResults implements OnInit, OnChanges, ControlValueAccessor {
    private _elmRef;
    private _global;
    private _googlePlacesService;
    private cdr;
    private addressConfig;
    private static readonly SESSION_TOKEN_TIMEOUT_MS;
    userSettings: PlacesSettings;
    termChange: EventEmitter<any>;
    select: EventEmitter<any>;
    matchesUpdated: EventEmitter<AddressLookupPrediction[]>;
    locationInput: string;
    dropdownOpen: boolean;
    recentDropdownOpen: boolean;
    isSettingsError: boolean;
    settingsErrorMsg: string;
    settings: PlacesSettings;
    private moduleinit;
    private selectedDataIndex;
    private recentSearchData;
    private userSelectedOption;
    private sessionToken;
    private sessionTokenStartedAt;
    private defaultSettings;
    model: any;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(_elmRef: ElementRef, _global: GlobalRef, _googlePlacesService: GooglePlacesService, cdr: ChangeDetectorRef, addressConfig?: PlacesSettings);
    ngOnInit(): any;
    ngOnChanges(): any;
    writeValue(model: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    searchinputClickCallback(event: any): any;
    searchinputCallback(event: any): any;
    activeListNode(index: number): any;
    selectedListNode(event: MouseEvent, index: number): any;
    selectMatch(match: AddressLookupPrediction): any;
    closeAutocomplete(event: any): any;
    userQuerySubmit(selectedOption?: any): any;
    normalizePrediction(raw: any): AddressLookupPrediction;
    onKeyDown(event: KeyboardEvent): void;
    search(term: any, mode?: any): Observable<any>;
    private moduleInit;
    private processSearchQuery;
    private setUserSettings;
    private getListQuery;
    private ensureSessionToken;
    private generateSessionToken;
    private clearSessionToken;
    private extractServerList;
    private updateListItem;
    private showRecentSearch;
    private getPlaceLocationInfo;
    private setRecentLocation;
    private getRecentLocations;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlacesListComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PlacesListComponent, "google-places-list", never, { "userSettings": { "alias": "userSettings"; "required": false; }; }, { "termChange": "termChange"; "select": "select"; "matchesUpdated": "matchesUpdated"; }, never, never, false, never>;
}

declare class GooglePlacesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<GooglePlacesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GooglePlacesModule, [typeof PlacesListComponent], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.NovoListModule], [typeof PlacesListComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GooglePlacesModule>;
}

/** App-wide address-lookup config; when provided, every novo-address enables autocomplete on Address 1. */
declare const NOVO_ADDRESS_CONFIG: InjectionToken<PlacesSettings>;

export { GooglePlacesModule, GooglePlacesService, NOVO_ADDRESS_CONFIG, PlacesListComponent };
export type { AddressLookupPrediction, PlacesSettings };
