<a name="3.0.0"></a>
# [3.0.0](https://github.com/bullhorn/novo-elements/compare/v2.15.0...v3.0.0) (2018-08-30)


### Features

* **form:** Adding ability to pass start and end date to date controls inside forms ([288ef9c](https://github.com/bullhorn/novo-elements/commit/288ef9c))



<a name="2.18.0"></a>
# [2.18.0](https://github.com/bullhorn/novo-elements/compare/v2.17.0...v2.18.0) (2018-10-11)


### Bug Fixes

* **calendar:** Move click event to button to avoid bad clicks ([151aea6](https://github.com/bullhorn/novo-elements/commit/151aea6))
* **control:** Checking LOCALE for number seperator ([56e1c37](https://github.com/bullhorn/novo-elements/commit/56e1c37))
* **control:** set classes on error messages if count is shown or not([#815](https://github.com/bullhorn/novo-elements/issues/815)) ([5a067ca](https://github.com/bullhorn/novo-elements/commit/5a067ca))
* **data-table:** Fixing width with text based cells ([a7ac259](https://github.com/bullhorn/novo-elements/commit/a7ac259))
* **datatable:** Fixing filter for dates to help with getting today only, fixes [#804](https://github.com/bullhorn/novo-elements/issues/804) ([eb1b37d](https://github.com/bullhorn/novo-elements/commit/eb1b37d))
* **datatable:** Fixing pagingation on filter/search with static service, fixes [#803](https://github.com/bullhorn/novo-elements/issues/803) ([99f099c](https://github.com/bullhorn/novo-elements/commit/99f099c))
* **form-utils:** Handle data type date and data specialization date as strings ([d821d05](https://github.com/bullhorn/novo-elements/commit/d821d05))
* **picker:** Change to handle empty use case ([#822](https://github.com/bullhorn/novo-elements/issues/822)) ([2606f84](https://github.com/bullhorn/novo-elements/commit/2606f84))
* **picker:** Change to trim highlight text ([#820](https://github.com/bullhorn/novo-elements/issues/820)) ([18865f1](https://github.com/bullhorn/novo-elements/commit/18865f1))
* **tooltip:** Fix issue with novo tooltip styling ([227f5a7](https://github.com/bullhorn/novo-elements/commit/227f5a7))
* **tooltip:** Fix issue with novo tooltip styling ([9007357](https://github.com/bullhorn/novo-elements/commit/9007357))


### Features

* **data-table:** Added an observable for when data is loaded into table ([#824](https://github.com/bullhorn/novo-elements/issues/824)) ([4494fdf](https://github.com/bullhorn/novo-elements/commit/4494fdf))
* **FileInput:** Add flag to hide remove button ([#819](https://github.com/bullhorn/novo-elements/issues/819)) ([aa26be2](https://github.com/bullhorn/novo-elements/commit/aa26be2))
* **tooltip:** Remove dependency on hint.css for tooltips and utilize CDK portals ([93c1e42](https://github.com/bullhorn/novo-elements/commit/93c1e42))


### BREAKING CHANGES

* **tooltip:** remove hint.css dependency and references to hint.css in build scripts



<a name="2.17.0"></a>
# [2.17.0](https://github.com/bullhorn/novo-elements/compare/v2.16.0...v2.17.0) (2018-09-14)


### Bug Fixes

* **chips:** change chip hover functionality to deselect on mouseleave ([#807](https://github.com/bullhorn/novo-elements/issues/807)) ([ae019f0](https://github.com/bullhorn/novo-elements/commit/ae019f0))
* **chips:** Chips disabled state styling fix ([#814](https://github.com/bullhorn/novo-elements/issues/814)) ([858b602](https://github.com/bullhorn/novo-elements/commit/858b602))
* **Dropdown:** Defaulting dropdowns to use dynamic width ([#813](https://github.com/bullhorn/novo-elements/issues/813)) ([b894802](https://github.com/bullhorn/novo-elements/commit/b894802))
* **form:** Fixing issue where textarea tooltip didn't appear ([300ae35](https://github.com/bullhorn/novo-elements/commit/300ae35))


### Features

* **tipwell:** add ability to put HTML  ([f4422e1](https://github.com/bullhorn/novo-elements/commit/f4422e1))



<a name="2.16.0"></a>
# [2.16.0](https://github.com/bullhorn/novo-elements/compare/v2.15.0...v2.16.0) (2018-08-31)


### Bug Fixes

* **control:** Fixing ability to add text mask to form inputs ([c0c76b6](https://github.com/bullhorn/novo-elements/commit/c0c76b6))
* **form:** Deleting maxlength from text mask form inputs ([#792](https://github.com/bullhorn/novo-elements/issues/792)) ([ac6c33e](https://github.com/bullhorn/novo-elements/commit/ac6c33e))
* **NovoRowChipsElement:** limit text to two lines in a row. ([#796](https://github.com/bullhorn/novo-elements/issues/796)) ([44ea69b](https://github.com/bullhorn/novo-elements/commit/44ea69b))
* **RowChipPicker:** set picker input closeOnSelect default to true ([#799](https://github.com/bullhorn/novo-elements/issues/799)) ([7725ae0](https://github.com/bullhorn/novo-elements/commit/7725ae0))


### Features

* **CKEditor:** add additional fonts to ckeditor ([#798](https://github.com/bullhorn/novo-elements/issues/798)) ([fe9a6ca](https://github.com/bullhorn/novo-elements/commit/fe9a6ca))
* **form:** Adding ability to pass start and end date to date controls inside forms ([288ef9c](https://github.com/bullhorn/novo-elements/commit/288ef9c))
* **NovoRowChipsElement:** Add extension of NovoChipsElement, NovoRowChipsElements. ([#793](https://github.com/bullhorn/novo-elements/issues/793)) ([23785de](https://github.com/bullhorn/novo-elements/commit/23785de)), closes [#789](https://github.com/bullhorn/novo-elements/issues/789)



<a name="2.15.0"></a>
# [2.15.0](https://github.com/bullhorn/novo-elements/compare/v2.14.1...v2.15.0) (2018-08-16)


### Bug Fixes

* **control:** fixing a typo ([#786](https://github.com/bullhorn/novo-elements/issues/786)) ([f68cd09](https://github.com/bullhorn/novo-elements/commit/f68cd09))
* **data-table:** Fixing custom templates with data-table, also marking simple-table and table as deprecated ([f8dc56a](https://github.com/bullhorn/novo-elements/commit/f8dc56a))
* **data-table:** spelling fix - calender should be calendar ([#770](https://github.com/bullhorn/novo-elements/issues/770)) ([108796d](https://github.com/bullhorn/novo-elements/commit/108796d))
* **date-picker:** Make the date picker element exported ([7eaa9d6](https://github.com/bullhorn/novo-elements/commit/7eaa9d6))
* **datepicker:** format date to proper locale when manually entering date ([#767](https://github.com/bullhorn/novo-elements/issues/767)) ([e207748](https://github.com/bullhorn/novo-elements/commit/e207748))
* **field-interactions:** Fix issue with FI and custom picker configs ([a275eaf](https://github.com/bullhorn/novo-elements/commit/a275eaf))
* **form:** Fixing many form controls to properly accept disabled, fixes [#788](https://github.com/bullhorn/novo-elements/issues/788) ([bd8f76b](https://github.com/bullhorn/novo-elements/commit/bd8f76b))
* **form:** Form rendering fix with custom templates ([ee2958a](https://github.com/bullhorn/novo-elements/commit/ee2958a))
* **quicknote:** note references triggering ([#781](https://github.com/bullhorn/novo-elements/issues/781)) ([6569058](https://github.com/bullhorn/novo-elements/commit/6569058))
* **RenderPipe:** remove extra whitespace from address rendering ([#756](https://github.com/bullhorn/novo-elements/issues/756)) ([e06d504](https://github.com/bullhorn/novo-elements/commit/e06d504))
* **value:** Changed html field displays to not strip style tags ([#772](https://github.com/bullhorn/novo-elements/issues/772)) ([afe8871](https://github.com/bullhorn/novo-elements/commit/afe8871))


### Features

* **data-table:** Handle overflow of header title and allow for spacing with the data-table pagination ([#782](https://github.com/bullhorn/novo-elements/issues/782)) ([a3676f5](https://github.com/bullhorn/novo-elements/commit/a3676f5))
* **editor:** Allow pasting of html content with styles into the editor ([#779](https://github.com/bullhorn/novo-elements/issues/779)) ([70eda0f](https://github.com/bullhorn/novo-elements/commit/70eda0f))
* **ng6:** part 1 of ng6 upgrade, using HttpClient over Http ([c70a867](https://github.com/bullhorn/novo-elements/commit/c70a867))
* **picker:** Add dept and title fields to the internal picker ([#773](https://github.com/bullhorn/novo-elements/issues/773)) ([d5a9b98](https://github.com/bullhorn/novo-elements/commit/d5a9b98))
* **tiles:** Added event emitter for when selected tiles are clicked ([#768](https://github.com/bullhorn/novo-elements/issues/768)) ([483bb90](https://github.com/bullhorn/novo-elements/commit/483bb90))
* **toast:** Emit closed event for toasts that do not have a parent el… ([#780](https://github.com/bullhorn/novo-elements/issues/780)) ([71710c4](https://github.com/bullhorn/novo-elements/commit/71710c4))



<a name="2.14.1"></a>
## [2.14.1](https://github.com/bullhorn/novo-elements/compare/v2.14.0...v2.14.1) (2018-07-24)


### Bug Fixes

* **date-filter:** Recalculating position of date picker filter ([#766](https://github.com/bullhorn/novo-elements/issues/766)) ([bbefd66](https://github.com/bullhorn/novo-elements/commit/bbefd66))



<a name="2.14.0"></a>
# [2.14.0](https://github.com/bullhorn/novo-elements/compare/v2.13.0...v2.14.0) (2018-07-23)


### Bug Fixes

* **datatable:** Fix the static data source total count, fixes [#746](https://github.com/bullhorn/novo-elements/issues/746) ([b581107](https://github.com/bullhorn/novo-elements/commit/b581107))
* **date-control:** Fixed data table dropdown styling ([#765](https://github.com/bullhorn/novo-elements/issues/765)) ([26ab2ee](https://github.com/bullhorn/novo-elements/commit/26ab2ee))
* **NovoRadio:** change styling so that hidden input has correct width ([#748](https://github.com/bullhorn/novo-elements/issues/748)) ([44e8f1c](https://github.com/bullhorn/novo-elements/commit/44e8f1c))
* **picker:** Fixing focus and opening ([cb81dfd](https://github.com/bullhorn/novo-elements/commit/cb81dfd))


### Features

* **dropdown & select:** Making the dropdown and select properly use the CDK overlay ([#742](https://github.com/bullhorn/novo-elements/issues/742)) ([d70568a](https://github.com/bullhorn/novo-elements/commit/d70568a))
* **tooltip/form:** Allowing to control tooltip size and wrapping via forms ([a428ac8](https://github.com/bullhorn/novo-elements/commit/a428ac8))



<a name="2.13.0"></a>
# [2.13.0](https://github.com/bullhorn/novo-elements/compare/v2.12.0...v2.13.0) (2018-06-22)


### Bug Fixes

* **DataTable:** Fix static table service ([ea120d0](https://github.com/bullhorn/novo-elements/commit/ea120d0))
* **datepicker:** Use right animations ([7020821](https://github.com/bullhorn/novo-elements/commit/7020821))
* **FieldInteractionAPI:** Add duplicate check to addStaticOption method ([#741](https://github.com/bullhorn/novo-elements/issues/741)) ([eff1533](https://github.com/bullhorn/novo-elements/commit/eff1533))
* **select:** Updates to select accessibility ([#743](https://github.com/bullhorn/novo-elements/issues/743)) ([068708c](https://github.com/bullhorn/novo-elements/commit/068708c))
* **tiles:** avoid disabled as input as its an error with reactive forms ([38e44a9](https://github.com/bullhorn/novo-elements/commit/38e44a9))


### Features

* **dropdown & select:** Making the dropdown and select properly use the CDK overlay ([23e443c](https://github.com/bullhorn/novo-elements/commit/23e443c))



<a name="2.12.0"></a>
# [2.12.0](https://github.com/bullhorn/novo-elements/compare/v2.11.0...v2.12.0) (2018-06-05)


### Bug Fixes

* **datatable:** Fixing data table with icons ([0ada8ca](https://github.com/bullhorn/novo-elements/commit/0ada8ca))
* **datatable:** Fixing data table with icons ([83a1b52](https://github.com/bullhorn/novo-elements/commit/83a1b52))
* **datatable:** Fixing pagination when filtering ([f6988f7](https://github.com/bullhorn/novo-elements/commit/f6988f7))
* **EntityList:** prevent meta type from being overwritten - fix ([#732](https://github.com/bullhorn/novo-elements/issues/732)) ([de8ea18](https://github.com/bullhorn/novo-elements/commit/de8ea18))
* **EntityList:** prevent meta type from being overwritten ([#731](https://github.com/bullhorn/novo-elements/issues/731)) ([392ee4f](https://github.com/bullhorn/novo-elements/commit/392ee4f))
* **NovoAutoSize:** Fix shrinking behavior of autosizing textareas ([#734](https://github.com/bullhorn/novo-elements/issues/734)) ([ca9a59f](https://github.com/bullhorn/novo-elements/commit/ca9a59f))


### Features

* **DataTable:** Making filter/sort more apparent and adding a clear button ([dbf38ec](https://github.com/bullhorn/novo-elements/commit/dbf38ec))
* **header:** Allow header to be customizable ([fb62c51](https://github.com/bullhorn/novo-elements/commit/fb62c51))



<a name="2.11.0"></a>
# [2.11.0](https://github.com/bullhorn/novo-elements/compare/v2.10.2...v2.11.0) (2018-05-24)


### Bug Fixes

* **accordion:** Remove module ids ([b737203](https://github.com/bullhorn/novo-elements/commit/b737203))
* **data-table:** Adding tooltip to action cell ([0c8df3c](https://github.com/bullhorn/novo-elements/commit/0c8df3c))
* **data-table:** Fixing position of tooltips ([9e14354](https://github.com/bullhorn/novo-elements/commit/9e14354))
* **datatable:** Fixing up some styling/logic ([320dbec](https://github.com/bullhorn/novo-elements/commit/320dbec))
* **datatable:** Safe check for expandable ([33abd60](https://github.com/bullhorn/novo-elements/commit/33abd60))
* **dropdownAndTile:** Changes to improve accessibility ([#722](https://github.com/bullhorn/novo-elements/issues/722)) ([709145e](https://github.com/bullhorn/novo-elements/commit/709145e))
* **FieldInteractionAPI:** Fix faulty logic for enable/disable events ([#723](https://github.com/bullhorn/novo-elements/issues/723)) ([0f48773](https://github.com/bullhorn/novo-elements/commit/0f48773))
* **value:** Adding proper links for Opportunities ([6601521](https://github.com/bullhorn/novo-elements/commit/6601521))
* **value:** Fixing dots and logic for value component ([be0e50e](https://github.com/bullhorn/novo-elements/commit/be0e50e))


### Features

* **datatable:** Adding expand with expand all and outside expand ([befaf90](https://github.com/bullhorn/novo-elements/commit/befaf90))
* **DataTable:** Allowing number only filters ([9ac90ab](https://github.com/bullhorn/novo-elements/commit/9ac90ab))
* **fieldinteractionapi:** Adding control for tooltip ([90509c8](https://github.com/bullhorn/novo-elements/commit/90509c8))
* **fieldinteractionapi:** Adding emiter for events from API ([ad9c92d](https://github.com/bullhorn/novo-elements/commit/ad9c92d))
* **wizard:** making a stepped wizard ([#677](https://github.com/bullhorn/novo-elements/issues/677)) ([32382d0](https://github.com/bullhorn/novo-elements/commit/32382d0))



<a name="2.10.2"></a>
## [2.10.2](https://github.com/bullhorn/novo-elements/compare/v2.10.1...v2.10.2) (2018-04-27)



<a name="2.10.1"></a>
## [2.10.1](https://github.com/bullhorn/novo-elements/compare/v2.10.0...v2.10.1) (2018-04-27)


### Bug Fixes

* **address:** looking at countryID and not country ([#711](https://github.com/bullhorn/novo-elements/issues/711)) ([24d06d4](https://github.com/bullhorn/novo-elements/commit/24d06d4))



<a name="2.10.0"></a>
# [2.10.0](https://github.com/bullhorn/novo-elements/compare/v2.9.4...v2.10.0) (2018-04-27)


### Bug Fixes

* **addresss:** Allow address to be populated without a country supplied ([e080daa](https://github.com/bullhorn/novo-elements/commit/e080daa))
* **checkbox:** Fixing checkbox, swallowing event ([7d748da](https://github.com/bullhorn/novo-elements/commit/7d748da))
* **control:** Allow passing of fileBrowserImageUploadUrl to controls inside forms ([fa0f077](https://github.com/bullhorn/novo-elements/commit/fa0f077))
* **data-table:** Fixing data-automation-id ([0d7dc18](https://github.com/bullhorn/novo-elements/commit/0d7dc18))
* **data-table:** Fixing subscription checks ([3b98da3](https://github.com/bullhorn/novo-elements/commit/3b98da3))
* **datatable:** allowing for custom templates to be passed via input ([4f19122](https://github.com/bullhorn/novo-elements/commit/4f19122))
* **datatable:** empty styling ([edf90f1](https://github.com/bullhorn/novo-elements/commit/edf90f1))
* **datatable:** fixing filtering ([94b8a42](https://github.com/bullhorn/novo-elements/commit/94b8a42))
* **datatable:** Fixing missing export ([7caf8f6](https://github.com/bullhorn/novo-elements/commit/7caf8f6))
* **datatable:** Fixing pagination/filtering ([5e88e57](https://github.com/bullhorn/novo-elements/commit/5e88e57))
* **datatable:** Fixing template name ([088f470](https://github.com/bullhorn/novo-elements/commit/088f470))
* **datatable:** loading styles, header icon ([70ad42b](https://github.com/bullhorn/novo-elements/commit/70ad42b))
* **datatable:** lots of fixes and improvements ([a8b5a9f](https://github.com/bullhorn/novo-elements/commit/a8b5a9f))
* **datatable:** styling and percent cell ([bd908a1](https://github.com/bullhorn/novo-elements/commit/bd908a1))
* **datepicker:** allowInvalidDate with standard date formats ([#709](https://github.com/bullhorn/novo-elements/issues/709)) ([10d8f6d](https://github.com/bullhorn/novo-elements/commit/10d8f6d))
* **datetimepicker:** properly check invalid date ([#710](https://github.com/bullhorn/novo-elements/issues/710)) ([e45413a](https://github.com/bullhorn/novo-elements/commit/e45413a))
* **editor:** adding param for file browser image ([ff43753](https://github.com/bullhorn/novo-elements/commit/ff43753))
* **file control:** Fix drop handler ([e9b6577](https://github.com/bullhorn/novo-elements/commit/e9b6577))
* **picker:** Infinite scrolling ([a039a24](https://github.com/bullhorn/novo-elements/commit/a039a24))
* **simple-table:** fixing custom range toggle so it doesn't close the filter ([#701](https://github.com/bullhorn/novo-elements/issues/701)) ([6af617b](https://github.com/bullhorn/novo-elements/commit/6af617b))
* **simple-table:** fixing the custom date range filter ([#699](https://github.com/bullhorn/novo-elements/issues/699)) ([99ac551](https://github.com/bullhorn/novo-elements/commit/99ac551))
* **skills picker:** limit results to 200 ([#692](https://github.com/bullhorn/novo-elements/issues/692)) ([3e15487](https://github.com/bullhorn/novo-elements/commit/3e15487))


### Features

* **Address:** hide subfields ([fcd7383](https://github.com/bullhorn/novo-elements/commit/fcd7383))
* **data-table:** Adding output for preferences ([90b8232](https://github.com/bullhorn/novo-elements/commit/90b8232))
* **data-table:** Adding row expand and footer abilities ([3985684](https://github.com/bullhorn/novo-elements/commit/3985684))
* **data-table:** Adding row expand and footer abilities ([d536fe3](https://github.com/bullhorn/novo-elements/commit/d536fe3))
* **datatable:** Allowing for a way to refresh data from the outside ([ae2dacf](https://github.com/bullhorn/novo-elements/commit/ae2dacf))
* **datepicker:**  support for looser date formats and different locale options ([6f1c893](https://github.com/bullhorn/novo-elements/commit/6f1c893))
* **datepicker:**  support for looser date formats and different locale options ([594c202](https://github.com/bullhorn/novo-elements/commit/594c202))



<a name="2.9.4"></a>
## [2.9.4](https://github.com/bullhorn/novo-elements/compare/v2.9.1...v2.9.4) (2018-03-30)


### Bug Fixes

* **datatable:** Fixing bad import ([07d2a99](https://github.com/bullhorn/novo-elements/commit/07d2a99))
* **dropdown:** Fix missing event property ([2cebe10](https://github.com/bullhorn/novo-elements/commit/2cebe10))



<a name="2.9.1"></a>
## [2.9.1](https://github.com/bullhorn/novo-elements/compare/v2.9.0...v2.9.1) (2018-03-30)


### Bug Fixes

* **modal,picker:** Fixing bad styling causing issues ([c77bada](https://github.com/bullhorn/novo-elements/commit/c77bada))



<a name="2.9.0"></a>
# [2.9.0](https://github.com/bullhorn/novo-elements/compare/v2.8.0...v2.9.0) (2018-03-29)


### Bug Fixes

* **button:** Removing old tests ([4f86568](https://github.com/bullhorn/novo-elements/commit/4f86568))
* **datatable:** Fixing observable properties ([449f847](https://github.com/bullhorn/novo-elements/commit/449f847))
* **datatable:** Fixing performance and pagination of data tables ([1948d5a](https://github.com/bullhorn/novo-elements/commit/1948d5a))
* **datatable:** Performance fixes for data table ([4ab3816](https://github.com/bullhorn/novo-elements/commit/4ab3816))


### Features

* **datetime:** reconfiguring date time pickers to be more user friendly ([9b8eb44](https://github.com/bullhorn/novo-elements/commit/9b8eb44))



<a name="2.8.0"></a>
# [2.8.0](https://github.com/bullhorn/novo-elements/compare/v2.7.0...v2.8.0) (2018-03-27)


### Bug Fixes

* **datatable:** Fixing AOT builds using DataTable ([19d4f99](https://github.com/bullhorn/novo-elements/commit/19d4f99))
* **datatable:** Fixing AOT builds using DataTable ([5fc3194](https://github.com/bullhorn/novo-elements/commit/5fc3194))
* **datatable:** Fixing interface ([dae0928](https://github.com/bullhorn/novo-elements/commit/dae0928))
* **datatable:** Removing CDK workaround ([057ab1f](https://github.com/bullhorn/novo-elements/commit/057ab1f))
* **form:** Fixing bad form scss that causes new CLI applications to break ([0ecb2b8](https://github.com/bullhorn/novo-elements/commit/0ecb2b8))
* **picker:** Change to try fetching label before setting value ([#683](https://github.com/bullhorn/novo-elements/issues/683)) ([c02b2fc](https://github.com/bullhorn/novo-elements/commit/c02b2fc))
* **table:** Adding extra col span if table has selection ([3ae2cf2](https://github.com/bullhorn/novo-elements/commit/3ae2cf2))


### Features

* **data-table:** Adding a data table implementation using CDK table ([2bf5364](https://github.com/bullhorn/novo-elements/commit/2bf5364))
* **data-table:** Adding a data table implementation using CDK table ([4415d68](https://github.com/bullhorn/novo-elements/commit/4415d68))
* **datatable:** Allowing for custom attributes in cell config ([60110dd](https://github.com/bullhorn/novo-elements/commit/60110dd))
* **fileinput:** Allowing for edit/delete/save on file input ([7f7d4d0](https://github.com/bullhorn/novo-elements/commit/7f7d4d0))
* **fileinput:** Allowing for upload on file input ([c4d8cad](https://github.com/bullhorn/novo-elements/commit/c4d8cad))



<a name="2.7.0"></a>
# [2.7.0](https://github.com/bullhorn/novo-elements/compare/v2.6.1...v2.7.0) (2018-03-13)


### Bug Fixes

* **cards:** Adding tooltip input and fixing styles ([150d1ca](https://github.com/bullhorn/novo-elements/commit/150d1ca))
* **exports:** fixed missing export for NovoCheckListElement ([019af4c](https://github.com/bullhorn/novo-elements/commit/019af4c))
* **overlay:** Fixing overlay sizing strategy ([62c1c55](https://github.com/bullhorn/novo-elements/commit/62c1c55))
* **pickers:** Clearing results on new picker search ([87e5d1f](https://github.com/bullhorn/novo-elements/commit/87e5d1f))


### Features

* **dragula:** Using custom build with support for drag thresholds ([cfffb08](https://github.com/bullhorn/novo-elements/commit/cfffb08))



<a name="2.6.1"></a>
## [2.6.1](https://github.com/bullhorn/novo-elements/compare/v2.6.0...v2.6.1) (2018-03-07)



<a name="2.6.0"></a>
# [2.6.0](https://github.com/bullhorn/novo-elements/compare/v2.5.1...v2.6.0) (2018-03-07)


### Bug Fixes

* **chips:** when selecting items do not scroll to top everytime ([3ea25a6](https://github.com/bullhorn/novo-elements/commit/3ea25a6))
* **countries:** Adding missing countries ([efa5239](https://github.com/bullhorn/novo-elements/commit/efa5239))
* **picker:** Only resetting values on new search ([0e6acaa](https://github.com/bullhorn/novo-elements/commit/0e6acaa))


### Features

* **table:** Adding id and name to the table and rows ([2a220a7](https://github.com/bullhorn/novo-elements/commit/2a220a7))



<a name="2.5.1"></a>
## [2.5.1](https://github.com/bullhorn/novo-elements/compare/v2.5.0...v2.5.1) (2018-02-28)



<a name="2.5.0"></a>
# [2.5.0](https://github.com/bullhorn/novo-elements/compare/v2.4.1...v2.5.0) (2018-02-23)


### Bug Fixes

* **AppBridge:** Handling of WindowName was errorenous in register events ([#654](https://github.com/bullhorn/novo-elements/issues/654)) ([2b0102e](https://github.com/bullhorn/novo-elements/commit/2b0102e))
* **autofocus:** Fixing autofocus on ckeditor ([77d1995](https://github.com/bullhorn/novo-elements/commit/77d1995))
* **cards:** Change to correctly display close and move tooltips on cards ([#662](https://github.com/bullhorn/novo-elements/issues/662)) ([058e61e](https://github.com/bullhorn/novo-elements/commit/058e61e))
* **control:** Do not autofocus for date/time/datetime controls either ([5f6bd08](https://github.com/bullhorn/novo-elements/commit/5f6bd08))
* **counties:** Reorder the countries file ([96cb41f](https://github.com/bullhorn/novo-elements/commit/96cb41f))
* **counties:** Reorder the countries file ([aca7a71](https://github.com/bullhorn/novo-elements/commit/aca7a71))
* **counties:** Reorder the countries file ([a4d66f7](https://github.com/bullhorn/novo-elements/commit/a4d66f7))
* **countries:** Remove spaces from certain States and pull in new Countries data ([#661](https://github.com/bullhorn/novo-elements/issues/661)) ([90b36bc](https://github.com/bullhorn/novo-elements/commit/90b36bc))
* **entitylist:** scoping the component to novo ([fa4831b](https://github.com/bullhorn/novo-elements/commit/fa4831b))
* **exports:** Fixing missing export for CalendarDateChangeElement ([3524bc9](https://github.com/bullhorn/novo-elements/commit/3524bc9))
* **form:** Fixing autofocus, ignoring pickers ([79bb908](https://github.com/bullhorn/novo-elements/commit/79bb908))
* **optionsservice:** Invalid provider ([05c7024](https://github.com/bullhorn/novo-elements/commit/05c7024))
* **picker:** Use owner name in EntityPickerResults ([#657](https://github.com/bullhorn/novo-elements/issues/657)) ([554699a](https://github.com/bullhorn/novo-elements/commit/554699a))
* **quicknote:** Fixing placeholder from showing when autofocus ([8db6813](https://github.com/bullhorn/novo-elements/commit/8db6813))
* **quicknote:** Fixing quick note hide and adding resizable header ([b6c0200](https://github.com/bullhorn/novo-elements/commit/b6c0200))
* **style:** Fixing a lot of padding/margins/colors after UX review ([0847aea](https://github.com/bullhorn/novo-elements/commit/0847aea))
* **table:** Change to allow table changed event to emit ([#651](https://github.com/bullhorn/novo-elements/issues/651)) ([dce4b79](https://github.com/bullhorn/novo-elements/commit/dce4b79))
* **toast:** Allowing message to render html ([f84e72c](https://github.com/bullhorn/novo-elements/commit/f84e72c))


### Features

* **address:** Adding support for autocomplete ([29aa46d](https://github.com/bullhorn/novo-elements/commit/29aa46d))
* **ComponentUtils:** Adding util to append to top of container ([3b5b232](https://github.com/bullhorn/novo-elements/commit/3b5b232))
* **control:** Supporting autocomplete ([21f959b](https://github.com/bullhorn/novo-elements/commit/21f959b))
* **entity-list:** Adding entity list preview to value ([1524077](https://github.com/bullhorn/novo-elements/commit/1524077))
* **form:** Adding autofocus input to dynamic form and controls ([3b7c494](https://github.com/bullhorn/novo-elements/commit/3b7c494))
* **picker:** Add owner to EntityPickerResults for Candidate ([#656](https://github.com/bullhorn/novo-elements/issues/656)) ([c4398ab](https://github.com/bullhorn/novo-elements/commit/c4398ab))
* **security, entity-util, form-utils:** Adding more utilities and moving over more pickers ([129103f](https://github.com/bullhorn/novo-elements/commit/129103f))
* **value:** clean up value component ([47e6a05](https://github.com/bullhorn/novo-elements/commit/47e6a05))



<a name="2.4.1"></a>
## [2.4.1](https://github.com/bullhorn/novo-elements/compare/v2.4.0...v2.4.1) (2018-01-25)


### Bug Fixes

* **counties:** Reorder the countries file ([d760383](https://github.com/bullhorn/novo-elements/commit/d760383))
* **table:** multi select filter ([1a08f3a](https://github.com/bullhorn/novo-elements/commit/1a08f3a))
* **value:** Fixing display for value component ([d4d8a6b](https://github.com/bullhorn/novo-elements/commit/d4d8a6b))


### Features

* **EntityUtils:** Adding Tearsheet to entity names ([6f58902](https://github.com/bullhorn/novo-elements/commit/6f58902))
* **pickers:** Added support for array in getLabels for Picker Element, unit tests and code cleanup ([#635](https://github.com/bullhorn/novo-elements/issues/635)) ([196a3bb](https://github.com/bullhorn/novo-elements/commit/196a3bb))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/bullhorn/novo-elements/compare/v2.2.0...v2.3.0) (2017-12-27)


### Bug Fixes

* **form:** respect override on entity picker ([73074dd](https://github.com/bullhorn/novo-elements/commit/73074dd))
* **providers:** adding DateFormatService to provider module ([5ea88bf](https://github.com/bullhorn/novo-elements/commit/5ea88bf))
* **simple-table:** Fixing filters when false ([5cc3f49](https://github.com/bullhorn/novo-elements/commit/5cc3f49))


### Features

* **ace-editor:** Adding in an ace editor control and form control ([5d938e8](https://github.com/bullhorn/novo-elements/commit/5d938e8))
* **ace-editor:** Adding in an ace editor control and form control ([b84e736](https://github.com/bullhorn/novo-elements/commit/b84e736))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/bullhorn/novo-elements/compare/v2.1.70...v2.2.0) (2017-12-07)



<a name="2.1.70"></a>
## [2.1.70](https://github.com/bullhorn/novo-elements/compare/v2.1.69...v2.1.70) (2017-11-30)


### Bug Fixes

* **simple-table:** Fixing pagination when filtering ([d8c97cb](https://github.com/bullhorn/novo-elements/commit/d8c97cb))



<a name="2.1.69"></a>
## [2.1.69](https://github.com/bullhorn/novo-elements/compare/v2.1.68...v2.1.69) (2017-11-29)


### Bug Fixes

* **simple-table:** Fixing simple table pagination ([b2ebd2e](https://github.com/bullhorn/novo-elements/commit/b2ebd2e))



<a name="2.1.68"></a>
## [2.1.68](https://github.com/bullhorn/novo-elements/compare/v2.1.67...v2.1.68) (2017-11-29)


### Features

* **field-interaction-api:** Adding way to get associations via FAPI ([0c964cf](https://github.com/bullhorn/novo-elements/commit/0c964cf))



<a name="2.1.67"></a>
## [2.1.67](https://github.com/bullhorn/novo-elements/compare/v2.1.66...v2.1.67) (2017-11-28)


### Features

* **counties:** Adding more countries/states ([3d8c737](https://github.com/bullhorn/novo-elements/commit/3d8c737))
* **form:** Adding tooltip to encrypted form control ([302e68e](https://github.com/bullhorn/novo-elements/commit/302e68e))



<a name="2.1.66"></a>
## [2.1.66](https://github.com/bullhorn/novo-elements/compare/v2.1.65...v2.1.66) (2017-11-27)


### Bug Fixes

* **simpletable:** Fixing simple table filters with value/label ([ad81494](https://github.com/bullhorn/novo-elements/commit/ad81494))



<a name="2.1.65"></a>
## [2.1.65](https://github.com/bullhorn/novo-elements/compare/v2.1.64...v2.1.65) (2017-11-22)


### Features

* **appbridge:** Adding callbacks ([940edfa](https://github.com/bullhorn/novo-elements/commit/940edfa))



<a name="2.1.64"></a>
## [2.1.64](https://github.com/bullhorn/novo-elements/compare/v2.1.63...v2.1.64) (2017-11-22)


### Bug Fixes

* **simpletable:** Fixing pagination to display current filter size ([c78e0a3](https://github.com/bullhorn/novo-elements/commit/c78e0a3))


### Features

* **ckeditor:** Adding minimal flag and options to Forms ([57c03c0](https://github.com/bullhorn/novo-elements/commit/57c03c0))
* **Places:** exporting the GoogleServiceService ([#582](https://github.com/bullhorn/novo-elements/issues/582)) ([7be6555](https://github.com/bullhorn/novo-elements/commit/7be6555))
* **Places:** exporting the GoogleServiceService missing dependencies ([#583](https://github.com/bullhorn/novo-elements/issues/583)) ([f2367da](https://github.com/bullhorn/novo-elements/commit/f2367da))



<a name="2.1.63"></a>
## [2.1.63](https://github.com/bullhorn/novo-elements/compare/v2.1.62...v2.1.63) (2017-11-17)


### Bug Fixes

* **form:** converting toString for integer values  ([41f8ebb](https://github.com/bullhorn/novo-elements/commit/41f8ebb))



<a name="2.1.62"></a>
## [2.1.62](https://github.com/bullhorn/novo-elements/compare/v2.1.61...v2.1.62) (2017-11-16)


### Features

* **control-group:** Added an onAdd output ([e586aaa](https://github.com/bullhorn/novo-elements/commit/e586aaa))



<a name="2.1.61"></a>
## [2.1.61](https://github.com/bullhorn/novo-elements/compare/v2.1.60...v2.1.61) (2017-11-15)


### Bug Fixes

* **control:** move lock outside of label to better handle multi-line label ([#579](https://github.com/bullhorn/novo-elements/issues/579)) ([ab2409f](https://github.com/bullhorn/novo-elements/commit/ab2409f))



<a name="2.1.60"></a>
## [2.1.60](https://github.com/bullhorn/novo-elements/compare/v2.1.59...v2.1.60) (2017-11-15)



<a name="2.1.59"></a>
## [2.1.59](https://github.com/bullhorn/novo-elements/compare/v2.1.58...v2.1.59) (2017-11-14)


### Bug Fixes

* **groupcontrol:** Remove duplicate key ([ac19828](https://github.com/bullhorn/novo-elements/commit/ac19828))



<a name="2.1.58"></a>
## [2.1.58](https://github.com/bullhorn/novo-elements/compare/v2.1.57...v2.1.58) (2017-11-14)


### Features

* **groupcontrol:** Adding way to provide custom row for the controls ([dcd535a](https://github.com/bullhorn/novo-elements/commit/dcd535a))



<a name="2.1.57"></a>
## [2.1.57](https://github.com/bullhorn/novo-elements/compare/v2.1.56...v2.1.57) (2017-11-14)


### Bug Fixes

* **value:** Fixing value file name ([8c8b697](https://github.com/bullhorn/novo-elements/commit/8c8b697))



<a name="2.1.56"></a>
## [2.1.56](https://github.com/bullhorn/novo-elements/compare/v2.1.55...v2.1.56) (2017-11-13)


### Features

* **form:** Adding encrypted field icon ([2e3f243](https://github.com/bullhorn/novo-elements/commit/2e3f243))



<a name="2.1.55"></a>
## [2.1.55](https://github.com/bullhorn/novo-elements/compare/v2.1.54...v2.1.55) (2017-11-13)



<a name="2.1.54"></a>
## [2.1.54](https://github.com/bullhorn/novo-elements/compare/v2.1.53...v2.1.54) (2017-11-13)


### Features

* **value&renderer:** Adding elements to render values based on meta ([75b864c](https://github.com/bullhorn/novo-elements/commit/75b864c))



<a name="2.1.53"></a>
## [2.1.53](https://github.com/bullhorn/novo-elements/compare/v2.1.52...v2.1.53) (2017-11-10)


### Bug Fixes

* **automation:** adding data-automation-ids properly ([a073402](https://github.com/bullhorn/novo-elements/commit/a073402))



<a name="2.1.52"></a>
## [2.1.52](https://github.com/bullhorn/novo-elements/compare/v2.1.51...v2.1.52) (2017-11-08)



<a name="2.1.51"></a>
## [2.1.51](https://github.com/bullhorn/novo-elements/compare/v2.1.50...v2.1.51) (2017-11-08)


### Bug Fixes

* **controlgroup:** Fixing logic for Control group ([5e659c2](https://github.com/bullhorn/novo-elements/commit/5e659c2))



<a name="2.1.50"></a>
## [2.1.50](https://github.com/bullhorn/novo-elements/compare/v2.1.49...v2.1.50) (2017-11-06)


### Bug Fixes

* **appbridge:** Minor improvements to app bridge ([71469f9](https://github.com/bullhorn/novo-elements/commit/71469f9))
* **AppBridge:** Request Data didn't process the results data correctly ([#568](https://github.com/bullhorn/novo-elements/issues/568)) ([480a0eb](https://github.com/bullhorn/novo-elements/commit/480a0eb))



<a name="2.1.49"></a>
## [2.1.49](https://github.com/bullhorn/novo-elements/compare/v2.1.48...v2.1.49) (2017-11-03)


### Bug Fixes

* **controlgroup:** Fixing initial value / dfault items ([2609a49](https://github.com/bullhorn/novo-elements/commit/2609a49))



<a name="2.1.48"></a>
## [2.1.48](https://github.com/bullhorn/novo-elements/compare/v2.1.47...v2.1.48) (2017-11-02)


### Bug Fixes

* **simple-table:** Fixing date filters ([2a9848d](https://github.com/bullhorn/novo-elements/commit/2a9848d))



<a name="2.1.47"></a>
## [2.1.47](https://github.com/bullhorn/novo-elements/compare/v2.1.46...v2.1.47) (2017-11-02)


### Bug Fixes

* **groupedpicker:** Fixing up the way the matching works, allowing the user to override ([c537cc0](https://github.com/bullhorn/novo-elements/commit/c537cc0))



<a name="2.1.46"></a>
## [2.1.46](https://github.com/bullhorn/novo-elements/compare/v2.1.45...v2.1.46) (2017-11-01)


### Bug Fixes

* **controlgroup:** Fixing bad import ([1d5be2a](https://github.com/bullhorn/novo-elements/commit/1d5be2a))



<a name="2.1.45"></a>
## [2.1.45](https://github.com/bullhorn/novo-elements/compare/v2.1.44...v2.1.45) (2017-11-01)


### Features

* **picker:** Entity picker & grouped results with selection ([b9c9db7](https://github.com/bullhorn/novo-elements/commit/b9c9db7))



<a name="2.1.44"></a>
## [2.1.44](https://github.com/bullhorn/novo-elements/compare/v2.1.43...v2.1.44) (2017-10-31)


### Bug Fixes

* **datepicker,controlgroup,simpletable:** Misc fixes ([affd868](https://github.com/bullhorn/novo-elements/commit/affd868))



<a name="2.1.43"></a>
## [2.1.43](https://github.com/bullhorn/novo-elements/compare/v2.1.42...v2.1.43) (2017-10-28)


### Features

* **datepicker:** Adding weekstart input ([1494b85](https://github.com/bullhorn/novo-elements/commit/1494b85))



<a name="2.1.42"></a>
## [2.1.42](https://github.com/bullhorn/novo-elements/compare/v2.1.41...v2.1.42) (2017-10-28)


### Features

* **datepicker:** Adding weekstart input ([aa98122](https://github.com/bullhorn/novo-elements/commit/aa98122))



<a name="2.1.41"></a>
## [2.1.41](https://github.com/bullhorn/novo-elements/compare/v2.1.40...v2.1.41) (2017-10-28)


### Bug Fixes

* **overlay:** using markForCheck, not detectChanges ([ee226f0](https://github.com/bullhorn/novo-elements/commit/ee226f0))



<a name="2.1.40"></a>
## [2.1.40](https://github.com/bullhorn/novo-elements/compare/v2.1.39...v2.1.40) (2017-10-27)


### Bug Fixes

* **overlay:** Safe check ([ef4aa67](https://github.com/bullhorn/novo-elements/commit/ef4aa67))



<a name="2.1.39"></a>
## [2.1.39](https://github.com/bullhorn/novo-elements/compare/v2.1.38...v2.1.39) (2017-10-27)


### Bug Fixes

* **datepicker/table:** Fixing date picker month/year pickers and table styling ([f954b1d](https://github.com/bullhorn/novo-elements/commit/f954b1d))
* **fieldinteractions:** Fixing confirm/prompt from popping up a lot ([15aebea](https://github.com/bullhorn/novo-elements/commit/15aebea))



<a name="2.1.38"></a>
## [2.1.38](https://github.com/bullhorn/novo-elements/compare/v2.1.37...v2.1.38) (2017-10-26)


### Features

* **controlgroup:** Allowing control over edit/delete buttons ([7128a76](https://github.com/bullhorn/novo-elements/commit/7128a76))



<a name="2.1.37"></a>
## [2.1.37](https://github.com/bullhorn/novo-elements/compare/v2.1.36...v2.1.37) (2017-10-25)


### Features

* **datepicker:** Adding in a week range selector ([8ca5942](https://github.com/bullhorn/novo-elements/commit/8ca5942))



<a name="2.1.36"></a>
## [2.1.36](https://github.com/bullhorn/novo-elements/compare/v2.1.35...v2.1.36) (2017-10-24)



<a name="2.1.35"></a>
## [2.1.35](https://github.com/bullhorn/novo-elements/compare/v2.1.34...v2.1.35) (2017-10-24)


### Features

* **controlgroup:** Minor fixes to UX/styles ([4586b52](https://github.com/bullhorn/novo-elements/commit/4586b52))



<a name="2.1.34"></a>
## [2.1.34](https://github.com/bullhorn/novo-elements/compare/v2.1.33...v2.1.34) (2017-10-22)


### Features

* **fieldinteractions:** Adding current entity/id, toast cascading, prompt user ([1f3e070](https://github.com/bullhorn/novo-elements/commit/1f3e070))
* **fieldinteractions:** Adding current entity/id, toast cascading, prompt user-n ([e9d89fd](https://github.com/bullhorn/novo-elements/commit/e9d89fd))



<a name="2.1.33"></a>
## [2.1.33](https://github.com/bullhorn/novo-elements/compare/v2.1.32...v2.1.33) (2017-10-19)


### Bug Fixes

* **select:** Fixing select from marking forms dirty ([1aae05b](https://github.com/bullhorn/novo-elements/commit/1aae05b))



<a name="2.1.32"></a>
## [2.1.32](https://github.com/bullhorn/novo-elements/compare/v2.1.31...v2.1.32) (2017-10-18)


### Bug Fixes

* **controlgroup:** Fixing labels position ([afe1096](https://github.com/bullhorn/novo-elements/commit/afe1096))



<a name="2.1.31"></a>
## [2.1.31](https://github.com/bullhorn/novo-elements/compare/v2.1.30...v2.1.31) (2017-10-18)


### Bug Fixes

* **simple-table:** Fixing filter state and filter ids ([1cca4b1](https://github.com/bullhorn/novo-elements/commit/1cca4b1))


### Features

* **control:** Allowing for checkbox control to allow for inline label ([7ce0114](https://github.com/bullhorn/novo-elements/commit/7ce0114))



<a name="2.1.30"></a>
## [2.1.30](https://github.com/bullhorn/novo-elements/compare/v2.1.29...v2.1.30) (2017-10-18)


### Bug Fixes

* **grouped-control:** Fixing styling and functionality of grouped control ([b499702](https://github.com/bullhorn/novo-elements/commit/b499702))



<a name="2.1.29"></a>
## [2.1.29](https://github.com/bullhorn/novo-elements/compare/v2.1.28...v2.1.29) (2017-10-17)


### Features

* **tooltip,tipwell,toast:** Allowing multi-line, fixes [#564](https://github.com/bullhorn/novo-elements/issues/564) ([e0705cb](https://github.com/bullhorn/novo-elements/commit/e0705cb))



<a name="2.1.28"></a>
## [2.1.28](https://github.com/bullhorn/novo-elements/compare/v2.1.27...v2.1.28) (2017-10-17)


### Features

* **forms:** Adding additional methods into FieldInteractionAPI ([34f3502](https://github.com/bullhorn/novo-elements/commit/34f3502))



<a name="2.1.27"></a>
## [2.1.27](https://github.com/bullhorn/novo-elements/compare/v2.1.26...v2.1.27) (2017-10-15)


### Features

* **control-group:** Added a new control for Forms with grouped sections ([a51ab3a](https://github.com/bullhorn/novo-elements/commit/a51ab3a))



<a name="2.1.26"></a>
## [2.1.26](https://github.com/bullhorn/novo-elements/compare/v2.1.25...v2.1.26) (2017-10-07)


### Bug Fixes

* **searchbox:** fixing debounce of output ([0642ee4](https://github.com/bullhorn/novo-elements/commit/0642ee4))



<a name="2.1.25"></a>
## [2.1.25](https://github.com/bullhorn/novo-elements/compare/v2.1.24...v2.1.25) (2017-10-07)


### Features

* **simpletable:** Adding outside filter input ([05c13c8](https://github.com/bullhorn/novo-elements/commit/05c13c8))



<a name="2.1.24"></a>
## [2.1.24](https://github.com/bullhorn/novo-elements/compare/v2.1.23...v2.1.24) (2017-10-06)



<a name="2.1.23"></a>
## [2.1.23](https://github.com/bullhorn/novo-elements/compare/v2.1.22...v2.1.23) (2017-10-05)



<a name="2.1.22"></a>
## [2.1.22](https://github.com/bullhorn/novo-elements/compare/v2.1.21...v2.1.22) (2017-10-05)



<a name="2.1.21"></a>
## [2.1.21](https://github.com/bullhorn/novo-elements/compare/v2.1.20...v2.1.21) (2017-10-05)


### Bug Fixes

* **picker:** Fixing pickers/results to work with ChangeDetection.OnPush ([5972dfd](https://github.com/bullhorn/novo-elements/commit/5972dfd))
* **picker:** Fixing pickers/results to work with ChangeDetection.OnPush - tests ([aa71520](https://github.com/bullhorn/novo-elements/commit/aa71520))



<a name="2.1.20"></a>
## [2.1.20](https://github.com/bullhorn/novo-elements/compare/v2.1.19...v2.1.20) (2017-10-04)



<a name="2.1.19"></a>
## [2.1.19](https://github.com/bullhorn/novo-elements/compare/v2.1.18...v2.1.19) (2017-10-04)


### Bug Fixes

* **simple-table:** Some minor style and logic fixes ([8d5b3df](https://github.com/bullhorn/novo-elements/commit/8d5b3df))
* **simpletable:** Fixing sort/filter state ([36f1407](https://github.com/bullhorn/novo-elements/commit/36f1407))



<a name="2.1.18"></a>
## [2.1.18](https://github.com/bullhorn/novo-elements/compare/v2.1.17...v2.1.18) (2017-10-04)


### Bug Fixes

* **overlay:** event was no longer used but still lingered ([#561](https://github.com/bullhorn/novo-elements/issues/561)) ([6e3d4e3](https://github.com/bullhorn/novo-elements/commit/6e3d4e3))



<a name="2.1.17"></a>
## [2.1.17](https://github.com/bullhorn/novo-elements/compare/v2.1.16...v2.1.17) (2017-10-03)


### Bug Fixes

* **textarea:** Allow for scrolling and resizing ([f379601](https://github.com/bullhorn/novo-elements/commit/f379601))


### Features

* **AppBridge:** Added a Developer mode for AppBridge ([#560](https://github.com/bullhorn/novo-elements/issues/560)) ([b53bafa](https://github.com/bullhorn/novo-elements/commit/b53bafa))



<a name="2.1.16"></a>
## [2.1.16](https://github.com/bullhorn/novo-elements/compare/v2.1.15...v2.1.16) (2017-10-03)



<a name="2.1.15"></a>
## [2.1.15](https://github.com/bullhorn/novo-elements/compare/v2.1.14...v2.1.15) (2017-10-03)


### Bug Fixes

* **table:** Fixing some state issues with the table ([ad3e423](https://github.com/bullhorn/novo-elements/commit/ad3e423))



<a name="2.1.14"></a>
## [2.1.14](https://github.com/bullhorn/novo-elements/compare/v2.1.13...v2.1.14) (2017-10-03)



<a name="2.1.13"></a>
## [2.1.13](https://github.com/bullhorn/novo-elements/compare/v2.1.12...v2.1.13) (2017-10-03)


### Features

* **grouped-multi-picker:** Adding result template for Chips for a category picker ([161ff58](https://github.com/bullhorn/novo-elements/commit/161ff58))
* **grouped-multi-picker:** Adding result template for Chips for a category picker ([2466bfc](https://github.com/bullhorn/novo-elements/commit/2466bfc))



<a name="2.1.12"></a>
## [2.1.12](https://github.com/bullhorn/novo-elements/compare/v2.1.11...v2.1.12) (2017-10-02)


### Bug Fixes

* **textarea:** Fixing how text-area resizes ([9fccd7a](https://github.com/bullhorn/novo-elements/commit/9fccd7a))


### Features

* **simpletable:** Adding a simpler table to setup that is very opinionated on how to sort/filter/etc" ([0d3b2dd](https://github.com/bullhorn/novo-elements/commit/0d3b2dd))



<a name="2.1.11"></a>
## [2.1.11](https://github.com/bullhorn/novo-elements/compare/v2.1.10...v2.1.11) (2017-09-27)



<a name="2.1.10"></a>
## [2.1.10](https://github.com/bullhorn/novo-elements/compare/v2.1.9...v2.1.10) (2017-09-21)


### Bug Fixes

* **Select:** Styles and timings messed with Append to body ([#549](https://github.com/bullhorn/novo-elements/issues/549)) ([1aff21e](https://github.com/bullhorn/novo-elements/commit/1aff21e))



<a name="2.1.9"></a>
## [2.1.9](https://github.com/bullhorn/novo-elements/compare/v2.1.8...v2.1.9) (2017-09-19)


### Features

* **searchbox & picker:** Adding search box component, fab button, making picker append to body better ([eea708e](https://github.com/bullhorn/novo-elements/commit/eea708e))



<a name="2.1.8"></a>
## [2.1.8](https://github.com/bullhorn/novo-elements/compare/v2.1.7...v2.1.8) (2017-09-15)


### Features

* **appbridge:** cascade event down ([876f332](https://github.com/bullhorn/novo-elements/commit/876f332))



<a name="2.1.7"></a>
## [2.1.7](https://github.com/bullhorn/novo-elements/compare/v2.1.6...v2.1.7) (2017-09-14)


### Features

* **fieldinteractions:** Adding more API docs ([cb4706e](https://github.com/bullhorn/novo-elements/commit/cb4706e))



<a name="2.1.6"></a>
## [2.1.6](https://github.com/bullhorn/novo-elements/compare/v2.1.5...v2.1.6) (2017-09-13)


### Features

* **Select:** Select now Appends to Body ([ee20da8](https://github.com/bullhorn/novo-elements/commit/ee20da8))



<a name="2.1.5"></a>
## [2.1.5](https://github.com/bullhorn/novo-elements/compare/v2.1.4...v2.1.5) (2017-09-13)


### Bug Fixes

* **select:** Fixing select where it was marking the form as dirty ([fb1ec2a](https://github.com/bullhorn/novo-elements/commit/fb1ec2a))
* **select:** Fixing select where it was marking the form as dirty ([189a4d1](https://github.com/bullhorn/novo-elements/commit/189a4d1))
* **select:** Fixing select where it was marking the form as dirty ([8178707](https://github.com/bullhorn/novo-elements/commit/8178707))



<a name="2.1.4"></a>
## [2.1.4](https://github.com/bullhorn/novo-elements/compare/v2.1.3...v2.1.4) (2017-09-11)


### Bug Fixes

* **select:** Fixing select values when re-using a form ([b0c69d2](https://github.com/bullhorn/novo-elements/commit/b0c69d2))



<a name="2.1.3"></a>
## [2.1.3](https://github.com/bullhorn/novo-elements/compare/v2.1.2...v2.1.3) (2017-09-09)


### Features

* **tabs:** condensed version ([4a415a4](https://github.com/bullhorn/novo-elements/commit/4a415a4))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/bullhorn/novo-elements/compare/v2.1.1...v2.1.2) (2017-09-08)


### Bug Fixes

* **address:** Fixing flex box for Firefox ([f2887c4](https://github.com/bullhorn/novo-elements/commit/f2887c4))


### Features

* **picker:** make defaultOptions handle promise ([#544](https://github.com/bullhorn/novo-elements/issues/544)) ([9b91eca](https://github.com/bullhorn/novo-elements/commit/9b91eca))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/bullhorn/novo-elements/compare/v2.1.261...v2.1.1) (2017-09-07)


### Features

* **table|pagination|form:** Fixing tooltips / pagination settings / adding methods to simple forms ([1359cc7](https://github.com/bullhorn/novo-elements/commit/1359cc7))



<a name="2.1.261"></a>
## [2.1.261](https://github.com/bullhorn/novo-elements/compare/v2.0.260...v2.1.261) (2017-09-05)



<a name="2.0.260"></a>
## [2.0.260](https://github.com/bullhorn/novo-elements/compare/v2.0.259...v2.0.260) (2017-09-05)


### Features

* **datepicker:** Allow append to body for all date pickers ([2f29784](https://github.com/bullhorn/novo-elements/commit/2f29784))



<a name="2.0.259"></a>
## [2.0.259](https://github.com/bullhorn/novo-elements/compare/v2.0.258...v2.0.259) (2017-08-30)


### Features

* **helpers:** Adding helper to get next sibling ([d559ec4](https://github.com/bullhorn/novo-elements/commit/d559ec4))



<a name="2.0.258"></a>
## [2.0.258](https://github.com/bullhorn/novo-elements/compare/v2.0.257...v2.0.258) (2017-08-25)


### Features

* **forms:** Custom section header icons for dynamic forms ([#538](https://github.com/bullhorn/novo-elements/issues/538)) ([5ef07b5](https://github.com/bullhorn/novo-elements/commit/5ef07b5))
* **forms:** Updating the county/state data ([b60549a](https://github.com/bullhorn/novo-elements/commit/b60549a))



<a name="2.0.257"></a>
## [2.0.257](https://github.com/bullhorn/novo-elements/compare/v2.0.256...v2.0.257) (2017-08-23)



<a name="2.0.256"></a>
## [2.0.256](https://github.com/bullhorn/novo-elements/compare/v2.0.255...v2.0.256) (2017-08-23)



<a name="2.0.255"></a>
## [2.0.255](https://github.com/bullhorn/novo-elements/compare/v2.0.254...v2.0.255) (2017-08-23)


### Bug Fixes

* **select:** Fixing select searching and selecting ([#535](https://github.com/bullhorn/novo-elements/issues/535)) ([382c970](https://github.com/bullhorn/novo-elements/commit/382c970))



<a name="2.0.254"></a>
## [2.0.254](https://github.com/bullhorn/novo-elements/compare/v2.0.253...v2.0.254) (2017-08-22)


### Bug Fixes

* **appbridge:** linting issue ([53d39a7](https://github.com/bullhorn/novo-elements/commit/53d39a7))



<a name="2.0.253"></a>
## [2.0.253](https://github.com/bullhorn/novo-elements/compare/v2.0.252...v2.0.253) (2017-08-21)


### Features

* **form:** Adding a Field Interation API ([2dea55e](https://github.com/bullhorn/novo-elements/commit/2dea55e))



<a name="2.0.252"></a>
## [2.0.252](https://github.com/bullhorn/novo-elements/compare/v2.0.251...v2.0.252) (2017-08-18)



<a name="2.0.251"></a>
## [2.0.251](https://github.com/bullhorn/novo-elements/compare/v2.0.250...v2.0.251) (2017-08-16)


### Bug Fixes

* **picker:** Putting the autoselect first item as an input, so it can be disabled ([1b3e63a](https://github.com/bullhorn/novo-elements/commit/1b3e63a))



<a name="2.0.250"></a>
## [2.0.250](https://github.com/bullhorn/novo-elements/compare/v2.0.249...v2.0.250) (2017-08-16)


### Bug Fixes

* **ckeditor:** Fixing formatting ([fc095ce](https://github.com/bullhorn/novo-elements/commit/fc095ce))
* **radio:** fixing data-automation-id ([ac8d87f](https://github.com/bullhorn/novo-elements/commit/ac8d87f))


### Features

* **browser:** Safari support ([a356869](https://github.com/bullhorn/novo-elements/commit/a356869))



<a name="2.0.249"></a>
## [2.0.249](https://github.com/bullhorn/novo-elements/compare/v2.0.248...v2.0.249) (2017-08-15)


### Bug Fixes

* **ckeditor:** Use built in spell checker ([f26428e](https://github.com/bullhorn/novo-elements/commit/f26428e))
* **picker:** Fixing autoselect when there is one record ([6a33a0e](https://github.com/bullhorn/novo-elements/commit/6a33a0e))



<a name="2.0.248"></a>
## [2.0.248](https://github.com/bullhorn/novo-elements/compare/v2.0.247...v2.0.248) (2017-08-15)


### Features

* **picker:** Making pickers autoselect the first value in the list ([118a046](https://github.com/bullhorn/novo-elements/commit/118a046))



<a name="2.0.247"></a>
## [2.0.247](https://github.com/bullhorn/novo-elements/compare/v2.0.246...v2.0.247) (2017-08-14)


### Bug Fixes

* **form:** Fixing form control to set date value when the value changes ([8f4909a](https://github.com/bullhorn/novo-elements/commit/8f4909a))



<a name="2.0.246"></a>
## [2.0.246](https://github.com/bullhorn/novo-elements/compare/v2.0.245...v2.0.246) (2017-08-11)


### Bug Fixes

* **form:** fix the setting of readOnly ([036a556](https://github.com/bullhorn/novo-elements/commit/036a556))


### Features

* **Radio:** adding support for buttons with icons as radio buttons. ([#525](https://github.com/bullhorn/novo-elements/issues/525)) ([232cfd7](https://github.com/bullhorn/novo-elements/commit/232cfd7))



<a name="2.0.245"></a>
## [2.0.245](https://github.com/bullhorn/novo-elements/compare/v2.0.244...v2.0.245) (2017-08-02)


### Bug Fixes

* **select:** Fixing select for ones without hidden values ([70b1828](https://github.com/bullhorn/novo-elements/commit/70b1828))



<a name="2.0.244"></a>
## [2.0.244](https://github.com/bullhorn/novo-elements/compare/v2.0.243...v2.0.244) (2017-08-02)



<a name="2.0.243"></a>
## [2.0.243](https://github.com/bullhorn/novo-elements/compare/v2.0.242...v2.0.243) (2017-08-02)


### Bug Fixes

* **select:** Fixing select to hide readOnly options ([6f0decd](https://github.com/bullhorn/novo-elements/commit/6f0decd))



<a name="2.0.242"></a>
## [2.0.242](https://github.com/bullhorn/novo-elements/compare/v2.0.241...v2.0.242) (2017-07-31)


### Bug Fixes

* **Tiles:** Fix check for undefined array ([#517](https://github.com/bullhorn/novo-elements/issues/517)) ([2d16b98](https://github.com/bullhorn/novo-elements/commit/2d16b98))



<a name="2.0.241"></a>
## [2.0.241](https://github.com/bullhorn/novo-elements/compare/v2.0.240...v2.0.241) (2017-07-28)


### Features

* **tiles:** Add ability to change options array ([#516](https://github.com/bullhorn/novo-elements/issues/516)) ([d2f52c8](https://github.com/bullhorn/novo-elements/commit/d2f52c8))



<a name="2.0.240"></a>
## [2.0.240](https://github.com/bullhorn/novo-elements/compare/v2.0.239...v2.0.240) (2017-07-28)



<a name="2.0.239"></a>
## [2.0.239](https://github.com/bullhorn/novo-elements/compare/v2.0.238...v2.0.239) (2017-07-28)


### Bug Fixes

* **datepicker:** Fixing initial time ([07d8478](https://github.com/bullhorn/novo-elements/commit/07d8478))



<a name="2.0.238"></a>
## [2.0.238](https://github.com/bullhorn/novo-elements/compare/v2.0.237...v2.0.238) (2017-07-20)



<a name="2.0.237"></a>
## [2.0.237](https://github.com/bullhorn/novo-elements/compare/v2.0.236...v2.0.237) (2017-07-20)



<a name="2.0.236"></a>
## [2.0.236](https://github.com/bullhorn/novo-elements/compare/v2.0.235...v2.0.236) (2017-07-19)


### Bug Fixes

* **calendar:** Fixing events that start before beginning of view and end after end of view ([#509](https://github.com/bullhorn/novo-elements/issues/509)) ([482d361](https://github.com/bullhorn/novo-elements/commit/482d361))



<a name="2.0.235"></a>
## [2.0.235](https://github.com/bullhorn/novo-elements/compare/v2.0.234...v2.0.235) (2017-07-19)


### Bug Fixes

* **calendar:** Fixing some styles around calendar events and having m… ([#508](https://github.com/bullhorn/novo-elements/issues/508)) ([3b6f5dd](https://github.com/bullhorn/novo-elements/commit/3b6f5dd))



<a name="2.0.234"></a>
## [2.0.234](https://github.com/bullhorn/novo-elements/compare/v2.0.233...v2.0.234) (2017-07-18)


### Bug Fixes

* **EntityPickerResults:** EntityPicker was using bad value for date f… ([#507](https://github.com/bullhorn/novo-elements/issues/507)) ([c1d93e1](https://github.com/bullhorn/novo-elements/commit/c1d93e1))



<a name="2.0.233"></a>
## [2.0.233](https://github.com/bullhorn/novo-elements/compare/v2.0.232...v2.0.233) (2017-07-12)


### Bug Fixes

* **picker:** Fixing picker to accept right click paste values ([#504](https://github.com/bullhorn/novo-elements/issues/504)) ([5b3866c](https://github.com/bullhorn/novo-elements/commit/5b3866c))



<a name="2.0.232"></a>
## [2.0.232](https://github.com/bullhorn/novo-elements/compare/v2.0.231...v2.0.232) (2017-07-09)


### Bug Fixes

* **form:** keyboard control in firefox, fixes [#502](https://github.com/bullhorn/novo-elements/issues/502) ([73de5ba](https://github.com/bullhorn/novo-elements/commit/73de5ba))



<a name="2.0.231"></a>
## [2.0.231](https://github.com/bullhorn/novo-elements/compare/v2.0.230...v2.0.231) (2017-07-06)


### Bug Fixes

* **Form:** fix empty percentage field interactions ([#501](https://github.com/bullhorn/novo-elements/issues/501)) ([fa3929c](https://github.com/bullhorn/novo-elements/commit/fa3929c))



<a name="2.0.230"></a>
## [2.0.230](https://github.com/bullhorn/novo-elements/compare/v2.0.229...v2.0.230) (2017-07-05)



<a name="2.0.229"></a>
## [2.0.229](https://github.com/bullhorn/novo-elements/compare/v2.0.228...v2.0.229) (2017-07-05)



<a name="2.0.228"></a>
## [2.0.228](https://github.com/bullhorn/novo-elements/compare/v2.0.227...v2.0.228) (2017-07-05)


### Bug Fixes

* **form:** Fixing date picker clicking ([50e41d9](https://github.com/bullhorn/novo-elements/commit/50e41d9))



<a name="2.0.227"></a>
## [2.0.227](https://github.com/bullhorn/novo-elements/compare/v2.0.226...v2.0.227) (2017-07-03)


### Bug Fixes

* **form:** Fixing value of forms with required and readonly ([e8ba56f](https://github.com/bullhorn/novo-elements/commit/e8ba56f))
* **form:** Fixing value of forms with required and readonly ([7fd704b](https://github.com/bullhorn/novo-elements/commit/7fd704b))



<a name="2.0.226"></a>
## [2.0.226](https://github.com/bullhorn/novo-elements/compare/v2.0.225...v2.0.226) (2017-07-03)


### Bug Fixes

* **picker:** Fixing tab/focus behavior ([d8a80c0](https://github.com/bullhorn/novo-elements/commit/d8a80c0))



<a name="2.0.225"></a>
## [2.0.225](https://github.com/bullhorn/novo-elements/compare/v2.0.224...v2.0.225) (2017-07-03)


### Features

* **form:** Keyboard support ([3968dc2](https://github.com/bullhorn/novo-elements/commit/3968dc2))



<a name="2.0.224"></a>
## [2.0.224](https://github.com/bullhorn/novo-elements/compare/v2.0.223...v2.0.224) (2017-06-30)



<a name="2.0.223"></a>
## [2.0.223](https://github.com/bullhorn/novo-elements/compare/v2.0.222...v2.0.223) (2017-06-30)


### Bug Fixes

* **control:** Fixing percentage render ([f674055](https://github.com/bullhorn/novo-elements/commit/f674055))



<a name="2.0.222"></a>
## [2.0.222](https://github.com/bullhorn/novo-elements/compare/v2.0.221...v2.0.222) (2017-06-30)


### Bug Fixes

* **calendar:** fixing calendar events ([a64c2d0](https://github.com/bullhorn/novo-elements/commit/a64c2d0))



<a name="2.0.221"></a>
## [2.0.221](https://github.com/bullhorn/novo-elements/compare/v2.0.220...v2.0.221) (2017-06-30)



<a name="2.0.220"></a>
## [2.0.220](https://github.com/bullhorn/novo-elements/compare/v2.0.219...v2.0.220) (2017-06-30)


### Bug Fixes

* **calendar:** Fixing some calendar bugs ([7c6e926](https://github.com/bullhorn/novo-elements/commit/7c6e926))


### Features

* **table:** Enhancing editable tables ([fe0fe73](https://github.com/bullhorn/novo-elements/commit/fe0fe73))



<a name="2.0.219"></a>
## [2.0.219](https://github.com/bullhorn/novo-elements/compare/v2.0.218...v2.0.219) (2017-06-29)


### Bug Fixes

* **quicknote:** Fixing the rendered note, global replace of & ([d711a1d](https://github.com/bullhorn/novo-elements/commit/d711a1d))
* **quicknote:** Hide results dropdown when deleting the search symbol ([16f1957](https://github.com/bullhorn/novo-elements/commit/16f1957))


### Features

* **app-bridge:** adding ability to open a fast-add page as well as an… ([#495](https://github.com/bullhorn/novo-elements/issues/495)) ([673edcb](https://github.com/bullhorn/novo-elements/commit/673edcb))
* **app-bridge:** Fixing interface ([d97e241](https://github.com/bullhorn/novo-elements/commit/d97e241))
* **Radio:** Adding ability to have icon only button radio groups ([#493](https://github.com/bullhorn/novo-elements/issues/493)) ([9c058ee](https://github.com/bullhorn/novo-elements/commit/9c058ee))



<a name="2.0.218"></a>
## [2.0.218](https://github.com/bullhorn/novo-elements/compare/v2.0.217...v2.0.218) (2017-06-27)


### Bug Fixes

* **dropdown:** Searching fix ([fbc0b94](https://github.com/bullhorn/novo-elements/commit/fbc0b94))



<a name="2.0.217"></a>
## [2.0.217](https://github.com/bullhorn/novo-elements/compare/v2.0.216...v2.0.217) (2017-06-22)


### Features

* **quicknote:** CK editor implementation of quick note ([f9f7942](https://github.com/bullhorn/novo-elements/commit/f9f7942))



<a name="2.0.216"></a>
## [2.0.216](https://github.com/bullhorn/novo-elements/compare/v2.0.215...v2.0.216) (2017-06-22)


### Bug Fixes

* **datetimepicker:** Fixing the initial rendering ([4294c80](https://github.com/bullhorn/novo-elements/commit/4294c80))



<a name="2.0.215"></a>
## [2.0.215](https://github.com/bullhorn/novo-elements/compare/v2.0.214...v2.0.215) (2017-06-22)


### Bug Fixes

* **datetimepicker:** Fixing the value being emitted on the model to respect the date/time values together ([ae02471](https://github.com/bullhorn/novo-elements/commit/ae02471))



<a name="2.0.214"></a>
## [2.0.214](https://github.com/bullhorn/novo-elements/compare/v2.0.213...v2.0.214) (2017-06-22)


### Bug Fixes

* **FileInput:** files should be set to value, even if an empty array is provided ([#489](https://github.com/bullhorn/novo-elements/issues/489)) ([757dfab](https://github.com/bullhorn/novo-elements/commit/757dfab))


### Features

* **datetimepicker:** Refactoring the date time picker to avoid duplicate code and properly support military ([1b827ae](https://github.com/bullhorn/novo-elements/commit/1b827ae))



<a name="2.0.213"></a>
## [2.0.213](https://github.com/bullhorn/novo-elements/compare/v2.0.212...v2.0.213) (2017-06-21)


### Bug Fixes

* **dropdown:** starts with search and clear active when hiding ([191204c](https://github.com/bullhorn/novo-elements/commit/191204c))



<a name="2.0.212"></a>
## [2.0.212](https://github.com/bullhorn/novo-elements/compare/v2.0.211...v2.0.212) (2017-06-21)


### Bug Fixes

* **pickers:** fixing keyboard control and highlighting ([da09b47](https://github.com/bullhorn/novo-elements/commit/da09b47))
* **quicknote:** Fixing quick note demo and clean up ([305550a](https://github.com/bullhorn/novo-elements/commit/305550a))


### Features

* **dropdown:** keyboard navigation & support ([8fb2def](https://github.com/bullhorn/novo-elements/commit/8fb2def))



<a name="2.0.211"></a>
## [2.0.211](https://github.com/bullhorn/novo-elements/compare/v2.0.210...v2.0.211) (2017-06-15)


### Bug Fixes

* **date/timepickers:** will not be added to the dom until needed ([#485](https://github.com/bullhorn/novo-elements/issues/485)) ([b4a4b92](https://github.com/bullhorn/novo-elements/commit/b4a4b92))
* **pickers:** fixing keyboard control and highlighting ([593ab19](https://github.com/bullhorn/novo-elements/commit/593ab19))



<a name="2.0.210"></a>
## [2.0.210](https://github.com/bullhorn/novo-elements/compare/v2.0.209...v2.0.210) (2017-06-12)



<a name="2.0.209"></a>
## [2.0.209](https://github.com/bullhorn/novo-elements/compare/v2.0.208...v2.0.209) (2017-06-12)



<a name="2.0.208"></a>
## [2.0.208](https://github.com/bullhorn/novo-elements/compare/v2.0.207...v2.0.208) (2017-06-07)


### Bug Fixes

* **appbridge:** Fixing window callbacks ([7f9aa06](https://github.com/bullhorn/novo-elements/commit/7f9aa06))
* **pickers:** Adding flag to disable infinite scroll ([17a6b90](https://github.com/bullhorn/novo-elements/commit/17a6b90))
* **pickers:** Adding flag to disable infinite scroll ([3c9a99e](https://github.com/bullhorn/novo-elements/commit/3c9a99e))



<a name="2.0.207"></a>
## [2.0.207](https://github.com/bullhorn/novo-elements/compare/v2.0.206...v2.0.207) (2017-06-06)


### Bug Fixes

* **picker:** Clear value properly ([453b514](https://github.com/bullhorn/novo-elements/commit/453b514))


### Features

* **calendar:** Adding ability to change and display current selected date ([#482](https://github.com/bullhorn/novo-elements/issues/482)) ([91ce6d2](https://github.com/bullhorn/novo-elements/commit/91ce6d2))



<a name="2.0.206"></a>
## [2.0.206](https://github.com/bullhorn/novo-elements/compare/v2.0.205...v2.0.206) (2017-06-02)


### Bug Fixes

* **filepicker:** fix bug where most immediate button submits on key enter ([#481](https://github.com/bullhorn/novo-elements/issues/481)) ([599acd1](https://github.com/bullhorn/novo-elements/commit/599acd1))
* **pickers:** Fixing empty results not displaying ([#480](https://github.com/bullhorn/novo-elements/issues/480)) ([8af7941](https://github.com/bullhorn/novo-elements/commit/8af7941))


### Features

* **table:** Adding tooltips to filter/sort ([a01ac4a](https://github.com/bullhorn/novo-elements/commit/a01ac4a))



<a name="2.0.205"></a>
## [2.0.205](https://github.com/bullhorn/novo-elements/compare/v2.0.204...v2.0.205) (2017-06-01)



<a name="2.0.204"></a>
## [2.0.204](https://github.com/bullhorn/novo-elements/compare/v2.0.203...v2.0.204) (2017-06-01)



<a name="2.0.203"></a>
## [2.0.203](https://github.com/bullhorn/novo-elements/compare/v2.0.202...v2.0.203) (2017-05-31)



<a name="2.0.202"></a>
## [2.0.202](https://github.com/bullhorn/novo-elements/compare/v2.0.201...v2.0.202) (2017-05-30)


### Bug Fixes

* **Calendar:** Fixing bad imports ([43944f8](https://github.com/bullhorn/novo-elements/commit/43944f8))



<a name="2.0.201"></a>
## [2.0.201](https://github.com/bullhorn/novo-elements/compare/v2.0.200...v2.0.201) (2017-05-26)


### Bug Fixes

* **appbridge:** catching register errors ([3287244](https://github.com/bullhorn/novo-elements/commit/3287244))


### Features

* **Calendar:** Added Week and Day views ([#479](https://github.com/bullhorn/novo-elements/issues/479)) ([d28a35c](https://github.com/bullhorn/novo-elements/commit/d28a35c))



<a name="2.0.200"></a>
## [2.0.200](https://github.com/bullhorn/novo-elements/compare/v2.0.199...v2.0.200) (2017-05-24)


### Features

* **appbridge:** Adding more events to AppBridge ([c44c426](https://github.com/bullhorn/novo-elements/commit/c44c426))



<a name="2.0.199"></a>
## [2.0.199](https://github.com/bullhorn/novo-elements/compare/v2.0.198...v2.0.199) (2017-05-23)


### Features

* **header/tab:** Adding subtitle to header and fixing some styling for tabs ([0c3fb8e](https://github.com/bullhorn/novo-elements/commit/0c3fb8e))



<a name="2.0.198"></a>
## [2.0.198](https://github.com/bullhorn/novo-elements/compare/v2.0.197...v2.0.198) (2017-05-22)



<a name="2.0.197"></a>
## [2.0.197](https://github.com/bullhorn/novo-elements/compare/v2.0.196...v2.0.197) (2017-05-18)


### Features

* **toast:** Adding outlined toasts ([a7c82e1](https://github.com/bullhorn/novo-elements/commit/a7c82e1))



<a name="2.0.196"></a>
## [2.0.196](https://github.com/bullhorn/novo-elements/compare/v2.0.195...v2.0.196) (2017-05-17)



<a name="2.0.195"></a>
## [2.0.195](https://github.com/bullhorn/novo-elements/compare/v2.0.194...v2.0.195) (2017-05-16)


### Bug Fixes

* **aot:** Fixing AOT build for FileInput ([c05a149](https://github.com/bullhorn/novo-elements/commit/c05a149))



<a name="2.0.194"></a>
## [2.0.194](https://github.com/bullhorn/novo-elements/compare/v2.0.193...v2.0.194) (2017-05-16)


### Features

* **checkbox:** make icon optional - style can be box or circle ([#476](https://github.com/bullhorn/novo-elements/issues/476)) ([f6dd554](https://github.com/bullhorn/novo-elements/commit/f6dd554))
* **Table:** Added Expand all details feature ([#477](https://github.com/bullhorn/novo-elements/issues/477)) ([6a933a8](https://github.com/bullhorn/novo-elements/commit/6a933a8))



<a name="2.0.193"></a>
## [2.0.193](https://github.com/bullhorn/novo-elements/compare/v2.0.192...v2.0.193) (2017-05-12)


### Bug Fixes

* **appbridge:** Fixing HTTP calls via app bridge ([26cabd5](https://github.com/bullhorn/novo-elements/commit/26cabd5))



<a name="2.0.192"></a>
## [2.0.192](https://github.com/bullhorn/novo-elements/compare/v2.0.191...v2.0.192) (2017-05-12)


### Bug Fixes

* **table:** Fix instance where selectAll was not showing ([e7a6b7c](https://github.com/bullhorn/novo-elements/commit/e7a6b7c))



<a name="2.0.191"></a>
## [2.0.191](https://github.com/bullhorn/novo-elements/compare/v2.0.190...v2.0.191) (2017-05-10)


### Bug Fixes

* **fileInput:** draggable should default to false ([#474](https://github.com/bullhorn/novo-elements/issues/474)) ([3324f7e](https://github.com/bullhorn/novo-elements/commit/3324f7e))


### Features

* **appbridge:** Supporting POST/PUT with data ([be7817b](https://github.com/bullhorn/novo-elements/commit/be7817b))



<a name="2.0.190"></a>
## [2.0.190](https://github.com/bullhorn/novo-elements/compare/v2.0.189...v2.0.190) (2017-05-09)



<a name="2.0.189"></a>
## [2.0.189](https://github.com/bullhorn/novo-elements/compare/v2.0.188...v2.0.189) (2017-05-08)


### Features

* **fileInput:** make file chips draggable ([#471](https://github.com/bullhorn/novo-elements/issues/471)) ([80f98cf](https://github.com/bullhorn/novo-elements/commit/80f98cf))



<a name="2.0.188"></a>
## [2.0.188](https://github.com/bullhorn/novo-elements/compare/v2.0.187...v2.0.188) (2017-05-08)



<a name="2.0.187"></a>
## [2.0.187](https://github.com/bullhorn/novo-elements/compare/v2.0.186...v2.0.187) (2017-05-08)


### Bug Fixes

* **fileInput:** Fix alignment of file input dropzone icon ([#469](https://github.com/bullhorn/novo-elements/issues/469)) ([6ac2b71](https://github.com/bullhorn/novo-elements/commit/6ac2b71))



<a name="2.0.186"></a>
## [2.0.186](https://github.com/bullhorn/novo-elements/compare/v2.0.185...v2.0.186) (2017-05-04)


### Bug Fixes

* **table:** Fixing some issues with dropdown cell ([cd3f9cf](https://github.com/bullhorn/novo-elements/commit/cd3f9cf))



<a name="2.0.185"></a>
## [2.0.185](https://github.com/bullhorn/novo-elements/compare/v2.0.184...v2.0.185) (2017-05-04)


### Bug Fixes

* **calendar:** Fixing the building of the months ([934d245](https://github.com/bullhorn/novo-elements/commit/934d245))
* **quicknote:** Forcing scroll to keep textarea/div aligned properly ([c38e5e4](https://github.com/bullhorn/novo-elements/commit/c38e5e4))



<a name="2.0.184"></a>
## [2.0.184](https://github.com/bullhorn/novo-elements/compare/v2.0.183...v2.0.184) (2017-05-04)


### Features

* **table:** Adding a dropdown cell ([30a96fa](https://github.com/bullhorn/novo-elements/commit/30a96fa))
* **table:** Adding a dropdown cell ([ef5a7b7](https://github.com/bullhorn/novo-elements/commit/ef5a7b7))



<a name="2.0.183"></a>
## [2.0.183](https://github.com/bullhorn/novo-elements/compare/v2.0.182...v2.0.183) (2017-05-02)


### Features

* **file input:** Add layout options that allow different configurati… ([#465](https://github.com/bullhorn/novo-elements/issues/465)) ([67469d6](https://github.com/bullhorn/novo-elements/commit/67469d6))



<a name="2.0.182"></a>
## [2.0.182](https://github.com/bullhorn/novo-elements/compare/v2.0.181...v2.0.182) (2017-05-02)


### Features

* **editor:** Always enabling spell checking by default ([fb16ef1](https://github.com/bullhorn/novo-elements/commit/fb16ef1))



<a name="2.0.181"></a>
## [2.0.181](https://github.com/bullhorn/novo-elements/compare/v2.0.180...v2.0.181) (2017-05-02)


### Bug Fixes

* **calendar:** Fixing calendar to use dateFns and not our terrible helpers and fixing the setting of today ([4b521f4](https://github.com/bullhorn/novo-elements/commit/4b521f4))
* **calendar:** Fixing range selection mode, fixes [#464](https://github.com/bullhorn/novo-elements/issues/464) ([71f6abd](https://github.com/bullhorn/novo-elements/commit/71f6abd))
* **form:** Ignoring scrolling on number fields ([27bf499](https://github.com/bullhorn/novo-elements/commit/27bf499))


### Features

* **editor:** Adding basic insert tools for image/table/rule ([74153b0](https://github.com/bullhorn/novo-elements/commit/74153b0))



<a name="2.0.180"></a>
## [2.0.180](https://github.com/bullhorn/novo-elements/compare/v2.0.179...v2.0.180) (2017-04-29)


### Bug Fixes

* **fullcalendar:** Fixing error when building for AOT ([ed0bd55](https://github.com/bullhorn/novo-elements/commit/ed0bd55))



<a name="2.0.179"></a>
## [2.0.179](https://github.com/bullhorn/novo-elements/compare/v2.0.178...v2.0.179) (2017-04-29)


### Bug Fixes

* **multipicker:** Fixing error when building for AOT ([4b80547](https://github.com/bullhorn/novo-elements/commit/4b80547))



<a name="2.0.178"></a>
## [2.0.178](https://github.com/bullhorn/novo-elements/compare/v2.0.177...v2.0.178) (2017-04-28)


### Bug Fixes

* **appbridge:** Checking for postRobot before instantiating ([7d1eae1](https://github.com/bullhorn/novo-elements/commit/7d1eae1))



<a name="2.0.177"></a>
## [2.0.177](https://github.com/bullhorn/novo-elements/compare/v2.0.176...v2.0.177) (2017-04-28)


### Bug Fixes

* **appbridge:** Checking for postRobot before instantiating ([7531688](https://github.com/bullhorn/novo-elements/commit/7531688))



<a name="2.0.176"></a>
## [2.0.176](https://github.com/bullhorn/novo-elements/compare/v2.0.175...v2.0.176) (2017-04-28)


### Features

* **appbridge:** Adding an AppBridge for third party custom components/cards to communicate with Novo ([93465b4](https://github.com/bullhorn/novo-elements/commit/93465b4))
* **bigcalendar:** Adding a full calendar component ([689d812](https://github.com/bullhorn/novo-elements/commit/689d812))



<a name="2.0.175"></a>
## [2.0.175](https://github.com/bullhorn/novo-elements/compare/v2.0.174...v2.0.175) (2017-04-28)


### Bug Fixes

* **table:** Making it so that options in filters truncate when too long ([cf26f66](https://github.com/bullhorn/novo-elements/commit/cf26f66))



<a name="2.0.174"></a>
## [2.0.174](https://github.com/bullhorn/novo-elements/compare/v2.0.173...v2.0.174) (2017-04-27)



<a name="2.0.173"></a>
## [2.0.173](https://github.com/bullhorn/novo-elements/compare/v2.0.172...v2.0.173) (2017-04-27)



<a name="2.0.172"></a>
## [2.0.172](https://github.com/bullhorn/novo-elements/compare/v2.0.171...v2.0.172) (2017-04-26)



<a name="2.0.171"></a>
## [2.0.171](https://github.com/bullhorn/novo-elements/compare/v2.0.170...v2.0.171) (2017-04-26)


### Features

* **radio:** Adding in a button radio option and group ([8121b8a](https://github.com/bullhorn/novo-elements/commit/8121b8a))



<a name="2.0.170"></a>
## [2.0.170](https://github.com/bullhorn/novo-elements/compare/v2.0.169...v2.0.170) (2017-04-18)


### Features

* **checklist:** set initial model up based on options ([#459](https://github.com/bullhorn/novo-elements/issues/459)) ([a963b16](https://github.com/bullhorn/novo-elements/commit/a963b16))



<a name="2.0.169"></a>
## [2.0.169](https://github.com/bullhorn/novo-elements/compare/v2.0.168...v2.0.169) (2017-04-14)


### Bug Fixes

* **multipicker:** Values in multipicker can now be localized ([#458](https://github.com/bullhorn/novo-elements/issues/458)) ([60611f0](https://github.com/bullhorn/novo-elements/commit/60611f0))



<a name="2.0.168"></a>
## [2.0.168](https://github.com/bullhorn/novo-elements/compare/v2.0.167...v2.0.168) (2017-04-04)


### Bug Fixes

* **Table:** Escape apostrophes in onFilterChange ([#454](https://github.com/bullhorn/novo-elements/issues/454)) ([ab11988](https://github.com/bullhorn/novo-elements/commit/ab11988))



<a name="2.0.167"></a>
## [2.0.167](https://github.com/bullhorn/novo-elements/compare/v2.0.166...v2.0.167) (2017-03-31)



<a name="2.0.166"></a>
## [2.0.166](https://github.com/bullhorn/novo-elements/compare/v2.0.165...v2.0.166) (2017-03-31)


### Bug Fixes

* **calendar:** setting the month based on the first of the month ([edf062f](https://github.com/bullhorn/novo-elements/commit/edf062f))



<a name="2.0.165"></a>
## [2.0.165](https://github.com/bullhorn/novo-elements/compare/v2.0.164...v2.0.165) (2017-03-29)


### Bug Fixes

* **FormUtils:** Overrides for setValue calls are now outside of config ([#453](https://github.com/bullhorn/novo-elements/issues/453)) ([c2ee046](https://github.com/bullhorn/novo-elements/commit/c2ee046))



<a name="2.0.164"></a>
## [2.0.164](https://github.com/bullhorn/novo-elements/compare/v2.0.163...v2.0.164) (2017-03-27)


### Bug Fixes

* **FormUtils:** Don't set a default value for keepClean ([#452](https://github.com/bullhorn/novo-elements/issues/452)) ([746ad36](https://github.com/bullhorn/novo-elements/commit/746ad36))



<a name="2.0.163"></a>
## [2.0.163](https://github.com/bullhorn/novo-elements/compare/v2.0.162...v2.0.163) (2017-03-22)



<a name="2.0.162"></a>
## [2.0.162](https://github.com/bullhorn/novo-elements/compare/v2.0.161...v2.0.162) (2017-03-21)


### Features

* **toast:** Ability to have a link inside Toast ([f9d6452](https://github.com/bullhorn/novo-elements/commit/f9d6452))



<a name="2.0.161"></a>
## [2.0.161](https://github.com/bullhorn/novo-elements/compare/v2.0.160...v2.0.161) (2017-03-21)


### Bug Fixes

* **form:** Fixing display of address blocks and validation ([3007cad](https://github.com/bullhorn/novo-elements/commit/3007cad))



<a name="2.0.160"></a>
## [2.0.160](https://github.com/bullhorn/novo-elements/compare/v2.0.159...v2.0.160) (2017-03-20)


### Features

* **pipe:** Added new pipe for displaying encoded string ([#444](https://github.com/bullhorn/novo-elements/issues/444)) ([df6679f](https://github.com/bullhorn/novo-elements/commit/df6679f))



<a name="2.0.159"></a>
## [2.0.159](https://github.com/bullhorn/novo-elements/compare/v2.0.158...v2.0.159) (2017-03-20)


### Bug Fixes

* **table:** fix for property of undefined on _editing ([#442](https://github.com/bullhorn/novo-elements/issues/442)) ([c0b6e84](https://github.com/bullhorn/novo-elements/commit/c0b6e84))



<a name="2.0.158"></a>
## [2.0.158](https://github.com/bullhorn/novo-elements/compare/v2.0.157...v2.0.158) (2017-03-20)


### Bug Fixes

* **formutils:** Optional types ([89e5715](https://github.com/bullhorn/novo-elements/commit/89e5715))



<a name="2.0.157"></a>
## [2.0.157](https://github.com/bullhorn/novo-elements/compare/v2.0.156...v2.0.157) (2017-03-20)



<a name="2.0.156"></a>
## [2.0.156](https://github.com/bullhorn/novo-elements/compare/v2.0.155...v2.0.156) (2017-03-20)


### Bug Fixes

* **table:** viewOnly was not being respected for new table rows. Also adding unit tests ([#439](https://github.com/bullhorn/novo-elements/issues/439)) ([6ff3c04](https://github.com/bullhorn/novo-elements/commit/6ff3c04))


### Features

* **categorydropdown:** Adding event for category selection, fixes [#420](https://github.com/bullhorn/novo-elements/issues/420) ([253a01c](https://github.com/bullhorn/novo-elements/commit/253a01c))
* **chips:** Adding styles for corp user chips, fixes [#431](https://github.com/bullhorn/novo-elements/issues/431) ([28c651f](https://github.com/bullhorn/novo-elements/commit/28c651f))



<a name="2.0.155"></a>
## [2.0.155](https://github.com/bullhorn/novo-elements/compare/v2.0.154...v2.0.155) (2017-03-17)


### Bug Fixes

* **datepicker:** Fixing selecting January in date pickers, 0 index.. ([beace3d](https://github.com/bullhorn/novo-elements/commit/beace3d))


### Features

* **Table:** Added ability to hide columns and new Editable collection ([#437](https://github.com/bullhorn/novo-elements/issues/437)) ([5aaf678](https://github.com/bullhorn/novo-elements/commit/5aaf678))



<a name="2.0.154"></a>
## [2.0.154](https://github.com/bullhorn/novo-elements/compare/v2.0.153...v2.0.154) (2017-03-16)


### Bug Fixes

* **table:** Only hide pagination when empty and not filtered ([b5d75ef](https://github.com/bullhorn/novo-elements/commit/b5d75ef))



<a name="2.0.153"></a>
## [2.0.153](https://github.com/bullhorn/novo-elements/compare/v2.0.152...v2.0.153) (2017-03-14)


### Bug Fixes

* **table:** Hiding pagination when the table is empty and not being filtered ([4c2f07f](https://github.com/bullhorn/novo-elements/commit/4c2f07f))



<a name="2.0.152"></a>
## [2.0.152](https://github.com/bullhorn/novo-elements/compare/v2.0.151...v2.0.152) (2017-03-09)


### Features

* **modal:** Added cancel event to the Notification Model ([#432](https://github.com/bullhorn/novo-elements/issues/432)) ([8a6269e](https://github.com/bullhorn/novo-elements/commit/8a6269e))



<a name="2.0.151"></a>
## [2.0.151](https://github.com/bullhorn/novo-elements/compare/v2.0.150...v2.0.151) (2017-03-08)


### Features

* **Table:** Adding margin for table header buttons and increasing min-width for entity-picker ([#428](https://github.com/bullhorn/novo-elements/issues/428)) ([97bb742](https://github.com/bullhorn/novo-elements/commit/97bb742))



<a name="2.0.150"></a>
## [2.0.150](https://github.com/bullhorn/novo-elements/compare/v2.0.149...v2.0.150) (2017-03-06)


### Features

* **Table:** Column headers should show in edit mode even if no data. Toasts should be removed on cancel ([#427](https://github.com/bullhorn/novo-elements/issues/427)) ([39e159e](https://github.com/bullhorn/novo-elements/commit/39e159e))



<a name="2.0.149"></a>
## [2.0.149](https://github.com/bullhorn/novo-elements/compare/v2.0.148...v2.0.149) (2017-03-06)



<a name="2.0.148"></a>
## [2.0.148](https://github.com/bullhorn/novo-elements/compare/v2.0.147...v2.0.148) (2017-03-03)


### Bug Fixes

* **control:** Moving Model change events to be fired after model is updated ([#425](https://github.com/bullhorn/novo-elements/issues/425)) ([2edf333](https://github.com/bullhorn/novo-elements/commit/2edf333))



<a name="2.0.147"></a>
## [2.0.147](https://github.com/bullhorn/novo-elements/compare/v2.0.146...v2.0.147) (2017-03-03)


### Bug Fixes

* **control:** Adding missing model change events ([1ec470e](https://github.com/bullhorn/novo-elements/commit/1ec470e))


### Features

* **table:** Edit table improvements and fixes ([#424](https://github.com/bullhorn/novo-elements/issues/424)) ([8187fdb](https://github.com/bullhorn/novo-elements/commit/8187fdb))



<a name="2.0.146"></a>
## [2.0.146](https://github.com/bullhorn/novo-elements/compare/v2.0.145...v2.0.146) (2017-03-02)



<a name="2.0.145"></a>
## [2.0.145](https://github.com/bullhorn/novo-elements/compare/v2.0.144...v2.0.145) (2017-03-01)


### Features

* **tiles:** Adding ability to disable the tiles and get an event when its clicked ([0e440cb](https://github.com/bullhorn/novo-elements/commit/0e440cb))



<a name="2.0.144"></a>
## [2.0.144](https://github.com/bullhorn/novo-elements/compare/v2.0.143...v2.0.144) (2017-02-27)


### Bug Fixes

* **table:** Fixing css around the footer ([6bfca6e](https://github.com/bullhorn/novo-elements/commit/6bfca6e))



<a name="2.0.143"></a>
## [2.0.143](https://github.com/bullhorn/novo-elements/compare/v2.0.142...v2.0.143) (2017-02-27)


### Bug Fixes

* **QuickNote:** Quick Note does not create the formatted object on writeValue. ([#417](https://github.com/bullhorn/novo-elements/issues/417)) ([2fda393](https://github.com/bullhorn/novo-elements/commit/2fda393))



<a name="2.0.142"></a>
## [2.0.142](https://github.com/bullhorn/novo-elements/compare/v2.0.141...v2.0.142) (2017-02-23)


### Bug Fixes

* **chips:** Fixed the preview on hover of the entity chip when data is not present ([#416](https://github.com/bullhorn/novo-elements/issues/416)) ([0cc6fd0](https://github.com/bullhorn/novo-elements/commit/0cc6fd0))



<a name="2.0.141"></a>
## [2.0.141](https://github.com/bullhorn/novo-elements/compare/v2.0.140...v2.0.141) (2017-02-23)


### Bug Fixes

* **localization:** Fixing a lot of places were there were hard-coded strings ([b41848d](https://github.com/bullhorn/novo-elements/commit/b41848d))



<a name="2.0.140"></a>
## [2.0.140](https://github.com/bullhorn/novo-elements/compare/v2.0.139...v2.0.140) (2017-02-22)


### Bug Fixes

* **Control:** Errors is an unknown property on NovoCustomControlContainerElement ([#415](https://github.com/bullhorn/novo-elements/issues/415)) ([c74c8af](https://github.com/bullhorn/novo-elements/commit/c74c8af))



<a name="2.0.139"></a>
## [2.0.139](https://github.com/bullhorn/novo-elements/compare/v2.0.138...v2.0.139) (2017-02-22)


### Bug Fixes

* **dates:** Fixing some actions with DateTimePickers ([c5ded16](https://github.com/bullhorn/novo-elements/commit/c5ded16))



<a name="2.0.138"></a>
## [2.0.138](https://github.com/bullhorn/novo-elements/compare/v2.0.137...v2.0.138) (2017-02-22)


### Features

* **Form:** Add ability to have custom components used with the dynamic form ([#414](https://github.com/bullhorn/novo-elements/issues/414)) ([b47f934](https://github.com/bullhorn/novo-elements/commit/b47f934))



<a name="2.0.137"></a>
## [2.0.137](https://github.com/bullhorn/novo-elements/compare/v2.0.136...v2.0.137) (2017-02-22)


### Bug Fixes

* **datepicker:** Fixing the date picker selection ([350044a](https://github.com/bullhorn/novo-elements/commit/350044a))



<a name="2.0.136"></a>
## [2.0.136](https://github.com/bullhorn/novo-elements/compare/v2.0.135...v2.0.136) (2017-02-21)


### Bug Fixes

* **picker:** Fixing picker for AOT, missing property ([8f80519](https://github.com/bullhorn/novo-elements/commit/8f80519))



<a name="2.0.135"></a>
## [2.0.135](https://github.com/bullhorn/novo-elements/compare/v2.0.134...v2.0.135) (2017-02-21)


### Features

* **chips:** Added a preview on hover of the entity chip ([#413](https://github.com/bullhorn/novo-elements/issues/413)) ([ddaeb87](https://github.com/bullhorn/novo-elements/commit/ddaeb87))
* **forms:** Adding way to pass a pickerCallback for custom control on the PickerResults ([bef69a5](https://github.com/bullhorn/novo-elements/commit/bef69a5))



<a name="2.0.134"></a>
## [2.0.134](https://github.com/bullhorn/novo-elements/compare/v2.0.133...v2.0.134) (2017-02-21)


### Bug Fixes

* **datepicker:** Fixing date picker opening/closing ([d7b32bb](https://github.com/bullhorn/novo-elements/commit/d7b32bb))



<a name="2.0.133"></a>
## [2.0.133](https://github.com/bullhorn/novo-elements/compare/v2.0.132...v2.0.133) (2017-02-21)


### Features

* **form:** Add ability to set overrides when creating field sets ([#411](https://github.com/bullhorn/novo-elements/issues/411)) ([06dd84c](https://github.com/bullhorn/novo-elements/commit/06dd84c))
* **form:** Allowing to override the templates of form controls ([95d8e54](https://github.com/bullhorn/novo-elements/commit/95d8e54))



<a name="2.0.132"></a>
## [2.0.132](https://github.com/bullhorn/novo-elements/compare/v2.0.131...v2.0.132) (2017-02-21)



<a name="2.0.131"></a>
## [2.0.131](https://github.com/bullhorn/novo-elements/compare/v2.0.130...v2.0.131) (2017-02-17)


### Bug Fixes

* **control:** Making the label animate up/down properly for chips/picker ([adf4d6e](https://github.com/bullhorn/novo-elements/commit/adf4d6e))



<a name="2.0.130"></a>
## [2.0.130](https://github.com/bullhorn/novo-elements/compare/v2.0.129...v2.0.130) (2017-02-16)


### Features

* **toast:** add dialogue styling to toast ([#405](https://github.com/bullhorn/novo-elements/issues/405)) ([143cc9b](https://github.com/bullhorn/novo-elements/commit/143cc9b))



<a name="2.0.129"></a>
## [2.0.129](https://github.com/bullhorn/novo-elements/compare/v2.0.128...v2.0.129) (2017-02-14)


### Bug Fixes

* **table:** Fixing freetext filter clear ([10b8f58](https://github.com/bullhorn/novo-elements/commit/10b8f58))



<a name="2.0.128"></a>
## [2.0.128](https://github.com/bullhorn/novo-elements/compare/v2.0.127...v2.0.128) (2017-02-13)


### Bug Fixes

* **quicknote:** Debouncing input to avoid crazy amounts of calls ([ec0f7a5](https://github.com/bullhorn/novo-elements/commit/ec0f7a5))



<a name="2.0.127"></a>
## [2.0.127](https://github.com/bullhorn/novo-elements/compare/v2.0.126...v2.0.127) (2017-02-13)


### Features

* **form:** Adding tooltip support ([cd0c221](https://github.com/bullhorn/novo-elements/commit/cd0c221))



<a name="2.0.126"></a>
## [2.0.126](https://github.com/bullhorn/novo-elements/compare/v2.0.125...v2.0.126) (2017-02-12)



<a name="2.0.125"></a>
## [2.0.125](https://github.com/bullhorn/novo-elements/compare/v2.0.124...v2.0.125) (2017-02-10)


### Features

* **toast:** Transcluding content ([a31de4f](https://github.com/bullhorn/novo-elements/commit/a31de4f))



<a name="2.0.124"></a>
## [2.0.124](https://github.com/bullhorn/novo-elements/compare/v2.0.123...v2.0.124) (2017-02-10)


### Features

* **ckeditor:** Add paste and loaded events ([#398](https://github.com/bullhorn/novo-elements/issues/398)) ([3c2016f](https://github.com/bullhorn/novo-elements/commit/3c2016f))



<a name="2.0.123"></a>
## [2.0.123](https://github.com/bullhorn/novo-elements/compare/v2.0.122...v2.0.123) (2017-02-09)


### Bug Fixes

* **picker:** paging correctly ([#397](https://github.com/bullhorn/novo-elements/issues/397)) ([0870e55](https://github.com/bullhorn/novo-elements/commit/0870e55))



<a name="2.0.122"></a>
## [2.0.122](https://github.com/bullhorn/novo-elements/compare/v2.0.121...v2.0.122) (2017-02-09)



<a name="2.0.121"></a>
## [2.0.121](https://github.com/bullhorn/novo-elements/compare/v2.0.120...v2.0.121) (2017-02-08)


### Features

* **categoryDropdown:** Adding better callback for clicks ([841af55](https://github.com/bullhorn/novo-elements/commit/841af55))



<a name="2.0.120"></a>
## [2.0.120](https://github.com/bullhorn/novo-elements/compare/v2.0.119...v2.0.120) (2017-02-08)


### Bug Fixes

* **table:** Fixing the sum/avg table footers ([0dede6b](https://github.com/bullhorn/novo-elements/commit/0dede6b))



<a name="2.0.119"></a>
## [2.0.119](https://github.com/bullhorn/novo-elements/compare/v2.0.118...v2.0.119) (2017-02-07)


### Bug Fixes

* **Table:** Table filtering should be disabled for all columns if set in config ([#394](https://github.com/bullhorn/novo-elements/issues/394)) ([eaf8bce](https://github.com/bullhorn/novo-elements/commit/eaf8bce))


### Features

* **form:** Adding a description field ([595d24b](https://github.com/bullhorn/novo-elements/commit/595d24b))



<a name="2.0.118"></a>
## [2.0.118](https://github.com/bullhorn/novo-elements/compare/v2.0.117...v2.0.118) (2017-02-07)



<a name="2.0.117"></a>
## [2.0.117](https://github.com/bullhorn/novo-elements/compare/v2.0.116...v2.0.117) (2017-02-06)



<a name="2.0.116"></a>
## [2.0.116](https://github.com/bullhorn/novo-elements/compare/v2.0.115...v2.0.116) (2017-02-06)



<a name="2.0.115"></a>
## [2.0.115](https://github.com/bullhorn/novo-elements/compare/v2.0.114...v2.0.115) (2017-02-05)


### Features

* **table:** Make the table have an editable version ([15da5d1](https://github.com/bullhorn/novo-elements/commit/15da5d1))



<a name="2.0.114"></a>
## [2.0.114](https://github.com/bullhorn/novo-elements/compare/v2.0.113...v2.0.114) (2017-02-03)


### Bug Fixes

* **table:** Cannot use MAX_INT, just set to 500 ([7662dcc](https://github.com/bullhorn/novo-elements/commit/7662dcc))



<a name="2.0.113"></a>
## [2.0.113](https://github.com/bullhorn/novo-elements/compare/v2.0.112...v2.0.113) (2017-02-02)


### Bug Fixes

* **table:** fixing default page size of there is no paging ([877e48e](https://github.com/bullhorn/novo-elements/commit/877e48e))



<a name="2.0.112"></a>
## [2.0.112](https://github.com/bullhorn/novo-elements/compare/v2.0.111...v2.0.112) (2017-02-02)


### Bug Fixes

* **table:** Make sure to refresh when setting a new data provider ([32c751c](https://github.com/bullhorn/novo-elements/commit/32c751c))



<a name="2.0.111"></a>
## [2.0.111](https://github.com/bullhorn/novo-elements/compare/v2.0.110...v2.0.111) (2017-02-02)


### Features

* **quicknote:** Position picker under mouse caret ([a087717](https://github.com/bullhorn/novo-elements/commit/a087717))



<a name="2.0.110"></a>
## [2.0.110](https://github.com/bullhorn/novo-elements/compare/v2.0.109...v2.0.110) (2017-01-31)


### Bug Fixes

* **Table:** When paging is false the start and count values are not set on the dataprovider ([#383](https://github.com/bullhorn/novo-elements/issues/383)) ([e126c59](https://github.com/bullhorn/novo-elements/commit/e126c59))


### Features

* **quicknote:** Allow for scrolling ([2ba4d9d](https://github.com/bullhorn/novo-elements/commit/2ba4d9d))



<a name="2.0.109"></a>
## [2.0.109](https://github.com/bullhorn/novo-elements/compare/v2.0.108...v2.0.109) (2017-01-31)


### Bug Fixes

* **Control:** Updating the TypeScript definitions and form demo to work with new field interactions ([#375](https://github.com/bullhorn/novo-elements/issues/375)) ([7bb0d7e](https://github.com/bullhorn/novo-elements/commit/7bb0d7e))
* **Table:** Table filtering should be disabled for all columns if set in config ([#379](https://github.com/bullhorn/novo-elements/issues/379)) ([23e80d5](https://github.com/bullhorn/novo-elements/commit/23e80d5))
* **Table:** When paging is false the start and count values are not set on the dataprovider ([#382](https://github.com/bullhorn/novo-elements/issues/382)) ([9b08f10](https://github.com/bullhorn/novo-elements/commit/9b08f10))


### Features

* **tip-well:** emit event on hide tip ([#378](https://github.com/bullhorn/novo-elements/issues/378)) ([7754792](https://github.com/bullhorn/novo-elements/commit/7754792))



<a name="2.0.108"></a>
## [2.0.108](https://github.com/bullhorn/novo-elements/compare/v2.0.107...v2.0.108) (2017-01-27)


### Bug Fixes

* **table:** Allow filters to have enter and close ([d6f4b18](https://github.com/bullhorn/novo-elements/commit/d6f4b18))



<a name="2.0.107"></a>
## [2.0.107](https://github.com/bullhorn/novo-elements/compare/v2.0.106...v2.0.107) (2017-01-27)


### Bug Fixes

* **dropdown:** Not closing the dropdown on enter, only esc ([136231b](https://github.com/bullhorn/novo-elements/commit/136231b))



<a name="2.0.106"></a>
## [2.0.106](https://github.com/bullhorn/novo-elements/compare/v2.0.105...v2.0.106) (2017-01-27)


### Bug Fixes

* **table:** Fixing the keepFocus directive for dropdowns by properly making sure the list is hidden via ngIF ([65599df](https://github.com/bullhorn/novo-elements/commit/65599df))



<a name="2.0.105"></a>
## [2.0.105](https://github.com/bullhorn/novo-elements/compare/v2.0.104...v2.0.105) (2017-01-26)


### Features

* **pickers:** Implement infinite scroll for pickers with a lot of data ([fac13ec](https://github.com/bullhorn/novo-elements/commit/fac13ec))



<a name="2.0.104"></a>
## [2.0.104](https://github.com/bullhorn/novo-elements/compare/v2.0.103...v2.0.104) (2017-01-25)


### Bug Fixes

* **Table:** Filter now handles values === false ([94682bb](https://github.com/bullhorn/novo-elements/commit/94682bb))



<a name="2.0.103"></a>
## [2.0.103](https://github.com/bullhorn/novo-elements/compare/v2.0.102...v2.0.103) (2017-01-25)


### Bug Fixes

* **form:** marking dirty and labels ([f068ec2](https://github.com/bullhorn/novo-elements/commit/f068ec2))



<a name="2.0.102"></a>
## [2.0.102](https://github.com/bullhorn/novo-elements/compare/v2.0.101...v2.0.102) (2017-01-25)


### Features

* **editor:** Focus/Blur events for CKEditor ([d4993ad](https://github.com/bullhorn/novo-elements/commit/d4993ad))
* **FieldInteractions:** Reworking field interactions to have events and invokeOnInit ([#373](https://github.com/bullhorn/novo-elements/issues/373)) ([32ee689](https://github.com/bullhorn/novo-elements/commit/32ee689))



<a name="2.0.101"></a>
## [2.0.101](https://github.com/bullhorn/novo-elements/compare/v2.0.100...v2.0.101) (2017-01-25)



<a name="2.0.100"></a>
## [2.0.100](https://github.com/bullhorn/novo-elements/compare/v2.0.99...v2.0.100) (2017-01-25)


### Bug Fixes

* **form:** Fix infinite loops :) ([93037c9](https://github.com/bullhorn/novo-elements/commit/93037c9))



<a name="2.0.99"></a>
## [2.0.99](https://github.com/bullhorn/novo-elements/compare/v2.0.98...v2.0.99) (2017-01-25)


### Bug Fixes

* **interactions:** Moving the setTimeout to the execute rather then setValue to not conflicts with required fields ([2c4a9d5](https://github.com/bullhorn/novo-elements/commit/2c4a9d5))



<a name="2.0.98"></a>
## [2.0.98](https://github.com/bullhorn/novo-elements/compare/v2.0.97...v2.0.98) (2017-01-25)


### Bug Fixes

* **quicknote:** Fixing quick note styling and form setValue issue ([d42e4fa](https://github.com/bullhorn/novo-elements/commit/d42e4fa))



<a name="2.0.97"></a>
## [2.0.97](https://github.com/bullhorn/novo-elements/compare/v2.0.96...v2.0.97) (2017-01-24)


### Features

* **Select:** Increase Form Dropdown Height by 2.5 Items [#313](https://github.com/bullhorn/novo-elements/issues/313) ([#372](https://github.com/bullhorn/novo-elements/issues/372)) ([47b0775](https://github.com/bullhorn/novo-elements/commit/47b0775))



<a name="2.0.96"></a>
## [2.0.96](https://github.com/bullhorn/novo-elements/compare/v2.0.95...v2.0.96) (2017-01-24)



<a name="2.0.95"></a>
## [2.0.95](https://github.com/bullhorn/novo-elements/compare/v2.0.94...v2.0.95) (2017-01-24)


### Bug Fixes

* **table:** Dropdown filters with free text to have the input have focus ([e03bee8](https://github.com/bullhorn/novo-elements/commit/e03bee8))



<a name="2.0.94"></a>
## [2.0.94](https://github.com/bullhorn/novo-elements/compare/v2.0.93...v2.0.94) (2017-01-24)


### Features

* **form:** Character count for inputs with maxlength ([abbd8ea](https://github.com/bullhorn/novo-elements/commit/abbd8ea))



<a name="2.0.93"></a>
## [2.0.93](https://github.com/bullhorn/novo-elements/compare/v2.0.92...v2.0.93) (2017-01-24)


### Bug Fixes

* **form:** Fixing validation around year fields ([0b9239f](https://github.com/bullhorn/novo-elements/commit/0b9239f))


### Features

* **Editor:** Updated to version 4.6.2 and fixed styling ([#370](https://github.com/bullhorn/novo-elements/issues/370)) ([e836122](https://github.com/bullhorn/novo-elements/commit/e836122))



<a name="2.0.92"></a>
## [2.0.92](https://github.com/bullhorn/novo-elements/compare/v2.0.91...v2.0.92) (2017-01-24)


### Bug Fixes

* **dropdown:** Toggling when enter/esc instead of hiding ([ac52062](https://github.com/bullhorn/novo-elements/commit/ac52062))



<a name="2.0.91"></a>
## [2.0.91](https://github.com/bullhorn/novo-elements/compare/v2.0.90...v2.0.91) (2017-01-24)


### Bug Fixes

* **dropdown:** Make sure to listen to enter/esc to close ([a9a3471](https://github.com/bullhorn/novo-elements/commit/a9a3471))



<a name="2.0.90"></a>
## [2.0.90](https://github.com/bullhorn/novo-elements/compare/v2.0.89...v2.0.90) (2017-01-23)


### Bug Fixes

* **chips:** Use right entity color icon, fixes [#219](https://github.com/bullhorn/novo-elements/issues/219) ([b380f33](https://github.com/bullhorn/novo-elements/commit/b380f33))
* **Table:** Fixing filters to keep focus on opening and closing, fixes [#143](https://github.com/bullhorn/novo-elements/issues/143) ([6ba6aeb](https://github.com/bullhorn/novo-elements/commit/6ba6aeb))



<a name="2.0.89"></a>
## [2.0.89](https://github.com/bullhorn/novo-elements/compare/v2.0.88...v2.0.89) (2017-01-23)


### Bug Fixes

* **Form:** Adding setTimeout to the setValue for field interactions to prevent expression changed errors ([#368](https://github.com/bullhorn/novo-elements/issues/368)) ([60a2418](https://github.com/bullhorn/novo-elements/commit/60a2418))



<a name="2.0.88"></a>
## [2.0.88](https://github.com/bullhorn/novo-elements/compare/v2.0.87...v2.0.88) (2017-01-23)


### Features

* **select:** Highlighting matches, selecting match as user types, upping timeout to clear filter to 2s (per UX) ([e54f450](https://github.com/bullhorn/novo-elements/commit/e54f450))



<a name="2.0.87"></a>
## [2.0.87](https://github.com/bullhorn/novo-elements/compare/v2.0.86...v2.0.87) (2017-01-23)



<a name="2.0.86"></a>
## [2.0.86](https://github.com/bullhorn/novo-elements/compare/v2.0.85...v2.0.86) (2017-01-21)



<a name="2.0.85"></a>
## [2.0.85](https://github.com/bullhorn/novo-elements/compare/v2.0.84...v2.0.85) (2017-01-20)



<a name="2.0.84"></a>
## [2.0.84](https://github.com/bullhorn/novo-elements/compare/v2.0.83...v2.0.84) (2017-01-20)


### Bug Fixes

* **dropdown:** Opening to right if not enough space on left ([64837d3](https://github.com/bullhorn/novo-elements/commit/64837d3))



<a name="2.0.83"></a>
## [2.0.83](https://github.com/bullhorn/novo-elements/compare/v2.0.82...v2.0.83) (2017-01-20)



<a name="2.0.82"></a>
## [2.0.82](https://github.com/bullhorn/novo-elements/compare/v2.0.81...v2.0.82) (2017-01-20)



<a name="2.0.81"></a>
## [2.0.81](https://github.com/bullhorn/novo-elements/compare/v2.0.80...v2.0.81) (2017-01-20)



<a name="2.0.80"></a>
## [2.0.80](https://github.com/bullhorn/novo-elements/compare/v2.0.79...v2.0.80) (2017-01-20)


### Bug Fixes

* **form:** When forcing validation, only force validation on required fields ([8737e02](https://github.com/bullhorn/novo-elements/commit/8737e02))



<a name="2.0.79"></a>
## [2.0.79](https://github.com/bullhorn/novo-elements/compare/v2.0.78...v2.0.79) (2017-01-20)



<a name="2.0.78"></a>
## [2.0.78](https://github.com/bullhorn/novo-elements/compare/v2.0.77...v2.0.78) (2017-01-20)


### Bug Fixes

* **form:** Making the control have the data specialization ([15ba7c0](https://github.com/bullhorn/novo-elements/commit/15ba7c0))
* **Table:** DateRange now clears when filter is set to Null ([b14025f](https://github.com/bullhorn/novo-elements/commit/b14025f))



<a name="2.0.77"></a>
## [2.0.77](https://github.com/bullhorn/novo-elements/compare/v2.0.76...v2.0.77) (2017-01-20)


### Bug Fixes

* **Dropdown:** Allow to open in middle ([35265b7](https://github.com/bullhorn/novo-elements/commit/35265b7))



<a name="2.0.76"></a>
## [2.0.76](https://github.com/bullhorn/novo-elements/compare/v2.0.75...v2.0.76) (2017-01-20)


### Bug Fixes

* **dropdown:** Listening for outside clicks on container too ([62f55ef](https://github.com/bullhorn/novo-elements/commit/62f55ef))



<a name="2.0.75"></a>
## [2.0.75](https://github.com/bullhorn/novo-elements/compare/v2.0.74...v2.0.75) (2017-01-19)


### Features

* **dropdown:** Allowing dropdown to be appended to the body ([c06cd6d](https://github.com/bullhorn/novo-elements/commit/c06cd6d))



<a name="2.0.74"></a>
## [2.0.74](https://github.com/bullhorn/novo-elements/compare/v2.0.73...v2.0.74) (2017-01-19)


### Bug Fixes

* **Table:** Temporary fix for tables that aren't switch to DataProviders ([d395f66](https://github.com/bullhorn/novo-elements/commit/d395f66))



<a name="2.0.73"></a>
## [2.0.73](https://github.com/bullhorn/novo-elements/compare/v2.0.72...v2.0.73) (2017-01-19)


### Bug Fixes

* **Table:** Date Filtering and Options filtering is more stable. ([#358](https://github.com/bullhorn/novo-elements/issues/358)) ([5ab0e98](https://github.com/bullhorn/novo-elements/commit/5ab0e98))



<a name="2.0.72"></a>
## [2.0.72](https://github.com/bullhorn/novo-elements/compare/v2.0.71...v2.0.72) (2017-01-19)


### Bug Fixes

* **Form:** Form interactions required field does not validate correctly ([#356](https://github.com/bullhorn/novo-elements/issues/356)) ([dcd77f3](https://github.com/bullhorn/novo-elements/commit/dcd77f3))



<a name="2.0.71"></a>
## [2.0.71](https://github.com/bullhorn/novo-elements/compare/v2.0.70...v2.0.71) (2017-01-17)



<a name="2.0.70"></a>
## [2.0.70](https://github.com/bullhorn/novo-elements/compare/v2.0.69...v2.0.70) (2017-01-17)


### Bug Fixes

* **form:** Fixing new disabled state to readOnly so the values appear in the mdoel ([ae846c5](https://github.com/bullhorn/novo-elements/commit/ae846c5))



<a name="2.0.69"></a>
## [2.0.69](https://github.com/bullhorn/novo-elements/compare/v2.0.68...v2.0.69) (2017-01-17)



<a name="2.0.68"></a>
## [2.0.68](https://github.com/bullhorn/novo-elements/compare/v2.0.67...v2.0.68) (2017-01-13)



<a name="2.0.67"></a>
## [2.0.67](https://github.com/bullhorn/novo-elements/compare/v2.0.66...v2.0.67) (2017-01-12)


### Bug Fixes

* **Table:** Date Ranges should clear times accordingly. ([#346](https://github.com/bullhorn/novo-elements/issues/346)) ([93ed484](https://github.com/bullhorn/novo-elements/commit/93ed484))


### Features

* **form:** Adding ability to have form interactions that can modify other fields and perform actions on the form ([63ba3c7](https://github.com/bullhorn/novo-elements/commit/63ba3c7))



<a name="2.0.66"></a>
## [2.0.66](https://github.com/bullhorn/novo-elements/compare/v2.0.65...v2.0.66) (2017-01-11)


### Features

* **select:** allowing typeaheads for selects to handle multiple characters ([e9c1484](https://github.com/bullhorn/novo-elements/commit/e9c1484))



<a name="2.0.65"></a>
## [2.0.65](https://github.com/bullhorn/novo-elements/compare/v2.0.64...v2.0.65) (2017-01-11)


### Bug Fixes

* **Form:** Fixing disabled styles ([73e86ac](https://github.com/bullhorn/novo-elements/commit/73e86ac))



<a name="2.0.64"></a>
## [2.0.64](https://github.com/bullhorn/novo-elements/compare/v2.0.63...v2.0.64) (2017-01-10)


### Features

* **Chips:** Adding check to make sure options is an array before using getLabelFromOptions() in Chips labels ([#342](https://github.com/bullhorn/novo-elements/issues/342)) ([d207c89](https://github.com/bullhorn/novo-elements/commit/d207c89))



<a name="2.0.63"></a>
## [2.0.63](https://github.com/bullhorn/novo-elements/compare/v2.0.62...v2.0.63) (2017-01-10)



<a name="2.0.62"></a>
## [2.0.62](https://github.com/bullhorn/novo-elements/compare/v2.0.61...v2.0.62) (2017-01-10)


### Features

* **Form:** Adding ability to force validation ([f49441d](https://github.com/bullhorn/novo-elements/commit/f49441d))



<a name="2.0.61"></a>
## [2.0.61](https://github.com/bullhorn/novo-elements/compare/v2.0.60...v2.0.61) (2017-01-10)


### Bug Fixes

* **Form:** Fixing default sort order ([ad6fba3](https://github.com/bullhorn/novo-elements/commit/ad6fba3))
* **Table:** Tables won't convert Dates into timestamps just in case custom functions need to know if it is a Number vs a Date ([#336](https://github.com/bullhorn/novo-elements/issues/336)) ([cf74bc8](https://github.com/bullhorn/novo-elements/commit/cf74bc8))


### Features

* **popover:** Adding a PopOver element ([aa4ebb4](https://github.com/bullhorn/novo-elements/commit/aa4ebb4))



<a name="2.0.60"></a>
## [2.0.60](https://github.com/bullhorn/novo-elements/compare/v2.0.59...v2.0.60) (2017-01-10)



<a name="2.0.59"></a>
## [2.0.59](https://github.com/bullhorn/novo-elements/compare/v2.0.58...v2.0.59) (2017-01-10)


### Bug Fixes

* **Form:** Adding validators for min/max length and more disabled CSS ([07aafd3](https://github.com/bullhorn/novo-elements/commit/07aafd3))



<a name="2.0.58"></a>
## [2.0.58](https://github.com/bullhorn/novo-elements/compare/v2.0.57...v2.0.58) (2017-01-10)


### Bug Fixes

* **Form:** Fixing dateFounded fields to be a number with maxlength at 4 ([6fcee44](https://github.com/bullhorn/novo-elements/commit/6fcee44))



<a name="2.0.57"></a>
## [2.0.57](https://github.com/bullhorn/novo-elements/compare/v2.0.56...v2.0.57) (2017-01-09)


### Bug Fixes

* **Form:** Making address.state not required ([98e47fb](https://github.com/bullhorn/novo-elements/commit/98e47fb))
* **quicknote:** Fixing validation around quick note ([0d9c2a6](https://github.com/bullhorn/novo-elements/commit/0d9c2a6))



<a name="2.0.56"></a>
## [2.0.56](https://github.com/bullhorn/novo-elements/compare/v2.0.55...v2.0.56) (2017-01-09)


### Bug Fixes

* **DatePicker:** Selecting either month or year in Date Picker resets other value to default ([#334](https://github.com/bullhorn/novo-elements/issues/334)) ([5460cfc](https://github.com/bullhorn/novo-elements/commit/5460cfc))


### Features

* **Chips:** Adding support for Chips labels to be displayed correctly when only value passed in ([#332](https://github.com/bullhorn/novo-elements/issues/332)) ([396bbf3](https://github.com/bullhorn/novo-elements/commit/396bbf3))



<a name="2.0.55"></a>
## [2.0.55](https://github.com/bullhorn/novo-elements/compare/v2.0.54...v2.0.55) (2017-01-09)


### Bug Fixes

* **Forms:** Properly set sort order ([37c3379](https://github.com/bullhorn/novo-elements/commit/37c3379))


### Features

* **Table:** Split Empty and NoMatchingRecords States for Tables ([#330](https://github.com/bullhorn/novo-elements/issues/330)) ([7c42003](https://github.com/bullhorn/novo-elements/commit/7c42003))



<a name="2.0.54"></a>
## [2.0.54](https://github.com/bullhorn/novo-elements/compare/v2.0.53...v2.0.54) (2017-01-06)



<a name="2.0.53"></a>
## [2.0.53](https://github.com/bullhorn/novo-elements/compare/v2.0.52...v2.0.53) (2017-01-05)



<a name="2.0.52"></a>
## [2.0.52](https://github.com/bullhorn/novo-elements/compare/v2.0.51...v2.0.52) (2017-01-05)



<a name="2.0.51"></a>
## [2.0.51](https://github.com/bullhorn/novo-elements/compare/v2.0.50...v2.0.51) (2017-01-05)


### Features

* **picker:** Adding defaultOptions and minSearchLength to pickers ([271a35f](https://github.com/bullhorn/novo-elements/commit/271a35f))



<a name="2.0.50"></a>
## [2.0.50](https://github.com/bullhorn/novo-elements/compare/v2.0.49...v2.0.50) (2017-01-05)



<a name="2.0.49"></a>
## [2.0.49](https://github.com/bullhorn/novo-elements/compare/v2.0.48...v2.0.49) (2017-01-05)


### Features

* **Table:** Adding actions column header type ([#326](https://github.com/bullhorn/novo-elements/issues/326)) ([b9626f7](https://github.com/bullhorn/novo-elements/commit/b9626f7))



<a name="2.0.48"></a>
## [2.0.48](https://github.com/bullhorn/novo-elements/compare/v2.0.47...v2.0.48) (2017-01-05)


### Bug Fixes

* **pickers:** fix so does not search when no search term entered ([#324](https://github.com/bullhorn/novo-elements/issues/324)) ([85beda6](https://github.com/bullhorn/novo-elements/commit/85beda6))



<a name="2.0.47"></a>
## [2.0.47](https://github.com/bullhorn/novo-elements/compare/v2.0.46...v2.0.47) (2017-01-04)



<a name="2.0.46"></a>
## [2.0.46](https://github.com/bullhorn/novo-elements/compare/v2.0.45...v2.0.46) (2017-01-04)


### Bug Fixes

* **Table:** column filtering by options should not have text input if values are not string ([#322](https://github.com/bullhorn/novo-elements/issues/322)) ([5a3dea2](https://github.com/bullhorn/novo-elements/commit/5a3dea2))



<a name="2.0.45"></a>
## [2.0.45](https://github.com/bullhorn/novo-elements/compare/v2.0.44...v2.0.45) (2017-01-04)


### Bug Fixes

* **Table:** column filtering by options should not have text input if values are not string ([#321](https://github.com/bullhorn/novo-elements/issues/321)) ([f203bbf](https://github.com/bullhorn/novo-elements/commit/f203bbf))



<a name="2.0.44"></a>
## [2.0.44](https://github.com/bullhorn/novo-elements/compare/v2.0.43...v2.0.44) (2017-01-03)


### Bug Fixes

* **pickers:** fix for removing empty objects so they do not populate as [object Object] in multi select pickers ([#320](https://github.com/bullhorn/novo-elements/issues/320)) ([fb134e5](https://github.com/bullhorn/novo-elements/commit/fb134e5))



<a name="2.0.43"></a>
## [2.0.43](https://github.com/bullhorn/novo-elements/compare/v2.0.42...v2.0.43) (2016-12-30)



<a name="2.0.42"></a>
## [2.0.42](https://github.com/bullhorn/novo-elements/compare/v2.0.41...v2.0.42) (2016-12-30)



<a name="2.0.41"></a>
## [2.0.41](https://github.com/bullhorn/novo-elements/compare/v2.0.40...v2.0.41) (2016-12-29)



<a name="2.0.40"></a>
## [2.0.40](https://github.com/bullhorn/novo-elements/compare/v2.0.39...v2.0.40) (2016-12-29)


### Bug Fixes

* **form:** Empty form state and chip pre-selecting ([1de9f8d](https://github.com/bullhorn/novo-elements/commit/1de9f8d))



<a name="2.0.39"></a>
## [2.0.39](https://github.com/bullhorn/novo-elements/compare/v2.0.38...v2.0.39) (2016-12-29)


### Bug Fixes

* **chips:** Checking for null and defaulting to false when checking if result has been selected ([#311](https://github.com/bullhorn/novo-elements/issues/311)) ([d64b7cd](https://github.com/bullhorn/novo-elements/commit/d64b7cd))



<a name="2.0.38"></a>
## [2.0.38](https://github.com/bullhorn/novo-elements/compare/v2.0.37...v2.0.38) (2016-12-29)


### Bug Fixes

* **Chips:** Validate properties before interpolating a label string ([#309](https://github.com/bullhorn/novo-elements/issues/309)) ([0cf78bb](https://github.com/bullhorn/novo-elements/commit/0cf78bb))



<a name="2.0.37"></a>
## [2.0.37](https://github.com/bullhorn/novo-elements/compare/v2.0.36...v2.0.37) (2016-12-28)



<a name="2.0.36"></a>
## [2.0.36](https://github.com/bullhorn/novo-elements/compare/v2.0.35...v2.0.36) (2016-12-28)


### Bug Fixes

* **Table:** Header hid when you filtered to no results. ([#307](https://github.com/bullhorn/novo-elements/issues/307)) ([eb1f751](https://github.com/bullhorn/novo-elements/commit/eb1f751))



<a name="2.0.35"></a>
## [2.0.35](https://github.com/bullhorn/novo-elements/compare/v2.0.34...v2.0.35) (2016-12-28)



<a name="2.0.34"></a>
## [2.0.34](https://github.com/bullhorn/novo-elements/compare/v2.0.33...v2.0.34) (2016-12-27)



<a name="2.0.33"></a>
## [2.0.33](https://github.com/bullhorn/novo-elements/compare/v2.0.32...v2.0.33) (2016-12-23)



<a name="2.0.32"></a>
## [2.0.32](https://github.com/bullhorn/novo-elements/compare/v2.0.31...v2.0.32) (2016-12-22)



<a name="2.0.31"></a>
## [2.0.31](https://github.com/bullhorn/novo-elements/compare/v2.0.30...v2.0.31) (2016-12-22)


### Bug Fixes

* **Table:** SelectAll functionality has been fixed ([#301](https://github.com/bullhorn/novo-elements/issues/301)) ([78d9006](https://github.com/bullhorn/novo-elements/commit/78d9006))



<a name="2.0.30"></a>
## [2.0.30](https://github.com/bullhorn/novo-elements/compare/v2.0.29...v2.0.30) (2016-12-21)


### Bug Fixes

* **picker:** fix showing error if the term was empty ([31791a7](https://github.com/bullhorn/novo-elements/commit/31791a7))



<a name="2.0.29"></a>
## [2.0.29](https://github.com/bullhorn/novo-elements/compare/v2.0.28...v2.0.29) (2016-12-21)


### Bug Fixes

* **form:** Fixing initial value setters ([b4c78fd](https://github.com/bullhorn/novo-elements/commit/b4c78fd))



<a name="2.0.28"></a>
## [2.0.28](https://github.com/bullhorn/novo-elements/compare/v2.0.27...v2.0.28) (2016-12-21)


### Bug Fixes

* **form:** Fixing number inputs to not allow decimals but still allow for percentage/currency/float ([a021a08](https://github.com/bullhorn/novo-elements/commit/a021a08))



<a name="2.0.27"></a>
## [2.0.27](https://github.com/bullhorn/novo-elements/compare/v2.0.26...v2.0.27) (2016-12-20)



<a name="2.0.26"></a>
## [2.0.26](https://github.com/bullhorn/novo-elements/compare/v2.0.25...v2.0.26) (2016-12-19)


### Bug Fixes

* **form:** make address fields show properly ([1390d0f](https://github.com/bullhorn/novo-elements/commit/1390d0f))


### Features

* **form:** allowing number fields to have decimals ([7133761](https://github.com/bullhorn/novo-elements/commit/7133761))



<a name="2.0.25"></a>
## [2.0.25](https://github.com/bullhorn/novo-elements/compare/v2.0.24...v2.0.25) (2016-12-19)


### Bug Fixes

* **forms:** Fixing the form labels and animations ([933abe9](https://github.com/bullhorn/novo-elements/commit/933abe9))



<a name="2.0.24"></a>
## [2.0.24](https://github.com/bullhorn/novo-elements/compare/v2.0.23...v2.0.24) (2016-12-16)


### Bug Fixes

* **Table:** Fixed the custom Match functions ([f8f4dae](https://github.com/bullhorn/novo-elements/commit/f8f4dae))



<a name="2.0.23"></a>
## [2.0.23](https://github.com/bullhorn/novo-elements/compare/v2.0.22...v2.0.23) (2016-12-16)



<a name="2.0.22"></a>
## [2.0.22](https://github.com/bullhorn/novo-elements/compare/v2.0.21...v2.0.22) (2016-12-15)


### Bug Fixes

* **pagination:** Fix data-provider pagination ([1751783](https://github.com/bullhorn/novo-elements/commit/1751783))



<a name="2.0.21"></a>
## [2.0.21](https://github.com/bullhorn/novo-elements/compare/v2.0.20...v2.0.21) (2016-12-15)


### Bug Fixes

* **multipicker:** rearrange logic to correctly handle non-strict relationship ([#296](https://github.com/bullhorn/novo-elements/issues/296)) ([5accf75](https://github.com/bullhorn/novo-elements/commit/5accf75))



<a name="2.0.20"></a>
## [2.0.20](https://github.com/bullhorn/novo-elements/compare/v2.0.19...v2.0.20) (2016-12-14)


### Bug Fixes

* **chips:** Picker results for chips will now stay open when selecting. ([68ca60f](https://github.com/bullhorn/novo-elements/commit/68ca60f))
* **picker:** Clicking the picker should open the picker ([59ee189](https://github.com/bullhorn/novo-elements/commit/59ee189))
* **table:** add back in custom sorting/filtering functions ([#293](https://github.com/bullhorn/novo-elements/issues/293)) ([64e3c23](https://github.com/bullhorn/novo-elements/commit/64e3c23))



<a name="2.0.19"></a>
## [2.0.19](https://github.com/bullhorn/novo-elements/compare/v2.0.18...v2.0.19) (2016-12-14)


### Bug Fixes

* **form:** padding ([#292](https://github.com/bullhorn/novo-elements/issues/292)) ([1e111b9](https://github.com/bullhorn/novo-elements/commit/1e111b9))



<a name="2.0.18"></a>
## [2.0.18](https://github.com/bullhorn/novo-elements/compare/v2.0.17...v2.0.18) (2016-12-14)


### Features

* **form:** added fieldsets with headers ([#289](https://github.com/bullhorn/novo-elements/issues/289)) ([2a10801](https://github.com/bullhorn/novo-elements/commit/2a10801))
* **multipicker:** make creating a select all item optional, add a 'strict relationship' mode, make selectAllOption, strictRelationship, and chipsCount configurable ([fc49b30](https://github.com/bullhorn/novo-elements/commit/fc49b30))



<a name="2.0.17"></a>
## [2.0.17](https://github.com/bullhorn/novo-elements/compare/v2.0.16...v2.0.17) (2016-12-14)


### Bug Fixes

* **Table:** Free Text Filtering bug fixed ([#290](https://github.com/bullhorn/novo-elements/issues/290)) ([f493972](https://github.com/bullhorn/novo-elements/commit/f493972))



<a name="2.0.16"></a>
## [2.0.16](https://github.com/bullhorn/novo-elements/compare/v2.0.15...v2.0.16) (2016-12-14)


### Bug Fixes

* **chips:** Picker results for chips will now stay open when selecting. ([#285](https://github.com/bullhorn/novo-elements/issues/285)) ([dbe2c03](https://github.com/bullhorn/novo-elements/commit/dbe2c03))



<a name="2.0.15"></a>
## [2.0.15](https://github.com/bullhorn/novo-elements/compare/v2.0.14...v2.0.15) (2016-12-13)


### Bug Fixes

* **Table:** Custom compare functionality re-implemented ([#287](https://github.com/bullhorn/novo-elements/issues/287)) ([e19f6ef](https://github.com/bullhorn/novo-elements/commit/e19f6ef))


### Features

* **colors:** adding sendout entity color ([#286](https://github.com/bullhorn/novo-elements/issues/286)) ([1f5a525](https://github.com/bullhorn/novo-elements/commit/1f5a525))



<a name="2.0.14"></a>
## [2.0.14](https://github.com/bullhorn/novo-elements/compare/v2.0.13...v2.0.14) (2016-12-10)


### Bug Fixes

* **forms:** Fixing logic for the form label animations ([23218b7](https://github.com/bullhorn/novo-elements/commit/23218b7))



<a name="2.0.13"></a>
## [2.0.13](https://github.com/bullhorn/novo-elements/compare/v2.0.12...v2.0.13) (2016-12-08)



<a name="2.0.12"></a>
## [2.0.12](https://github.com/bullhorn/novo-elements/compare/v2.0.11...v2.0.12) (2016-12-08)



<a name="2.0.11"></a>
## [2.0.11](https://github.com/bullhorn/novo-elements/compare/v2.0.10...v2.0.11) (2016-12-07)


### Bug Fixes

* **DatePicker:** Fixing AOT compile issue ([bc4df01](https://github.com/bullhorn/novo-elements/commit/bc4df01))



<a name="2.0.10"></a>
## [2.0.10](https://github.com/bullhorn/novo-elements/compare/v2.0.9...v2.0.10) (2016-12-07)


### Bug Fixes

* **calendar:** Month / Year picker auto focus on currently selected month / year ([#281](https://github.com/bullhorn/novo-elements/issues/281)) ([1f03475](https://github.com/bullhorn/novo-elements/commit/1f03475))
* **controls:** if default value was 0 or 0.0, it was seen as empty and then label would covered value ([#280](https://github.com/bullhorn/novo-elements/issues/280)) ([40df102](https://github.com/bullhorn/novo-elements/commit/40df102))
* **tables:** Fix sort order, fix button focus styles, add sorted column header color ([#277](https://github.com/bullhorn/novo-elements/issues/277)) ([4721137](https://github.com/bullhorn/novo-elements/commit/4721137))
* **tables:** Fixed TH Border colors  ([#279](https://github.com/bullhorn/novo-elements/issues/279)) ([c776d34](https://github.com/bullhorn/novo-elements/commit/c776d34))


### Features

* **calendar:** Fixes date-range pickers to allow tabbing ([#276](https://github.com/bullhorn/novo-elements/issues/276)) ([82f0569](https://github.com/bullhorn/novo-elements/commit/82f0569))



<a name="2.0.9"></a>
## [2.0.9](https://github.com/bullhorn/novo-elements/compare/v2.0.8...v2.0.9) (2016-12-05)



<a name="2.0.8"></a>
## [2.0.8](https://github.com/bullhorn/novo-elements/compare/v2.0.7...v2.0.8) (2016-12-05)



<a name="2.0.7"></a>
## [2.0.7](https://github.com/bullhorn/novo-elements/compare/v2.0.6...v2.0.7) (2016-12-01)



<a name="2.0.6"></a>
## [2.0.6](https://github.com/bullhorn/novo-elements/compare/v2.0.5...v2.0.6) (2016-12-01)


### Bug Fixes

* **iconography:** Replaces icon link in demo ([#271](https://github.com/bullhorn/novo-elements/issues/271)) ([45dfb5f](https://github.com/bullhorn/novo-elements/commit/45dfb5f))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/bullhorn/novo-elements/compare/v2.0.4...v2.0.5) (2016-12-01)



<a name="2.0.4"></a>
## [2.0.4](https://github.com/bullhorn/novo-elements/compare/v2.0.3...v2.0.4) (2016-12-01)


### Bug Fixes

* **forms:** Add disabled class to dynamic form fields ([#269](https://github.com/bullhorn/novo-elements/issues/269)) ([f26929f](https://github.com/bullhorn/novo-elements/commit/f26929f))
* **forms:** Adding missing property to the BaseControl ([65f83e0](https://github.com/bullhorn/novo-elements/commit/65f83e0))



<a name="2.0.3"></a>
## [2.0.3](https://github.com/bullhorn/novo-elements/compare/v2.0.2...v2.0.3) (2016-11-30)


### Bug Fixes

* **DateTimePicker:** Fixing unused property ([21c6ce0](https://github.com/bullhorn/novo-elements/commit/21c6ce0))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/bullhorn/novo-elements/compare/v2.0.0...v2.0.2) (2016-11-30)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/bullhorn/novo-elements/compare/v1.1.34...v2.0.0) (2016-11-30)



<a name="1.1.34"></a>
## [1.1.34](https://github.com/bullhorn/novo-elements/compare/v1.1.33...v1.1.34) (2016-11-30)


### Bug Fixes

* **select,picker:** Select Dropdown and Picker Container ([#265](https://github.com/bullhorn/novo-elements/issues/265)) ([c84b2db](https://github.com/bullhorn/novo-elements/commit/c84b2db))


### Features

* **multipicker:** Initial setup for parent/child relationship for multipicker categories ([5be7a41](https://github.com/bullhorn/novo-elements/commit/5be7a41))
* **select:** Replaced placeholder default for selects with an empty string ([#263](https://github.com/bullhorn/novo-elements/issues/263)) ([573ba45](https://github.com/bullhorn/novo-elements/commit/573ba45))



<a name="1.1.33"></a>
## [1.1.33](https://github.com/bullhorn/novo-elements/compare/v1.1.32...v1.1.33) (2016-11-22)


### Bug Fixes

* **notifications:** Fixing Icon in Notifications ([cfc95ad](https://github.com/bullhorn/novo-elements/commit/cfc95ad))



<a name="1.1.32"></a>
## [1.1.32](https://github.com/bullhorn/novo-elements/compare/v1.1.31...v1.1.32) (2016-11-21)


### Bug Fixes

* **list:** Fixing list elements/styles ([f5633f0](https://github.com/bullhorn/novo-elements/commit/f5633f0))



<a name="1.1.31"></a>
## [1.1.31](https://github.com/bullhorn/novo-elements/compare/v1.1.30...v1.1.31) (2016-11-16)


### Bug Fixes

* **address field:** state matching and country name matching ([#251](https://github.com/bullhorn/novo-elements/issues/251)) ([1ef86bd](https://github.com/bullhorn/novo-elements/commit/1ef86bd))
* **tables:** fixes broken z-indexes caused by preserve-3d ([#252](https://github.com/bullhorn/novo-elements/issues/252)) ([2425351](https://github.com/bullhorn/novo-elements/commit/2425351))



<a name="1.1.30"></a>
## [1.1.30](https://github.com/bullhorn/novo-elements/compare/v1.1.29...v1.1.30) (2016-11-15)


### Bug Fixes

* **Table:** Fix column sorting ([4d043fd](https://github.com/bullhorn/novo-elements/commit/4d043fd))


### Features

* **Forms:** Adding async validator support for Controls ([#248](https://github.com/bullhorn/novo-elements/issues/248)) ([0974e3f](https://github.com/bullhorn/novo-elements/commit/0974e3f))



<a name="1.1.29"></a>
## [1.1.29](https://github.com/bullhorn/novo-elements/compare/v1.1.28...v1.1.29) (2016-11-14)


### Bug Fixes

* **Address:** Show and populate address fields ([#246](https://github.com/bullhorn/novo-elements/issues/246)) ([4ef5369](https://github.com/bullhorn/novo-elements/commit/4ef5369))


### Features

* **multipicker:** Make 'All [type]' indeterminate state function like table ([#245](https://github.com/bullhorn/novo-elements/issues/245)) ([fd680b6](https://github.com/bullhorn/novo-elements/commit/fd680b6))



<a name="1.1.28"></a>
## [1.1.28](https://github.com/bullhorn/novo-elements/compare/v1.1.27...v1.1.28) (2016-11-10)


### Features

* **Multipicker:** Adding a multipicker component ([e9bb57a](https://github.com/bullhorn/novo-elements/commit/e9bb57a))



<a name="1.1.27"></a>
## [1.1.27](https://github.com/bullhorn/novo-elements/compare/v1.1.26...v1.1.27) (2016-11-10)



<a name="1.1.26"></a>
## [1.1.26](https://github.com/bullhorn/novo-elements/compare/v1.1.25...v1.1.26) (2016-11-02)



<a name="1.1.25"></a>
## [1.1.25](https://github.com/bullhorn/novo-elements/compare/v1.1.24...v1.1.25) (2016-11-02)


### Bug Fixes

* **Toast:** Theme and Icon are now bound properly ([#236](https://github.com/bullhorn/novo-elements/issues/236)) ([823a0c3](https://github.com/bullhorn/novo-elements/commit/823a0c3))



<a name="1.1.24"></a>
## [1.1.24](https://github.com/bullhorn/novo-elements/compare/v1.1.23...v1.1.24) (2016-11-01)



<a name="1.1.23"></a>
## [1.1.23](https://github.com/bullhorn/novo-elements/compare/v1.1.22...v1.1.23) (2016-11-01)



<a name="1.1.22"></a>
## [1.1.22](https://github.com/bullhorn/novo-elements/compare/v1.1.21...v1.1.22) (2016-10-31)


### Bug Fixes

* **button:** Fixes buttons so that they apply disabled attribute when disabled - issue [#232](https://github.com/bullhorn/novo-elements/issues/232) ([#233](https://github.com/bullhorn/novo-elements/issues/233)) ([3d6dc97](https://github.com/bullhorn/novo-elements/commit/3d6dc97))
* **chips:** Fixing Placement ([5c4b28a](https://github.com/bullhorn/novo-elements/commit/5c4b28a))



<a name="1.1.21"></a>
## [1.1.21](https://github.com/bullhorn/novo-elements/compare/v1.1.20...v1.1.21) (2016-10-28)


### Bug Fixes

* **Picker:** Fixing EntityPickerResults to properly work for Placements ([3321619](https://github.com/bullhorn/novo-elements/commit/3321619))



<a name="1.1.20"></a>
## [1.1.20](https://github.com/bullhorn/novo-elements/compare/v1.1.19...v1.1.20) (2016-10-27)


### Bug Fixes

* **Form:** Ignore unsubscibe event onNgDestroy when control doesn't exist ([#228](https://github.com/bullhorn/novo-elements/issues/228)) ([54d15a7](https://github.com/bullhorn/novo-elements/commit/54d15a7))



<a name="1.1.19"></a>
## [1.1.19](https://github.com/bullhorn/novo-elements/compare/v1.1.18...v1.1.19) (2016-10-26)



<a name="1.1.18"></a>
## [1.1.18](https://github.com/bullhorn/novo-elements/compare/v1.1.17...v1.1.18) (2016-10-26)



<a name="1.1.17"></a>
## [1.1.17](https://github.com/bullhorn/novo-elements/compare/v1.1.16...v1.1.17) (2016-10-25)


### Features

* **table:** make clearing filtering/sorting optional when setting rows ([#225](https://github.com/bullhorn/novo-elements/issues/225)) ([5a4528a](https://github.com/bullhorn/novo-elements/commit/5a4528a))



<a name="1.1.16"></a>
## [1.1.16](https://github.com/bullhorn/novo-elements/compare/v1.1.15...v1.1.16) (2016-10-24)



<a name="1.1.15"></a>
## [1.1.15](https://github.com/bullhorn/novo-elements/compare/v1.1.14...v1.1.15) (2016-10-20)



<a name="1.1.14"></a>
## [1.1.14](https://github.com/bullhorn/novo-elements/compare/v1.1.13...v1.1.14) (2016-10-18)


### Features

* **picker, chips:** Adding support for async labels ([bf0b08d](https://github.com/bullhorn/novo-elements/commit/bf0b08d))



<a name="1.1.13"></a>
## [1.1.13](https://github.com/bullhorn/novo-elements/compare/v1.1.12...v1.1.13) (2016-10-17)


### Bug Fixes

* **Control:** Quick fix for the Control modifying the value of hideState too quickly ([75774c5](https://github.com/bullhorn/novo-elements/commit/75774c5))



<a name="1.1.12"></a>
## [1.1.12](https://github.com/bullhorn/novo-elements/compare/v1.1.11...v1.1.12) (2016-10-17)


### Bug Fixes

* **categorydropdown:** Fixing the demo ([1bc3ea7](https://github.com/bullhorn/novo-elements/commit/1bc3ea7))



<a name="1.1.11"></a>
## [1.1.11](https://github.com/bullhorn/novo-elements/compare/v1.1.10...v1.1.11) (2016-10-17)


### Bug Fixes

* **forms:** Form controls now use ngIf to show / hide rather than add a "hidden" property ([610d0ed](https://github.com/bullhorn/novo-elements/commit/610d0ed))


### Features

* **CategoryDropdown:** Adding a Categorized Dropdown Element ([24074c8](https://github.com/bullhorn/novo-elements/commit/24074c8))
* **forms:** Add disabled element and styling to form fields ([#217](https://github.com/bullhorn/novo-elements/issues/217)) ([acb975b](https://github.com/bullhorn/novo-elements/commit/acb975b))



<a name="1.1.10"></a>
## [1.1.10](https://github.com/bullhorn/novo-elements/compare/v1.1.9...v1.1.10) (2016-10-14)



<a name="1.1.9"></a>
## [1.1.9](https://github.com/bullhorn/novo-elements/compare/v1.1.8...v1.1.9) (2016-10-13)


### Features

* **form:** allowing setting of maxlength on input ([d398fc6](https://github.com/bullhorn/novo-elements/commit/d398fc6))



<a name="1.1.8"></a>
## [1.1.8](https://github.com/bullhorn/novo-elements/compare/v1.1.7...v1.1.8) (2016-10-12)


### Features

* **form:** TextBoxControl emits change events on input ([16c7870](https://github.com/bullhorn/novo-elements/commit/16c7870))



<a name="1.1.7"></a>
## [1.1.7](https://github.com/bullhorn/novo-elements/compare/v1.1.6...v1.1.7) (2016-10-04)



<a name="1.1.6"></a>
## [1.1.6](https://github.com/bullhorn/novo-elements/compare/v1.1.5...v1.1.6) (2016-10-03)


### Bug Fixes

* **Picker:** Fixing issue in picker where if a value wasn't selected the text remained, closes [#203](https://github.com/bullhorn/novo-elements/issues/203) ([dbdc68d](https://github.com/bullhorn/novo-elements/commit/dbdc68d))



<a name="1.1.5"></a>
## [1.1.5](https://github.com/bullhorn/novo-elements/compare/v1.1.4...v1.1.5) (2016-09-30)


### Bug Fixes

* **table:** Fixing the `onRowSelect` output to emit the proper object ([2a6c566](https://github.com/bullhorn/novo-elements/commit/2a6c566))



<a name="1.1.4"></a>
## [1.1.4](https://github.com/bullhorn/novo-elements/compare/v1.1.3...v1.1.4) (2016-09-26)


### Bug Fixes

* **control:** Adding change output for chips in the control ([fd70d7e](https://github.com/bullhorn/novo-elements/commit/fd70d7e))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/bullhorn/novo-elements/compare/v1.1.2...v1.1.3) (2016-09-26)


### Features

* **buttons:** Adds "Loading" state styles ([#202](https://github.com/bullhorn/novo-elements/issues/202)) ([cdfb93b](https://github.com/bullhorn/novo-elements/commit/cdfb93b))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/bullhorn/novo-elements/compare/v1.1.1...v1.1.2) (2016-09-26)


### Bug Fixes

* **table:** Fixing internal structure for sorting/filtering so that a user can change the data in the table properly ([ba44af7](https://github.com/bullhorn/novo-elements/commit/ba44af7))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/bullhorn/novo-elements/compare/v1.0.35...v1.1.1) (2016-09-22)


### Bug Fixes

* **forms:** Adds support for placeholders in vertical layout ([#199](https://github.com/bullhorn/novo-elements/issues/199)) ([a6d7daf](https://github.com/bullhorn/novo-elements/commit/a6d7daf))
* **forms:** Small tweaks to vertical forms ([#197](https://github.com/bullhorn/novo-elements/issues/197)) ([b48493f](https://github.com/bullhorn/novo-elements/commit/b48493f))



<a name="1.0.35"></a>
## [1.0.35](https://github.com/bullhorn/novo-elements/compare/v1.0.34...v1.0.35) (2016-09-20)


### Features

* **ComponentUtils:** Adding a ComponentUtils that can dynamically load components into locations ([1572464](https://github.com/bullhorn/novo-elements/commit/1572464))
* **form:** vertical form animations ([418b169](https://github.com/bullhorn/novo-elements/commit/418b169))



<a name="1.0.34"></a>
## [1.0.34](https://github.com/bullhorn/novo-elements/compare/v1.0.33...v1.0.34) (2016-09-20)


### Features

* **ComponentUtils:** Adding a ComponentUtils that can dynamically load components into locations ([86ce5a5](https://github.com/bullhorn/novo-elements/commit/86ce5a5))



<a name="1.0.33"></a>
## [1.0.33](https://github.com/bullhorn/novo-elements/compare/v1.0.32...v1.0.33) (2016-09-16)


### Bug Fixes

* **Form:** Initial rending of date inputs when there is no value ([86ab19d](https://github.com/bullhorn/novo-elements/commit/86ab19d))



<a name="1.0.32"></a>
## [1.0.32](https://github.com/bullhorn/novo-elements/compare/v1.0.31...v1.0.32) (2016-09-15)


### Bug Fixes

* **form:** Fix initial control rendering of dates ([76ec452](https://github.com/bullhorn/novo-elements/commit/76ec452))
* **pagination:** Fixes table headers + pagination, closes [#180](https://github.com/bullhorn/novo-elements/issues/180) + [#190](https://github.com/bullhorn/novo-elements/issues/190) ([#192](https://github.com/bullhorn/novo-elements/issues/192)) ([272fe6f](https://github.com/bullhorn/novo-elements/commit/272fe6f))
* **z-index:** Fixing z-index of the dropdowns/selects ([d6575e5](https://github.com/bullhorn/novo-elements/commit/d6575e5))



<a name="1.0.31"></a>
## [1.0.31](https://github.com/bullhorn/novo-elements/compare/v1.0.30...v1.0.31) (2016-09-15)


### Bug Fixes

* **table:** Fixing the data-automation-ids around the table filters ([45bebcd](https://github.com/bullhorn/novo-elements/commit/45bebcd))



<a name="1.0.30"></a>
## [1.0.30](https://github.com/bullhorn/novo-elements/compare/v1.0.29...v1.0.30) (2016-09-14)


### Bug Fixes

* **table:** Fixing the table filtering data-automation-ids if the list of options were of the form {value, label} ([44cf00b](https://github.com/bullhorn/novo-elements/commit/44cf00b))



<a name="1.0.29"></a>
## [1.0.29](https://github.com/bullhorn/novo-elements/compare/v1.0.28...v1.0.29) (2016-09-14)


### Bug Fixes

* **table:** Fixing the table filtering if the list of options were of the form {value, label} ([6739ce3](https://github.com/bullhorn/novo-elements/commit/6739ce3))



<a name="1.0.28"></a>
## [1.0.28](https://github.com/bullhorn/novo-elements/compare/v1.0.27...v1.0.28) (2016-09-14)


### Bug Fixes

* **calendar controls:** Fixing the rendering of the Calendar Controls (date, time, datetime). Fixes [#186](https://github.com/bullhorn/novo-elements/issues/186) and [#185](https://github.com/bullhorn/novo-elements/issues/185) ([bf632ae](https://github.com/bullhorn/novo-elements/commit/bf632ae))



<a name="1.0.27"></a>
## [1.0.27](https://github.com/bullhorn/novo-elements/compare/v1.0.26...v1.0.27) (2016-09-14)


### Features

* **FILE INPUT:** Multi File Input is now additive ([#184](https://github.com/bullhorn/novo-elements/issues/184)) ([223ef2b](https://github.com/bullhorn/novo-elements/commit/223ef2b))



<a name="1.0.26"></a>
## [1.0.26](https://github.com/bullhorn/novo-elements/compare/v1.0.25...v1.0.26) (2016-09-12)


### Features

* **fileInput:** Added Single and Multi File Input Control. closes [#181](https://github.com/bullhorn/novo-elements/issues/181) ([#183](https://github.com/bullhorn/novo-elements/issues/183)) ([edb6038](https://github.com/bullhorn/novo-elements/commit/edb6038))



<a name="1.0.25"></a>
## [1.0.25](https://github.com/bullhorn/novo-elements/compare/v1.0.24...v1.0.25) (2016-09-08)


### Features

* **header:** Allowing the utils for headers to be disabled ([e9c1953](https://github.com/bullhorn/novo-elements/commit/e9c1953))



<a name="1.0.24"></a>
## [1.0.24](https://github.com/bullhorn/novo-elements/compare/v1.0.23...v1.0.24) (2016-09-08)


### Bug Fixes

* **table:** Fixing data-automation-ids for Table columns that share the same name ([b68da3f](https://github.com/bullhorn/novo-elements/commit/b68da3f))



<a name="1.0.23"></a>
## [1.0.23](https://github.com/bullhorn/novo-elements/compare/v1.0.22...v1.0.23) (2016-09-06)


### Bug Fixes

* **table:** Fixing when unselected a page it would not have the correct intermediate section ([756e547](https://github.com/bullhorn/novo-elements/commit/756e547))



<a name="1.0.22"></a>
## [1.0.22](https://github.com/bullhorn/novo-elements/compare/v1.0.21...v1.0.22) (2016-09-06)


### Bug Fixes

* **table:** Fixing bug where the selected was set to 0 if you select/unselect the whole page ([9c628ae](https://github.com/bullhorn/novo-elements/commit/9c628ae))



<a name="1.0.21"></a>
## [1.0.21](https://github.com/bullhorn/novo-elements/compare/v1.0.20...v1.0.21) (2016-08-31)


### Bug Fixes

* **form:** Output change method for Tiles on Control ([45f3a34](https://github.com/bullhorn/novo-elements/commit/45f3a34))



<a name="1.0.20"></a>
## [1.0.20](https://github.com/bullhorn/novo-elements/compare/v1.0.19...v1.0.20) (2016-08-31)


### Bug Fixes

* **picker:** Fixing issue where the collection would be an object with data rather than an array. ([a1371b4](https://github.com/bullhorn/novo-elements/commit/a1371b4))



<a name="1.0.19"></a>
## [1.0.19](https://github.com/bullhorn/novo-elements/compare/v1.0.18...v1.0.19) (2016-08-31)


### Bug Fixes

* **chips:** Fixing extra event that was added to the DOM and slowing up forms, fixes [#177](https://github.com/bullhorn/novo-elements/issues/177) ([f732a69](https://github.com/bullhorn/novo-elements/commit/f732a69))



<a name="1.0.18"></a>
## [1.0.18](https://github.com/bullhorn/novo-elements/compare/v1.0.17...v1.0.18) (2016-08-31)


### Bug Fixes

* **chips:** Styling issue ([f293b60](https://github.com/bullhorn/novo-elements/commit/f293b60))



<a name="1.0.17"></a>
## [1.0.17](https://github.com/bullhorn/novo-elements/compare/v1.0.16...v1.0.17) (2016-08-30)


### Features

* **DatePicker:** Added ability to select a single day in range picker ([#174](https://github.com/bullhorn/novo-elements/issues/174)) ([4e08e09](https://github.com/bullhorn/novo-elements/commit/4e08e09))



<a name="1.0.16"></a>
## [1.0.16](https://github.com/bullhorn/novo-elements/compare/v1.0.15...v1.0.16) (2016-08-30)


### Bug Fixes

* **table:** Checkbox styling ([ec930df](https://github.com/bullhorn/novo-elements/commit/ec930df))



<a name="1.0.15"></a>
## [1.0.15](https://github.com/bullhorn/novo-elements/compare/v1.0.14...v1.0.15) (2016-08-29)


### Bug Fixes

* **OutsideClick:** Fix bug if the force value was false it wasn't used. ([bd17716](https://github.com/bullhorn/novo-elements/commit/bd17716))



<a name="1.0.14"></a>
## [1.0.14](https://github.com/bullhorn/novo-elements/compare/v1.0.13...v1.0.14) (2016-08-29)


### Bug Fixes

* **DatePicker:** Fix for Date filter dropdown closes out and DatePicker sizing ([#173](https://github.com/bullhorn/novo-elements/issues/173)) ([7ff76a9](https://github.com/bullhorn/novo-elements/commit/7ff76a9))



<a name="1.0.13"></a>
## [1.0.13](https://github.com/bullhorn/novo-elements/compare/v1.0.12...v1.0.13) (2016-08-27)


### Features

* **form:** Allowing to clear values for Picker/Chips/Date inputs and some style updated ([f231b6f](https://github.com/bullhorn/novo-elements/commit/f231b6f))



<a name="1.0.12"></a>
## [1.0.12](https://github.com/bullhorn/novo-elements/compare/v1.0.11...v1.0.12) (2016-08-26)


### Bug Fixes

* **Chips:** Preventing null values from being passed on double-click ([#168](https://github.com/bullhorn/novo-elements/issues/168)) ([f61f647](https://github.com/bullhorn/novo-elements/commit/f61f647))


### Features

* **list:** Added themes support to Novo List ([#167](https://github.com/bullhorn/novo-elements/issues/167)) ([3449fef](https://github.com/bullhorn/novo-elements/commit/3449fef))



<a name="1.0.11"></a>
## [1.0.11](https://github.com/bullhorn/novo-elements/compare/v1.0.10...v1.0.11) (2016-08-25)


### Bug Fixes

* **forms:** Fixing initial values for the updated values and validation ([#164](https://github.com/bullhorn/novo-elements/issues/164)) ([60e4503](https://github.com/bullhorn/novo-elements/commit/60e4503))



<a name="1.0.10"></a>
## [1.0.10](https://github.com/bullhorn/novo-elements/compare/v1.0.9...v1.0.10) (2016-08-25)


### Bug Fixes

* **Tiles:** Initial input if false would not render ([824d1e2](https://github.com/bullhorn/novo-elements/commit/824d1e2))



<a name="1.0.9"></a>
## [1.0.9](https://github.com/bullhorn/novo-elements/compare/v1.0.8...v1.0.9) (2016-08-24)


### Bug Fixes

* **picker:** Fixing backspacing on picker ([#163](https://github.com/bullhorn/novo-elements/issues/163)) ([6227050](https://github.com/bullhorn/novo-elements/commit/6227050))



<a name="1.0.8"></a>
## [1.0.8](https://github.com/bullhorn/novo-elements/compare/v1.0.7...v1.0.8) (2016-08-24)



<a name="1.0.7"></a>
## [1.0.7](https://github.com/bullhorn/novo-elements/compare/v1.0.6...v1.0.7) (2016-08-24)


### Bug Fixes

* **Table:** Fixing sorting when the value is null, treating it like an empty string ([12784e6](https://github.com/bullhorn/novo-elements/commit/12784e6))



<a name="1.0.6"></a>
## [1.0.6](https://github.com/bullhorn/novo-elements/compare/v1.0.5...v1.0.6) (2016-08-23)



<a name="1.0.5"></a>
## [1.0.5](https://github.com/bullhorn/novo-elements/compare/v1.0.4...v1.0.5) (2016-08-23)


### Bug Fixes

* **Date Picker:** Fixed errors on select year from dropdowns in range picker ([#157](https://github.com/bullhorn/novo-elements/issues/157)) ([2346961](https://github.com/bullhorn/novo-elements/commit/2346961))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/bullhorn/novo-elements/compare/v1.0.3...v1.0.4) (2016-08-22)


### Bug Fixes

* **modules:** Fixing module declarations ([b747a52](https://github.com/bullhorn/novo-elements/commit/b747a52))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/bullhorn/novo-elements/compare/v1.0.2...v1.0.3) (2016-08-22)


### Bug Fixes

* **quicknote:** Adding missing module ([8cfc52e](https://github.com/bullhorn/novo-elements/commit/8cfc52e))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/bullhorn/novo-elements/compare/v1.0.1...v1.0.2) (2016-08-22)


### Bug Fixes

* **checklist:** Fixing issue where it the model wasn't there so the options weren't set ([46bcc90](https://github.com/bullhorn/novo-elements/commit/46bcc90))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/bullhorn/novo-elements/compare/v0.2.26...v1.0.1) (2016-08-21)


### Features

* **RC.5:** Updating to RC.5 (changelog inc) ([892ad53](https://github.com/bullhorn/novo-elements/commit/892ad53))



<a name="0.2.26"></a>
## [0.2.26](https://github.com/bullhorn/novo-elements/compare/v0.2.25...v0.2.26) (2016-08-16)


### Bug Fixes

* **picker:** Deleting a character will clear the entity selected ([8406b64](https://github.com/bullhorn/novo-elements/commit/8406b64))



<a name="0.2.25"></a>
## [0.2.25](https://github.com/bullhorn/novo-elements/compare/v0.2.24...v0.2.25) (2016-08-16)


### Bug Fixes

* **chips:** Making it so you can set an intial value with chips that is an array of objects. ([32292c7](https://github.com/bullhorn/novo-elements/commit/32292c7))
* **tipwell:** Updating color, closes [#151](https://github.com/bullhorn/novo-elements/issues/151) ([6d9d188](https://github.com/bullhorn/novo-elements/commit/6d9d188))



<a name="0.2.24"></a>
## [0.2.24](https://github.com/bullhorn/novo-elements/compare/v0.2.23...v0.2.24) (2016-08-16)



<a name="0.2.23"></a>
## [0.2.23](https://github.com/bullhorn/novo-elements/compare/v0.2.22...v0.2.23) (2016-08-15)


### Bug Fixes

* **calendar:** Cleanup of ability to select a range of dates ([#149](https://github.com/bullhorn/novo-elements/issues/149)) ([9fcc8ae](https://github.com/bullhorn/novo-elements/commit/9fcc8ae))


### Features

* **tipwell:** Add icon and optional button ([#148](https://github.com/bullhorn/novo-elements/issues/148)) ([0bab7c0](https://github.com/bullhorn/novo-elements/commit/0bab7c0))



<a name="0.2.22"></a>
## [0.2.22](https://github.com/bullhorn/novo-elements/compare/v0.2.21...v0.2.22) (2016-08-12)



<a name="0.2.21"></a>
## [0.2.21](https://github.com/bullhorn/novo-elements/compare/v0.2.20...v0.2.21) (2016-08-12)



<a name="0.2.20"></a>
## [0.2.20](https://github.com/bullhorn/novo-elements/compare/v0.2.19...v0.2.20) (2016-08-12)


### Bug Fixes

* **picker,chips:** Fixing selection in chips that was always remaining and some minor styling fixes for chips dropdown. ([5acfa07](https://github.com/bullhorn/novo-elements/commit/5acfa07))



<a name="0.2.19"></a>
## [0.2.19](https://github.com/bullhorn/novo-elements/compare/v0.2.18...v0.2.19) (2016-08-11)


### Bug Fixes

* **form:** Fixing vertical layout initial value for select ([98888ed](https://github.com/bullhorn/novo-elements/commit/98888ed))



<a name="0.2.18"></a>
## [0.2.18](https://github.com/bullhorn/novo-elements/compare/v0.2.17...v0.2.18) (2016-08-11)


### Features

* **calendar, table:** Adding ability to select a range of dates and being about to sort on date ranges ([#147](https://github.com/bullhorn/novo-elements/issues/147)) ([bd5da58](https://github.com/bullhorn/novo-elements/commit/bd5da58))



<a name="0.2.17"></a>
## [0.2.17](https://github.com/bullhorn/novo-elements/compare/v0.2.16...v0.2.17) (2016-08-10)


### Bug Fixes

* **dropdown:** Fixing dropdown's overflow ([b894cdb](https://github.com/bullhorn/novo-elements/commit/b894cdb))



<a name="0.2.16"></a>
## [0.2.16](https://github.com/bullhorn/novo-elements/compare/v0.2.15...v0.2.16) (2016-08-10)


### Features

* **tooltip:** Adding ability to enable/disable the tooltip from appearing. ([bf0226a](https://github.com/bullhorn/novo-elements/commit/bf0226a))



<a name="0.2.15"></a>
## [0.2.15](https://github.com/bullhorn/novo-elements/compare/v0.2.14...v0.2.15) (2016-08-09)


### Bug Fixes

* **dropdown:** Fixing minor dropdown styling ([d556ab8](https://github.com/bullhorn/novo-elements/commit/d556ab8))
* **dropdown:** Toggling the dropdown when an item is clicked ([8c76228](https://github.com/bullhorn/novo-elements/commit/8c76228))
* **picker:** Fixing the initial value being [Object object] ([23fc7c3](https://github.com/bullhorn/novo-elements/commit/23fc7c3))



<a name="0.2.14"></a>
## [0.2.14](https://github.com/bullhorn/novo-elements/compare/v0.2.13...v0.2.14) (2016-08-08)


### Features

* **editor:** Updating the editor to have a base set of config ([6a0605b](https://github.com/bullhorn/novo-elements/commit/6a0605b))



<a name="0.2.13"></a>
## [0.2.13](https://github.com/bullhorn/novo-elements/compare/v0.2.12...v0.2.13) (2016-08-08)


### Features

* **editor:** Adding in a wrapper around the CKEditor ([0850329](https://github.com/bullhorn/novo-elements/commit/0850329))



<a name="0.2.12"></a>
## [0.2.12](https://github.com/bullhorn/novo-elements/compare/v0.2.11...v0.2.12) (2016-08-05)


### Bug Fixes

* **table:** Fixing table filter styling ([e52c751](https://github.com/bullhorn/novo-elements/commit/e52c751))



<a name="0.2.11"></a>
## [0.2.11](https://github.com/bullhorn/novo-elements/compare/v0.2.10...v0.2.11) (2016-08-05)



<a name="0.2.10"></a>
## [0.2.10](https://github.com/bullhorn/novo-elements/compare/v0.2.9...v0.2.10) (2016-08-04)


### Features

* **dropdown:** Adding ability to disable an item inside a dropdown ([#138](https://github.com/bullhorn/novo-elements/issues/138)) ([e33be26](https://github.com/bullhorn/novo-elements/commit/e33be26))



<a name="0.2.9"></a>
## [0.2.9](https://github.com/bullhorn/novo-elements/compare/v0.2.8...v0.2.9) (2016-08-04)



<a name="0.2.8"></a>
## [0.2.8](https://github.com/bullhorn/novo-elements/compare/v0.2.7...v0.2.8) (2016-08-04)


### Bug Fixes

* **Table:** Fixing selection logic when the page is not full ([0920934](https://github.com/bullhorn/novo-elements/commit/0920934))



<a name="0.2.7"></a>
## [0.2.7](https://github.com/bullhorn/novo-elements/compare/v0.2.6...v0.2.7) (2016-08-04)


### Bug Fixes

* **Table:** Fixing selection logic when the page is not full ([365ce46](https://github.com/bullhorn/novo-elements/commit/365ce46))



<a name="0.2.6"></a>
## [0.2.6](https://github.com/bullhorn/novo-elements/compare/v0.2.5...v0.2.6) (2016-08-04)



<a name="0.2.5"></a>
## [0.2.5](https://github.com/bullhorn/novo-elements/compare/v0.2.4...v0.2.5) (2016-08-04)


### Bug Fixes

* **table:** Unselect should unselect all instead of just page ([3dc47dd](https://github.com/bullhorn/novo-elements/commit/3dc47dd))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/bullhorn/novo-elements/compare/v0.2.3...v0.2.4) (2016-08-03)


### Features

* **Table:** changed Date filtering to allow multiple or single selection ([#135](https://github.com/bullhorn/novo-elements/issues/135)) ([517d45f](https://github.com/bullhorn/novo-elements/commit/517d45f))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/bullhorn/novo-elements/compare/v0.2.2...v0.2.3) (2016-08-03)


### Bug Fixes

* **table:** Fixing table selection mode for when the page size changes. ([366e410](https://github.com/bullhorn/novo-elements/commit/366e410))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/bullhorn/novo-elements/compare/v0.2.1...v0.2.2) (2016-08-03)


### Features

* **table:** Removing selection when sort/filter change ([0994367](https://github.com/bullhorn/novo-elements/commit/0994367))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/bullhorn/novo-elements/compare/v0.1.28...v0.2.1) (2016-08-02)


### Features

* **table:** Moving pagination into table, adding custom header/actions and custom themes to table, fixing things around selection ([4ccbd22](https://github.com/bullhorn/novo-elements/commit/4ccbd22))


### BREAKING CHANGES

* **table:** The new version of table has pagination already in place, so to migrate to the new table you will simple remove your instance of `novo-pagination` and use the one provided

For example:

BEFORE:

```
<novo-pagination></novo-pagination>
<novo-table></novo-table>
```

AFTER:

```
<novo-table></novo-table>
```

Also, any custom header or custom actions that your table already implemented along side the `novo-pagination` element, those will move into the `novo-table-header` and `novo-table-actions` components inside the table. See below for more information on those.

In order to turn off pagination you will simply pass `paging: false` in the config object you provide with the table. The rest of the config object that is passed into the table did not change at all!

For docs on how to use the custom headers/actions please refer to [TABLE README](https://github.com/bullhorn/novo-elements/blob/master/src/elements/table/README.md)



<a name="0.1.28"></a>
## [0.1.28](https://github.com/bullhorn/novo-elements/compare/v0.1.27...v0.1.28) (2016-08-02)



<a name="0.1.27"></a>
## [0.1.27](https://github.com/bullhorn/novo-elements/compare/v0.1.26...v0.1.27) (2016-08-02)


### Bug Fixes

* **tipwell:** Fixing anonymous instances of TipWells ([c19b5db](https://github.com/bullhorn/novo-elements/commit/c19b5db))



<a name="0.1.26"></a>
## [0.1.26](https://github.com/bullhorn/novo-elements/compare/v0.1.25...v0.1.26) (2016-08-02)


### Features

* **TipWell:** adding new TipWell feature for displaying a tip dialog in-line ([#129](https://github.com/bullhorn/novo-elements/issues/129)) ([d20c207](https://github.com/bullhorn/novo-elements/commit/d20c207))



<a name="0.1.25"></a>
## [0.1.25](https://github.com/bullhorn/novo-elements/compare/v0.1.24...v0.1.25) (2016-08-01)


### Features

* **Tooltips:** Enhanced positioning ([#127](https://github.com/bullhorn/novo-elements/issues/127)) ([cd3b3dc](https://github.com/bullhorn/novo-elements/commit/cd3b3dc))



<a name="0.1.24"></a>
## [0.1.24](https://github.com/bullhorn/novo-elements/compare/v0.1.23...v0.1.24) (2016-07-28)


### Bug Fixes

* **form:** Fix NPE when using a manual form field ([9ecbdfd](https://github.com/bullhorn/novo-elements/commit/9ecbdfd))



<a name="0.1.23"></a>
## [0.1.23](https://github.com/bullhorn/novo-elements/compare/v0.1.22...v0.1.23) (2016-07-28)


### Bug Fixes

* **task:** Adding task as entity color ([cbf1c84](https://github.com/bullhorn/novo-elements/commit/cbf1c84))



<a name="0.1.22"></a>
## [0.1.22](https://github.com/bullhorn/novo-elements/compare/v0.1.21...v0.1.22) (2016-07-28)


### Features

* **slider:** Adding a slider component ([1e181ed](https://github.com/bullhorn/novo-elements/commit/1e181ed))



<a name="0.1.21"></a>
## [0.1.21](https://github.com/bullhorn/novo-elements/compare/v0.1.20...v0.1.21) (2016-07-27)


### Bug Fixes

* **table:** Fixing overflow ([62b5eba](https://github.com/bullhorn/novo-elements/commit/62b5eba))



<a name="0.1.20"></a>
## [0.1.20](https://github.com/bullhorn/novo-elements/compare/v0.1.19...v0.1.20) (2016-07-27)


### Features

* **colors:** Adds Neutral Color ([8903a41](https://github.com/bullhorn/novo-elements/commit/8903a41))



<a name="0.1.19"></a>
## [0.1.19](https://github.com/bullhorn/novo-elements/compare/v0.1.18...v0.1.19) (2016-07-26)



<a name="0.1.18"></a>
## [0.1.18](https://github.com/bullhorn/novo-elements/compare/v0.1.17...v0.1.18) (2016-07-26)


### Features

* **modal:** Adds Custom Notification Modals ([f3ef112](https://github.com/bullhorn/novo-elements/commit/f3ef112))



<a name="0.1.17"></a>
## [0.1.17](https://github.com/bullhorn/novo-elements/compare/v0.1.16...v0.1.17) (2016-07-25)


### Features

* **table:** Only showing the clear button when there is a filter, otherwise hiding it ([#117](https://github.com/bullhorn/novo-elements/issues/117)) ([3e6436e](https://github.com/bullhorn/novo-elements/commit/3e6436e))



<a name="0.1.16"></a>
## [0.1.16](https://github.com/bullhorn/novo-elements/compare/v0.1.15...v0.1.16) (2016-07-21)


### Bug Fixes

* **tiles:** fix for no defaults ([#114](https://github.com/bullhorn/novo-elements/issues/114)) ([de4a37b](https://github.com/bullhorn/novo-elements/commit/de4a37b))



<a name="0.1.15"></a>
## [0.1.15](https://github.com/bullhorn/novo-elements/compare/v0.1.14...v0.1.15) (2016-07-19)



<a name="0.1.14"></a>
## [0.1.14](https://github.com/bullhorn/novo-elements/compare/v0.1.13...v0.1.14) (2016-07-18)



<a name="0.1.13"></a>
## [0.1.13](https://github.com/bullhorn/novo-elements/compare/v0.1.12...v0.1.13) (2016-07-14)


### Features

* **entitycolor:** adding notes entity color ([#104](https://github.com/bullhorn/novo-elements/issues/104)) ([b2c35c6](https://github.com/bullhorn/novo-elements/commit/b2c35c6))
* **forms:** Updates Forms to allow vertical layout ([#106](https://github.com/bullhorn/novo-elements/issues/106)) ([9fe6cb9](https://github.com/bullhorn/novo-elements/commit/9fe6cb9))



<a name="0.1.12"></a>
## [0.1.12](https://github.com/bullhorn/novo-elements/compare/v0.1.11...v0.1.12) (2016-07-13)


### Bug Fixes

* **chips:** change extra margin/padding on bottom ([#101](https://github.com/bullhorn/novo-elements/issues/101)) ([35b64be](https://github.com/bullhorn/novo-elements/commit/35b64be))


### Features

* **form:** form output to subscribe to changes ([#102](https://github.com/bullhorn/novo-elements/issues/102)) ([6dc3c56](https://github.com/bullhorn/novo-elements/commit/6dc3c56))



<a name="0.1.11"></a>
## [0.1.11](https://github.com/bullhorn/novo-elements/compare/v0.1.10...v0.1.11) (2016-07-07)


### Bug Fixes

* **forms & select:** Style updates ([2351215](https://github.com/bullhorn/novo-elements/commit/2351215))
* **loading:** cross-browser fixes for loading animations: chrome, firefox, safari, iOS ([a4668de](https://github.com/bullhorn/novo-elements/commit/a4668de))


### Features

* **tiles:** Tiles input and some logic refactoring ([5d14629](https://github.com/bullhorn/novo-elements/commit/5d14629))



<a name="0.1.10"></a>
## [0.1.10](https://github.com/bullhorn/novo-elements/compare/v0.1.9...v0.1.10) (2016-07-06)


### Features

* **form:** Adding tiles input ([5f98a80](https://github.com/bullhorn/novo-elements/commit/5f98a80))



<a name="0.1.9"></a>
## [0.1.9](https://github.com/bullhorn/novo-elements/compare/v0.1.8...v0.1.9) (2016-07-01)


### Bug Fixes

* **button:** Fixing the disabled attr for buttons ([5f7aebd](https://github.com/bullhorn/novo-elements/commit/5f7aebd))



<a name="0.1.8"></a>
## [0.1.8](https://github.com/bullhorn/novo-elements/compare/v0.1.7...v0.1.8) (2016-06-30)



<a name="0.1.7"></a>
## [0.1.7](https://github.com/bullhorn/novo-elements/compare/v0.1.6...v0.1.7) (2016-06-30)


### Bug Fixes

* **button:** Fixing the disabled attr for buttons ([b72b895](https://github.com/bullhorn/novo-elements/commit/b72b895))



<a name="0.1.6"></a>
## [0.1.6](https://github.com/bullhorn/novo-elements/compare/v0.1.4...v0.1.6) (2016-06-30)


### Features

* **radio:** Adding a label input to the radio ([5b6f72c](https://github.com/bullhorn/novo-elements/commit/5b6f72c))
* **tiles:** Adding a tile component ([a904a87](https://github.com/bullhorn/novo-elements/commit/a904a87))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/bullhorn/novo-elements/compare/v0.1.3...v0.1.4) (2016-06-29)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/bullhorn/novo-elements/compare/v0.1.2...v0.1.3) (2016-06-29)


### Features

* **radio:** Adding a radio group element ([9209f0a](https://github.com/bullhorn/novo-elements/commit/9209f0a))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/bullhorn/novo-elements/compare/v0.1.1...v0.1.2) (2016-06-28)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/bullhorn/novo-elements/compare/v0.0.24...v0.1.1) (2016-06-22)



<a name="0.0.24"></a>
## [0.0.24](https://github.com/bullhorn/novo-elements/compare/v0.0.23...v0.0.24) (2016-06-22)


### Features

* **form:** Adding hidden flag to form fields ([0c79a45](https://github.com/bullhorn/novo-elements/commit/0c79a45))



<a name="0.0.23"></a>
## [0.0.23](https://github.com/bullhorn/novo-elements/compare/v0.0.22...v0.0.23) (2016-06-21)


### Features

* **checkbox:** Adding a disabled property to the checkbox input ([3c6669a](https://github.com/bullhorn/novo-elements/commit/3c6669a))



<a name="0.0.22"></a>
## [0.0.22](https://github.com/bullhorn/novo-elements/compare/v0.0.21...v0.0.22) (2016-06-20)


### Features

* **table,tooltip:** Adding in a custom class for the rows of the Table and not showing the tooltip if there is no content ([3809c72](https://github.com/bullhorn/novo-elements/commit/3809c72))



<a name="0.0.21"></a>
## [0.0.21](https://github.com/bullhorn/novo-elements/compare/v0.0.20...v0.0.21) (2016-06-16)



<a name="0.0.20"></a>
## [0.0.20](https://github.com/bullhorn/novo-elements/compare/v0.0.19...v0.0.20) (2016-06-15)



<a name="0.0.19"></a>
## [0.0.19](https://github.com/bullhorn/novo-elements/compare/v0.0.18...v0.0.19) (2016-06-07)



<a name="0.0.18"></a>
## [0.0.18](https://github.com/bullhorn/novo-elements/compare/v0.0.17...v0.0.18) (2016-06-07)



<a name="0.0.17"></a>
## [0.0.17](https://github.com/bullhorn/novo-elements/compare/v0.0.16...v0.0.17) (2016-06-02)


### Bug Fixes

* **cards:** Adding missing overflow for cards ([ee1948e](https://github.com/bullhorn/novo-elements/commit/ee1948e))



<a name="0.0.16"></a>
## [0.0.16](https://github.com/bullhorn/novo-elements/compare/v0.0.15...v0.0.16) (2016-06-01)


### Features

* **labels:** Externalizing all labels with a LabelService, closes [#56](https://github.com/bullhorn/novo-elements/issues/56) ([ee2ad08](https://github.com/bullhorn/novo-elements/commit/ee2ad08))



<a name="0.0.15"></a>
## [0.0.15](https://github.com/bullhorn/novo-elements/compare/v0.0.14...v0.0.15) (2016-05-31)



<a name="0.0.14"></a>
## [0.0.14](https://github.com/bullhorn/novo-elements/compare/v0.0.13...v0.0.14) (2016-05-31)



<a name="0.0.13"></a>
## [0.0.13](https://github.com/bullhorn/novo-elements/compare/v0.0.12...v0.0.13) (2016-05-26)


### Bug Fixes

* **button:** Adding disabled attribute as input/host property, closes [#61](https://github.com/bullhorn/novo-elements/issues/61) ([b5e1d26](https://github.com/bullhorn/novo-elements/commit/b5e1d26))
* **countries:** Fixing address input for counties and resetting the validation on the AddressInput when selected a new country ([e5abd7e](https://github.com/bullhorn/novo-elements/commit/e5abd7e))



<a name="0.0.12"></a>
## [0.0.12](https://github.com/bullhorn/novo-elements/compare/v0.0.11...v0.0.12) (2016-05-25)


### Features

* **forms, quicknote:** Implementing Forms and FormExtras with a QuickNote component, closes [#7](https://github.com/bullhorn/novo-elements/issues/7) and closes [#8](https://github.com/bullhorn/novo-elements/issues/8) ([a035c7c](https://github.com/bullhorn/novo-elements/commit/a035c7c))



<a name="0.0.11"></a>
## [0.0.11](https://github.com/bullhorn/novo-elements/compare/v0.0.10...v0.0.11) (2016-05-24)


### Bug Fixes

* **Modal/Tooltip:** Fixing references to Modal and Tooltip ([25fd5e8](https://github.com/bullhorn/novo-elements/commit/25fd5e8))
* **TableCell:** Fixing rendering for cells ([103a058](https://github.com/bullhorn/novo-elements/commit/103a058))


### Features

* **chips:** Implementing Chips component, closes [#6](https://github.com/bullhorn/novo-elements/issues/6) ([cd0e281](https://github.com/bullhorn/novo-elements/commit/cd0e281))



<a name="0.0.10"></a>
## [0.0.10](https://github.com/bullhorn/novo-elements/compare/v0.0.9...v0.0.10) (2016-05-19)


### Bug Fixes

* **exports:** Fixing some missing exports and updating deprecated code ([dc48107](https://github.com/bullhorn/novo-elements/commit/dc48107))



<a name="0.0.9"></a>
## [0.0.9](https://github.com/bullhorn/novo-elements/compare/v0.0.8...v0.0.9) (2016-05-19)


### Bug Fixes

* **exports:** Fixing some exports and properties of elements that were missing ([645a8e1](https://github.com/bullhorn/novo-elements/commit/645a8e1))
* **exports:** Fixing some exports and properties of elements that were missing ([65c07a1](https://github.com/bullhorn/novo-elements/commit/65c07a1))
* **toast:** fixed z index bug, added all toast types to demo, closes [#51](https://github.com/bullhorn/novo-elements/issues/51) ([55876dd](https://github.com/bullhorn/novo-elements/commit/55876dd))


### Features

* **dragula:** adds dragula element and docs, closes [#5](https://github.com/bullhorn/novo-elements/issues/5) ([16c0c78](https://github.com/bullhorn/novo-elements/commit/16c0c78))



<a name="0.0.8"></a>
## [0.0.8](https://github.com/bullhorn/novo-elements/compare/v0.0.7...v0.0.8) (2016-05-17)


### Features

* **modal:** Adding a Modal, closes [#13](https://github.com/bullhorn/novo-elements/issues/13) ([a9f3331](https://github.com/bullhorn/novo-elements/commit/a9f3331))
* **picker:** Adding picker, closes [#14](https://github.com/bullhorn/novo-elements/issues/14) ([97a0842](https://github.com/bullhorn/novo-elements/commit/97a0842))



<a name="0.0.7"></a>
## [0.0.7](https://github.com/bullhorn/novo-elements/compare/v0.0.6...v0.0.7) (2016-05-11)


### Bug Fixes

* **headers:** Fixes SCSS to give section.primary appropriate background color, closes [#41](https://github.com/bullhorn/novo-elements/issues/41) ([a36058a](https://github.com/bullhorn/novo-elements/commit/a36058a))


### Features

* **calendar:** Implementing DatePicker and TimePicker, closes [#2](https://github.com/bullhorn/novo-elements/issues/2) ([dd44a17](https://github.com/bullhorn/novo-elements/commit/dd44a17))
* **table:** Adds table element and documentation, closes [#17](https://github.com/bullhorn/novo-elements/issues/17) ([c096a60](https://github.com/bullhorn/novo-elements/commit/c096a60))



<a name="0.0.6"></a>
## [0.0.6](https://github.com/bullhorn/novo-elements/compare/v0.0.5...v0.0.6) (2016-05-05)


### Bug Fixes

* **colors:** Hooks up toast to color copy func ([6bbd9a6](https://github.com/bullhorn/novo-elements/commit/6bbd9a6))
* **style:** fixes href cursor styling ([#39](https://github.com/bullhorn/novo-elements/issues/39)) ([82ca7b6](https://github.com/bullhorn/novo-elements/commit/82ca7b6))


### Features

* **fork me:** Adds 'Fork Me On GH' button to side nav, cleans side nav styles ([#37](https://github.com/bullhorn/novo-elements/issues/37)) ([ecf4010](https://github.com/bullhorn/novo-elements/commit/ecf4010))
* **list:** Adds list component and documentation, closes [#11](https://github.com/bullhorn/novo-elements/issues/11) ([#40](https://github.com/bullhorn/novo-elements/issues/40)) ([3e11da6](https://github.com/bullhorn/novo-elements/commit/3e11da6))



<a name="0.0.5"></a>
## [0.0.5](https://github.com/bullhorn/novo-elements/compare/v0.0.4...v0.0.5) (2016-05-03)


### Features

* **dropdown:** Adding Dropdown Component ([#33](https://github.com/bullhorn/novo-elements/issues/33)), closes [#9](https://github.com/bullhorn/novo-elements/issues/9) ([411ab43](https://github.com/bullhorn/novo-elements/commit/411ab43))
* **header:** Adds header element & documentation, closes [#10](https://github.com/bullhorn/novo-elements/issues/10) ([c565d0e](https://github.com/bullhorn/novo-elements/commit/c565d0e))



<a name="0.0.4"></a>
## [0.0.4](https://github.com/bullhorn/novo-elements/compare/v0.0.3...v0.0.4) (2016-05-03)


### Features

* **drawer:** Add drawer element, closes [#4](https://github.com/bullhorn/novo-elements/issues/4) ([2a16f07](https://github.com/bullhorn/novo-elements/commit/2a16f07))
* **select:** Added Select element, documentation, and initial tests ([f1036d2](https://github.com/bullhorn/novo-elements/commit/f1036d2))
* **switch:** Adds switch element and documentation, closes [#16](https://github.com/bullhorn/novo-elements/issues/16) ([747174b](https://github.com/bullhorn/novo-elements/commit/747174b))
* **toast:** Adds toast element and documentation, closes [#18](https://github.com/bullhorn/novo-elements/issues/18) ([08f2351](https://github.com/bullhorn/novo-elements/commit/08f2351))
* **tooltip:** Adding tooltip feature, closes [#20](https://github.com/bullhorn/novo-elements/issues/20) ([#29](https://github.com/bullhorn/novo-elements/issues/29)) ([211f730](https://github.com/bullhorn/novo-elements/commit/211f730))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/bullhorn/novo-elements/compare/v0.0.2...v0.0.3) (2016-04-28)


### Features

* **deferred:** Implement deferred object ([15e5fe0](https://github.com/bullhorn/novo-elements/commit/15e5fe0))
* **keycodes:** Implement key codes util, closes [#23](https://github.com/bullhorn/novo-elements/issues/23) ([470a1c6](https://github.com/bullhorn/novo-elements/commit/470a1c6))
* **outside-click:** Implementing an outside click mixin, closes [#24](https://github.com/bullhorn/novo-elements/issues/24) ([c5b4625](https://github.com/bullhorn/novo-elements/commit/c5b4625))
* **plural:** Implementing a plural pipe and updating demo, closes [#21](https://github.com/bullhorn/novo-elements/issues/21) ([73413d6](https://github.com/bullhorn/novo-elements/commit/73413d6))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/bullhorn/novo-elements/compare/v0.0.1...v0.0.2) (2016-04-28)


### Features

* **cards,loading:** Implementing a Card and Loading element, style cleanup. ([d2e9045](https://github.com/bullhorn/novo-elements/commit/d2e9045))



<a name="0.0.1"></a>
## [0.0.1](https://github.com/bullhorn/novo-elements/compare/216f054...v0.0.1) (2016-04-27)


### Features

* **button:** Adding base library code with a Button element and demo. ([216f054](https://github.com/bullhorn/novo-elements/commit/216f054))
* **tabs:** Adds Tabs element and demo. Closes [#19](https://github.com/bullhorn/novo-elements/issues/19) ([9c38e7c](https://github.com/bullhorn/novo-elements/commit/9c38e7c))



