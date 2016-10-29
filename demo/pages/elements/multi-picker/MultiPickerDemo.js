// NG2
import { Component } from '@angular/core';
// APP
import BasicMultiPicker from './templates/BasicMultiPickerDemo.html';
import { ChecklistPickerResults } from './../../../../src/novo-elements';

const template = `
<div class="container">
    <h1>MultiPicker <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/multi-picker">(source)</a></small></h1>
    <p>The multipicker element (<code>multipicker</code>) represents a control that presents a menu of options of multiple types. The options
    within are set by the <code>source</code> attribute. Options can be pre-selected for the user using the <code>ngModel</code>
    attribute. Multipicker is the multi-category version of <code>chips</code></p>.

    <br/>

    <h5>Basic Examples</h5>
    <p>
        By clicking on the <code>multi-picker</code> element, the options list will be displayed.  Select any of the options
        by clicking on the item in the list.  The value selected will be added to the list of selected values.
    </p>
    <div class="example chips-demo">${BasicMultiPicker}</div>
    <code-snippet [code]="BasicMultiPicker"></code-snippet>
</div>
`;

@Component({
    selector: 'chips-demo',
    template: template
})
export class MultiPickerDemoComponent {
    constructor() {
        this.BasicMultiPicker = BasicMultiPicker;

        this.placeholder = 'Select...';
        this.value = { states: [{ value: 'Alabama', label: 'Alabama' }], collaborators: [] };
        this.types = ['states', 'collaborators'];

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
        this.static = {
            options: [
                { type: 'collaborators', data: collaborators, format: '$firstName $lastName', field: 'id' },
                { type: 'states', data: states }
            ],
            resultsTemplate: ChecklistPickerResults
        };
        this.formatted = {
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
            },
            getLabels: (data) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        let values = data.map(item => item.value);
                        let results = abbrieviated.filter(item => values.includes(item.value));
                        resolve(results);
                    }, 300);
                });
            }
        };
        this.avalue = [{
            value: 'USA'
        }, {
            value: 'GB'
        }];
    }
    onChanged() {
    }
}
