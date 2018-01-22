// NG2
import { Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
// APP
import { NovoLabelService } from '../../services';

@Component({
    selector: 'novo-tip-well',
    template: `
        <div *ngIf="isActive">
            <div>
                <i class="bhi-{{ icon }}" *ngIf="icon" [attr.data-automation-id]="'novo-tip-well-icon-' + name"></i>
                <p [attr.data-automation-id]="'novo-tip-well-tip-' + name">{{ tip }}</p>
            </div>
            <button theme="dialogue" (click)="hideTip()" *ngIf="button" [attr.data-automation-id]="'novo-tip-well-button-' + name">{{ buttonText }}</button>
        </div>
    `,
    styleUrls: ['./tipwell.component.scss'],
})
export class NovoTipwellComponent implements OnInit {
    @Input() public name: string | number;
    @Input() public tip: string;
    @Input() public buttonText: string;
    @Input() public button: boolean = true;
    @Input() public icon: string;
    @Output() public confirmed: EventEmitter<UIEvent> = new EventEmitter();
    @HostBinding('class.active')
    get active(): boolean {
        return this.isActive;
    }

    public isActive: boolean = true;
    public isLocalStorageEnabled: any;
    public localStorageKey: string;

    constructor(private labels: NovoLabelService) {
        // Check if localStorage is enabled
        this.isLocalStorageEnabled = this.checkLocalStorage();
    }

    public ngOnInit(): void {
        this.tip = this.tip || '';
        this.buttonText = this.buttonText || this.labels.okGotIt;
        this.button = typeof this.button === 'string' ? this.button === 'true' : this.button;
        this.icon = this.icon || undefined;
        // Set a (semi) unique name for the tip-well
        this.name = this.name || Math.round(Math.random() * 100);
        this.localStorageKey = `novo-tw_${this.name}`;
        // Check localStorage for state
        if (this.isLocalStorageEnabled) {
            let storedValue: boolean = JSON.parse(localStorage.getItem(this.localStorageKey));
            this.isActive = storedValue !== false;
        }
    }

    /**
     * @name hideTip
     */
    public hideTip(): void {
        if (this.isLocalStorageEnabled) {
            localStorage.setItem(this.localStorageKey, JSON.stringify(false));
        }
        this.isActive = false;
        this.confirmed.emit();
    }

    private checkLocalStorage(): boolean {
        let isEnabled: boolean = false;
        if (typeof localStorage === 'object') {
            try {
                localStorage.setItem('lsTest', '1');
                localStorage.removeItem('lsTest');
                isEnabled = true;
            } catch (e) {
                console.warn('This web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.'); // tslint:disable-line
            }
        }
        return isEnabled;
    }
}
