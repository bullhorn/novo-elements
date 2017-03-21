// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from './../../../../index';
// APP
let BasicDemoTpl = require('./templates/BasicDemo.html');
let PersistSelectionDemoTpl = require('./templates/PersistSelectionDemo.html');
let CloseOnSelectDemoTpl = require('./templates/CloseOnSelectDemo.html');
let HoverItemLabelsDemoTpl = require('./templates/HoverItemLabelsDemo.html');
let BasicSearchDemoTpl = require('./templates/BasicSearchDemo.html');
let CustomSearchDemoTpl = require('./templates/CustomSearchDemo.html');
let FooterDemoTpl = require('./templates/FooterDemo.html');

const template = `
<div class="container">
    <h1>Category Dropdown <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/category-dropdown">(source)</a></small></h1>
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

    <br/>
    <h5>Searchable (basic)</h5>
    <p>The dropdown can be configured to provide a way to search all the different categories.</p>
    <div class="example dropdown-demo">${BasicSearchDemoTpl}</div>
    <multi-code-snippet [code]="basicSearchCodeSnippet"></multi-code-snippet>

    <br/>
    <h5>Searchable (custom)</h5>
    <p>Every aspect of the search can be customized, refer to the README or JS for more information.</p>
    <div class="example dropdown-demo">${CustomSearchDemoTpl}</div>
    <multi-code-snippet [code]="customSearchCodeSnippet"></multi-code-snippet>

    <br/>
    <h5>Footer</h5>
    <p>The dropdown has a customizable footer for additional configuration over the categories and items.</p>
    <div class="example dropdown-demo">${FooterDemoTpl}</div>
    <multi-code-snippet [code]="footerCodeSnippet"></multi-code-snippet>
</div>
`;

@Component({
    selector: 'category-dropdown-demo',
    template: template
})
export class CategoryDropdownDemoComponent {
    BasicDemoTpl = BasicDemoTpl;
    PersistSelectionDemoTpl = PersistSelectionDemoTpl;
    CloseOnSelectDemoTpl = CloseOnSelectDemoTpl;
    HoverItemLabelsDemoTpl = HoverItemLabelsDemoTpl;
    BasicSearchDemoTpl = BasicSearchDemoTpl;
    CustomSearchDemoTpl = CustomSearchDemoTpl;
    FooterDemoTpl = FooterDemoTpl;

    basicCategories = {
        'Category 1': [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3 }
        ],
        'Category 2': [
            { label: 'Four', value: 4 },
            { label: 'Five', value: 5 },
            { label: 'Six', value: 6 }
        ],
        'Category 3': [
            { label: 'Seven', value: 7 },
            { label: 'Eight', value: 8 },
            { label: 'Nine', value: 9 }
        ],
        'Category 4': [
            { label: 'Ten', value: 10 },
            { label: 'Eleven', value: 11 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 },
            { label: 'Twelve', value: 12 }
        ]
    };
    basicCodeSnippet = {
        'Template': BasicDemoTpl
    };

    persistCategories = {
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
    persistCodeSnippet = {
        'Template': PersistSelectionDemoTpl,
        'Other Inputs': JSON.stringify({ persistSelection: true })
    };

    closeCodeSnippet = {
        'Template': CloseOnSelectDemoTpl,
        'Other Inputs': JSON.stringify({ closeOnSelect: true })
    };

    hoverCategories = {
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
    hoverCodeSnippet = {
        'Template': HoverItemLabelsDemoTpl,
        'Sample Item': JSON.stringify(this.hoverCategories.One[0])
    };

    searchCategories = {
        'Greetings': [
            { label: 'Hello', value: 1 },
            { label: 'Sup?', value: 1 },
            { label: 'Hey!', value: 1 },
            { label: 'Heeeyo', value: 1 }
        ],
        'Salutations': [
            { label: 'Goodbye', value: 1 },
            { label: 'My Good Sir', value: 1 },
            { label: 'See Ya Later!', value: 1 },
            { label: 'Smell Ya Later!', value: 1 }
        ]
    };
    searchConfig = {
        placeholder: 'I wait 1s to search...',
        debounce: 1000,
        emptyMessage: 'NO ITEMS IN HERE!',
        compare: (query, item) => {
            return ~item.label.toLowerCase().indexOf(query.toLowerCase());
        }
    };
    basicSearchCodeSnippet = {
        'Template': BasicSearchDemoTpl,
        'Other Inputs': JSON.stringify({ search: true })
    };
    customSearchCodeSnippet = {
        'Template': BasicSearchDemoTpl,
        'Other Inputs': JSON.stringify({ search: this.searchConfig })
    };

    footerConfig = {
        align: 'left',
        links: [
            { label: 'Link 1', callback: this.footerClick.bind(this) },
            { label: 'Link 2', callback: this.footerClick.bind(this) }
        ]
    };
    footerCodeSnippet = {
        'Template': FooterDemoTpl,
        'Other Inputs': JSON.stringify(this.footerConfig)
    };

    constructor(private toaster: NovoToastService) {
        this.toaster = toaster;
    }

    footerClick() {
        this.toaster.alert({
            title: 'Footer link clicked!',
            icon: 'star',
            theme: 'ocean',
            position: 'growlTopRight',
            hideDelay: 2000
        });
    }

    onSelect(item) {
        this.toaster.alert({
            title: `Selected ${item.label}!`,
            icon: 'star',
            theme: 'ocean',
            position: 'growlTopRight',
            hideDelay: 2000
        });
    }

    onCategorySelect(category) {
        this.toaster.alert({
            title: `Selected the category: ${category}!`,
            icon: 'star',
            theme: 'ocean',
            position: 'growlTopRight',
            hideDelay: 2000
        });
    }
}
