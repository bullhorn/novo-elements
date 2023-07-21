// NG2
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnChanges, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasePickerResults } from 'novo-elements/elements/picker';
import { GlobalRef } from 'novo-elements/services';
import { Key } from 'novo-elements/utils';
import { GooglePlacesService } from './places.service';

export interface Settings {
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

// Value accessor for the component (supports ngModel)
const PLACES_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PlacesListComponent),
  multi: true,
};

@Component({
  selector: 'google-places-list',
  providers: [PLACES_VALUE_ACCESSOR],
  template: `
    <novo-list direction="vertical">
      <novo-list-item *ngFor="let data of matches; let $index = index" (click)="selectedListNode($event, $index)" [ngClass]="{ active: data === activeMatch }">
        <item-header>
          <item-avatar icon="location"></item-avatar>
          <item-title>{{ data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description }}</item-title>
        </item-header>
        <item-content>{{ data.structured_formatting?.secondary_text }}</item-content>
      </novo-list-item>
    </novo-list>
  `,
  styleUrls: ['./places.component.scss'],
})
export class PlacesListComponent extends BasePickerResults implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  userSettings: Settings;
  @Output()
  termChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  select: EventEmitter<any> = new EventEmitter<any>();

  public locationInput: string = '';
  public gettingCurrentLocationFlag: boolean = false;
  public dropdownOpen: boolean = false;
  public recentDropdownOpen: boolean = false;
  public isSettingsError: boolean = false;
  public settingsErrorMsg: string = '';
  public settings: Settings = {};
  private moduleinit: boolean = false;
  private selectedDataIndex: number = -1;
  private recentSearchData: any = [];
  private userSelectedOption: any = '';
  private defaultSettings: Settings = {
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
  selectMatch(match: any): any {
    this.dropdownOpen = false;
    if (this.recentDropdownOpen) {
      this.setRecentLocation(match);
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
  private setUserSettings(): Settings {
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
      this._googlePlacesService.getPredictions(this.settings.geoPredictionServerUrl, value).then((result) => {
        result = this.extractServerList(this.settings.serverResponseListHierarchy, result);
        this.updateListItem(result);
      });
    }
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
    this.matches = listData ? listData : [];
    this.dropdownOpen = true;
    this.cdr.detectChanges();
  }

  // function to show the recent search result.
  private showRecentSearch(): any {
    this.recentDropdownOpen = true;
    this.dropdownOpen = true;
    this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((result: any) => {
      if (result) {
        this.matches = result;
      } else {
        this.matches = [];
      }
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

  // function to retrive the location info based on goovle place id.
  private getPlaceLocationInfo(selectedData: any): any {
    if (this.settings.useGoogleGeoApi) {
      this._googlePlacesService.getGeoPlaceDetail(selectedData.place_id).then((data: any) => {
        if (data) {
          this.setRecentLocation(data);
        }
      });
    } else {
      this._googlePlacesService.getPlaceDetails(this.settings.geoLocDetailServerUrl, selectedData.place_id).then((result: any) => {
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
    data.description = data.description ? data.description : data.formatted_address;
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
        this.selectMatch(this.activeMatch);
        return;
      }
    }
  }
}
