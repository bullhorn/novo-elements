import * as i0 from '@angular/core';
import { PLATFORM_ID, Inject, Injectable, InjectionToken, forwardRef, EventEmitter, Output, Input, Optional, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BasePickerResults } from 'novo-elements/elements/picker';
import * as i2 from 'novo-elements/services';
import { NEVER } from 'rxjs';
import * as i3 from '@angular/common';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as i1 from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import * as i4 from 'novo-elements/elements/list';
import { NovoListModule } from 'novo-elements/elements/list';

class GooglePlacesService {
    constructor(_http, platformId, _global, _localStorageService) {
        this._http = _http;
        this.platformId = platformId;
        this._global = _global;
        this._localStorageService = _localStorageService;
    }
    // Ensure the Google Maps JS SDK is available before any window.google usage.
    // No-ops when the SDK is already present (host script tag) or no key is configured (search-service path).
    loadGoogleMaps(settings) {
        const _window = this._global.nativeGlobal;
        if (_window?.google?.maps?.places) {
            return Promise.resolve();
        }
        if (!isPlatformBrowser(this.platformId) || !settings?.googleApiKey) {
            return Promise.resolve();
        }
        if (!this.mapsLoad) {
            this.mapsLoadKey = settings.googleApiKey;
            this.mapsLoad = this.injectGoogleMapsScript(settings);
        }
        else if (this.mapsLoadKey && this.mapsLoadKey !== settings.googleApiKey) {
            // The Maps JS API can only be loaded once per page; a second, different key is ignored.
            console.warn('GooglePlacesService: the Google Maps SDK is already loading with a different key; ignoring the new googleApiKey.');
        }
        return this.mapsLoad;
    }
    injectGoogleMapsScript(settings) {
        return new Promise((resolve, reject) => {
            const _window = this._global.nativeGlobal;
            // Build params one at a time so undefined override values are dropped instead of serialized as "undefined".
            // The component uses the legacy Places API (AutocompleteService, PlacesService) which requires the
            // synchronous library load — google.maps.places is fully populated when onload fires.
            const params = new URLSearchParams();
            params.set('key', settings.googleApiKey);
            params.set('libraries', 'places');
            for (const [key, value] of Object.entries(settings.googleMapsLoaderParams ?? {})) {
                if (value !== undefined && value !== null) {
                    params.set(key, value);
                }
            }
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => {
                // Clear both cached fields so a later attempt can retry with any key.
                this.mapsLoad = undefined;
                this.mapsLoadKey = undefined;
                reject(new Error('Failed to load the Google Maps JavaScript API.'));
            };
            document.head.appendChild(script);
        });
    }
    getPredictions(url, query, sessionToken) {
        return new Promise((resolve) => {
            const separator = url.includes('?') ? '&' : '?';
            const sessionParam = sessionToken ? '&sessionToken=' + sessionToken : '';
            this._http.get(url + separator + 'query=' + query + sessionParam).subscribe((data) => {
                if (data) {
                    resolve(data);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    getPlaceDetails(url, placeId, sessionToken) {
        return new Promise((resolve) => {
            const separator = url.includes('?') ? '&' : '?';
            const sessionParam = sessionToken ? '&sessionToken=' + sessionToken : '';
            this._http.get(url + separator + 'query=' + placeId + sessionParam).subscribe((data) => {
                if (data) {
                    resolve(data);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    getGeoPrediction(params) {
        return new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                const placesService = new _window.google.maps.places.AutocompleteService();
                let queryInput = {};
                const promiseArr = [];
                if (params.countryRestriction.length) {
                    queryInput = {
                        input: params.query,
                        componentRestrictions: { country: params.countryRestriction },
                    };
                }
                else {
                    queryInput = {
                        input: params.query,
                    };
                }
                if (params.geoLocation) {
                    queryInput.location = new _window.google.maps.LatLng(parseFloat(params.geoLocation[0]), parseFloat(params.geoLocation[1]));
                    queryInput.radius = params.radius;
                }
                if (params.geoTypes.length) {
                    for (let i = 0; i < params.geoTypes.length; i++) {
                        const _tempQuery = queryInput;
                        _tempQuery.types = new Array(params.geoTypes[i]);
                        promiseArr.push(this.geoPredictionCall(placesService, _tempQuery));
                    }
                }
                else {
                    promiseArr.push(this.geoPredictionCall(placesService, queryInput));
                }
                Promise.all(promiseArr).then((values) => {
                    const val = values;
                    if (val.length > 1) {
                        let _tempArr = [];
                        for (let j = 0; j < val.length; j++) {
                            if (val[j] && val[j].length) {
                                _tempArr = _tempArr.concat(val[j]);
                            }
                        }
                        _tempArr = this.getUniqueResults(_tempArr);
                        resolve(_tempArr);
                    }
                    else {
                        resolve(values[0]);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
    }
    async getGeoPlaceDetail(placeId) {
        const placeDetail = await new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                const placesService = new _window.google.maps.places.PlacesService(document.createElement('div'));
                placesService.getDetails({ placeId }, (result) => {
                    if (result === null) {
                        resolve(false);
                    }
                    else if (result.length === 0) {
                        this.getGeoPaceDetailByReferance(result.referance).then((referanceData) => {
                            resolve(referanceData || false);
                        });
                    }
                    else {
                        resolve(result);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
        if (placeDetail?.types?.includes('locality')) {
            placeDetail.postal_codes = await this.getPostalCodes(placeDetail);
        }
        return placeDetail;
    }
    getGeoPaceDetailByReferance(referance) {
        return new Promise((resolve) => {
            if (isPlatformBrowser(this.platformId)) {
                const _window = this._global.nativeGlobal;
                const placesService = new _window.google.maps.places.PlacesService();
                placesService.getDetails({ reference: referance }, (result, status) => {
                    if (status === _window.google.maps.places.PlacesServiceStatus.OK) {
                        resolve(result);
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
    }
    addRecentList(localStorageName, result, itemSavedLength) {
        this.getRecentList(localStorageName).then((data) => {
            if (data) {
                for (let i = 0; i < data.length; i++) {
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
    getRecentList(localStorageName) {
        return new Promise((resolve) => {
            let value = this._localStorageService.getItem(localStorageName);
            if (value) {
                value = JSON.parse(value);
            }
            else {
                value = [];
            }
            resolve(value);
        });
    }
    getPostalCodes(placeDetail) {
        const _window = this._global.nativeGlobal;
        const geocoder = new _window.google.maps.Geocoder();
        return new Promise((resolve) => {
            geocoder.geocode({ location: placeDetail.geometry.location }, (results, status) => {
                if (status === 'OK' && results.length) {
                    resolve(results.reduce((postalCodes, result) => {
                        const postalCodeComponent = result.address_components.find((item) => item.types.includes('postal_code'));
                        if (postalCodeComponent && !postalCodes.includes(postalCodeComponent.long_name)) {
                            postalCodes.push(postalCodeComponent.long_name);
                        }
                        return postalCodes;
                    }, []));
                }
                else {
                    resolve(null);
                }
            });
        });
    }
    getUniqueResults(arr) {
        return Array.from(arr.reduce((m, t) => m.set(t.place_id, t), new Map()).values());
    }
    geoPredictionCall(placesService, queryInput) {
        const _window = this._global.nativeGlobal;
        return new Promise((resolve) => {
            placesService.getPlacePredictions(queryInput, (result, status) => {
                if (status === _window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve(result);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: GooglePlacesService, deps: [{ token: i1.HttpClient }, { token: PLATFORM_ID }, { token: i2.GlobalRef }, { token: i2.LocalStorageService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: GooglePlacesService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: GooglePlacesService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i2.GlobalRef }, { type: i2.LocalStorageService }] });

/** App-wide address-lookup config; when provided, every novo-address enables autocomplete on Address 1. */
const NOVO_ADDRESS_CONFIG = new InjectionToken('NOVO_ADDRESS_CONFIG');

// NG2
// Value accessor for the component (supports ngModel)
const PLACES_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PlacesListComponent),
    multi: true,
};
class PlacesListComponent extends BasePickerResults {
    static { this.SESSION_TOKEN_TIMEOUT_MS = 3 * 60 * 1000; }
    constructor(_elmRef, _global, _googlePlacesService, cdr, 
    // Fallback config from the app-wide token; used when [userSettings] does not provide a field.
    addressConfig = null) {
        super(_elmRef, cdr);
        this._elmRef = _elmRef;
        this._global = _global;
        this._googlePlacesService = _googlePlacesService;
        this.cdr = cdr;
        this.addressConfig = addressConfig;
        this.termChange = new EventEmitter();
        this.select = new EventEmitter();
        this.matchesUpdated = new EventEmitter();
        this.locationInput = '';
        this.dropdownOpen = false;
        this.recentDropdownOpen = false;
        this.isSettingsError = false;
        this.settingsErrorMsg = '';
        this.settings = {};
        this.moduleinit = false;
        this.selectedDataIndex = -1;
        this.recentSearchData = [];
        this.userSelectedOption = '';
        this.sessionToken = '';
        this.sessionTokenStartedAt = 0;
        this.defaultSettings = {
            geoPredictionServerUrl: '',
            geoLatLangServiceUrl: '',
            geoLocDetailServerUrl: '',
            geoCountryRestriction: [],
            geoTypes: [],
            geoLocation: [],
            geoRadius: 0,
            serverResponseListHierarchy: [],
            serverResponseatLangHierarchy: [],
            serverResponseDetailHierarchy: [],
            resOnSearchButtonClickOnly: false,
            useGoogleGeoApi: true,
            inputPlaceholderText: 'Enter Area Name',
            inputString: '',
            showSearchButton: true,
            showRecentSearch: true,
            showCurrentLocation: true,
            recentStorageName: 'recentSearches',
            noOfRecentSearchSave: 5,
            currentLocIconUrl: '',
            searchIconUrl: '',
            locationIconUrl: '',
            googleApiKey: '',
            googleMapsLoaderParams: {},
        };
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.config = {};
    }
    ngOnInit() {
        if (!this.moduleinit) {
            this.moduleInit();
        }
    }
    ngOnChanges() {
        this.moduleinit = true;
        this.moduleInit();
        this.searchinputCallback(null);
    }
    writeValue(model) {
        this.model = model;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    // function called when click event happens in input box. (Binded with view)
    searchinputClickCallback(event) {
        event.target.select();
        this.searchinputCallback(event);
    }
    // function called when there is a change in input. (Binded with view)
    searchinputCallback(event) {
        const inputVal = this.locationInput;
        if (inputVal) {
            this.getListQuery(inputVal);
        }
        else {
            this.matches = [];
            this.clearSessionToken();
            if (this.userSelectedOption) {
                this.userQuerySubmit('false');
            }
            this.userSelectedOption = '';
            if (this.settings.showRecentSearch) {
                this.showRecentSearch();
            }
            else {
                this.dropdownOpen = false;
            }
        }
    }
    // function to execute when user hover over autocomplete list. (binded with view)
    activeListNode(index) {
        for (let i = 0; i < this.matches.length; i++) {
            if (index === i) {
                this.matches[i].active = true;
                this.selectedDataIndex = index;
            }
            else {
                this.matches[i].active = false;
            }
        }
    }
    // function to execute when user selects a match from the autocomplete list. (binded with view)
    selectedListNode(event, index) {
        this.selectMatch(this.matches[index]);
    }
    // function to execute when user selects a match.
    selectMatch(match) {
        this.dropdownOpen = false;
        if (this.recentDropdownOpen) {
            // Recent items carry full detail on `raw`, which downstream consumers need.
            this.setRecentLocation(match.raw ?? match);
        }
        else {
            this.getPlaceLocationInfo(match);
        }
    }
    // function to close the autocomplete list when clicked outside. (binded with view)
    closeAutocomplete(event) {
        if (!this._elmRef.nativeElement.contains(event.target)) {
            this.selectedDataIndex = -1;
            this.dropdownOpen = false;
        }
    }
    // function to manually trigger the callback to parent component when clicked search button.
    userQuerySubmit(selectedOption) {
        const _userOption = selectedOption === 'false' ? '' : this.userSelectedOption;
        if (_userOption) {
            this.select.emit(this.userSelectedOption);
        }
        else {
            // this.select.emit(false);
        }
    }
    // Fold a raw Google/REST/recent record into the internal AddressLookupPrediction shape.
    normalizePrediction(raw) {
        return {
            placeId: raw?.placeId || raw?.place_id,
            primaryText: raw?.primaryText || raw?.structured_formatting?.main_text || raw?.displayAddress || raw?.description || '',
            secondaryText: raw?.secondaryText || raw?.structured_formatting?.secondary_text || '',
            displayAddress: raw?.displayAddress || raw?.description,
            types: raw?.types,
            raw,
        };
    }
    onKeyDown(event) {
        if (this.dropdownOpen) {
            if (event.key === "ArrowUp" /* Key.ArrowUp */) {
                this.prevActiveMatch();
                return;
            }
            if (event.key === "ArrowDown" /* Key.ArrowDown */) {
                this.nextActiveMatch();
                return;
            }
            if (event.key === "Enter" /* Key.Enter */) {
                // Only select when a prediction is highlighted.
                if (this.activeMatch) {
                    this.selectMatch(this.activeMatch);
                }
                return;
            }
        }
    }
    search(term, mode) {
        // Disable the base search term functionality here since it is handled by the places picker separately
        return NEVER;
    }
    // module initialization happens. function called by ngOninit and ngOnChange
    moduleInit() {
        this.settings = this.setUserSettings();
        // condition to check if Radius is set without location detail.
        if (this.settings.geoRadius) {
            if (this.settings.geoLocation.length !== 2) {
                this.isSettingsError = true;
                this.settingsErrorMsg =
                    this.settingsErrorMsg + 'Radius should be used with GeoLocation. Please use "geoLocation" key to set lat and lng. ';
            }
        }
        // condition to check if lat and lng is set and radious is not set then it will set to 20,000KM by default
        if (this.settings.geoLocation.length === 2 && !this.settings.geoRadius) {
            this.settings.geoRadius = 20000000;
        }
        if (this.settings.showRecentSearch) {
            this.getRecentLocations();
        }
        if (this.settings.useGoogleGeoApi && !this.settings.googleApiKey) {
            console.warn('google-places-list: No googleApiKey configured — Google Places autocomplete is disabled. ' +
                'Pass address.googleApiKey to NovoElementProviders.forRoot() to enable it.');
        }
        if (!this.settings.useGoogleGeoApi) {
            if (!this.settings.geoPredictionServerUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg =
                    this.settingsErrorMsg + 'Prediction custom server url is not defined. Please use "geoPredictionServerUrl" key to set. ';
            }
            if (!this.settings.geoLatLangServiceUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg =
                    this.settingsErrorMsg + 'Latitude and longitude custom server url is not defined. Please use "geoLatLangServiceUrl" key to set. ';
            }
            if (!this.settings.geoLocDetailServerUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg =
                    this.settingsErrorMsg + 'Location detail custom server url is not defined. Please use "geoLocDetailServerUrl" key to set. ';
            }
        }
        this.locationInput = this.term;
    }
    // function to process the search query when pressed enter.
    processSearchQuery() {
        if (this.matches.length) {
            if (this.selectedDataIndex > -1) {
                this.selectedListNode(null, this.selectedDataIndex);
            }
            else {
                this.selectedListNode(null, 0);
            }
        }
    }
    // function to set user settings if it is available.
    // Priority: [userSettings] input > NOVO_ADDRESS_CONFIG token > defaultSettings.
    setUserSettings() {
        const _tempObj = {};
        const keys = Object.keys(this.defaultSettings);
        for (const value of keys) {
            if (this.userSettings?.[value] !== undefined) {
                _tempObj[value] = this.userSettings[value];
            }
            else if (this.addressConfig?.[value] !== undefined) {
                _tempObj[value] = this.addressConfig[value];
            }
            else {
                _tempObj[value] = this.defaultSettings[value];
            }
        }
        return _tempObj;
    }
    // function to get the autocomplete list based on user input.
    async getListQuery(value) {
        this.recentDropdownOpen = false;
        if (this.settings.useGoogleGeoApi) {
            const _tempParams = {
                query: value,
                countryRestriction: this.settings.geoCountryRestriction,
                geoTypes: this.settings.geoTypes,
            };
            if (this.settings.geoLocation.length === 2) {
                _tempParams.geoLocation = this.settings.geoLocation;
                _tempParams.radius = this.settings.geoRadius;
            }
            try {
                await this._googlePlacesService.loadGoogleMaps(this.settings);
                if (!this._global.nativeGlobal?.google?.maps?.places) {
                    this.updateListItem([]);
                    return;
                }
                const result = await this._googlePlacesService.getGeoPrediction(_tempParams);
                this.updateListItem(result);
            }
            catch (err) {
                console.error('Failed to load Google Maps for address predictions', err);
                this.updateListItem([]);
            }
        }
        else {
            this._googlePlacesService.getPredictions(this.settings.geoPredictionServerUrl, value, this.ensureSessionToken()).then((result) => {
                result = this.extractServerList(this.settings.serverResponseListHierarchy, result);
                this.updateListItem(result);
            }).catch((err) => {
                console.error('Failed to load address predictions from server', err);
                this.updateListItem([]);
            });
        }
    }
    // Returns the active billing-session token for prediction calls, minting a fresh UUID v4 when
    // none exists or the previous one has gone stale (~3 min of inactivity). Each call refreshes the
    // inactivity window.
    ensureSessionToken() {
        const now = Date.now();
        if (!this.sessionToken || now - this.sessionTokenStartedAt > PlacesListComponent.SESSION_TOKEN_TIMEOUT_MS) {
            this.sessionToken = this.generateSessionToken();
        }
        this.sessionTokenStartedAt = now;
        return this.sessionToken;
    }
    // Mints a v4 UUID for the Google Places billing session. Prefers the built-in crypto.randomUUID(),
    // which exists only in secure contexts (HTTPS / localhost). Falls back to a locally generated UUID for
    // insecure-context local development (e.g. localhost development); the token only needs to be a unique
    // opaque string, so Math.random() is acceptable there.
    generateSessionToken() {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const random = (Math.random() * 16) | 0;
            const value = char === 'x' ? random : (random & 0x3) | 0x8;
            return value.toString(16);
        });
    }
    clearSessionToken() {
        this.sessionToken = '';
        this.sessionTokenStartedAt = 0;
    }
    // function to extratc custom data which is send by the server.
    extractServerList(arrayList, data) {
        if (arrayList.length) {
            let _tempData = data;
            for (const key of arrayList) {
                _tempData = _tempData[key];
            }
            return _tempData;
        }
        else {
            return data;
        }
    }
    // function to update the predicted list.
    updateListItem(listData) {
        this.matches = (listData || []).map((item) => this.normalizePrediction(item));
        // Reset highlight so Enter can't act on a stale prediction.
        this.activeMatch = undefined;
        this.dropdownOpen = true;
        this.cdr.detectChanges();
        this.matchesUpdated.emit(this.matches);
    }
    // function to show the recent search result.
    showRecentSearch() {
        this.recentDropdownOpen = true;
        this.dropdownOpen = true;
        this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((result) => {
            this.matches = (result || []).map((item) => this.normalizePrediction(item));
        });
    }
    // function to retrieve the location info based on google place id.
    async getPlaceLocationInfo(selectedData) {
        const placeId = selectedData.placeId;
        if (this.settings.useGoogleGeoApi) {
            try {
                // Ensure the SDK is loaded before getGeoPlaceDetail touches window.google.
                await this._googlePlacesService.loadGoogleMaps(this.settings);
                const data = await this._googlePlacesService.getGeoPlaceDetail(placeId);
                if (data) {
                    this.setRecentLocation(data);
                }
            }
            catch (err) {
                console.error('Failed to load Google Maps for place details', err);
            }
        }
        else {
            try {
                let result = await this._googlePlacesService.getPlaceDetails(this.settings.geoLocDetailServerUrl, placeId, this.sessionToken);
                if (result) {
                    result = this.extractServerList(this.settings.serverResponseDetailHierarchy, result);
                    this.setRecentLocation(result);
                }
            }
            catch (err) {
                console.error('Failed to load place details from server', err);
            }
            finally {
                // The details call ends the Google billing session; clear the token even if the request
                // failed so the next interaction starts a fresh session.
                this.clearSessionToken();
            }
        }
    }
    // function to store the selected user search in the localstorage.
    setRecentLocation(data) {
        data = JSON.parse(JSON.stringify(data));
        data.description = data.description ? data.description : data.formattedAddress || data.formatted_address;
        data.active = false;
        this.selectedDataIndex = -1;
        this.locationInput = data.description;
        if (this.settings.showRecentSearch) {
            this._googlePlacesService.addRecentList(this.settings.recentStorageName, data, this.settings.noOfRecentSearchSave);
            this.getRecentLocations();
        }
        this.userSelectedOption = data;
        // below code will execute only when user press enter or select any option selection and it emit a callback to the parent component.
        if (!this.settings.resOnSearchButtonClickOnly) {
            this.select.emit(data);
            this.termChange.emit(data);
        }
    }
    // function to retrive the stored recent user search from the localstorage.
    getRecentLocations() {
        this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((data) => {
            this.recentSearchData = data && data.length ? data : [];
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: PlacesListComponent, deps: [{ token: i0.ElementRef }, { token: i2.GlobalRef }, { token: GooglePlacesService }, { token: i0.ChangeDetectorRef }, { token: NOVO_ADDRESS_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.19", type: PlacesListComponent, isStandalone: false, selector: "google-places-list", inputs: { userSettings: "userSettings" }, outputs: { termChange: "termChange", select: "select", matchesUpdated: "matchesUpdated" }, providers: [PLACES_VALUE_ACCESSOR], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<novo-list direction=\"vertical\">\n  @for (data of matches; track $index) {\n    <novo-list-item (click)=\"selectedListNode($event, $index)\" [ngClass]=\"{ active: data === activeMatch }\">\n      <item-header>\n        <item-avatar icon=\"location\"></item-avatar>\n        <item-title>{{ data.primaryText }}</item-title>\n      </item-header>\n      <item-content>{{ data.secondaryText }}</item-content>\n    </novo-list-item>\n  }\n</novo-list>\n", styles: [":host{display:grid}:host novo-list{border:1px solid #4a89dc;background-color:var(--background-body)}:host novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host novo-list novo-list-item>div{width:100%}:host novo-list novo-list-item.active{background-color:hsl(from var(--color-positive) h s calc(l + 35))}:host novo-list novo-list-item:hover{background-color:hsl(from var(--color-positive) h s calc(l + 39))}:host novo-list novo-list-item item-content{flex-flow:row wrap}:host novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i4.NovoListElement, selector: "novo-list", inputs: ["theme", "direction"] }, { kind: "component", type: i4.NovoListItemElement, selector: "novo-list-item, a[list-item], button[list-item]" }, { kind: "component", type: i4.NovoItemAvatarElement, selector: "item-avatar, novo-item-avatar", inputs: ["icon", "color"] }, { kind: "component", type: i4.NovoItemTitleElement, selector: "item-title, novo-item-title" }, { kind: "component", type: i4.NovoItemHeaderElement, selector: "item-header, novo-item-header" }, { kind: "component", type: i4.NovoItemContentElement, selector: "item-content, novo-item-content", inputs: ["direction"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: PlacesListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'google-places-list', providers: [PLACES_VALUE_ACCESSOR], standalone: false, template: "<novo-list direction=\"vertical\">\n  @for (data of matches; track $index) {\n    <novo-list-item (click)=\"selectedListNode($event, $index)\" [ngClass]=\"{ active: data === activeMatch }\">\n      <item-header>\n        <item-avatar icon=\"location\"></item-avatar>\n        <item-title>{{ data.primaryText }}</item-title>\n      </item-header>\n      <item-content>{{ data.secondaryText }}</item-content>\n    </novo-list-item>\n  }\n</novo-list>\n", styles: [":host{display:grid}:host novo-list{border:1px solid #4a89dc;background-color:var(--background-body)}:host novo-list novo-list-item{cursor:pointer;flex:0 0;transition:background-color .25s}:host novo-list novo-list-item>div{width:100%}:host novo-list novo-list-item.active{background-color:hsl(from var(--color-positive) h s calc(l + 35))}:host novo-list novo-list-item:hover{background-color:hsl(from var(--color-positive) h s calc(l + 39))}:host novo-list novo-list-item item-content{flex-flow:row wrap}:host novo-list novo-list-item item-content>*{flex:0 0 33%;white-space:nowrap}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i2.GlobalRef }, { type: GooglePlacesService }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NOVO_ADDRESS_CONFIG]
                }] }], propDecorators: { userSettings: [{
                type: Input
            }], termChange: [{
                type: Output
            }], select: [{
                type: Output
            }], matchesUpdated: [{
                type: Output
            }] } });

class GooglePlacesModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: GooglePlacesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.19", ngImport: i0, type: GooglePlacesModule, declarations: [PlacesListComponent], imports: [CommonModule, FormsModule, NovoListModule], exports: [PlacesListComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: GooglePlacesModule, providers: [GooglePlacesService, provideHttpClient(withInterceptorsFromDi())], imports: [CommonModule, FormsModule, NovoListModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.19", ngImport: i0, type: GooglePlacesModule, decorators: [{
            type: NgModule,
            args: [{ declarations: [PlacesListComponent],
                    exports: [PlacesListComponent], imports: [CommonModule, FormsModule, NovoListModule], providers: [GooglePlacesService, provideHttpClient(withInterceptorsFromDi())] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { GooglePlacesModule, GooglePlacesService, NOVO_ADDRESS_CONFIG, PlacesListComponent };
//# sourceMappingURL=novo-elements-elements-places.mjs.map
