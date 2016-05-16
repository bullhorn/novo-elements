# Modals

## Usage
```javascript
export { NOVO_MODAL_ELEMENTS, ModalService } from 'novo-elements';

// Insice APP Component
export class MyApp {
    constructor(modalService:ModalService, view:ViewContainerRef) {
        modalService.defaultViewContainer = view;
    }
}

export class MyComponent {
    constructor(modalService:ModalService) {
        this.modalService = modalService;
    }

    bake() {
        this.modalService.open(MyNewModal, {params});
    }
}
```

##### ModalService Reference Api
- `'open' : Function`
    * Opens the component passed in as a modal and passes any params in
