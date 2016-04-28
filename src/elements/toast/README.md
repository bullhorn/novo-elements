# Toast Notifications

## Usage
```javascript
export { NovoToast,NovoToaster } from './tabs/Tabs';

export class MyToasterComponent {
    constructor(toaster:NovoToaster) {
        toaster.register(element);
        this.toaster = toaster;
    }

    bake() {
        this.toaster.alert(NovoToast, {
            title: 'Title',             //required
            message:'Some Message...',  //required
            position: 'growlTopRight',  //optional: fixedTop,fixedBottom,growlTopRight,growlTopLeft,growlBottomRight,growlBottomLeft
            theme:'success'             //optional: default,success,danger,info,warning
        });
    }
}
```

##### Toaster Reference Api
- `'alert' : Function`
    * Create the toast
- `'register' : Function`
    * Reference to the container the opened the component
