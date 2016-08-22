// NG2
import { Component } from '@angular/core';
// APP
import ToastDemoTpl from './templates/ToastDemo.html';
import ToastServiceDemoTpl from './templates/ToastServiceDemo.html';
// Vendor
import { NovoToastService } from './../../../../src/novo-elements';

const template = `
<div class="container">
    <h1>Toast Notifications
        <small>
            <a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/toast">(source)</a>
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
    constructor(toaster:NovoToastService) {
        // Templates
        this.ToastDemoTpl = ToastDemoTpl;
        this.ToastServiceDemoTpl = ToastServiceDemoTpl;

        // Toaster Service
        this.toaster = toaster;

        // Default Toast styles
        this.positions = [
            'fixedTop',
            'fixedBottom',
            'growlTopLeft',
            'growlTopRight',
            'growlBottomLeft',
            'growlBottomRight'
        ];
        this.themes = [
            'default',
            'success',
            'info',
            'warning',
            'danger'
        ];
        this.options = {
            'title': 'Title',
            'message': 'Some Message...'
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
