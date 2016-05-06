import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { ToastService, NovoToast } from './../../../src/novo-elements';

import template from './Color.html';

@Component({
    selector: 'color',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    providers: [ToastService],
    template: template
})
export class Color {
    constructor(toaster:ToastService) {
        this.primaryColors = [
            {
                name: 'navigation',
                variables: ['navigation'],
                hex: '2F383F'
            },
            {
                name: 'action',
                variables: ['positive'],
                hex: '4A89DC'
            },
            {
                name: 'text',
                variables: ['dark', 'base-font-color'],
                hex: '474747'
            },
            {
                name: 'background',
                variables: ['off-white', 'background'],
                hex: 'F4F4F4'
            }
        ];

        this.entityColors = [
            {
                name: 'lead',
                variables: ['lead'],
                hex: 'AA6699'
            },
            {
                name: 'contact',
                variables: ['contact'],
                hex: 'FFAA44'
            },
            {
                name: 'company',
                variables: ['company'],
                hex: '3399DD'
            },
            {
                name: 'candidate',
                variables: ['candidate'],
                hex: '44BB77'
            },
            {
                name: 'opportunity',
                variables: ['opportunity'],
                hex: '662255'
            },
            {
                name: 'job',
                variables: ['job'],
                hex: 'BB5566'
            },
            {
                name: 'submission',
                variables: ['submission'],
                hex: '778899'
            },
            {
                name: 'placement',
                variables: ['placement'],
                hex: '0B344F'
            }
        ];

        this.analyticsColors = [
            {
                name: 'grapefruit',
                variables: ['grapefruit'],
                hex: 'DA4453'
            },
            {
                name: 'bittersweet',
                variables: ['bittersweet'],
                hex: 'EB6845'
            },
            {
                name: 'sunflower',
                variables: ['sunflower'],
                hex: 'F6B042'
            },
            {
                name: 'grass',
                variables: ['grass'],
                hex: '8CC152'
            },
            {
                name: 'mint',
                variables: ['mint'],
                hex: '37BC9B'
            },
            {
                name: 'aqua',
                variables: ['aqua'],
                hex: '3BAFDA'
            },
            {
                name: 'ocean',
                variables: ['ocean'],
                hex: '4A89DC'
            },
            {
                name: 'carnation',
                variables: ['carnation'],
                hex: 'D770AD'
            },
            {
                name: 'lavender',
                variables: ['lavender'],
                hex: '967ADC'
            }
        ];

        this.options = {
            'title': 'Copied!',
            'message': 'Some Message...',
            'theme': 'success',
            'icon': 'clipboard',
            'position': 'growlTopRight'
        };

        this.toaster = toaster;
    }

    ngOnInit() {
        this.color = 'background';
    }

    changeColor(color) {
        this.color = color;
    }

    copyLink(color) {
        // Create dom element to copy from
        let copyFrom = document.createElement('textarea');
        copyFrom.textContent = `#${color.hex}`;
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(copyFrom);
        copyFrom.select();
        // Copy text
        document.execCommand('copy');
        // Delete element
        body.removeChild(copyFrom);

        // Set toast options
        this.options = {
            title: `#${color.hex}`,
            message: 'Copied to your clipboard',
            theme: color.name,
            icon: 'clipboard',
            position: 'growlTopRight'
        };

        if (color.name === 'action') this.options.theme = 'ocean';

        // Fire toast
        this.toaster.alert(NovoToast, this.options);
    }
}
