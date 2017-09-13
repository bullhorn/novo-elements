// NG2
import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// APP
let SearchDemoTpl = require('./templates/SearchDemo.html');

const template = `
<div class="container">
    <h1>Searches & Toggles <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/switch">(source)</a></small></h1>
    <p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>

    <h2>Types</h2>

    <h5>Tiles</h5>
    <p>Similar to radio buttons, tiles are used to select a single item. Tiles have a higher visibility than radio buttons, and are used more frequently in data visualizations. Tiles stretch horizontally, so the list they pull from must be small.</p>

    <h5>Searches</h5>
    <p>Searches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p>
    <div class="example switch-demo">${SearchDemoTpl}</div>
    <code-snippet [code]="SearchDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'search-demo',
    template: template
})
export class SearchDemoComponent {
    private SearchDemoTpl:string = SearchDemoTpl;
    private toggleCount:number = 0;
    private checked:boolean = true;
    public test: string = 'TEST';
    public searchResults: Subject<any[]> = new Subject();

    public search(term: string): void {
        this.searchResults.next([
            { type: 'Candidate', name: 'George Washington'},
            { type: 'Candidate', name: 'James Madison'},
            { type: 'Candidate', name: 'Thomas Jefferson'},
            { type: 'Candidate', name: 'John Adams'}
        ]);
    }

    public onSelect(item) {
        //this.test = item;
        //console.log(item);
    }
}
