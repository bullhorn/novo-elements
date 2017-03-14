// NG2
import { Component, EventEmitter, ElementRef, ViewContainerRef, forwardRef, ViewChild, Input, Output, OnInit, DoCheck, Renderer, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { PickerResults } from './extras/picker-results/PickerResults';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { Helpers } from '../../utils/Helpers';
// Vendor
import { Observable } from 'rxjs/Rx';

// Value accessor for the component (supports ngModel)
const PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoPickerElement),
    multi: true
};

// TODO - very similar with Dropdown.ts - need to extract to something!
@Component({
    selector: 'novo-picker-container',
    template: '<ng-content></ng-content>'
})
export class NovoPickerContainer implements DoCheck {
    private position: ClientRect;
    private isVisible: boolean;
    private relativeElement: Element;
    private scrollHandler: any;
    private side: string;
    private appendToBody: boolean;
    public parent: NovoPickerElement;

    constructor(public element: ElementRef, private renderer: Renderer) {
        this.scrollHandler = this.handleScroll.bind(this);
    }

    ngDoCheck() {
        if (this.isVisible && this.position) {
            const element = this.element.nativeElement;
            const position = Helpers.calcPositionOffset(this.position, element, this.side);
            if (position) {
                this.renderer.setElementStyle(element, 'top', position.top);
                this.renderer.setElementStyle(element, 'left', position.left);
                this.renderer.setElementStyle(element, 'width', position.width);
            }
        }
    }

    private handleScroll(): void {
        // On scroll, don't force the position to update (jump from top/middle/bottom/right)
        this.updatePosition(this.relativeElement, this.side);
    }

    public show(appendToBody: boolean): void {
        this.appendToBody = appendToBody;
        this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'visible');
        this.isVisible = true;
        if (appendToBody) {
            window.addEventListener('scroll', this.scrollHandler);
        }
    }

    public hide(): void {
        this.isVisible = false;
        this.renderer.setElementStyle(this.element.nativeElement, 'visibility', 'hidden');
        if (this.appendToBody) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
    }

    public updatePosition(element: Element, side: string): void {
        this.relativeElement = element;
        this.side = side;
        this.position = element.getBoundingClientRect();
        this.ngDoCheck();
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        // Close with ESC/Enter
        if (this.isVisible && (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.ENTER)) {
            this.parent.toggleActive(null, false);
        }
    }
}

/**
 * @name Picker
 *
 * @description This class is the directive definition of the Picker. If you add and attribute of `picker` to an input,
 * it will create an instance of the picker which wraps the input in all of the picker HTML elements and functionality.
 * Picker should be added as a two-way bound ngModel instance `[(picker)]=""` in order to have the picker options
 * dynamically populate.
 */
@Component({
    selector: 'novo-picker',
    providers: [PICKER_VALUE_ACCESSOR],
    template: `
        <input
            type="text"
            [(ngModel)]="term"
            (ngModelChange)="checkTerm($event)"
            [placeholder]="placeholder"
            (keyup)="onKeyUp($event)"
            (focus)="onFocus($event)"
            (click)="onFocus($event)"
            (blur)="onTouched($event)"
            autocomplete="off" />
        <i class="bhi-search" *ngIf="!_value"></i>
        <i class="bhi-times" *ngIf="_value" (click)="clearValue(true)"></i>
        <novo-picker-container class="picker-results-container">
            <span #results></span>
        </novo-picker-container>
    `,
    host: {
        '[class.append-to-body]': 'appendToBody'
    }
})
export class NovoPickerElement extends OutsideClick implements OnInit {
    // Container for the results
    @ViewChild('results', { read: ViewContainerRef }) results: ViewContainerRef;

    @Input() config: any;
    @Input() placeholder: string;
    @Input() clearValueOnSelect: boolean;
    @Input() closeOnSelect: boolean = true;
    @Input() selected: Array<any> = [];
    // Append the dropdown container to the body
    @Input() appendToBody: boolean = false;
    // Listen for scroll on a parent selector, so we can close the dropdown
    @Input() parentScrollSelector: string;
    // What action to perform when we recieve scroll from parent selector
    // TODO - handle "move"
    @Input() parentScrollAction: string = 'close';
    // Custom class for the dropdown container
    @Input() containerClass: string;
    // Side the dropdown will open
    @Input() side: string = 'left';

    // Emitter for selects
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() typing: EventEmitter<any> = new EventEmitter();

    @ViewChild(NovoPickerContainer) public container: NovoPickerContainer;

    parentScrollElement: Element;
    closeHandler: any;
    isStatic: boolean = true;
    term: string = '';
    resultsComponent: any;
    popup: any;
    _value: any;
    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(element: ElementRef, private componentUtils: ComponentUtils) {
        super(element);
        // Setup handlers
        this.closeHandler = this.toggleActive.bind(this);
        // Listen for active change to hide/show results
        if (this.onActiveChange) {
            this.onActiveChange.subscribe((active) => {
                if (active) {
                    this.show();
                } else {
                    this.hideResults();
                    this.blur.emit();
                }
            });
        }
    }

    ngOnInit() {
        // Custom results template
        this.resultsComponent = this.config.resultsTemplate || PickerResults;
        // Find parent
        if (this.parentScrollSelector) {
            this.parentScrollElement = Helpers.findAncestor(this.element.nativeElement, this.parentScrollSelector);
        }
        // Get all distinct key up events from the input and only fire if long enough and distinct
        let input = this.element.nativeElement.querySelector('input');
        const observer = Observable.fromEvent(input, 'keyup')
            .map((e: any) => e.target.value)
            .debounceTime(250)
            .distinctUntilChanged();
        observer.subscribe(
            term => this.show(term),
            err => this.hideResults(err));
    }

    private show(term?: string): void {
        this.container.parent = this;
        this.container.show(this.appendToBody);
        this.otherElement = this.container.element;
        if (this.appendToBody) {
            this.container.updatePosition(this.element.nativeElement.children[0], this.side);
            // If append to body then rip it out of here and put on body
            window.document.body.appendChild(this.container.element.nativeElement);
            window.addEventListener('resize', this.closeHandler);
        }
        // Listen for scroll on a parent to force close
        if (this.parentScrollElement) {
            if (this.parentScrollAction === 'close') {
                this.parentScrollElement.addEventListener('scroll', this.closeHandler);
            }
        }
        // Show the results inside
        this.showResults(term);
    }

    private hide(): void {
        this.container.hide();
        // If append to body then rip it out of here and put on body
        if (this.appendToBody) {
            let elm = this.container.element.nativeElement;
            if (elm.parentNode) {
                elm.parentNode.removeChild(elm);
            }
            window.removeEventListener('resize', this.closeHandler);
        }
        if (this.parentScrollElement) {
            if (this.parentScrollAction === 'close') {
                this.parentScrollElement.removeEventListener('scroll', this.closeHandler);
            }
        }
    }

    /**
     * @name onKeyUp
     * @param event - A keyboard event
     *
     * @description This function is called every time the input value changes. We listen for particular keys (e.g. UP
     * arrow, ESC, etc.) to handle certain behaviors of the picker.
     * It made sense to filter these out in the controller instead of using multiple listeners on the HTML element
     * because the quantity of different behaviors would make a messy element.
     */
    onKeyUp(event) {
        if (this.popup) {
            if (event.keyCode === KeyCodes.ESC) {
                this.hideResults();
                return;
            }

            if (event.keyCode === KeyCodes.UP) {
                this.popup.instance.prevActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.DOWN) {
                this.popup.instance.nextActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.ENTER) {
                this.popup.instance.selectActiveMatch();
                return;
            }

            if (event.keyCode === KeyCodes.BACKSPACE && !Helpers.isBlank(this._value)) {
                this.clearValue(false);
                this.toggleActive(null, true);
            }
        }
    }

    clearValue(wipeTerm) {
        this._value = null;
        this.select.emit(this._value);
        this.onModelChange(this._value);

        if (wipeTerm) {
            this.term = null;
            this.hideResults();
        }
    }

    /**
     * @name onFocus
     * @description When the input's focus event is called this method calls the debounced function that displays the
     * results.
     */
    onFocus(event) {
        this.toggleActive(null, true);
        this.focus.emit(event);
    }

    /**
     * @name showResults
     *
     * @description This method creates an instance of the results (called popup) and adds all the bindings to that
     * instance.
     */
    showResults(term?: any) {
        // Update Matches
        if (this.popup) {
            // Update existing list or create the DOM element
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
        } else {
            this.popup = this.componentUtils.appendNextToLocation(this.resultsComponent, this.results);
            this.popup.instance.parent = this;
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
        }
    }

    /**
     * @name hideResults
     *
     * @description - This method deletes the picker results from the DOM.
     */
    hideResults(err?: any) {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }
        this.hide();
    }

    // get accessor
    get value() {
        return this._value;
    }

    // set accessor including call the onchange callback
    set value(selected) {
        if (!selected) {
            this.term = '';
            this._value = null;
            this.onModelChange(this._value);
        } else if (selected.value !== this._value) {
            this.term = this.clearValueOnSelect ? '' : selected.label;
            this._value = selected.value;
            this.select.emit(selected);
            this.onModelChange(selected.value);
        } else {
            this.select.emit(selected);
        }
    }

    // Makes sure to clear the model if the user clears the text box
    checkTerm(event) {
        this.typing.emit(event);
        if (!event || !event.length) {
            this._value = null;
            this.onModelChange(this._value);
        }
    }

    // Set touched on blur
    onTouched(event?: Event) {
        this.onModelTouched();
        this.blur.emit(event);
    }

    // From ControlValueAccessor interface
    writeValue(value) {
        if (this.clearValueOnSelect) {
            this.term = '';
        } else {
            if (typeof value === 'string') {
                this.term = value;
            } else if (value && value.label) {
                this.term = value.label;
            } else if (value && value.firstName) {
                this.term = `${value.firstName} ${value.lastName}`;
            } else if (value && value.name) {
                this.term = value.name;
            } else if (this.config.getLabels && typeof this.config.getLabels === 'function') {
                this.config.getLabels(value).then(result => {
                    if (result) {
                        this.term = result.label || '';
                    } else {
                        this.term = value;
                    }
                });
            } else {
                this.term = value;
            }
        }
        this._value = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
