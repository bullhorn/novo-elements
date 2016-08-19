// NG2
import { Component } from '@angular/core';
// APP
import BasicChipsDemoTpl from './templates/BasicChipsDemo.html';
import AsyncChipsDemoTpl from './templates/AsyncChipsDemo.html';
import FormattedChipsDemoTpl from './templates/FormattedChipsDemo.html';

const template = `
<div class="container">
    <h1>Chips <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/chips">(source)</a></small></h1>
    <p>The chips element (<code>chips</code>) represents a control that presents a menu of options. The options
    within are set by the <code>source</code> attribute. Options can be pre-selected for the user using the <code>ngModel</code>
    attribute. Chips are the multi-select version of <code>pickers</code></p>

    <br/>

    <h5>Basic Examples</h5>
    <p>
        By clicking on the <code>chips</code> element, the options list will be displayed.  Select any of the options
        by clicking on the item in the list.  The value selected will be added to the list of selected values and the options list will be removed.
    </p>
    <div class="example chips-demo">${BasicChipsDemoTpl}</div>
    <code-snippet [code]="BasicChipsDemoTpl"></code-snippet>

    <h5>Async Examples</h5>
    <p>
        By clicking on the <code>chips</code> element, the options list will be displayed.  Select any of the options
        by clicking on the item in the list.  The value selected will be added to the list of selected values and the options list will be removed.
    </p>
    <div class="example chips-demo">${AsyncChipsDemoTpl}</div>
    <code-snippet [code]="AsyncChipsDemoTpl"></code-snippet>

    <h5>Formatted Examples</h5>
    <p>
        By clicking on the <code>chips</code> element, the options list will be displayed.  Select any of the options
        by clicking on the item in the list.  The value selected will be added to the list of selected values and the options list will be removed.
    </p>
    <div class="example chips-demo">${FormattedChipsDemoTpl}</div>
    <code-snippet [code]="FormattedChipsDemoTpl"></code-snippet>

</div>
`;

@Component({
    selector: 'chips-demo',
    template: template
})
export class ChipsDemoComponent {
    constructor() {
        this.BasicChipsDemoTpl = BasicChipsDemoTpl;
        this.AsyncChipsDemoTpl = AsyncChipsDemoTpl;
        this.FormattedChipsDemoTpl = FormattedChipsDemoTpl;

        this.placeholder = 'Select...';
        this.value = ['Alabama'];

        let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        let abbrieviated = [{
            value: 'USA',
            label: 'United States'
        }, {
            value: 'GB',
            label: 'Great Britain'
        }, {
            value: 'CA',
            label: 'Canada'
        }, {
            value: 'AU',
            label: 'Austrailia'
        }];
        let collaborators = [{
            id: 1,
            firstName: 'Brian',
            lastName: 'Kimball'
        }, {
            id: 2,
            firstName: 'Josh',
            lastName: 'Godi'
        }, {
            id: 3,
            firstName: 'Alec',
            lastName: 'Sibilia'
        }, {
            id: 4,
            firstName: 'Kameron',
            lastName: 'Sween'
        }];
        this.static = { options: states };
        this.formatted = {
            //field: 'id',
            format: '$firstName $lastName',
            options: collaborators
        };
        this.async = {
            options: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(abbrieviated);
                    }, 300);
                });
            }
        };
    }

    onChanged() {
    }
}
