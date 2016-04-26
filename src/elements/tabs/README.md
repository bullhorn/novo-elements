# Tabs

## Usage
```javascript
export { NOVO_TAB_ELEMENTS } from './tabs/Tabs';
```

##### NovoNav Properties
- `'theme' : String`
  * Defines the theme of the tabs
- `'direction' : String`
  * Defines the direction of the tabs
- `'outlet' : String`
  * Used when the nav _is not_ being used as a router
  * Defines which container element will function as the content by using an Angular2 `Local Reference`
- `'router' : Bool`
  * Specifies that the nav _is_ being used as a router

#### NovoTab Properties
- `'active': String`
  * Defines which tab is active by adding `.active` class

#### NovoTabButton Properties
- `'active': String`
  * Defines which tab is active by adding `.active` class

#### NovoTabLink Properties
- `'active': String`
  * Defines which tab is active by adding `.active` class

#### NovoNavContent Properties
- `'active': String`
  * Defines which tab is active by adding `.active` class

#### NovoNavHeader Properties
- `'active': String`
  * Defines which tab is active by adding `.active` class
- `'for': String`
  * Defines which container element will function as the content by using an Angular2 `Local Reference`
