import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { NOVO_RADIO_ELEMENTS } from './../../../src/novo-elements';

import { CodeSnippet } from '../../elements/codesnippet/CodeSnippet';

import BasicRadioTpl from './templates/BasicRadio.html';
import VerticalRadioTpl from './templates/VerticalRadio.html';

const template = `
<div class="container">
    <h1>Radio <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/radio">(source)</a></small></h1>
    <p>A radio group</p>
   
    <h5>Basic</h5>
    <div class="example radio-demo">${BasicRadioTpl}</div>
    <code-snippet [code]="BasicRadioTpl"></code-snippet>
    
    <h5>Vertical</h5>
    <div class="example radio-demo">${VerticalRadioTpl}</div>
    <code-snippet [code]="VerticalRadioTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'radio-demo',
    template: template,
    directives: [NOVO_RADIO_ELEMENTS, CORE_DIRECTIVES, CodeSnippet]
})
export class RadioDemo {
    constructor() {
        this.BasicRadioTpl = BasicRadioTpl;
        this.VerticalRadioTpl = VerticalRadioTpl;
    }

    onChangeVertical(change) {
        console.log('Vertical Radio Change:', change); // eslint-disable-line
    }

    onChangeBasic(change) {
        console.log('Basic Radio Change:', change); // eslint-disable-line
    }
}
