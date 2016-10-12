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

### Breaking Changes

If you are using Tables and have code that resets the `rows` on `onTableChange`, then that can go away. All logic around that is handled inside the table now.


<a name="1.1.1"></a>
## [1.1.1](https://github.com/bullhorn/novo-elements/compare/v1.0.35...v1.1.1) (2016-09-22)


### Bug Fixes

* **forms:** Adds support for placeholders in vertical layout ([#199](https://github.com/bullhorn/novo-elements/issues/199)) ([a6d7daf](https://github.com/bullhorn/novo-elements/commit/a6d7daf))
* **forms:** Small tweaks to vertical forms ([#197](https://github.com/bullhorn/novo-elements/issues/197)) ([b48493f](https://github.com/bullhorn/novo-elements/commit/b48493f))



<a name="1.1.0"></a>
## [1.1.0](https://github.com/bullhorn/novo-elements/compare/v1.0.0...v1.1.0) (2016-09-21)

### Features

* **Update to Angular 2.0**
* **list:** Added themes support to Novo List ([#167](https://github.com/bullhorn/novo-elements/issues/167)) ([3449fef](https://github.com/bullhorn/novo-elements/commit/3449fef))
* **form:** Allowing to clear values for Picker/Chips/Date inputs and some style updated ([f231b6f](https://github.com/bullhorn/novo-elements/commit/f231b6f))
* **DatePicker:** Added ability to select a single day in range picker ([#174](https://github.com/bullhorn/novo-elements/issues/174)) ([4e08e09](https://github.com/bullhorn/novo-elements/commit/4e08e09))
* **header:** Allowing the utils for headers to be disabled ([e9c1953](https://github.com/bullhorn/novo-elements/commit/e9c1953))
* **fileInput:** Added Single and Multi File Input Control. closes [#181](https://github.com/bullhorn/novo-elements/issues/181) ([#183](https://github.com/bullhorn/novo-elements/issues/183)) ([edb6038](https://github.com/bullhorn/novo-elements/commit/edb6038))
* **FILE INPUT:** Multi File Input is now additive ([#184](https://github.com/bullhorn/novo-elements/issues/184)) ([223ef2b](https://github.com/bullhorn/novo-elements/commit/223ef2b))
* **ComponentUtils:** Adding a ComponentUtils that can dynamically load components into locations ([86ce5a5](https://github.com/bullhorn/novo-elements/commit/86ce5a5))
* **ComponentUtils:** Adding a ComponentUtils that can dynamically load components into locations ([1572464](https://github.com/bullhorn/novo-elements/commit/1572464))
* **form:** vertical form animations ([418b169](https://github.com/bullhorn/novo-elements/commit/418b169))

### Bug Fixes

* **checklist:** Fixing issue where it the model wasn't there so the options weren't set ([46bcc90](https://github.com/bullhorn/novo-elements/commit/46bcc90))
* **quicknote:** Adding missing module ([8cfc52e](https://github.com/bullhorn/novo-elements/commit/8cfc52e))
* **modules:** Fixing module declarations ([b747a52](https://github.com/bullhorn/novo-elements/commit/b747a52))
* **Date Picker:** Fixed errors on select year from dropdowns in range picker ([#157](https://github.com/bullhorn/novo-elements/issues/157)) ([2346961](https://github.com/bullhorn/novo-elements/commit/2346961))
* **Table:** Fixing sorting when the value is null, treating it like an empty string ([12784e6](https://github.com/bullhorn/novo-elements/commit/12784e6))
* **picker:** Fixing backspacing on picker ([#163](https://github.com/bullhorn/novo-elements/issues/163)) ([6227050](https://github.com/bullhorn/novo-elements/commit/6227050))
* **Tiles:** Initial input if false would not render ([824d1e2](https://github.com/bullhorn/novo-elements/commit/824d1e2))
* **forms:** Fixing initial values for the updated values and validation ([#164](https://github.com/bullhorn/novo-elements/issues/164)) ([60e4503](https://github.com/bullhorn/novo-elements/commit/60e4503))
* **Chips:** Preventing null values from being passed on double-click ([#168](https://github.com/bullhorn/novo-elements/issues/168)) ([f61f647](https://github.com/bullhorn/novo-elements/commit/f61f647))
* **DatePicker:** Fix for Date filter dropdown closes out and DatePicker sizing ([#173](https://github.com/bullhorn/novo-elements/issues/173)) ([7ff76a9](https://github.com/bullhorn/novo-elements/commit/7ff76a9))
* **OutsideClick:** Fix bug if the force value was false it wasn't used. ([bd17716](https://github.com/bullhorn/novo-elements/commit/bd17716))
* **table:** Checkbox styling ([ec930df](https://github.com/bullhorn/novo-elements/commit/ec930df))
* **chips:** Styling issue ([f293b60](https://github.com/bullhorn/novo-elements/commit/f293b60))
* **chips:** Fixing extra event that was added to the DOM and slowing up forms, fixes [#177](https://github.com/bullhorn/novo-elements/issues/177) ([f732a69](https://github.com/bullhorn/novo-elements/commit/f732a69))
* **picker:** Fixing issue where the collection would be an object with data rather than an array. ([a1371b4](https://github.com/bullhorn/novo-elements/commit/a1371b4))
* **form:** Output change method for Tiles on Control ([45f3a34](https://github.com/bullhorn/novo-elements/commit/45f3a34))
* **table:** Fixing bug where the selected was set to 0 if you select/unselect the whole page ([9c628ae](https://github.com/bullhorn/novo-elements/commit/9c628ae))
* **table:** Fixing when unselected a page it would not have the correct intermediate section ([756e547](https://github.com/bullhorn/novo-elements/commit/756e547))
* **table:** Fixing data-automation-ids for Table columns that share the same name ([b68da3f](https://github.com/bullhorn/novo-elements/commit/b68da3f))
* **calendar controls:** Fixing the rendering of the Calendar Controls (date, time, datetime). Fixes [#186](https://github.com/bullhorn/novo-elements/issues/186) and [#185](https://github.com/bullhorn/novo-elements/issues/185) ([bf632ae](https://github.com/bullhorn/novo-elements/commit/bf632ae))
* **table:** Fixing the table filtering if the list of options were of the form {value, label} ([6739ce3](https://github.com/bullhorn/novo-elements/commit/6739ce3))
* **table:** Fixing the table filtering data-automation-ids if the list of options were of the form {value, label} ([44cf00b](https://github.com/bullhorn/novo-elements/commit/44cf00b))
* **table:** Fixing the data-automation-ids around the table filters ([45bebcd](https://github.com/bullhorn/novo-elements/commit/45bebcd))
* **form:** Fix initial control rendering of dates ([76ec452](https://github.com/bullhorn/novo-elements/commit/76ec452))
* **pagination:** Fixes table headers + pagination, closes [#180](https://github.com/bullhorn/novo-elements/issues/180) + [#190](https://github.com/bullhorn/novo-elements/issues/190) ([#192](https://github.com/bullhorn/novo-elements/issues/192)) ([272fe6f](https://github.com/bullhorn/novo-elements/commit/272fe6f))
* **z-index:** Fixing z-index of the dropdowns/selects ([d6575e5](https://github.com/bullhorn/novo-elements/commit/d6575e5))
* **Form:** Initial rending of date inputs when there is no value ([86ab19d](https://github.com/bullhorn/novo-elements/commit/86ab19d))

<a name="1.0.0"></a>
## [1.0.0](https://github.com/bullhorn/novo-elements/compare/v0.2.26...v1.0.0) (2016-08-21)


### Features

* **RC.5:** Updating to Angular 2 RC.5 ([892ad53](https://github.com/bullhorn/novo-elements/commit/892ad53))
* New Template Driven Forms
* HTML Editor (CK Editor)
* Refactoring Modules/Services/Elements
* Prefixing with `Novo*` of everything

### BREAKING CHANGES

* `ToastService` -> `NovoToastService`
* `ModalService` -> `NovoModalService`
* `DragulaService` -> `NovoDragulaService`
* Firing an `alert` from the `NovoToastService` will now not be required to pass the `NovoToast` element.
#### Before
```
this.toastService.alert(NovoToast, { options });
```
#### After
```
this.toastService.alert({ options });
```
* New template driven forms
#### Before
```
<novo-form [data] [meta]>
    <form-input>
</novo-form>
```
#### After
See [Form Demo](http://bullhorn.github.io/novo-elements/#/)
* NovoElementsModule
```
@NgModule({
    declarations: [],
    imports: [NovoElementsModule],
    providers: [],
    entryComponents: [],
    bootstrap: []
})
export class MyAppModule {
}
```