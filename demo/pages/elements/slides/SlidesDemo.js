// NG2
import { Component } from '@angular/core';
// APP
import BasicSlideDemoTpl from './templates/BasicSlide.html';

const template = `
<div class="container">
    <h1>Slides <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/slides">(source)</a></small></h1>
    <p>Slide element to toggle some information</p>
    
    <h5>Basic</h5>
    <div class="example slides-demo">${BasicSlideDemoTpl}</div>
    <code-snippet [code]="BasicSlideDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'slides-demo',
    template: template
})
export class SlidesDemoComponent {
    constructor() {
        this.BasicSlideDemoTpl = BasicSlideDemoTpl;
    }
}
