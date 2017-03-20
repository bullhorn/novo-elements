# Plural

## Usage
```
import { DecodeURIPipe } from 'novo-elements';
``` 
```
@Component({
    ...,
    pipes: [DecodeURIPipe]
    ...
})
export class MyComponent() {}
```
```
<p>{{ 'Kitty%2C' | decodeURI }}</p>
```