// NG2
import { Component } from '@angular/core';
// APP
let ToastDemoTpl = require('./templates/ToastDemo.html');
let ToastServiceDemoTpl = require('./templates/ToastServiceDemo.html');
// Vendor
import { NovoToastService } from './../../../../index';

const template = `
<div class="container">
    <h1>Toast Notifications
        <small>
            <a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/toast">(source)</a>
        </small>
    </h1>
    <p>Toasts are used as system notifications. They can contain custom
    text titles and messages, as well as any icons from bh-icons and any color
    from our color palletes.</p>

    <h2>Types</h2>

    <h5>Alert</h5>
    <p>This type of toast notification takes a template, a style,
        and a location.</p>
    <div class="example toast-demo">
        <h2>Embedded Toast</h2>
        ${ToastDemoTpl}
    </div>
    <code-snippet [code]="ToastDemoTpl"></code-snippet>

    <div class="example toast-demo">
        <h2>Toaster Service</h2>
        ${ToastServiceDemoTpl}
    </div>
    <code-snippet [code]="ToastServiceDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'toast-demo',
    template: template
})
export class ToastDemoComponent {
    private ToastDemoTpl:string = ToastDemoTpl;
    private ToastServiceDemoTpl:string = ToastServiceDemoTpl;
    private positions:Array<string> = [
        'fixedTop',
        'fixedBottom',
        'growlTopLeft',
        'growlTopRight',
        'growlBottomLeft',
        'growlBottomRight'
    ];
    private themes:Array<string> = [
        'default',
        'success',
        'info',
        'warning',
        'danger'
    ];
    private icons:Array<string> = [
        'add',
        'check',
        'clock',
        'lock',
        'caution'
    ];
    private options:any = {
        'title': 'Title',
        'message': 'Some Message...'
    };
    private toast:any = {
        theme: 'danger',
        icon: 'caution'
    };

    constructor(private toaster:NovoToastService) {
    }

    changeToast() {
        this.toast = {
            theme: this.themes[(this.themes.indexOf(this.toast.theme) + 1) % (this.themes.length)],
            icon: this.icons[(this.icons.indexOf(this.toast.icon) + 1) % (this.icons.length)]
        };
    }

    toastToggled(arg) {
        if (arg === 'top') {
            this.options = {
                title: 'Top',
                message: 'This positioning is fixedTop',
                icon: 'coffee',
                theme: 'success',
                position: 'fixedTop'
            };
        } else if (arg === 'bottom') {
            this.options = {
                title: 'Bottom',
                message: 'This positioning is fixedBottom',
                icon: 'check',
                theme: 'ocean',
                position: 'fixedBottom'
            };
        } else if (arg === 'growlTopRight') {
            this.options = {
                title: 'Growl',
                message: 'This positioning is growlTopRight',
                icon: 'times',
                theme: 'danger',
                position: 'growlTopRight',
                hideDelay: 100000000
            };
        } else if (arg === 'growlTopLeft') {
            this.options = {
                title: 'Growl',
                message: 'This positioning is growlTopLeft',
                icon: 'coffee',
                theme: 'ocean',
                position: 'growlTopLeft',
                hideDelay: 100000000
            };
        } else if (arg === 'growlBottomRight') {
            this.options = {
                title: 'Growl',
                message: 'This positioning is growlTopRight',
                icon: 'times',
                theme: 'danger',
                position: 'growlBottomRight'
            };
        } else if (arg === 'growlBottomLeft') {
            this.options = {
                title: 'Growl',
                message: 'This positioning is growlTopLeft',
                icon: 'coffee',
                theme: 'ocean',
                position: 'growlBottomLeft'
            };
        }
        this.toaster.alert(this.options);
    }
}
