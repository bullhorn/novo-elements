# Cards

## Usage
    import { NOVO_CARD_ELEMENTS } from 'novo-elements';

##### Properties
- `'title' : String`
    * Defines the title of the card
- `'icon' : String`
    * Defines the icon of the card
- `'loading' : Boolean`
    * Toggles the loading view
- `'message' : String`
    * Defines the message to be displayed in the card (no results / error)
- `'messageIcon' : String`
    * Defined the message icon to be displayed with the message
- `'refresh' : Bool`
    * Defines whether or not the card can be refreshed (listen to onRefresh)
- `'close' : Bool`
    * Defines whether or not the card can be closed (listen to onClose)
- `'config' : Object`
    * All above properties can be passed in via a single config object (or mix/match)
- `'padding' : Bool`
    * Toggles inner padding for card, useful for content that already has padding

#### Events
- `'onClose'`
    * Fires when the close icon is clicked
- `'onRefresh'`
    * Fires when the refresh icon is clicked

# Card Extras

## Usage
    import { NOVO_CARD_EXTRA_ELEMENTS } from 'novo-elements';

# Custom Actions

```html
<novo-card [config]="fullConfig">
    <novo-card-actions>
        <button theme="icon" icon="info" (click)="singleAction()"></button>
    </novo-card-actions>
    DEMO :)
</novo-card>
```

TODO - add rest
