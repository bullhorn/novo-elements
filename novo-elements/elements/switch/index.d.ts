import * as i0 from '@angular/core';
import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as i3 from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import * as i2 from '@angular/common';
import * as i4 from 'novo-elements/elements/icon';

declare class NovoSwitchElement implements ControlValueAccessor {
    private ref;
    theme: string;
    icons: [string, string];
    disabled: boolean;
    onChange: EventEmitter<any>;
    private _value;
    get value(): boolean;
    set value(value: boolean);
    onModelChange: Function;
    onModelTouched: Function;
    constructor(ref: ChangeDetectorRef);
    onKeydown(event: KeyboardEvent): void;
    toggle(event: any): void;
    writeValue(model: boolean): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSwitchElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoSwitchElement, "novo-switch", never, { "theme": { "alias": "theme"; "required": false; }; "icons": { "alias": "icons"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "onChange": "onChange"; }, never, ["*"], false, never>;
}

declare class NovoSwitchModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoSwitchModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NovoSwitchModule, [typeof NovoSwitchElement], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i4.NovoIconModule], [typeof NovoSwitchElement]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NovoSwitchModule>;
}

export { NovoSwitchElement, NovoSwitchModule };
