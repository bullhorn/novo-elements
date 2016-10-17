// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from './../../../../src/novo-elements';
// APP
import BasicDemoTpl from './templates/BasicDemo.html';
import PersistSelectionDemoTpl from './templates/PersistSelectionDemo.html';
import CloseOnSelectDemoTpl from './templates/CloseOnSelectDemo.html';
import HoverItemLabelsDemoTpl from './templates/HoverItemLabelsDemo.html';

const template = `
<div class="container">
    <h1>Category Dropdown <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/dropdown">(source)</a></small></h1>
    <p>A category dropdown that allows the items to be grouped and searchable.</p>

    <h5>Basic</h5>
    <p>This is a simple implementation.</p>
    <div class="example dropdown-demo">${BasicDemoTpl}</div>
    <multi-code-snippet [code]="basicCodeSnippet"></multi-code-snippet>
    
    <br/>
    <h5>Hover Text/Icons on Items</h5>
    <p>You can set a hover text or icons for each item to appear as the user hovers over an item.</p>
    <div class="example dropdown-demo">${HoverItemLabelsDemoTpl}</div>
    <multi-code-snippet [code]="hoverCodeSnippet"></multi-code-snippet>
    
    <br/>
    <h5>Persisting Selection</h5>
    <p>If you need to show what item is selected, you can persist the selection via a property.</p>
    <div class="example dropdown-demo">${PersistSelectionDemoTpl}</div>
    <multi-code-snippet [code]="persistCodeSnippet"></multi-code-snippet>
    
    <br/>
    <h5>Close on Select</h5>
    <p>By default, the dropdown will stay open upon selecting an item. You can set a property to force close on selection.</p>
    <div class="example dropdown-demo">${CloseOnSelectDemoTpl}</div>
    <multi-code-snippet [code]="closeCodeSnippet"></multi-code-snippet>
</div>
`;

@Component({
    selector: 'category-dropdown-demo',
    template: template
})
export class CategoryDropdownDemoComponent {
    constructor(toaster:NovoToastService) {
        this.toaster = toaster;
        this.BasicDemoTpl = BasicDemoTpl;
        this.PersistSelectionDemoTpl = PersistSelectionDemoTpl;
        this.CloseOnSelectDemoTpl = CloseOnSelectDemoTpl;
        this.HoverItemLabelsDemoTpl = HoverItemLabelsDemoTpl;

        this.basicCategories = {
            'Category 1': [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 },
                { label: 'Three', value: 3 }
            ],
            'Category 2': [
                { label: 'Four', value: 4 },
                { label: 'Five', value: 5 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 },
                { label: 'Six', value: 6 }
            ],
            'Category 3': [
                { label: 'Seven', value: 7 },
                { label: 'Eight', value: 8 },
                { label: 'Nine', value: 9 }
            ],
            'Category 4': [
                { label: 'Seven', value: 7 },
                { label: 'Eight', value: 8 },
                { label: 'Nine', value: 9 }
            ],
            'Category 5': [
                { label: 'Seven', value: 7 },
                { label: 'Eight', value: 8 },
                { label: 'Nine', value: 9 }
            ],
            'Category 6': [
                { label: 'Seven', value: 7 },
                { label: 'Eight', value: 8 },
                { label: 'Nine', value: 9 }
            ],
            'Category 7': [
                { label: 'Seven', value: 7 },
                { label: 'Eight', value: 8 },
                { label: 'Nine', value: 9 }
            ]
        };
        this.basicCodeSnippet = {
            'Template': BasicDemoTpl,
            'Categories': JSON.stringify(this.basicCategories)
        };

        this.persistCategories = {
            'One': [
                { label: 'Test', value: 1 },
                { label: 'Test', value: 1 },
                { label: 'Test', value: 1 },
                { label: 'Test', value: 1 }
            ],
            'Two': [
                { label: 'Hello', value: 2 },
                { label: 'Hello', value: 2 },
                { label: 'Hello', value: 2 },
                { label: 'Hello', value: 2 }
            ]
        };
        this.persistCodeSnippet = {
            'Template': PersistSelectionDemoTpl,
            'Categories': JSON.stringify(this.persistCategories),
            'Other Inputs': JSON.stringify({ persistSelection: true })
        };

        this.closeCodeSnippet = {
            'Template': CloseOnSelectDemoTpl,
            'Categories': JSON.stringify(this.basicCategories),
            'Other Inputs': JSON.stringify({ closeOnSelect: true })
        };

        this.hoverCategories = {
            'One': [
                { label: 'Test', value: 1, hoverText: 'Hello!' },
                { label: 'Test', value: 1, hoverIcon: 'star' },
                { label: 'Test', value: 1, hoverIcon: 'check' },
                { label: 'Test', value: 1, hoverText: 'BOOM' }
            ],
            'Two': [
                { label: 'Hello', value: 1, hoverText: 'Hello!' },
                { label: 'Hello', value: 1, hoverIcon: 'star' },
                { label: 'Hello', value: 1, hoverIcon: 'check' },
                { label: 'Hello', value: 1, hoverText: 'BOOM' }
            ]
        };
        this.hoverCodeSnippet = {
            'Template': HoverItemLabelsDemoTpl,
            'Categories': JSON.stringify(this.hoverCategories),
            'Sample Item': JSON.stringify(this.hoverCategories.One[0])
        };
    }

    onSelect(item) {
        this.toaster.alert({
            title: `Selected ${item.label}!`,
            icon: 'star',
            theme: 'ocean',
            position: 'growlTopRight',
            hideDelay: 2000
        })
    }
}
