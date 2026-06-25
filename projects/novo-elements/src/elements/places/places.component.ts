// NG2
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasePickerResults } from 'novo-elements/elements/picker';
import { GlobalRef } from 'novo-elements/services';
import { Key } from 'novo-elements/utils';
import { Observable } from 'rxjs';
import { GooglePlacesService } from './places.service';

export interface PlacesSettings {
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

/** Normalized address prediction; raw provider records are mapped into this via normalizePrediction. */
export interface AddressLookupPrediction {
  placeId?: string;
  primaryText?: string;
  secondaryText?: string;
  displayAddress?: string;
  types?: string[];
  /** Original provider record, retained so recent-search selection re-emits full detail. */
  raw?: any;
}

// Value accessor for the component (supports ngModel)
const PLACES_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PlacesListComponent),
  multi: true,
};

@Component({
  selector: 'google-places-list',
  providers: [PLACES_VALUE_ACCESSOR],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  standalone: false,
})
export class PlacesListComponent extends BasePickerResults implements OnInit, OnChanges, ControlValueAccessor {
  private static readonly SESSION_TOKEN_TIMEOUT_MS: number = 3 * 60 * 1000;

  @Input()
  userSettings: PlacesSettings;
  @Output()
  termChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  select: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  matchesUpdated: EventEmitter<AddressLookupPrediction[]> = new EventEmitter<AddressLookupPrediction[]>();

  public locationInput: string = '';
  public gettingCurrentLocationFlag: boolean = false;
  public dropdownOpen: boolean = false;
  public recentDropdownOpen: boolean = false;
  public isSettingsError: boolean = false;
  public settingsErrorMsg: string = '';
  public settings: PlacesSettings = {};
  private moduleinit: boolean = false;
  private selectedDataIndex: number = -1;
  private recentSearchData: any = [];
  private userSelectedOption: any = '';
  private sessionToken: string = '';
  private sessionTokenStartedAt: number = 0;
  private defaultSettings: PlacesSettings = {
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
  };

  model: any;
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _elmRef: ElementRef,
    private _global: GlobalRef,
    private _googlePlacesService: GooglePlacesService,
    private cdr: ChangeDetectorRef,
  ) {
    super(_elmRef, cdr);
    this.config = {};
  }

  ngOnInit(): any {
    if (!this.moduleinit) {
      this.moduleInit();
    }
  }

  ngOnChanges(): any {
    this.moduleinit = true;
    this.moduleInit();
    this.searchinputCallback(null);
  }

  writeValue(model: any): void {
    this.model = model;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  // function called when click event happens in input box. (Binded with view)
  searchinputClickCallback(event: any): any {
    event.target.select();
    this.searchinputCallback(event);
  }

  // function called when there is a change in input. (Binded with view)
  searchinputCallback(event: any): any {
    const inputVal: any = this.locationInput;
    if (inputVal) {
      this.getListQuery(inputVal);
    } else {
      this.matches = [];
      this.clearSessionToken();
      if (this.userSelectedOption) {
        this.userQuerySubmit('false');
      }
      this.userSelectedOption = '';
      if (this.settings.showRecentSearch) {
        this.showRecentSearch();
      } else {
        this.dropdownOpen = false;
      }
    }
  }

  // function to execute when user hover over autocomplete list. (binded with view)
  activeListNode(index: number): any {
    for (let i: number = 0; i < this.matches.length; i++) {
      if (index === i) {
        this.matches[i].active = true;
        this.selectedDataIndex = index;
      } else {
        this.matches[i].active = false;
      }
    }
  }

  // function to execute when user selects a match from the autocomplete list. (binded with view)
  selectedListNode(event: MouseEvent, index: number): any {
    this.selectMatch(this.matches[index]);
  }

  // function to execute when user selects a match.
  selectMatch(match: AddressLookupPrediction): any {
    this.dropdownOpen = false;
    if (this.recentDropdownOpen) {
      // Recent items carry full detail on `raw`, which downstream consumers need.
      this.setRecentLocation(match.raw ?? match);
    } else {
      this.getPlaceLocationInfo(match);
    }
  }

  // function to close the autocomplete list when clicked outside. (binded with view)
  closeAutocomplete(event: any): any {
    if (!this._elmRef.nativeElement.contains(event.target)) {
      this.selectedDataIndex = -1;
      this.dropdownOpen = false;
    }
  }

  // function to manually trigger the callback to parent component when clicked search button.
  userQuerySubmit(selectedOption?: any): any {
    const _userOption: any = selectedOption === 'false' ? '' : this.userSelectedOption;
    if (_userOption) {
      this.select.emit(this.userSelectedOption);
    } else {
      // this.select.emit(false);
    }
  }

  // function to get user current location from the device.
  currentLocationSelected(): any {
    if (isPlatformBrowser(this.platformId)) {
      this.gettingCurrentLocationFlag = true;
      this.dropdownOpen = false;
      this._googlePlacesService.getGeoCurrentLocation().then((result: any) => {
        if (!result) {
          this.gettingCurrentLocationFlag = false;
        } else {
          this.getCurrentLocationInfo(result);
        }
      });
    }
  }

  // Fold a raw Google/REST/recent record into the internal AddressLookupPrediction shape.
  normalizePrediction(raw: any): AddressLookupPrediction {
    return {
      placeId: raw?.placeId || raw?.place_id,
      primaryText: raw?.primaryText || raw?.structured_formatting?.main_text || raw?.displayAddress || raw?.description || '',
      secondaryText: raw?.secondaryText || raw?.structured_formatting?.secondary_text || '',
      displayAddress: raw?.displayAddress || raw?.description,
      types: raw?.types,
      raw,
    };
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.dropdownOpen) {
      if (event.key === Key.ArrowUp) {
        this.prevActiveMatch();
        return;
      }
      if (event.key === Key.ArrowDown) {
        this.nextActiveMatch();
        return;
      }
      if (event.key === Key.Enter) {
        // Only select when a prediction is highlighted.
        if (this.activeMatch) {
          this.selectMatch(this.activeMatch);
        }
        return;
      }
    }
  }

  override search(term, mode?): Observable<any> {
    // Disable the base search term functionality here since it is handled by the places picker separately
    return new Observable();
  }

  // module initialization happens. function called by ngOninit and ngOnChange
  private moduleInit(): any {
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
  private processSearchQuery(): any {
    if (this.matches.length) {
      if (this.selectedDataIndex > -1) {
        this.selectedListNode(null, this.selectedDataIndex);
      } else {
        this.selectedListNode(null, 0);
      }
    }
  }

  // function to set user settings if it is available.
  private setUserSettings(): PlacesSettings {
    const _tempObj: any = {};
    if (this.userSettings && typeof this.userSettings === 'object') {
      const keys: string[] = Object.keys(this.defaultSettings);
      for (const value of keys) {
        _tempObj[value] = this.userSettings[value] !== undefined ? this.userSettings[value] : this.defaultSettings[value];
      }
      return _tempObj;
    } else {
      return this.defaultSettings;
    }
  }

  // function to get the autocomplete list based on user input.
  private getListQuery(value: string): any {
    this.recentDropdownOpen = false;
    if (this.settings.useGoogleGeoApi) {
      const _tempParams: any = {
        query: value,
        countryRestriction: this.settings.geoCountryRestriction,
        geoTypes: this.settings.geoTypes,
      };
      if (this.settings.geoLocation.length === 2) {
        _tempParams.geoLocation = this.settings.geoLocation;
        _tempParams.radius = this.settings.geoRadius;
      }
      this._googlePlacesService.getGeoPrediction(_tempParams).then((result) => {
        this.updateListItem(result);
      });
    } else {
      this._googlePlacesService.getPredictions(this.settings.geoPredictionServerUrl, value, this.ensureSessionToken()).then((result) => {
        result = this.extractServerList(this.settings.serverResponseListHierarchy, result);
        this.updateListItem(result);
      });
    }
  }

  // Returns the active billing-session token for prediction calls, minting a fresh UUID v4 when
  // none exists or the previous one has gone stale (~3 min of inactivity). Each call refreshes the
  // inactivity window.
  private ensureSessionToken(): string {
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
  private generateSessionToken(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const random: number = (Math.random() * 16) | 0;
      const value: number = char === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  private clearSessionToken(): void {
    this.sessionToken = '';
    this.sessionTokenStartedAt = 0;
  }

  // function to extratc custom data which is send by the server.
  private extractServerList(arrayList: any, data: any): any {
    if (arrayList.length) {
      let _tempData: any = data;
      for (const key of arrayList) {
        _tempData = _tempData[key];
      }
      return _tempData;
    } else {
      return data;
    }
  }

  // function to update the predicted list.
  private updateListItem(listData: any): any {
    this.matches = (listData || []).map((item: any) => this.normalizePrediction(item));
    // Reset highlight so Enter can't act on a stale prediction.
    this.activeMatch = undefined;
    this.dropdownOpen = true;
    this.cdr.detectChanges();
    this.matchesUpdated.emit(this.matches);
  }

  // function to show the recent search result.
  private showRecentSearch(): any {
    this.recentDropdownOpen = true;
    this.dropdownOpen = true;
    this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((result: any) => {
      this.matches = (result || []).map((item: any) => this.normalizePrediction(item));
    });
  }

  // function to execute to get location detail based on latitude and longitude.
  private getCurrentLocationInfo(latlng: any): any {
    if (this.settings.useGoogleGeoApi) {
      this._googlePlacesService.getGeoLatLngDetail(latlng).then((result: any) => {
        if (result) {
          this.setRecentLocation(result);
        }
        this.gettingCurrentLocationFlag = false;
      });
    } else {
      this._googlePlacesService.getLatLngDetail(this.settings.geoLatLangServiceUrl, latlng.lat, latlng.lng).then((result: any) => {
        if (result) {
          result = this.extractServerList(this.settings.serverResponseatLangHierarchy, result);
          this.setRecentLocation(result);
        }
        this.gettingCurrentLocationFlag = false;
      });
    }
  }

  // function to retrieve the location info based on google place id.
  private getPlaceLocationInfo(selectedData: AddressLookupPrediction): any {
    const placeId = selectedData.placeId;
    if (this.settings.useGoogleGeoApi) {
      this._googlePlacesService.getGeoPlaceDetail(placeId).then((data: any) => {
        if (data) {
          this.setRecentLocation(data);
        }
      });
    } else {
      this._googlePlacesService.getPlaceDetails(this.settings.geoLocDetailServerUrl, placeId, this.sessionToken).then((result: any) => {
        // The details call closes the Google billing session; the token is now spent.
        this.clearSessionToken();
        if (result) {
          result = this.extractServerList(this.settings.serverResponseDetailHierarchy, result);
          this.setRecentLocation(result);
        }
      });
    }
  }

  // function to store the selected user search in the localstorage.
  private setRecentLocation(data: any): any {
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
  private getRecentLocations(): any {
    this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((data: any) => {
      this.recentSearchData = data && data.length ? data : [];
    });
  }
}
