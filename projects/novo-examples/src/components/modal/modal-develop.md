---
section: Components
page: Modals
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/modal)
- **module:** `import { NovoModal } form 'novo-elements/modal';`
- **service:** `import { NovoModalService } form 'novo-elements/modal';`

# Roadmap

- [x] Improve Typing Support
- [ ] Remove `NovoModalParams` support in v6.0.0

# Changelog

### 5.0.0

**Deprecation**

- `NovoModalParams` should no longer be used, instead use `NovoModalRef.params`. This is because `NovoModalRef` accepts a generic for the params property.

  ```typescript
  interface MyParams {
    isDefault: boolean;
  }
  ...
  constructor(ref:NovoModalRef<MyParams>) {
    if(ref.params.isDefault) {
      /* ^ Will not need to by type cast */
    }
  }
  ```

## Properties

_No Properties_

# Services

## NovoModalService

Modals should be invoked via `NovoModalService` and therefore all properties should be private or internal. Any values that need to be passed to the your `Modal` instance should be passed by the service and available in your modal.

```typescript
@Component({...})
class RandomComponent {
  constructor(private modal:NovoModalService) {}
  handleAction() {
    const ref = this.modal.open(ConfirmDeleteModal, { record: 123 });
    /* you can listen to the close event */
    ref.onClosed.then((result) => {
      /* result is the argument sent via the ref */
      if (res === 'success') {
        /* perfom some action */
      }
    });
    /* close the modal from the parent */
    ref.close('success')
  }
}
```

### Methods

#### **open(component, params)**

Used to open all modals via the service. Use `params` to pass values to you component.

| Name      | Description                                                                         |
| :-------- | :---------------------------------------------------------------------------------- |
| component | _Class_<br>The angular component which represents the Modal to be opened.           |
| params    | _Object_<br>**Optional** arguments that will be injected into `NovoModalRef.params` |

_Note:_ All modal components should be declared as `entryComponents` in the module.

## NovoModalRef&lt;T&gt;

`NovoModalRef` should be injected into your modal component and all pass params can be accessed in the `params` property.

```typescript
interface DeleteModalParams {
  record: number;
}
@Component({})
class ConfirmDeleteModal {
  constructor(ref:NovoModalRef<DeleteModalParams>) {
    /**
     * All passed values are available
     * via ref.params
     **/
  }

  handleClose() {
    /* To close the modal use the close method */
    this.ref.close(/* Return a value */)
  }

}
```

### Methods

#### **close(response)**

Will close the modal will emit events to both the `beforeClose` and `afterClosed` observables, as well as the .

| Name     | Description                                                                                              |
| :------- | :------------------------------------------------------------------------------------------------------- |
| response | _any_<br>Any value you wish to return to calling components, will be resovled in the `onClosed` promise. |
