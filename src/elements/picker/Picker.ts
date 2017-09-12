// NG2
import { Component, EventEmitter, ElementRef, ViewContainerRef, forwardRef, ViewChild, Input, Output, OnInit, DoCheck, Renderer, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// Vendor
import { Observable } from 'rxjs/Rx';
// APP
import { OutsideClick } from '../../utils/outside-click/OutsideClick';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { PickerResults } from './extras/picker-results/PickerResults';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { Helpers } from '../../utils/Helpers';
import { NovoPickerContainer } from './extras/picker-container/PickerContainer';
import { NovoOverlayTemplate } from '../overlay/Overlay';


// Value accessor for the component (supports ngModel)
const PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoPickerElement),
    multi: true
};

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
            (keydown)="onKeyDown($event)"
            (focus)="onFocus($event)"
            (click)="onFocus($event)"
            (blur)="onTouched($event)"
            autocomplete="off" />
        <i class="bhi-search" *ngIf="!_value || clearValueOnSelect"></i>
        <i class="bhi-times" *ngIf="_value && !clearValueOnSelect" (click)="clearValue(true)"></i>
        <novo-overlay-template class="picker-results-container" [parent]="element">
            <span #results></span>
            <ng-content></ng-content>
        </novo-overlay-template>
    `
})
export class NovoPickerElement implements OnInit {
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
    // Autoselects the first option in the results
    @Input() autoSelectFirstOption: boolean = true;

    // Emitter for selects
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() typing: EventEmitter<any> = new EventEmitter();

    @ViewChild(NovoOverlayTemplate) public container: NovoOverlayTemplate;

    parentScrollElement: Element;
    closeHandler: any;
    isStatic: boolean = true;
    term: string = '';
    resultsComponent: any;
    popup: any;
    _value: any;
    onModelChange: Function = () => {};
    onModelTouched: Function = () => {};

    constructor(public element: ElementRef, private componentUtils: ComponentUtils) {
        // Setup handlers
        //this.closeHandler = this.toggleActive.bind(this);
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
        const pasteObserver = Observable.fromEvent(input, 'paste')
            .debounceTime(250)
            .distinctUntilChanged();
        pasteObserver.subscribe(
            (event: ClipboardEvent) => this.onDebouncedKeyup(event),
            err => this.hideResults(err));
        const keyboardObserver = Observable.fromEvent(input, 'keyup')
            .debounceTime(250)
            .distinctUntilChanged();
        keyboardObserver.subscribe(
            (event: KeyboardEvent) => this.onDebouncedKeyup(event),
            err => this.hideResults(err));
    }

    private onDebouncedKeyup(event: Event) {
        if ([KeyCodes.ESC, KeyCodes.UP, KeyCodes.DOWN, KeyCodes.ENTER, KeyCodes.TAB].includes(event['keyCode'])) {
            return;
        }
        this.show((event.target as any).value);
    }

    /** BEGIN: Convienient Panel Methods. */
    public openPanel(): void {
        this.container.openPanel();
    }
    public closePanel(): void {
        this.container.closePanel();
    }
    public get panelOpen(): boolean {
        return this.container && this.container.panelOpen;
    }
    /** END: Convienient Panel Methods. */

    private show(term?: string): void {
        this.openPanel();
        // Show the results inside
        this.showResults(term);
    }

    private hide(): void {
        this.closePanel();
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.panelOpen) {
            if (event.keyCode === KeyCodes.ESC || event.keyCode === KeyCodes.TAB) {
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
                this.closePanel();
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
        this.openPanel();
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
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
        } else {
            this.popup = this.componentUtils.appendNextToLocation(this.resultsComponent, this.results);
            this.popup.instance.parent = this;
            this.popup.instance.config = this.config;
            this.popup.instance.term = this.term;
            this.popup.instance.selected = this.selected;
            this.popup.instance.autoSelectFirstOption = this.autoSelectFirstOption;
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
