# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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



<a name="2.9.3"></a>
## [2.9.3](https://github.com/bullhorn/novo-elements/compare/v2.9.1...v2.9.3) (2018-03-30)


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



<a name="2.5.0"></a>
# [2.5.0](https://github.com/bullhorn/novo-elements/compare/v2.4.0...v2.5.0) (2018-02-23)


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



<a name="2.4.0"></a>
# [2.4.0](https://github.com/bullhorn/novo-elements/compare/v2.3.0...v2.4.0) (2018-01-25)


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
