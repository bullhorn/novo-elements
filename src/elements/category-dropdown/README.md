# Category Dropdown
Menu that allows for customizable search and footer and categories.

## Usage
    import { NovoCategoryDropdownModule } from 'novo-elements';
    
    @NgModule({
        imports: [NovoCategoryDropdownModule]
    })
    class MyModule {}

##### Properties
- `'persistsSelection' : boolean`
    * Boolean to keep the selection displayed when the dropdown closes (default: `false`)
- `'closeOnSelect' : boolean`
    * Boolean to keep the dropdown open on selection or now (default: `false`)
- `'search' : object`
    * Search object to enable the searching feature of the dropdown
    - `'placeholder' : string`
        * Placeholder for the search input (default: `SEARCH`)
    - `'emptyMessage' : string`
        * Empty message to display where the items display if the category has no values (default: `left`)
    - `'debounce' : number`
        * Time is MS to debounce the search input before performing the search (default: `300`)
    - `'compare' : function`
        * Function to handle custom comparision when searching (default: `base string compare function`)
- `'footer' : object`
    * Footer object to enable the footer
    - `'align' : string`
        * Alignment for the footer (default: `right`)
        * Available Values: `['right', 'left']`
    - `'links' : array<objects>`
        * Array of objects for the links in the footer
        * Object should be in the form `{ label: 'STRING', callback: 'FUNCTION' }`
- `'categories' : object`
    * Defines the categories for the dropdown
    * Should be in the form of `{ 'CATEGORY_NAME': [{ label: 'STRING', value: 'VALUE' ... }] }`

##### Events
- `'itemSelected'`
    * Action to perform when the item is clicked
