import { Directive } from '@angular/core';

@Directive({
    selector: '[tooltip]',
    properties: [
        'tooltip:tooltip',
        'active:tooltipActive',
        'always:tooltipAlways',
        'rounded:tooltipRounded',
        'noAnimate:tooltipNoAnimate',
        'bounce:tooltipBounce',
        'type:tooltipType',
        'position:tooltipPosition'
    ],
    host: {
        '[class.hint--top]': 'tooltip && isPosition("top")',
        '[class.hint--left]': 'tooltip && isPosition("left")',
        '[class.hint--right]': 'tooltip && isPosition("right")',
        '[class.hint--bottom]': 'tooltip && isPosition("bottom")',
        '[class.hint--top-left]': 'tooltip && isPosition("top-left")',
        '[class.hint--top-right]': 'tooltip && isPosition("top-right")',
        '[class.hint--bottom-left]': 'tooltip && isPosition("bottom-left")',
        '[class.hint--bottom-right]': 'tooltip && isPosition("bottom-right")',
        '[class.hint--error]': 'tooltip && isType("error")',
        '[class.hint--info]': 'tooltip && isType("info")',
        '[class.hint--warning]': 'tooltip && isType("warning")',
        '[class.hint--success]': 'tooltip && isType("success")',
        '[class.hint--always]': 'tooltip && always',
        '[class.hint--rounded]': 'tooltip && rounded',
        '[class.hint--no-animate]': 'tooltip && noAnimate',
        '[class.hint--bounce]': 'tooltip && bounce',
        '[class.hint--hidden]': '!active',
        '[attr.data-hint]': 'tooltip'
    }
})
export class Tooltip {
    ngOnInit() {
        if (!this.position) {
            this.position = 'top';
        }
    }

    isPosition(position) {
        return position.toLowerCase() === (this.position || '').toLowerCase();
    }

    isType(type) {
        return type.toLowerCase() === (this.type || '').toLowerCase();
    }
}

export const NOVO_TOOLTIP_ELEMENTS = [Tooltip];
