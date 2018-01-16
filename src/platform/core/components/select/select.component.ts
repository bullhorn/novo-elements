// NG2
import { Component, Input, Output, EventEmitter, ViewChild, ViewChildren, ContentChildren, forwardRef, ElementRef, OnInit, OnChanges, OnDestroy, AfterViewInit, SimpleChanges, HostListener, QueryList, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ENTER, ESCAPE, SPACE, BACKSPACE, DELETE, UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
// APP
import { NovoOverlayTemplateComponent } from '../overlay';
import { NovoOptionComponent, NovoSelectionEvent } from '../option';
import { Helpers } from '../../utils/helpers/helpers.service';
// RXJS
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';

// Value accessor for the component (supports ngModel)
const SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NovoSelectComponent),
    multi: true,
};

@Component({
    selector: 'novo-select-option',
    template: `
        <li>
            <span class="novo-option-text"><ng-content></ng-content></span>
            <i *ngIf="active" class="bhi-check"></i>
        </li>
    `,
})
export class NovoSelectOptionComponent {
    @Input() public active: boolean = false;
    @Input() public value: any;
}

@Component({
    selector: 'novo-select',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SELECT_VALUE_ACCESSOR],
    template: `
        <div class="select-input" (click)="openPanel()" tabIndex="0" [class.empty]="empty">{{ selected?.viewValue }}<i class="bhi-collapse"></i></div>
        <novo-overlay-template [parent]="element" position="center">
            <div class="novo-select-list" tabIndex="-1" [class.header]="headerConfig" [class.active]="panelOpen">
                <li *ngIf="headerConfig" class="select-header" [class.open]="header.open">
                    <button  *ngIf="!header.open" (click)="toggleHeader($event); false" tabIndex="-1" type="button" class="header">
                        <i class="bhi-add-thin"></i>{{ headerConfig.label }}
                    </button>
                    <div *ngIf="header.open" [ngClass]="{active: header.open}">
                        <input autofocus type="text" [placeholder]="headerConfig.placeholder" [attr.id]="name" autocomplete="false" [(ngModel)]="header.value" [ngClass]="{invalid: !header.valid}"/>
                        <footer>
                            <button (click)="toggleHeader($event, false)">Cancel</button>
                            <button (click)="saveHeader()" class="primary">Save</button>
                        </footer>
                    </div>
                </li>
                <ng-content></ng-content>
                <novo-option *ngFor="let option of filteredOptions; let i = index" [value]="option.value">
                    <span [innerHtml]="highlight(option.label, filterTerm)"></span>
                </novo-option>
            </div>
        </novo-overlay-template>
    `,
})
export class NovoSelectComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
    @Input() public name: string;
    @Input() public placeholder: string;
    @Input() public readonly: boolean;
    @Input() public headerConfig: any;
    @Output() public onSelect: EventEmitter<any> = new EventEmitter();

    public selectedIndex: number = -1;
    public empty: boolean = true;
    public header: any = {
        open: false,
        valid: true,
        value: '',
    };
    public createdItem: any;
    public selected: any;
    public model: any;
    public filterTerm: string = '';
    public filterTermTimeout: any;
    public filteredOptions: any[];

    /** Element for the panel containing the autocomplete options. */
    @ViewChild(NovoOverlayTemplateComponent) public overlay: NovoOverlayTemplateComponent;
    @ContentChildren(NovoOptionComponent, { descendants: true }) public _options: QueryList<NovoOptionComponent>;
    @ViewChildren(NovoOptionComponent) public _others: QueryList<NovoOptionComponent>;

    private _selectionSubscription: Subscription;

    constructor(public element: ElementRef, private _cdr: ChangeDetectorRef) { }

    @Input()
    public set options(value: any[]) {
        let newOptions: any[] = [];
        if (value && value.length && typeof value[0] === 'string') {
            newOptions = value.map((item: string) => {
                return { value: item, label: item };
            });
        } else {
            newOptions = value;
        }

        newOptions = newOptions.filter((item: any) => {
            return !item.readOnly;
        });
        newOptions.forEach((element: any) => {
            element.active = false;
        });
        if (this.placeholder) {
            newOptions.unshift({
                label: this.placeholder,
                value: undefined,
                active: false,
            });
        }
        this.filteredOptions = [...newOptions];
    }

    public get options(): any[] {
        let content: NovoOptionComponent[] = this._options && this._options.length ? this._options.toArray() : [];
        let view: NovoOptionComponent[] = this._others && this._others.length ? this._others.toArray() : [];
        return [].concat(content, view);
    }

    public ngOnInit(): void {
        this.readonly = this.readonly === true;
    }

    public ngOnChanges(changes?: SimpleChanges): void {
        if (!this.model) {
            this.clear();
        }
        if (this.panelOpen) {
            this.openPanel();
        }
    }

    public ngOnDestroy(): void {
        this.destroySelectionSubscription();
    }
    public ngAfterViewInit(): void {
        this.setupSelectionSubscription();
        this._others.changes.subscribe(() => {
            this.setupSelectionSubscription();
            if (this.model) {
                Promise.resolve().then(() => this.writeValue(this.model));
            } else {
                this.clear();
            }
        });
        if (!this.model) {
            this.clear();
        }
    }

    public destroySelectionSubscription(): void {
        if (this._selectionSubscription) {
            this._selectionSubscription.unsubscribe();
        }
    }

    public setupSelectionSubscription(): void {
        this.destroySelectionSubscription();
        this._selectionSubscription = this.optionSelections.subscribe((selection: NovoSelectionEvent) => {
            this.setValueAndClose(selection.source);
        });
    }

    /** Stream of option selections. */
    get optionSelections(): Observable<any> {
        return merge(...this.options.map((option: NovoOptionComponent) => option.selection));
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
    /** END: Convienient Panel Methods. */

    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    public setValueAndClose(option: NovoOptionComponent): void {
        this.setValue(option);
        this.closePanel();
    }

    public setValue(option: NovoOptionComponent): void {
        if (option) {
            let index: number = this.options.findIndex((i: any) => i.value === option.value);
            this.select(option, index);
        }
    }

    public select(option: any, i: number, fireEvents: boolean = true): void {
        if (this.selected) {
            this.selected.active = false;
        }
        this.selectedIndex = i;
        this.selected = option;
        this.selected.active = true;
        this.empty = false;
        if (fireEvents) {
            this.onModelChange(this.selected.value);
            this.onSelect.emit({ selected: this.selected.value });
        }
        this._cdr.markForCheck();
    }

    public clear(): void {
        this.setValue(this.options.find((i: NovoOptionComponent) => i.value === undefined));
        this.header = {
            open: false,
            valid: true,
            value: '',
        };
        if (this.selected) {
            this.selected.active = false;
        }
        this.selectedIndex = -1;
        this.empty = true;
        this._cdr.markForCheck();
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (this.panelOpen) {
            if (!this.header.open) {
                // Prevent Scrolling
                event.preventDefault();
            }
            // Close popup on escape key
            if (event.keyCode === ESCAPE) {
                this.closePanel();
                return;
            }
            if (event.keyCode === ENTER) {
                if (this.header.open && this.header.value) {
                    this.saveHeader();
                    return;
                }
                this.setValueAndClose(this.options[this.selectedIndex]);
                return;
            }

            if (event.keyCode === UP_ARROW && this.selectedIndex > 0) {
                this.selectedIndex--;
                this.select(this.options[this.selectedIndex], this.selectedIndex);
                this.scrollToSelected();
            } else if (event.keyCode === DOWN_ARROW && this.selectedIndex < this.options.length - 1) {
                this.selectedIndex++;
                this.select(this.options[this.selectedIndex], this.selectedIndex);
                this.scrollToSelected();
                if (this.header.open) {
                    this.toggleHeader(undefined, false);
                }
            } else if (event.keyCode === UP_ARROW && this.selectedIndex === 0) {
                this.selectedIndex--;
                this.toggleHeader(undefined, true);
            } else if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === SPACE) {
                clearTimeout(this.filterTermTimeout);
                this.filterTermTimeout = setTimeout(() => { this.filterTerm = ''; }, 2000);
                let char: string = String.fromCharCode(event.keyCode);
                this.filterTerm = this.filterTerm.concat(char);
                // let element = this.element.nativeElement;
                // let list = element.querySelector('.novo-select-list');
                // let item = element.querySelector(`[data-automation-value^="${this.filterTerm}" i]`);
                let item: any = this.options.find((i: any) => i.viewValue.toUpperCase().indexOf(this.filterTerm) === 0);
                if (item) {
                    this.select(item, this.options.indexOf(item));
                    this.scrollToSelected();
                }
            } else if ([BACKSPACE, DELETE].includes(event.keyCode)) {
                clearTimeout(this.filterTermTimeout);
                this.filterTermTimeout = setTimeout(() => { this.filterTerm = ''; }, 2000);
                this.filterTerm = this.filterTerm.slice(0, -1);
            }
        } else {
            if ([DOWN_ARROW, UP_ARROW].includes(event.keyCode)) {
                this.panelOpen ? this.closePanel() : this.openPanel();
            }
        }
    }

    public scrollToSelected(): void {
        this.scrollToIndex(this.selectedIndex);
    }

    public scrollToIndex(index: number): void {
        let element: any = this.overlay._overlayRef.overlayElement;
        let list: HTMLElement = element.querySelector('.novo-select-list');
        let items: NodeListOf<Element> = list.querySelectorAll('novo-option');
        let item: HTMLElement = items[this.headerConfig ? index + 1 : index] as HTMLElement;
        if (item) {
            list.scrollTop = item.offsetTop;
        }
    }

    public toggleHeader(event: Event, forceValue: any): void {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        // Reverse the active property (if forceValue, use that)
        this.header = {
            open: forceValue !== undefined ? forceValue : !this.header.open,
            value: '',
            valid: true,
        };
    }

    public highlight(match: string, query: string): string {
        // Replaces the capture string with a the same string inside of a "strong" tag
        return (query && match) ? match.replace(new RegExp(this.escapeRegexp(query), 'gi'), '<strong>$&</strong>') : match;
    }

    public escapeRegexp(queryToEscape: string): string {
        // Ex: if the capture is "a" the result will be \a
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    public saveHeader(): void {
        if (this.header.value) {
            this.headerConfig.onSave(this.header.value);
            this.createdItem = this.header.value;
            this.closePanel();
        } else {
            this.header.valid = false;
        }
    }

    public addOption(option: { value: any, label: string }): void {
        this.filteredOptions.unshift(option);
        this._others.setDirty();
    }

    public writeValue(model: any): void {
        this.model = model;
        if (this.options && this.options.length) {
            let item: NovoOptionComponent = this.options.find((i: any) => i.value === model);
            if (item) {
                this.setValue(item);
                this.empty = false;
            } else if (!item && !Helpers.isEmpty(model)) {
                let option: any = {
                    label: model,
                    value: model,
                };
                this.addOption(option);
            } else {
                this.clear();
            }
        }
        this._cdr.markForCheck();
    }

    public onModelChange: Function = () => { };
    public onModelTouched: Function = () => { };

    public registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}
