// NG2
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[tooltip]',
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
        '[class.hint--hidden]': 'active === false',
        '[class.hint--preline]': 'preline',
        '[class.hint--small]': 'tooltip && isSize("small")',
        '[class.hint--medium]': 'tooltip && isSize("medium")',
        '[class.hint--large]': 'tooltip && isSize("large")',
        '[attr.data-hint]': 'tooltip'
    }
})
export class TooltipDirective {
    @Input() tooltip: string;
    @Input('tooltipPosition') position: string = 'top';
    @Input('tooltipType') type: string;
    @Input('tooltipSize') size: string;
    @Input('tooltipBounce') bounce: string;
    @Input('tooltipNoAnimate') noAnimate: boolean;
    @Input('tooltipRounded') rounded: boolean;
    @Input('tooltipAlways') always: boolean;
    @Input('tooltipActive') active: boolean;
    @Input('tooltipPreline') preline: boolean;

    isPosition(position: string): boolean {
        return position.toLowerCase() === (this.position || '').toLowerCase();
    }

    isType(type: string): boolean {
        return type.toLowerCase() === (this.type || '').toLowerCase();
    }

    isSize(size: string): boolean {
        return size.toLowerCase() === (this.size || '').toLowerCase();
    }
}
