// NG2
import { Directive, OnChanges, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Input, Output, EventEmitter, HostListener, SimpleChange } from '@angular/core';
import { PopOverContent } from './PopOverContent';

@Directive({
    selector: '[popover]'
})
export class PopOverDirective implements OnChanges {
    protected PopoverComponent = PopOverContent;
    protected popover: ComponentRef<PopOverContent>;
    protected visible: boolean;

    constructor(protected viewContainerRef: ViewContainerRef,
                protected resolver: ComponentFactoryResolver) {
    }

    @Input('popover') content:string|PopOverContent;
    @Input() popoverDisabled:boolean;
    @Input() popoverAlways:boolean;
    @Input() popoverAnimation:boolean;
    @Input() popoverPlacement:string;
    @Input() popoverTitle:string;
    @Input() popoverOnHover:boolean = false;
    @Input() popoverDismissTimeout: number = 0;

    @Output() onShown = new EventEmitter<PopOverDirective>();
    @Output() onHidden = new EventEmitter<PopOverDirective>();

    // ---------------------------------------------------
    // Event listeners
    // ---------------------------------------------------
    @HostListener('click')
    showOrHideOnClick(): void {
        if (this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.toggle();
    }

    @HostListener('focusin')
    @HostListener('mouseenter')
    showOnHover(): void {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.show();
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    hideOnHover(): void {
        if (!this.popoverOnHover || this.popoverDisabled) {
            return;
        }
        this.hide();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['popoverDisabled']) {
            if (changes['popoverDisabled'].currentValue) {
                this.hide();
            }
        }
        if (changes['popoverAlways']) {
            if (changes['popoverAlways'].currentValue) {
                this.show();
            }
        }
    }

    toggle() {
        if (!this.visible) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        if (this.visible) {
            return;
        }

        this.visible = true;
        if (typeof this.content === 'string') {
            const factory = this.resolver.resolveComponentFactory(this.PopoverComponent);
            if (!this.visible) {
                return;
            }

            this.popover = this.viewContainerRef.createComponent(factory);
            const popover = this.popover.instance as PopOverContent;
            popover.popover = this;
            popover.content = this.content as string;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }

            popover.onCloseFromOutside.subscribe(() => this.hide());
            if (this.popoverDismissTimeout > 0) {
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            }
        } else {
            const popover = this.content as PopOverContent;
            popover.popover = this;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }

            popover.onCloseFromOutside.subscribe(() => this.hide());
            if (this.popoverDismissTimeout > 0) {
                setTimeout(() => this.hide(), this.popoverDismissTimeout);
            }
            popover.show();
        }

        this.onShown.emit(this);
    }

    hide() {
        if (!this.visible) {
            return;
        }

        this.visible = false;
        if (this.popover) {
            this.popover.destroy();
        }

        if (this.content instanceof PopOverContent) {
            (this.content as PopOverContent).hideFromPopover();
        }

        this.onHidden.emit(this);
    }

    getElement() {
        return this.viewContainerRef.element.nativeElement;
    }
}
