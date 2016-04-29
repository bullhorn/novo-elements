# Drawer

## Usage
    import { NOVO_DRAWER_ELEMENTS } from 'novo-elements';

##### Properties
- `is-open` (`?boolean=false`) - if `true` drawer will be opened
- `auto-close` (`?string='always'`) - behavior vary:
    * `always` - (default) automatically closes the drawer when any of its elements is clicked
    * `outsideClick` - closes the drawer automatically only when the user clicks any element outside the drawer
    * `disabled` - disables the auto close. You can then control the open/close status of the drawer manually, by using `is-open`. Please notice that the drawer will still close if the toggle is clicked, the `esc` key is pressed or another drawer is open
- `position` (`?string='left'`) - behavior vary:
    * `left` - (default) opens the drawer on the left side of the page
    * `right` - opens the drawer on the right side of the page
    * `top` - opens the drawer on the top side of the page
    * `bottom` - opens the drawer on the bottom side of the page

##### Events
- `on-drawer-toggle` - fired when `drawer` toggles, `$event:boolean` equals drawer `is-open` state

# Drawer Toggle

##### Properties
- `disabled` (`?boolean=false`) - if `true` drawer toggle will be disabled
