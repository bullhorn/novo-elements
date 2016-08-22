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