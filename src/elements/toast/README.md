# Toast Notifications

## Usage
```javascript
export { NovoToast, ToastService } from 'novo-elements';

// Insice APP Component
export class MyApp {
    constructor(toaster:ToastService, view:ViewContainerRef) {
        toaster.defaultContainer = view;
    }
}

export class MyToasterComponent {
    constructor(toaster:ToastService) {
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
#### NovoToast Properties
- `'theme' : String`
    * Defines the theme of the toast notification
    * Default is navy
- `'icon' : String`
    * Defines the icon used in the toast notification
- `'position': String`
    * Defines the positioning of the notification
    * Position is ignored in embedded toasts
- `'title': String`
    * Defines the title text
- `'message': String`
    * Defines the message body text
- `'time': Int`
    * Defines the amount of time a notification is shown on screen in ms

##### ToastService Reference Api
- `'alert' : Function`
    * Create the toast
