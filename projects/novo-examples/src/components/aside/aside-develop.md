---
section: Components
page: Aside
title: Develop
order: 3
---

# Technical Details

- **source:** [(github)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/aside)
- **module:** `import { NovoAsideModule } from 'novo-elements';`
- **service:** `import { NovoAsideService } form 'novo-elements/aside';`

# Roadmap

- [ ] Better support for common patterns
- [ ] Investigate Sharing injection tokens with Modal

# Changelog

### 5.0.0

_Added in v5.0.0_

## Properties

_No Properties_

# Services

## NovoAsideService

Asides (a.k.a. Slideout) should be invoked via `NovoAsideService` and therefore all properties should be private or internal. Any values that need to be passed to the your `aside` instance should be passed by the service and will be available in your slideout via `NovoAsideRef.params`.

```typescript
@Component({...})
class RandomComponent {
  constructor(private aside:NovoAsideService) {}
  handleAction() {
    const ref = this.aside.open(AddFormSlideout, { record: 123 });
    /* you can listen to the close event */
    ref.onClosed.then((result) => {
      /* result is the argument sent via the ref */
      if (res === 'success') {
        /* perfom some action */
      }
    });
    /* close the slideout from the parent */
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
| params    | _Object_<br>**Optional** arguments that will be injected into `NovoAsideRef.params` |

_Note:_ All modal components should be declared as `entryComponents` in the module.

## NovoAsideRef&lt;T&gt;

`NovoAsideRef` should be injected into your modal component and all pass params can be accessed in the `params` property.

```typescript
interface AddFormParams {
  record: number;
}
@Component({})
class AddFormSlideout {
  constructor(ref:NovoAsideRef<AddFormParams>) {
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
