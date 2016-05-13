import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { NOVO_PICKER_ELEMENTS } from './../../../src/novo-elements';

// TODO - add tooltips back in when implemented
import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import BasicPickerDemoTpl from './templates/BasicPickerDemo.html';
import AsyncPickerDemoTpl from './templates/AsyncPickerDemo.html';


const template = `
<div class="container">
    <h1>Picker <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/picker">(source)</a></small></h1>
    <p>The picker element (<code>input[picker]</code>) represents a control that presents a menu of options. The options
    within are set by the <code>items</code> attribute. Options can be pre-pickered for the user using the <code>value</code>
    attribute.</p>

    <br/>

    <h5>Basic Examples</h5>
    <p>
        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options
        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.
    </p>
    <div class="example picker-demo">${BasicPickerDemoTpl}</div>
    <code-snippet [code]="BasicPickerDemoTpl"></code-snippet>
    
    <h5>Async Examples</h5>
    <p>
        By clicking on the <code>input</code> element, the options list will be displayed.  picker any of the options
        by clicking on the item in the list.  The value pickered will be displayed and the options list will be removed.
    </p>
    <div class="example picker-demo">${AsyncPickerDemoTpl}</div>
    <code-snippet [code]="AsyncPickerDemoTpl"></code-snippet>

</div>
`;

@Component({
    selector: 'picker-demo',
    template: template,
    directives: [NOVO_PICKER_ELEMENTS, CORE_DIRECTIVES, CodeSnippet]
})
export class PickerDemo {
    constructor() {
        this.BasicPickerDemoTpl = BasicPickerDemoTpl;
        this.AsyncPickerDemoTpl = AsyncPickerDemoTpl;

        this.placeholder = 'Select...';
        let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        this.static = { options: states };
        this.value = 'Alabama';

        this.async = {
            options: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(states);
                    }, 2000);
                });
            }
        };
    }
}
