// NG2
import {
  Component,
  PLATFORM_ID,
  Inject,
  Input,
  Output,
  Optional,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
} from '@angular/core';
import { NovoSearchBoxElement } from '../search/SearchBox';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { GlobalRef } from '../../services/global/global.service';
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

@Component({
  selector: 'google-places-list',
  template: `
        <novo-list direction="vertical">
            <novo-list-item *ngFor="let data of queryItems;let $index = index" (click)="selectedListNode($event, $index)">
                <item-header>
                    <item-avatar icon="location"></item-avatar>
                    <item-title>{{data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description}}</item-title>
                </item-header>
                <item-content>{{data.structured_formatting?.secondary_text}}</item-content>
            </novo-list-item>
        </novo-list>
    `,
})
export class PlacesListComponent implements OnInit, OnChanges {
  @Input()
  userSettings: Settings;
  @Input()
  term: string = '';
  @Output()
  termChange: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  select: EventEmitter<any> = new EventEmitter<any>();

  public locationInput: string = '';
  public gettingCurrentLocationFlag: boolean = false;
  public dropdownOpen: boolean = false;
  public recentDropdownOpen: boolean = false;
  public queryItems: any = [];
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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _elmRef: ElementRef,
    private _global: GlobalRef,
    private _googlePlacesService: GooglePlacesService,
  ) {}

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

  // function called when click event happens in input box. (Binded with view)
  searchinputClickCallback(event: any): any {
    event.target.select();
    this.searchinputCallback(event);
  }

  // function called when there is a change in input. (Binded with view)
  searchinputCallback(event: any): any {
    let inputVal: any = this.locationInput;
    if (inputVal) {
      this.getListQuery(inputVal);
    } else {
      this.queryItems = [];
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

  // function to execute when user hover over autocomplete list.(binded with view)
  activeListNode(index: number): any {
    for (let i: number = 0; i < this.queryItems.length; i++) {
      if (index === i) {
        this.queryItems[i].active = true;
        this.selectedDataIndex = index;
      } else {
        this.queryItems[i].active = false;
      }
    }
  }

  // function to execute when user select the autocomplete list.(binded with view)
  selectedListNode(event: MouseEvent, index: number): any {
    this.dropdownOpen = false;
    if (this.recentDropdownOpen) {
      this.setRecentLocation(this.queryItems[index]);
    } else {
      this.getPlaceLocationInfo(this.queryItems[index]);
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
    let _userOption: any = selectedOption === 'false' ? '' : this.userSelectedOption;
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
    if (this.queryItems.length) {
      if (this.selectedDataIndex > -1) {
        this.selectedListNode(null, this.selectedDataIndex);
      } else {
        this.selectedListNode(null, 0);
      }
    }
  }

  // function to set user settings if it is available.
  private setUserSettings(): Settings {
    let _tempObj: any = {};
    if (this.userSettings && typeof this.userSettings === 'object') {
      let keys: string[] = Object.keys(this.defaultSettings);
      for (let value of keys) {
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
      let _tempParams: any = {
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
      for (let key of arrayList) {
        _tempData = _tempData[key];
      }
      return _tempData;
    } else {
      return data;
    }
  }

  // function to update the predicted list.
  private updateListItem(listData: any): any {
    this.queryItems = listData ? listData : [];
    this.dropdownOpen = true;
  }

  // function to show the recent search result.
  private showRecentSearch(): any {
    this.recentDropdownOpen = true;
    this.dropdownOpen = true;
    this._googlePlacesService.getRecentList(this.settings.recentStorageName).then((result: any) => {
      if (result) {
        this.queryItems = result;
      } else {
        this.queryItems = [];
      }
    });
  }

  // //function to navigate through list when up and down keyboard key is pressed;
  // private navigateInList(keyCode: number): any {
  //     let arrayIndex: number = 0;
  //     //arrow down
  //     if (keyCode === 40) {
  //         if (this.selectedDataIndex >= 0) {
  //             arrayIndex = ((this.selectedDataIndex + 1) <= (this.queryItems.length - 1)) ? (this.selectedDataIndex + 1) : 0;
  //         }
  //         this.activeListNode(arrayIndex);
  //     } else if (keyCode === 38) {//arrow up
  //         if (this.selectedDataIndex >= 0) {
  //             arrayIndex = ((this.selectedDataIndex - 1) >= 0) ? (this.selectedDataIndex - 1) : (this.queryItems.length - 1);
  //         } else {
  //             arrayIndex = this.queryItems.length - 1;
  //         }
  //         this.activeListNode(arrayIndex);
  //     } else {
  //         this.processSearchQuery();
  //     }
  // }

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
}
