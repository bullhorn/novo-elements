# PopOvers

## Usage
    import { NOVO_popover_ELEMENTS } from 'novo-elements';

##### Properties of PopOver Directive
- `'popover' : HTMLElement(popover-content) | string`
    * Defines the content of the PopOver. If HTMLElement, then <popover-content> needs to be defined before the element that the directive is on
    ** See Dynamic HTML in PopOver demo for example with HTMLElement
- `'popoverTitle' : string`
    * Title of PopOver
- `'popoverPlacement' : String`
    * Defines the position of the PopOver.
    * Available Values: `['top', 'bottom', 'right', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 
    'right-top', 'right-bottom', 'left-top', 'left-bottom]`
- `'popoverAnimation' : Boolean`
    * PopOver is shown and hidden with animation if true.
- `'popoverOnHover' : boolean`
    * PopOver appears when hovering over the host element if true.
- `'popoverDismissTimeout' : number`
    * PopOver will disappear after X milliseconds.
- `'popoverDisabled' : Boolean`
    * Disabled hover and click capabilites so PopOver will not be displayed unless manually configured to.
- `'popoverAlways' : Boolean`
    * Trigger PopOver to be shown/hidden based on boolean value. True: shown, False: not shown. Should combine this with 'popoverDisabled'.

##### Properties of <popover-content>
- `'content' : string`
    * Defines the content of the PopOver. This is the same as passing string to 'popover' on the PopOver directive.
- `'placement' : string`
    * Defines the position of the PopOver. Same as 'pleacement' available as those on the PopOver Directive.
- `'title' : string`
    * Defines the title of the PopOver. Same as 'popoverTitle' on PopOver directive.
- `'animation' : boolean`
    * Defines the animation of the PopOver. Same as 'popoverAnimation' on PopOver directive.
