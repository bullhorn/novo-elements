import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[novoActivate]',
    standalone: true,
})
// Note: This directive does not control tabindex behavior, as host components
// may have disable functionality to consider.
export class ActivateDirective {
    @Output() novoActivate = new EventEmitter<MouseEvent | KeyboardEvent>();

    @HostListener('click')
    onClick() {
        this.novoActivate.emit();
    }

    @HostListener('keydown.space', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    onKeyActivate(event: KeyboardEvent) {
        event.preventDefault();
        this.novoActivate.emit(event);
    }
}
