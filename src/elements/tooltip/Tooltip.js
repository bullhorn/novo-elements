import { Directive } from '@angular/core';

@Directive({
    selector: '[tooltip]',
    properties: [
        'tooltip:tooltip',
        'always:tooltipAlways',
        'rounded:tooltipRounded',
        'noAnimate:tooltipNoAnimate',
        'bounce:tooltipBounce',
        'type:tooltipType',
        'position:tooltipPosition'
    ],
    host: {
        '[class.hint--top]': 'isPosition("top")',
        '[class.hint--left]': 'isPosition("left")',
        '[class.hint--right]': 'isPosition("right")',
        '[class.hint--bottom]': 'isPosition("bottom")',
        '[class.hint--error]': 'isType("error")',
        '[class.hint--info]': 'isType("info")',
        '[class.hint--warning]': 'isType("warning")',
        '[class.hint--success]': 'isType("success")',
        '[class.hint--always]': 'always',
        '[class.hint--rounded]': 'rounded',
        '[class.hint--no-animate]': 'noAnimate',
        '[class.hint--bounce]': 'bounce',
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
