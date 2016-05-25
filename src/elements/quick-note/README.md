# Quick Note

Quick note component that autocompletes different triggers and will replace with links/formatted text. 

## Usage
    import { NOVO_QUICK_NOTE_ELEMENTS } from 'novo-elements';

##### Properties
- `'config' : Object`
    * must contain `triggers`, should contain `options`, `field`, `renderer` to customize. See below.
- `'ngModel' : NgModel`
    * Defines the current value of the field
    * Can be two-way data bound with `[(ngModel)]="binding"`
- `'placeholder' : string`
    * Placeholder text for the textarea
- `'references' : Object`
    * Object representing all the selected references via the triggers/options
    
##### Events/Outputs
- `'focus'`
    * Fired when the textarea gets focus
- `'blur'`
    * Fired when the textarea removes focus
    
##### Config
The config object should contain `triggers` so the component knows how to trigger the autocomplete. Furthermore, you can provide `options` as either a function/array/promise for the autocomplete data and `render` to customize the look/feel of the tabs.

Example:

```
this.config = {
    triggers: {
        tags: '@',
        references: '#'
    },
    options: {
        tags: ['Test', 'Test'],
        references: ['Test', 'Test']
    },
    renderer: {
        tags: (symbol, item) => {
            return `<a class="tag">${symbol}${item.label}</a>`;
        },
        references: (symbol, item) => {
            return `<a class="tag">${symbol}${item.label}</a>`;
        }
    }
};
```

or 

```
this.custom = {
    triggers: {
        whos: '@',
        whats: '#'
    },
    options: {
        whos: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(customData.tags);
                }, 300);
            });
        },
        whats: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(customData.references);
                }, 300);
            });
        }
    },
    format: {
        whos: '$name',
        whats: '$title'
    },
    renderer: {
        whos: (symbol, item) => {
            return `<a class="WHOS">${symbol}${item.label}</a>`;
        },
        whats: (symbol, item) => {
            return `<a class="tag">${symbol}${item.label}</a>`;
        }
    }
};
```