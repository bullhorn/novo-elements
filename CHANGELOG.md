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