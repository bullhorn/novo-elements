# Pagination

## Usage
```javascript
import { NOVO_TABLE_EXTRA_ELEMENTS } from 'novo-elements';
```

or

```javascript
import { Pagination } from 'novo-elements';
```

##### Properties
- `'page' : Number : default: null`
    * Current page of the pagination
- `'totalItems' : Number : default: null`
    * Total number of items to represent via paging
- `'itemsPerPage' : Number : default: 10`
    * Total number of items per page
            
##### Events
- ``onPageChange``
    * Fired when the page or items per page is changed
    * `$event` contains information on current page and current itemsPerPage