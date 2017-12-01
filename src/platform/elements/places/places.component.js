"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var global_service_1 = require("../../services/global/global.service");
var places_service_1 = require("./places.service");
var PlacesListComponent = (function () {
    function PlacesListComponent(platformId, _elmRef, _global, _googlePlacesService) {
        this.platformId = platformId;
        this._elmRef = _elmRef;
        this._global = _global;
        this._googlePlacesService = _googlePlacesService;
        this.term = '';
        this.termChange = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.locationInput = '';
        this.gettingCurrentLocationFlag = false;
        this.dropdownOpen = false;
        this.recentDropdownOpen = false;
        this.queryItems = [];
        this.isSettingsError = false;
        this.settingsErrorMsg = '';
        this.settings = {};
        this.moduleinit = false;
        this.selectedDataIndex = -1;
        this.recentSearchData = [];
        this.userSelectedOption = '';
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
            locationIconUrl: ''
        };
    }
    PlacesListComponent.prototype.ngOnInit = function () {
        if (!this.moduleinit) {
            this.moduleInit();
        }
    };
    PlacesListComponent.prototype.ngOnChanges = function () {
        this.moduleinit = true;
        this.moduleInit();
        this.searchinputCallback(null);
    };
    //function called when click event happens in input box. (Binded with view)
    PlacesListComponent.prototype.searchinputClickCallback = function (event) {
        event.target.select();
        this.searchinputCallback(event);
    };
    //function called when there is a change in input. (Binded with view)
    PlacesListComponent.prototype.searchinputCallback = function (event) {
        var inputVal = this.locationInput;
        if (inputVal) {
            this.getListQuery(inputVal);
        }
        else {
            this.queryItems = [];
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
    };
    //function to execute when user hover over autocomplete list.(binded with view)
    PlacesListComponent.prototype.activeListNode = function (index) {
        for (var i = 0; i < this.queryItems.length; i++) {
            if (index === i) {
                this.queryItems[i].active = true;
                this.selectedDataIndex = index;
            }
            else {
                this.queryItems[i].active = false;
            }
        }
    };
    //function to execute when user select the autocomplete list.(binded with view)
    PlacesListComponent.prototype.selectedListNode = function (event, index) {
        this.dropdownOpen = false;
        if (this.recentDropdownOpen) {
            this.setRecentLocation(this.queryItems[index]);
        }
        else {
            this.getPlaceLocationInfo(this.queryItems[index]);
        }
    };
    //function to close the autocomplete list when clicked outside. (binded with view)
    PlacesListComponent.prototype.closeAutocomplete = function (event) {
        if (!this._elmRef.nativeElement.contains(event.target)) {
            this.selectedDataIndex = -1;
            this.dropdownOpen = false;
        }
    };
    //function to manually trigger the callback to parent component when clicked search button.
    PlacesListComponent.prototype.userQuerySubmit = function (selectedOption) {
        var _userOption = selectedOption === 'false' ? '' : this.userSelectedOption;
        if (_userOption) {
            this.select.emit(this.userSelectedOption);
        }
        else {
            //this.select.emit(false);
        }
    };
    //function to get user current location from the device.
    PlacesListComponent.prototype.currentLocationSelected = function () {
        var _this = this;
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.gettingCurrentLocationFlag = true;
            this.dropdownOpen = false;
            this._googlePlacesService.getGeoCurrentLocation().then(function (result) {
                if (!result) {
                    _this.gettingCurrentLocationFlag = false;
                }
                else {
                    _this.getCurrentLocationInfo(result);
                }
            });
        }
    };
    //module initialization happens. function called by ngOninit and ngOnChange
    PlacesListComponent.prototype.moduleInit = function () {
        this.settings = this.setUserSettings();
        //condition to check if Radius is set without location detail.
        if (this.settings.geoRadius) {
            if (this.settings.geoLocation.length !== 2) {
                this.isSettingsError = true;
                this.settingsErrorMsg = this.settingsErrorMsg +
                    'Radius should be used with GeoLocation. Please use "geoLocation" key to set lat and lng. ';
            }
        }
        //condition to check if lat and lng is set and radious is not set then it will set to 20,000KM by default
        if ((this.settings.geoLocation.length === 2) && !this.settings.geoRadius) {
            this.settings.geoRadius = 20000000;
        }
        if (this.settings.showRecentSearch) {
            this.getRecentLocations();
        }
        if (!this.settings.useGoogleGeoApi) {
            if (!this.settings.geoPredictionServerUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg = this.settingsErrorMsg +
                    'Prediction custom server url is not defined. Please use "geoPredictionServerUrl" key to set. ';
            }
            if (!this.settings.geoLatLangServiceUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg = this.settingsErrorMsg +
                    'Latitude and longitude custom server url is not defined. Please use "geoLatLangServiceUrl" key to set. ';
            }
            if (!this.settings.geoLocDetailServerUrl) {
                this.isSettingsError = true;
                this.settingsErrorMsg = this.settingsErrorMsg +
                    'Location detail custom server url is not defined. Please use "geoLocDetailServerUrl" key to set. ';
            }
        }
        this.locationInput = this.term;
    };
    //function to process the search query when pressed enter.
    PlacesListComponent.prototype.processSearchQuery = function () {
        if (this.queryItems.length) {
            if (this.selectedDataIndex > -1) {
                this.selectedListNode(null, this.selectedDataIndex);
            }
            else {
                this.selectedListNode(null, 0);
            }
        }
    };
    //function to set user settings if it is available.
    PlacesListComponent.prototype.setUserSettings = function () {
        var _tempObj = {};
        if (this.userSettings && typeof (this.userSettings) === 'object') {
            var keys = Object.keys(this.defaultSettings);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var value = keys_1[_i];
                _tempObj[value] = (this.userSettings[value] !== undefined) ? this.userSettings[value] : this.defaultSettings[value];
            }
            return _tempObj;
        }
        else {
            return this.defaultSettings;
        }
    };
    //function to get the autocomplete list based on user input.
    PlacesListComponent.prototype.getListQuery = function (value) {
        var _this = this;
        this.recentDropdownOpen = false;
        if (this.settings.useGoogleGeoApi) {
            var _tempParams = {
                'query': value,
                'countryRestriction': this.settings.geoCountryRestriction,
                'geoTypes': this.settings.geoTypes
            };
            if (this.settings.geoLocation.length === 2) {
                _tempParams.geoLocation = this.settings.geoLocation;
                _tempParams.radius = this.settings.geoRadius;
            }
            this._googlePlacesService.getGeoPrediction(_tempParams).then(function (result) {
                _this.updateListItem(result);
            });
        }
        else {
            this._googlePlacesService.getPredictions(this.settings.geoPredictionServerUrl, value).then(function (result) {
                result = _this.extractServerList(_this.settings.serverResponseListHierarchy, result);
                _this.updateListItem(result);
            });
        }
    };
    //function to extratc custom data which is send by the server.
    PlacesListComponent.prototype.extractServerList = function (arrayList, data) {
        if (arrayList.length) {
            var _tempData = data;
            for (var _i = 0, arrayList_1 = arrayList; _i < arrayList_1.length; _i++) {
                var key = arrayList_1[_i];
                _tempData = _tempData[key];
            }
            return _tempData;
        }
        else {
            return data;
        }
    };
    //function to update the predicted list.
    PlacesListComponent.prototype.updateListItem = function (listData) {
        this.queryItems = listData ? listData : [];
        this.dropdownOpen = true;
    };
    //function to show the recent search result.
    PlacesListComponent.prototype.showRecentSearch = function () {
        var _this = this;
        this.recentDropdownOpen = true;
        this.dropdownOpen = true;
        this._googlePlacesService.getRecentList(this.settings.recentStorageName).then(function (result) {
            if (result) {
                _this.queryItems = result;
            }
            else {
                _this.queryItems = [];
            }
        });
    };
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
    //function to execute to get location detail based on latitude and longitude.
    PlacesListComponent.prototype.getCurrentLocationInfo = function (latlng) {
        var _this = this;
        if (this.settings.useGoogleGeoApi) {
            this._googlePlacesService.getGeoLatLngDetail(latlng).then(function (result) {
                if (result) {
                    _this.setRecentLocation(result);
                }
                _this.gettingCurrentLocationFlag = false;
            });
        }
        else {
            this._googlePlacesService.getLatLngDetail(this.settings.geoLatLangServiceUrl, latlng.lat, latlng.lng).then(function (result) {
                if (result) {
                    result = _this.extractServerList(_this.settings.serverResponseatLangHierarchy, result);
                    _this.setRecentLocation(result);
                }
                _this.gettingCurrentLocationFlag = false;
            });
        }
    };
    //function to retrive the location info based on goovle place id.
    PlacesListComponent.prototype.getPlaceLocationInfo = function (selectedData) {
        var _this = this;
        if (this.settings.useGoogleGeoApi) {
            this._googlePlacesService.getGeoPlaceDetail(selectedData.place_id).then(function (data) {
                if (data) {
                    _this.setRecentLocation(data);
                }
            });
        }
        else {
            this._googlePlacesService.getPlaceDetails(this.settings.geoLocDetailServerUrl, selectedData.place_id).then(function (result) {
                if (result) {
                    result = _this.extractServerList(_this.settings.serverResponseDetailHierarchy, result);
                    _this.setRecentLocation(result);
                }
            });
        }
    };
    //function to store the selected user search in the localstorage.
    PlacesListComponent.prototype.setRecentLocation = function (data) {
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
        //below code will execute only when user press enter or select any option selection and it emit a callback to the parent component.
        if (!this.settings.resOnSearchButtonClickOnly) {
            this.select.emit(data);
            this.termChange.emit(data);
        }
    };
    //function to retrive the stored recent user search from the localstorage.
    PlacesListComponent.prototype.getRecentLocations = function () {
        var _this = this;
        this._googlePlacesService.getRecentList(this.settings.recentStorageName).then(function (data) {
            _this.recentSearchData = (data && data.length) ? data : [];
        });
    };
    return PlacesListComponent;
}());
PlacesListComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'google-places-list',
                template: "\n        <novo-list direction=\"vertical\">\n            <novo-list-item *ngFor=\"let data of queryItems;let $index = index\" (click)=\"selectedListNode($event, $index)\">\n                <item-header>\n                    <item-avatar icon=\"location\"></item-avatar>\n                    <item-title>{{data.structured_formatting?.main_text ? data.structured_formatting.main_text : data.description}}</item-title>\n                </item-header>\n                <item-content>{{data.structured_formatting?.secondary_text}}</item-content>\n            </novo-list-item>\n        </novo-list>\n    "
            },] },
];
/** @nocollapse */
PlacesListComponent.ctorParameters = function () { return [
    { type: Object, decorators: [{ type: core_1.Inject, args: [core_1.PLATFORM_ID,] },] },
    { type: core_1.ElementRef, },
    { type: global_service_1.GlobalRef, },
    { type: places_service_1.GooglePlacesService, },
]; };
PlacesListComponent.propDecorators = {
    'userSettings': [{ type: core_1.Input },],
    'term': [{ type: core_1.Input },],
    'termChange': [{ type: core_1.Output },],
    'select': [{ type: core_1.Output },],
};
exports.PlacesListComponent = PlacesListComponent;
//# sourceMappingURL=places.component.js.map