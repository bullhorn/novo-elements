// NG2
import { Component, ElementRef, Input } from '@angular/core';
// Vendor
import { OutsideClick } from '../../utils/outside-click/OutsideClick';

@Component({
    selector: 'novo-search',
    template: `
        <!-- SEARCH ICON -->
        <button [hidden]="active || alwaysOpen" theme="fab" color="pulse" icon="search" (click)="showSearch()"></button>
        <!-- SEARCH PICKER -->
        <novo-picker placeholder="Search..." [config]="settings" clearValueOnSelect="true"></novo-picker>
        <!--UI MASK TO CLOSE ...iFRAMES :(
        <div class="full-ui-mask" (click)="hideSearch()" [hidden]="!active"></div>
        -->
    `,
    host: {
        '[class.active]': 'active || alwaysOpen'
    }
})
export class NovoSearchBoxElement extends OutsideClick {
    // The search string
    search: string = '';
    settings: any;
    @Input() alwaysOpen:boolean = false;

    constructor(element: ElementRef) {
        super(element);
        let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        // Configuration for picker
        this.settings = {
          options: states
        };
    }

    /**
     * @name showFasterFind
     * @description This function shows the picker and adds the active class (for animation)
     */
    showSearch(event?: any, forceClose: boolean = false) {
        if (forceClose && this.active) {
            this.hideSearch();
        }

        if (!this.active) {
            // Reset search
            this.search = '';
            // Mark as active
            this.toggleActive(null, true);
            // Set focus on search
            setTimeout(() => {
                let element = this.element.nativeElement.querySelector('input');
                if (element) {
                    element.focus();
                }
            }, 100);
        }
    }

    /**
     * @name hideFasterFind
     * @description
     */
    hideSearch() {
        setTimeout(() => {
            // Mark as inactive
            this.toggleActive(null, false);
        }, 150);
    }
}
