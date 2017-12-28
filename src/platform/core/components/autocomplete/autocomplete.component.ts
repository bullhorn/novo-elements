
import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
} from '@angular/core';
// import { NovoListItemComponent, MatOptgroup } from '@angular/material/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { NovoOverlayTemplateComponent } from '../overlay';
import { NovoListItemComponent } from '../list';

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueAutocompleteIdCounter: number = 0;

/** Event object that is emitted when an autocomplete option is selected */
export class NovoAutocompleteSelectedEvent {
    constructor(
        /** Reference to the autocomplete panel that emitted the event. */
        public source: NovoAutocompleteComponent,
        /** Option that was selected. */
        public option: NovoListItemComponent) { }
}

@Component({
    selector: 'novo-autocomplete',
    template: `
    <novo-overlay-template [parent]="element" [position]="align" size="inherit">
        <div class="novo-autocomplete-panel" role="listbox" [id]="id" [ngClass]="_classList" #panel>
            <ng-content></ng-content>
        </div>
    </novo-overlay-template>
    `,
    styleUrls: ['./autocomplete.component.scss'],
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovoAutocompleteComponent implements AfterContentInit {
    @HostBinding('class') public _class: string = 'novo-autocomplete';
    @Input() public align: string = 'left';

    /** Manages active item in option list based on key events. */
    public _keyManager: ActiveDescendantKeyManager<NovoListItemComponent>;

    /** Whether the autocomplete panel should be visible, depending on option length. */
    public showPanel: boolean = false;

    /** Whether the autocomplete panel is open. */
    get isOpen(): boolean {
        return this._isOpen && this.showPanel;
    }
    public _isOpen: boolean = false;

    /** @docs-private */
    @ViewChild(TemplateRef) public template: TemplateRef<any>;

    @ViewChild(NovoOverlayTemplateComponent) public overlay: NovoOverlayTemplateComponent;
    /** Element for the panel containing the autocomplete options. */
    @ViewChild('panel') public panel: ElementRef;

    /** @docs-private */
    @ContentChildren(NovoListItemComponent, { descendants: true }) public options: QueryList<NovoListItemComponent>;

    /** @docs-private */
    // @ContentChildren(MatOptgroup) public optionGroups: QueryList<MatOptgroup>;

    /** Function that maps an option's control value to its display value in the trigger. */
    @Input() public displayWith: ((value: any) => string) | null = undefined;

    /** Event that is emitted whenever an option from the list is selected. */
    @Output() public optionSelected: EventEmitter<NovoAutocompleteSelectedEvent> =
        new EventEmitter<NovoAutocompleteSelectedEvent>();

    /**
     * Takes classes set on the host novo-autocomplete element and applies them to the panel
     * inside the overlay container to allow for easy styling.
     */
    @Input('class')
    set classList(classList: string) {
        if (classList && classList.length) {
            classList.split(' ').forEach((className: string) => this._classList[className.trim()] = true);
            this.element.nativeElement.className = '';
        }
    }
    public _classList: { [key: string]: boolean } = {};

    /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
    public id: string = `novo-autocomplete-${_uniqueAutocompleteIdCounter++}`;

    constructor(private _changeDetectorRef: ChangeDetectorRef, public element: ElementRef) { }

    public ngAfterContentInit(): void {
        this._keyManager = new ActiveDescendantKeyManager<NovoListItemComponent>(this.options).withWrap();
        // Set the initial visibiity state.
        this._setVisibility();
    }

    /** BEGIN: Convienient Panel Methods. */
    public openPanel(): void {
        this.overlay.openPanel();
    }
    public closePanel(): void {
        this.overlay.closePanel();
    }
    get panelOpen(): boolean {
        return this.overlay && this.overlay.panelOpen;
    }

    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display options
     * above or below the fold, as they are not actually being focused when active.
     */
    public _setScrollTop(scrollTop: number): void {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    }

    /** Returns the panel's scrollTop. */
    public _getScrollTop(): number {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    }

    /** Panel should hide itself when the option list is empty. */
    public _setVisibility(): void {
        // this.showPanel = !!this.options.length;
        // this._classList['novo-autocomplete-visible'] = this.showPanel;
        // this._classList['novo-autocomplete-hidden'] = !this.showPanel;
        // this._changeDetectorRef.markForCheck();
    }

    /** Emits the `select` event. */
    public _emitSelectEvent(option: NovoListItemComponent): void {
        const event: NovoAutocompleteSelectedEvent = new NovoAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    }
}
