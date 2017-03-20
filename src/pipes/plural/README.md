# Plural

## Usage
```
import { PluralPipe } from 'novo-elements';
``` 
```
@Component({
    ...,
    pipes: [PluralPipe]
    ...
})
export class MyComponent() {}
```
```
<p>{{'Kitty' | plural}}</p>
```