// NG2
import { Component } from '@angular/core';
// App
import { NOVO_BUTTON_ELEMENTS } from '../button';

@Component({
    selector: 'novo-tip-well',
    inputs: [
        'name',
        'tip',
        'buttonText',
        'hasButton',
        'icon'
    ],
    directives: [
        NOVO_BUTTON_ELEMENTS
    ],
    template: `
        <div *ngIf="isActive">
            <div>
                <i class="bhi-{{ icon }}" *ngIf="icon"></i>
                <p>{{ tip }}</p>
            </div>
            <button theme="dialogue" (click)="hideTip()" *ngIf="hasButton!=='false'">{{ buttonText }}</button>
        </div>
    `
})
export class TipWell {
    constructor() {
        this.isActive = true;
        // Check if localStorage is enabled
        this.isLocalStorageEnabled = (() => {
            let isEnabled = false;
            if (typeof localStorage === 'object') {
                try {
                    localStorage.setItem('lsTest', 1);
                    localStorage.removeItem('lsTest');
                    isEnabled = true;
                } catch (e) {
                    console.warn('This web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.'); // eslint-disable-line
                }
            }
            return isEnabled;
        })();
    }

    ngOnInit() {
        this.tip = this.tip || '';
        this.buttonText = this.buttonText || 'Ok, Got it';
        this.hasButton = this.hasButton || 'true';
        this.icon = this.icon || null;
        // Set a (semi) unique name for the tip-well
        this.name = this.name || Math.round(Math.random() * 100);
        this.localStorageKey = `novo-tw_${this.name}`;
        // Check localStorage for state
        if (this.isLocalStorageEnabled) {
            let storedValue = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.isActive = storedValue !== false;
        }
    }

	/**
     * @name hideTip
     */
    hideTip() {
        if (this.isLocalStorageEnabled) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(false));
        }
        this.isActive = false;
    }
}

export const NOVO_TIPWELL_ELEMENTS = [TipWell];
