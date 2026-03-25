import * as i0 from '@angular/core';
import { InjectionToken, OnInit, EventEmitter, ChangeDetectorRef, AfterContentInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i3 from '@angular/common';

declare enum ProgressAppearance {
    LINEAR = "linear",
    RADIAL = "radial"
}
/**
 * Used to provide a progress container to a progress bar while avoiding circular references.
 * @docs-private
 */
declare const NOVO_PROGRESS_CONTAINER: InjectionToken<unknown>;

declare class NovoProgressBarElement implements ControlValueAccessor, OnInit {
    private ref;
    progress: any;
    private _uniqueId;
    appearance: ProgressAppearance;
    id: string;
    name: string;
    tabindex: number;
    label: string;
    theme: string;
    color: string;
    indeterminate: boolean;
    radius: number;
    circumference: number;
    dashoffset: number;
    progressAppearance: typeof ProgressAppearance;
    striped: boolean;
    animated: boolean;
    flash: boolean;
    get width(): string;
    change: EventEmitter<any>;
    blur: EventEmitter<any>;
    focus: EventEmitter<any>;
    private _percent;
    private _value;
    private _disabled;
    get value(): number;
    set value(value: number);
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(ref: ChangeDetectorRef, progress: any);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private onChangeCallback;
    private onTouchedCallback;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoProgressBarElement, [null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoProgressBarElement, "novo-progress-bar", never, { "id": { "alias": "id"; "required": false; }; "name": { "alias": "name"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "label": { "alias": "label"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "color": { "alias": "color"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "striped": { "alias": "striped"; "required": false; }; "animated": { "alias": "animated"; "required": false; }; "flash": { "alias": "flash"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "change": "change"; "blur": "blur"; "focus": "focus"; }, never, never, false, never>;
}

declare class NovoProgressElement implements AfterContentInit {
    color: string;
    theme: string;
    total: number;
    radius: number;
    fitContainer: boolean;
    striped: boolean;
    private _appearance;
    private _disabled;
    get appearance(): ProgressAppearance;
    set appearance(value: ProgressAppearance);
    get disabled(): boolean;
    set disabled(value: boolean);
    _bars: QueryList<NovoProgressBarElement>;
    ngAfterContentInit(): void;
    private _updateBarAppearance;
    private _updateBarRadius;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoProgressElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoProgressElement, "novo-progress", never, { "color": { "alias": "color"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "total": { "alias": "total"; "required": false; }; "radius": { "alias": "radius"; "required": false; }; "striped": { "alias": "striped"; "required": false; }; "appearance": { "alias": "appearance"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, ["_bars"], ["*"], false, never>;
}

declare class NovoProgressModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoProgressModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoProgressModule, [typeof NovoProgressBarElement, typeof NovoProgressElement], [typeof i3.CommonModule], [typeof NovoProgressBarElement, typeof NovoProgressElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoProgressModule>;
}

export { NOVO_PROGRESS_CONTAINER, NovoProgressBarElement, NovoProgressElement, NovoProgressModule, ProgressAppearance };
