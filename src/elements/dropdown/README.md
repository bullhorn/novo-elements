# Dropdown
Menus allow users to take an action by selecting from a list of choices revealed upon opening a temporary menu.

## Usage
    import { NOVO_DROPDOWN_ELEMENTS } from 'novo-elements';

##### Properties
- `'side' : String`
    * Defines the side the dropdown opens (default: `left`)
    * Available Values: `['right']`


*Dropdown Demo*
````xml
<novo-dropdown>
    <button type="button" theme="header" icon="collapse">Actions</button>
    <list>
        <item>Action 1</item>
        <item>Action 2</item>
        <item>Action 3</item>
    </list>
</novo-dropdown>
````
