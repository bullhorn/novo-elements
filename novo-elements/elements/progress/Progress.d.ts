import { AfterContentInit, QueryList } from '@angular/core';
import { NovoProgressBarElement } from './ProgressBar';
import { ProgressAppearance } from './ProgressConstants';
import * as i0 from "@angular/core";
export declare class NovoProgressElement implements AfterContentInit {
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
