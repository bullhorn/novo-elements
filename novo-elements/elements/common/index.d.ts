import * as i0 from '@angular/core';
import { TemplateRef, ElementRef, OnInit, EventEmitter, OnDestroy, ChangeDetectorRef, Renderer2, DoCheck, ViewContainerRef, InjectionToken, AfterViewChecked, QueryList, NgZone } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as i3 from '@angular/common';
import { NgSwitch } from '@angular/common';
import { FocusableOption, FocusOrigin, FocusOptions } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import * as i3$1 from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, NgControl } from '@angular/forms';
import * as i4 from '@angular/cdk/overlay';
import { Overlay, OverlayRef, OverlayConfig, FlexibleConnectedPositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import * as i5 from '@angular/cdk/scrolling';

declare class NovoTemplate {
    template: TemplateRef<any>;
    type: string;
    name: string;
    constructor(template: TemplateRef<any>);
    getType(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTemplate, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoTemplate, "[novoTemplate]", never, { "type": { "alias": "type"; "required": false; }; "name": { "alias": "novoTemplate"; "required": false; }; }, {}, never, never, false, never>;
}

type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'small' | 'medium' | 'large';
type TypographyLength = 'small' | 'medium' | 'large';
type TypographyWeight = 'hairline' | 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'heavy' | 'lighter' | 'bolder';

declare class NovoBaseTextElement {
    element: ElementRef;
    size: TypographySize;
    weight: TypographyWeight;
    lineLength: TypographyLength;
    color: string;
    get hb_classBinding(): string;
    disabled: boolean;
    muted: boolean;
    error: boolean;
    marginBefore: boolean;
    marginAfter: boolean;
    capitialize: boolean;
    uppercase: boolean;
    nowrap: boolean;
    ellipsis: boolean;
    smaller: boolean;
    larger: boolean;
    thin: boolean;
    lighter: boolean;
    light: boolean;
    medium: boolean;
    bold: boolean;
    bolder: boolean;
    extrabold: boolean;
    constructor(element: ElementRef);
    get nativeElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoBaseTextElement, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoBaseTextElement, never, never, { "size": { "alias": "size"; "required": false; }; "weight": { "alias": "weight"; "required": false; }; "lineLength": { "alias": "lineLength"; "required": false; }; "color": { "alias": "color"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "muted": { "alias": "muted"; "required": false; }; "error": { "alias": "error"; "required": false; }; "marginBefore": { "alias": "marginBefore"; "required": false; }; "marginAfter": { "alias": "marginAfter"; "required": false; }; "capitialize": { "alias": "capitialize"; "required": false; }; "uppercase": { "alias": "uppercase"; "required": false; }; "nowrap": { "alias": "nowrap"; "required": false; }; "ellipsis": { "alias": "ellipsis"; "required": false; }; "smaller": { "alias": "smaller"; "required": false; }; "larger": { "alias": "larger"; "required": false; }; "thin": { "alias": "thin"; "required": false; }; "lighter": { "alias": "lighter"; "required": false; }; "light": { "alias": "light"; "required": false; }; "medium": { "alias": "medium"; "required": false; }; "bold": { "alias": "bold"; "required": false; }; "bolder": { "alias": "bolder"; "required": false; }; "extrabold": { "alias": "extrabold"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
declare class NovoText extends NovoBaseTextElement {
    block: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoText, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoText, "novo-text,[novo-text]", never, { "block": { "alias": "block"; "required": false; }; }, {}, never, ["*"], false, never>;
}

/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */
declare class NovoTitle extends NovoBaseTextElement {
    weight: TypographyWeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTitle, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoTitle, "novo-title,[novo-title]", never, {}, {}, never, ["*"], false, never>;
}

/**
 * Tag Example
 * <novo-title size="sm" disabled>Label</novo-title
 * <novo-title small disabled>Label</novo-title>
 * <novo-title large disabled>Label</novo-title>
 * <novo-title error>Label</novo-title>
 * <novo-title muted>Label</novo-title>
 * <novo-title class="tc-grapefruit">Label</novo-title>
 * <novo-title color="grapefruit">Label</novo-title>
 */
declare class NovoCaption extends NovoBaseTextElement {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCaption, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoCaption, "novo-caption,[novo-caption]", never, {}, {}, never, ["*"], false, never>;
}

declare class NovoLabel extends NovoBaseTextElement implements OnInit {
    id: string;
    inputId: i0.InputSignal<any>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLabel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoLabel, "novo-label,[novo-label]", never, { "inputId": { "alias": "id"; "required": false; "isSignal": true; }; }, {}, never, ["*"], false, never>;
}

/**
 * Tag Example
 * <novo-text size="small" disabled>Label</novo-text
 * <novo-text small disabled>Label</novo-text>
 * <novo-text large disabled>Label</novo-text>
 * <novo-text error>Label</novo-text>
 * <novo-text muted>Label</novo-text>
 * <novo-text class="tc-grapefruit">Label</novo-text>
 * <novo-text color="grapefruit">Label</novo-text>
 */
declare class NovoLink extends NovoBaseTextElement {
    href: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoLink, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoLink, "novo-link", never, { "href": { "alias": "href"; "required": false; }; }, {}, never, ["*"], false, never>;
}

declare const getSpacingToken: (value: string) => any;
declare class MarginDirective {
    margin: string;
    m: string;
    marginLeft: string;
    ml: string;
    marginRight: string;
    mr: string;
    marginTop: string;
    mt: string;
    marginBottom: string;
    mb: string;
    marginX: string;
    mx: string;
    marginY: string;
    my: string;
    get hb_margin(): string;
    get hb_margin_left(): any;
    get hb_margin_right(): any;
    get hb_margin_top(): any;
    get hb_margin_bottom(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MarginDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MarginDirective, "[m],[margin],[marginTop],[marginRight],[marginBottom],[marginLeft],[marginX],[marginY],[mt],[mr],[mb],[ml],[mx],[my]", never, { "margin": { "alias": "margin"; "required": false; }; "m": { "alias": "m"; "required": false; }; "marginLeft": { "alias": "marginLeft"; "required": false; }; "ml": { "alias": "ml"; "required": false; }; "marginRight": { "alias": "marginRight"; "required": false; }; "mr": { "alias": "mr"; "required": false; }; "marginTop": { "alias": "marginTop"; "required": false; }; "mt": { "alias": "mt"; "required": false; }; "marginBottom": { "alias": "marginBottom"; "required": false; }; "mb": { "alias": "mb"; "required": false; }; "marginX": { "alias": "marginX"; "required": false; }; "mx": { "alias": "mx"; "required": false; }; "marginY": { "alias": "marginY"; "required": false; }; "my": { "alias": "my"; "required": false; }; }, {}, never, never, false, never>;
}
declare class PaddingDirective {
    padding: string;
    p: string;
    paddingLeft: string;
    pl: string;
    paddingRight: string;
    pr: string;
    paddingTop: string;
    pt: string;
    paddingBottom: string;
    pb: string;
    paddingX: string;
    px: string;
    paddingY: string;
    py: string;
    get hb_padding(): string;
    get hb_padding_left(): any;
    get hb_padding_right(): any;
    get hb_padding_top(): any;
    get hb_padding_bottom(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaddingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PaddingDirective, "[p],[padding],[paddingTop],[paddingRight],[paddingBottom],[paddingLeft],[paddingX],[paddingY],[pt],[pr],[pb],[pl],[px],[py]", never, { "padding": { "alias": "padding"; "required": false; }; "p": { "alias": "p"; "required": false; }; "paddingLeft": { "alias": "paddingLeft"; "required": false; }; "pl": { "alias": "pl"; "required": false; }; "paddingRight": { "alias": "paddingRight"; "required": false; }; "pr": { "alias": "pr"; "required": false; }; "paddingTop": { "alias": "paddingTop"; "required": false; }; "pt": { "alias": "pt"; "required": false; }; "paddingBottom": { "alias": "paddingBottom"; "required": false; }; "pb": { "alias": "pb"; "required": false; }; "paddingX": { "alias": "paddingX"; "required": false; }; "px": { "alias": "px"; "required": false; }; "paddingY": { "alias": "paddingY"; "required": false; }; "py": { "alias": "py"; "required": false; }; }, {}, never, never, false, never>;
}
declare class GapDirective {
    gap: string;
    get hb_gap(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<GapDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<GapDirective, "[gap]", never, { "gap": { "alias": "gap"; "required": false; }; }, {}, never, never, false, never>;
}

declare class BackgroundColorDirective {
    private el;
    bg: string;
    get hb_bgColor(): string;
    get hb_bgStyle(): string;
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<BackgroundColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BackgroundColorDirective, "[bg]", never, { "bg": { "alias": "bg"; "required": false; }; }, {}, never, never, false, never>;
}

declare class TextColorDirective {
    private el;
    txc: string;
    get hb_textColor(): string;
    get hb_textStyle(): string;
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<TextColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TextColorDirective, "[txc]", never, { "txc": { "alias": "txc"; "required": false; }; }, {}, never, never, false, never>;
}

declare class BorderDirective {
    private el;
    borderStyle: string;
    borderColor: string;
    borderWidth: number;
    border: string;
    borderLeft: string;
    bl: string;
    borderRight: string;
    br: string;
    borderTop: string;
    bt: string;
    borderBottom: string;
    bb: string;
    borderX: string;
    bx: string;
    borderY: string;
    by: string;
    get hb_border(): string;
    get hb_border_left(): string;
    get hb_border_right(): string;
    get hb_border_top(): string;
    get hb_border_bottom(): string;
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<BorderDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BorderDirective, "[border], [bb], [borderBottom], [bt], [borderTop], [bl], [borderLeft], [br], [borderRight], [bx], [borderX], [by], [borderY]", never, { "borderStyle": { "alias": "borderStyle"; "required": false; }; "borderColor": { "alias": "borderColor"; "required": false; }; "borderWidth": { "alias": "borderWidth"; "required": false; }; "border": { "alias": "border"; "required": false; }; "borderLeft": { "alias": "borderLeft"; "required": false; }; "bl": { "alias": "bl"; "required": false; }; "borderRight": { "alias": "borderRight"; "required": false; }; "br": { "alias": "br"; "required": false; }; "borderTop": { "alias": "borderTop"; "required": false; }; "bt": { "alias": "bt"; "required": false; }; "borderBottom": { "alias": "borderBottom"; "required": false; }; "bb": { "alias": "bb"; "required": false; }; "borderX": { "alias": "borderX"; "required": false; }; "bx": { "alias": "bx"; "required": false; }; "borderY": { "alias": "borderY"; "required": false; }; "by": { "alias": "by"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoThemeOptions {
    themeName: string;
}
interface ThemeChangeEvent {
    themeName: string;
    options?: NovoThemeOptions;
}
declare class NovoTheme {
    private _defaultTheme;
    private _currentTheme;
    onThemeChange: EventEmitter<ThemeChangeEvent>;
    /** Name of the theme being used. defaults to `modern-light` */
    get themeName(): string;
    set themeName(value: string);
    use(options: NovoThemeOptions): Observable<any>;
    /**
     * Changes the current theme
     */
    private changeTheme;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoTheme, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NovoTheme>;
}

declare class AccentColorDirective implements OnDestroy {
    private theme;
    protected cdr: ChangeDetectorRef;
    private subscription;
    accent: string;
    get hb_textColor(): string;
    constructor(theme: NovoTheme, cdr: ChangeDetectorRef);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccentColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AccentColorDirective, "[accent]", never, { "accent": { "alias": "accent"; "required": false; }; }, {}, never, never, false, never>;
}

declare class FillColorDirective {
    private el;
    fill: string;
    get hb_textColor(): string;
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<FillColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FillColorDirective, "[fill]", never, { "fill": { "alias": "fill"; "required": false; }; }, {}, never, never, false, never>;
}

declare class FlexDirective {
    private readonly el;
    private readonly renderer;
    private _flex;
    get flex(): string;
    set flex(value: string);
    constructor(el: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FlexDirective, "[flex]", never, { "flex": { "alias": "flex"; "required": false; }; }, {}, never, never, false, never>;
}

declare class ThemeColorDirective {
    private el;
    theme: string;
    get hb_textColor(): string;
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ThemeColorDirective, "[theme]", never, { "theme": { "alias": "theme"; "required": false; }; }, {}, never, never, false, never>;
}

declare class SwitchCasesDirective implements OnInit, DoCheck {
    private viewContainer;
    private templateRef;
    private ngSwitch;
    private _created;
    novoSwitchCases: any[];
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>, ngSwitch: NgSwitch);
    ngOnInit(): void;
    ngDoCheck(): void;
    enforceState(created: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchCasesDirective, [null, null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SwitchCasesDirective, "[novoSwitchCases]", never, { "novoSwitchCases": { "alias": "novoSwitchCases"; "required": false; }; }, {}, never, never, false, never>;
}

declare class VisibleDirective {
    private el;
    visible: boolean;
    get hb_visibility(): "" | "novo-visibility-hidden";
    constructor(el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<VisibleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<VisibleDirective, "[visible]", never, { "visible": { "alias": "visible"; "required": false; }; }, {}, never, never, false, never>;
}

/** @docs-private */
type Constructor<T> = new (...args: any[]) => T;
/**
 * This is a permissive type for abstract class constructors.
 * @docs-private
 */
type AbstractConstructor<T> = Function & {
    prototype: T;
};

/** @docs-private */
interface CanDisable {
    /** Whether the component is disabled. */
    disabled: boolean;
}
/** @docs-private */
type CanDisableCtor = Constructor<CanDisable>;
/** Mixin to augment a directive with a `disabled` property. */
declare function mixinDisabled<T extends Constructor<{}>>(base: T): CanDisableCtor & T;

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
interface NovoOptionParentComponent {
    multiple?: boolean;
    inertGroups?: boolean;
}
/**
 * Injection token used to provide the parent component to options.
 */
declare const NOVO_OPTION_PARENT_COMPONENT: InjectionToken<NovoOptionParentComponent>;

declare class NovoOptgroupBase implements CanDisable {
    disabled: boolean;
    /** Label for the option group. */
    label: string;
    /** Unique id for the underlying label. */
    _labelId: string;
    /** Whether the group is in novoInert a11y mode. */
    _novoInert: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOptgroupBase, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoOptgroupBase, never, never, {}, {}, never, never, true, never>;
}
declare const NovoOptgroupMixinBase: CanDisableCtor & typeof NovoOptgroupBase;
/**
 * Injection token that can be used to reference instances of `NovoOptgroup`. It serves as
 * alternative token to the actual `NovoOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
declare const NOVO_OPTGROUP: InjectionToken<NovoOptgroup>;
/**
 * Component that is used to group instances of `novo-option`.
 */
declare class NovoOptgroup extends NovoOptgroupMixinBase {
    constructor(parent?: NovoOptionParentComponent);
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOptgroup, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoOptgroup, "novo-optgroup", ["novoOptgroup"], { "disabled": { "alias": "disabled"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, ["novo-option, ng-container, novo-divider, cdk-virtual-scroll-viewport"], false, never>;
}

/** Event object emitted by NovoOption when selected or deselected. */
declare class NovoOptionSelectionChange {
    /** Reference to the option that emitted the event. */
    source: NovoOptionBase;
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput: boolean;
    constructor(
    /** Reference to the option that emitted the event. */
    source: NovoOptionBase, 
    /** Whether the change in the option's value was a result of a user action. */
    isUserInput?: boolean);
}
declare class NovoOptionBase implements FocusableOption, AfterViewChecked, OnDestroy {
    private _element;
    private _changeDetectorRef;
    private _parent;
    readonly group: NovoOptgroupBase;
    private _selected;
    private _active;
    private _disabled;
    private _mostRecentViewValue;
    private _clickCapture;
    private _clickPassive;
    /** TODO: deprecate maybe, check support for table headers */
    keepOpen: boolean;
    novoInert: boolean;
    allowSelection: boolean;
    customViewValue: string;
    /** If there is no parent then nothing is managing the selection. */
    get selectable(): NovoOptionParentComponent;
    /** Whether the wrapping component is in multiple selection mode. */
    get multiple(): boolean;
    /** The form value of the option. */
    value: any;
    /** The unique ID of the option. */
    id: string;
    /** Whether the option is disabled. */
    get disabled(): any;
    set disabled(value: any);
    get selected(): any;
    set selected(value: any);
    /** Event emitted when the option is selected or deselected. */
    readonly onSelectionChange: EventEmitter<NovoOptionSelectionChange>;
    /** Emits when the state of the option changes and any parents have to be notified. */
    readonly _stateChanges: Subject<void>;
    constructor(_element: ElementRef<HTMLElement>, _changeDetectorRef: ChangeDetectorRef, _parent: NovoOptionParentComponent, group: NovoOptgroupBase);
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active(): boolean;
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    get viewValue(): string;
    /** Selects the option. */
    select(): void;
    /** Deselects the option. */
    deselect(): void;
    /** Sets focus onto this option. */
    focus(_origin?: FocusOrigin, options?: FocusOptions): void;
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles(): void;
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles(): void;
    /** Gets the label to be used when determining whether the option should be focused. */
    getLabel(): string;
    _handleDisabledClick(event: MouseEvent): void;
    _handlePassiveClick(event: MouseEvent): void;
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    _selectViaInteraction(): void;
    /**
     * Force a click event
     */
    _clickViaInteraction(): void;
    /**
     * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
     * attribute from single-selection, unselected options. Including the `aria-selected="false"`
     * attributes adds a significant amount of noise to screen-reader users without providing useful
     * information.
     */
    _getAriaSelected(): boolean | null;
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex(): string;
    /** Gets the host DOM element. */
    _getHostElement(): HTMLElement;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /** Emits the selection change event. */
    private _emitSelectionChangeEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOptionBase, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NovoOptionBase, never, never, { "keepOpen": { "alias": "keepOpen"; "required": false; }; "novoInert": { "alias": "novoInert"; "required": false; }; "allowSelection": { "alias": "allowSelection"; "required": false; }; "customViewValue": { "alias": "customViewValue"; "required": false; }; "value": { "alias": "value"; "required": false; }; "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, { "onSelectionChange": "onSelectionChange"; }, never, never, true, never>;
}
/**
 * Single option inside of a `<novo-select>` element.
 */
declare class NovoOption extends NovoOptionBase {
    constructor(element: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef, parent: NovoOptionParentComponent, group: NovoOptgroup);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOption, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoOption, "novo-option", ["novoOption"], { "selected": { "alias": "selected"; "required": false; }; "keepOpen": { "alias": "keepOpen"; "required": false; }; "novoInert": { "alias": "novoInert"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*", "[novoSuffix]"], false, never>;
}
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
declare function _countGroupLabelsBeforeOption(optionIndex: number, options: QueryList<NovoOption>, optionGroups: QueryList<NovoOptgroup>): number;
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
declare function _getOptionScrollPosition(optionOffset: number, optionHeight: number, currentScrollPosition: number, panelHeight: number): number;

/**
 * Possible states for a pseudo checkbox.
 * @docs-private
 */
type NovoPseudoCheckboxState = 'unchecked' | 'checked' | 'indeterminate';
type NovoPseudoCheckboxShape = 'box' | 'circle' | 'line';
/**
 * Component that shows a simplified checkbox without including any kind of "real" checkbox.
 * Meant to be used when the checkbox is purely decorative and a large number of them will be
 * included, such as for the options in a multi-select. Uses no SVGs or complex animations.
 * Note that theming is meant to be handled by the parent element, e.g.
 * `novo-primary .novo-pseudo-checkbox`.
 *
 * Note that this component will be completely invisible to screen-reader users. This is *not*
 * interchangeable with `<novo-checkbox>` and should *not* be used if the user would directly
 * interact with the checkbox. The pseudo-checkbox should only be used as an implementation detail
 * of more complex components that appropriately handle selected / checked state.
 * @docs-private
 */
declare class NovoPseudoCheckbox {
    _animationMode?: string;
    /** Display state of the checkbox. */
    state: NovoPseudoCheckboxState;
    /** Display state of the checkbox. */
    shape: NovoPseudoCheckboxShape;
    /** Whether the checkbox is disabled. */
    disabled: boolean;
    constructor(_animationMode?: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPseudoCheckbox, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoPseudoCheckbox, "novo-pseudo-checkbox", never, { "state": { "alias": "state"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, false, never>;
}

declare class NovoPseudoCheckboxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoPseudoCheckboxModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoPseudoCheckboxModule, [typeof NovoPseudoCheckbox], never, [typeof NovoPseudoCheckbox]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoPseudoCheckboxModule>;
}

declare class NovoOptionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOptionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoOptionModule, [typeof NovoOption, typeof NovoOptgroup], [typeof i3.CommonModule, typeof NovoPseudoCheckboxModule], [typeof NovoOption, typeof NovoOptgroup]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoOptionModule>;
}

declare class NovoCommonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoCommonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoCommonModule, [typeof NovoTemplate, typeof NovoText, typeof NovoTitle, typeof NovoCaption, typeof NovoLabel, typeof NovoLink, typeof MarginDirective, typeof PaddingDirective, typeof BackgroundColorDirective, typeof TextColorDirective, typeof BorderDirective, typeof GapDirective, typeof AccentColorDirective, typeof FillColorDirective, typeof FlexDirective, typeof ThemeColorDirective, typeof SwitchCasesDirective, typeof VisibleDirective], [typeof i3.CommonModule, typeof NovoOptionModule], [typeof NovoTemplate, typeof NovoText, typeof NovoTitle, typeof NovoCaption, typeof NovoLabel, typeof NovoLink, typeof MarginDirective, typeof PaddingDirective, typeof BackgroundColorDirective, typeof TextColorDirective, typeof BorderDirective, typeof GapDirective, typeof AccentColorDirective, typeof FillColorDirective, typeof FlexDirective, typeof ThemeColorDirective, typeof SwitchCasesDirective, typeof VisibleDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoCommonModule>;
}

/** Error state matcher that matches when a control is invalid and dirty. */
declare class ShowOnDirtyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShowOnDirtyErrorStateMatcher, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ShowOnDirtyErrorStateMatcher>;
}
/** Provider that defines how form controls behave with regards to displaying error messages. */
declare class ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorStateMatcher, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ErrorStateMatcher>;
}

/** @docs-private */
interface HasElementRef {
    _elementRef: ElementRef;
}

/** @docs-private */
interface CanColor {
    /** Theme color palette for the component. */
    color: ThemePalette;
    /** Default color to fall back to if no value is set. */
    defaultColor: ThemePalette | undefined;
}
/** @docs-private */
type CanColorCtor = Constructor<CanColor>;
/** Possible color palette values. */
type ThemePalette = 'primary' | 'accent' | 'warn' | undefined;
/** Mixin to augment a directive with a `color` property. */
declare function mixinColor<T extends Constructor<HasElementRef>>(base: T, defaultColor?: ThemePalette): CanColorCtor & T;

/** @docs-private */
interface CanUpdateErrorState {
    updateErrorState(): void;
    readonly stateChanges: Subject<void>;
    errorState: boolean;
    errorStateMatcher: ErrorStateMatcher;
}
/** @docs-private */
type CanUpdateErrorStateCtor = Constructor<CanUpdateErrorState>;
/** @docs-private */
interface HasErrorState {
    _parentFormGroup: FormGroupDirective;
    _parentForm: NgForm;
    _defaultErrorStateMatcher: ErrorStateMatcher;
    ngControl: NgControl;
}
/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 */
declare function mixinErrorState<T extends Constructor<HasErrorState>>(base: T): CanUpdateErrorStateCtor & T;

declare class NovoOverlayTemplateComponent implements OnDestroy {
    protected overlay: Overlay;
    protected viewContainerRef: ViewContainerRef;
    protected zone: NgZone;
    protected changeDetectorRef: ChangeDetectorRef;
    protected document: any;
    id: string;
    template: TemplateRef<any>;
    panel: ElementRef;
    position: 'default' | 'right' | 'above-below' | 'right-above-below' | 'center' | 'bottom' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    scrollStrategy: 'reposition' | 'block' | 'close';
    width: number;
    minWidth: number;
    height: number;
    closeOnSelect: boolean;
    hasBackdrop: boolean;
    select: EventEmitter<any>;
    opening: EventEmitter<any>;
    closing: EventEmitter<any>;
    backDropClicked: EventEmitter<any>;
    overlayRef: OverlayRef | null;
    portal: TemplatePortal<any>;
    protected closingActionsSubscription: Subscription;
    private _parent;
    private overlayContainer;
    private destroyRef;
    private overlayContext;
    constructor(overlay: Overlay, viewContainerRef: ViewContainerRef, zone: NgZone, changeDetectorRef: ChangeDetectorRef, document: any);
    ngOnDestroy(): void;
    get panelOpen(): boolean;
    set parent(value: ElementRef);
    get parent(): ElementRef;
    openPanel(): void;
    closePanel(): void;
    onClosingAction(event: any): void;
    /**
     * A stream of actions that should close the panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions(): Observable<any>;
    /** Stream of clicks outside of the panel. */
    protected get outsideClickStream(): Observable<any>;
    private isInDocument;
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    protected subscribeToClosingActions(): Subscription;
    protected createOverlay(template: TemplateRef<any>): void;
    protected destroyOverlay(): void;
    protected getOverlayConfig(): OverlayConfig;
    /**
     * Supports the following position strategies:
     * 'default', 'right', 'bottom', 'center', 'bottom-left', 'bottom-right', 'top-left', 'top-right'
     */
    protected getPosition(): FlexibleConnectedPositionStrategy;
    protected getScrollStrategy(): ScrollStrategy;
    protected checkSizes(): void;
    protected getConnectedElement(): ElementRef;
    private elementIsInContext;
    protected elementIsInNestedOverlay(el: any): boolean;
    protected getHostWidth(): number;
    isBlurRecipient(event: FocusEvent): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOverlayTemplateComponent, [null, null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoOverlayTemplateComponent, "novo-overlay-template", never, { "position": { "alias": "position"; "required": false; }; "scrollStrategy": { "alias": "scrollStrategy"; "required": false; }; "width": { "alias": "width"; "required": false; }; "minWidth": { "alias": "minWidth"; "required": false; }; "height": { "alias": "height"; "required": false; }; "closeOnSelect": { "alias": "closeOnSelect"; "required": false; }; "hasBackdrop": { "alias": "hasBackdrop"; "required": false; }; "parent": { "alias": "parent"; "required": false; }; }, { "select": "select"; "opening": "opening"; "closing": "closing"; "backDropClicked": "backDropClicked"; }, never, ["*"], false, never>;
}

declare class NovoOverlayModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoOverlayModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoOverlayModule, [typeof NovoOverlayTemplateComponent], [typeof i3.CommonModule, typeof i3$1.FormsModule, typeof i4.OverlayModule, typeof i5.ScrollingModule], [typeof NovoOverlayTemplateComponent, typeof i5.ScrollingModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoOverlayModule>;
}

/** @docs-private */
interface HasOverlay {
    overlay: NovoOverlayTemplateComponent;
    readonly panelOpen: boolean;
    openPanel(): void;
    closePanel(): void;
    togglePanel(): void;
}
declare const NOVO_OVERLAY_CONTAINER: InjectionToken<HasOverlay>;
/** @docs-private */
type HasOverlayCtor = Constructor<HasOverlay>;
/** Mixin to augment a directive with a `overlay` property. */
declare function mixinOverlay<T extends AbstractConstructor<CanDisable>>(base: T): HasOverlayCtor & T;

/** @docs-private */
interface CanRequire {
    /** Whether the component is required. */
    required: boolean;
}
/** @docs-private */
type CanRequireCtor = Constructor<CanRequire>;
/** Mixin to augment a directive with a `required` property. */
declare function mixinRequired<T extends Constructor<{}>>(base: T): CanRequireCtor & T;

/** Possible size palette values. */
type ElementSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'body' | undefined;
/** @docs-private */
interface CanSize {
    /** Theme size palette for the component. */
    size: ElementSize;
    /** Default size to fall back to if no value is set. */
    defaultSize: ElementSize | undefined;
}
/** @docs-private */
type CanSizeCtor = Constructor<CanSize>;
/** Mixin to augment a directive with a `size` property. */
declare function mixinSize<T extends Constructor<HasElementRef>>(base: T, defaultSize?: ElementSize): CanSizeCtor & T;

/** @docs-private */
interface HasTabIndex {
    /** Tabindex of the component. */
    tabIndex: number;
    /** Tabindex to which to fall back to if no value is set. */
    defaultTabIndex: number;
}
/** @docs-private */
type HasTabIndexCtor = Constructor<HasTabIndex>;
/** Mixin to augment a directive with a `tabIndex` property. */
declare function mixinTabIndex<T extends AbstractConstructor<CanDisable>>(base: T, defaultTabIndex?: number): HasTabIndexCtor & T;

export { AccentColorDirective, BackgroundColorDirective, BorderDirective, ErrorStateMatcher, FillColorDirective, FlexDirective, GapDirective, MarginDirective, NOVO_OPTGROUP, NOVO_OPTION_PARENT_COMPONENT, NOVO_OVERLAY_CONTAINER, NovoBaseTextElement, NovoCaption, NovoCommonModule, NovoLabel, NovoLink, NovoOptgroup, NovoOptgroupBase, NovoOptgroupMixinBase, NovoOption, NovoOptionBase, NovoOptionModule, NovoOptionSelectionChange, NovoOverlayModule, NovoOverlayTemplateComponent, NovoPseudoCheckbox, NovoPseudoCheckboxModule, NovoTemplate, NovoText, NovoTheme, NovoThemeOptions, NovoTitle, PaddingDirective, ShowOnDirtyErrorStateMatcher, SwitchCasesDirective, TextColorDirective, ThemeColorDirective, VisibleDirective, _countGroupLabelsBeforeOption, _getOptionScrollPosition, getSpacingToken, mixinColor, mixinDisabled, mixinErrorState, mixinOverlay, mixinRequired, mixinSize, mixinTabIndex };
export type { AbstractConstructor, CanColor, CanColorCtor, CanDisable, CanDisableCtor, CanRequire, CanRequireCtor, CanSize, CanSizeCtor, CanUpdateErrorState, CanUpdateErrorStateCtor, Constructor, ElementSize, HasElementRef, HasErrorState, HasOverlay, HasOverlayCtor, HasTabIndex, HasTabIndexCtor, NovoOptionParentComponent, NovoPseudoCheckboxShape, NovoPseudoCheckboxState, ThemeChangeEvent, ThemePalette, TypographyLength, TypographySize, TypographyWeight };
