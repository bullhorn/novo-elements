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