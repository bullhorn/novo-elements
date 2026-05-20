import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[novoActivate]',
    standalone: true,
})
export class ActivateDirective {
    @Output() novoActivate = new EventEmitter<void>();

    @HostListener('click')
    onClick() {
        this.novoActivate.emit();
    }

    @HostListener('keydown.space', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    onKeyActivate(event: KeyboardEvent) {
        event.preventDefault();
        this.novoActivate.emit();
    }
}
