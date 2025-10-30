import { BooleanInput } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormUtils } from './utils/FormUtils';
import { BaseControl } from './controls/BaseControl';
import { NovoFormGroup } from './NovoFormGroup';
import * as i0 from "@angular/core";
export interface NovoControlGroupAddConfig {
    label: string;
}
export declare enum EditState {
    EDITING = "editing",
    NOT_EDITING = "notediting"
}
export interface NovoControlGroupRowConfig {
    edit: boolean;
    remove: boolean;
    state: EditState;
}
export declare class NovoControlGroup implements AfterContentInit, OnChanges, OnDestroy {
    private formUtils;
    private fb;
    private ref;
    set appearance(value: 'none' | 'card');
    get appearance(): "none" | "card";
    private _appearance;
    set vertical(v: boolean);
    get vertical(): boolean;
    private _vertical;
    set stacked(v: boolean);
    get stacked(): boolean;
    private _stacked;
    add: NovoControlGroupAddConfig;
    set remove(v: boolean);
    get remove(): boolean;
    private _remove;
    set edit(v: boolean);
    get edit(): boolean;
    private _edit;
    set collapsible(v: boolean);
    get collapsible(): boolean;
    private _collapsible;
    form: NovoFormGroup;
    controls: BaseControl[];
    key: string;
    label: string;
    description: string;
    emptyMessage: string;
    set icon(v: string);
    get icon(): string;
    private _icon;
    editIcon: string;
    removeIcon: string;
    initialValue: {}[];
    canEdit: Function;
    canRemove: Function;
    shouldRemove: (number: any) => Promise<boolean>;
    rowTemplate: TemplateRef<any>;
    columnLabelTemplate: TemplateRef<any>;
    onRemove: EventEmitter<{
        value: any;
        index: any;
    }>;
    onEdit: EventEmitter<{
        value: any;
        index: any;
    }>;
    onAdd: EventEmitter<any>;
    change: EventEmitter<any>;
    controlLabels: {
        value: string;
        width: number;
        required: boolean;
        hidden?: boolean;
        key: string;
    }[];
    toggled: boolean;
    disabledArray: NovoControlGroupRowConfig[];
    editState: EditState;
    currentIndex: number;
    constructor(formUtils: FormUtils, fb: FormBuilder, ref: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onChange(): void;
    onClickAdd(): void;
    onClickCancel(): void;
    onClickSave(): void;
    resetAddRemove(): void;
    addNewControl(value?: {}): void;
    /**
     * Will remove the control, and optionally, if the event is to be publicized (emitEvent = true) and there is a
     * shouldRemove callback, then call the shouldRemove() callback to determine if the doRemoveControl should be called.
     */
    removeControl(index: number, emitEvent?: boolean): void;
    private doRemoveControl;
    editControl(index: number): void;
    toggle(event: MouseEvent): void;
    private buildNestedFormGroup;
    private clearControls;
    private checkCanEdit;
    private checkCanRemove;
    private getNewControls;
    private assignIndexes;
    private onFieldInteractionEvent;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_stacked: BooleanInput;
    static ngAcceptInputType_vertical: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoControlGroup, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoControlGroup, "novo-control-group", never, { "appearance": { "alias": "appearance"; "required": false; }; "vertical": { "alias": "vertical"; "required": false; }; "stacked": { "alias": "stacked"; "required": false; }; "add": { "alias": "add"; "required": false; }; "remove": { "alias": "remove"; "required": false; }; "edit": { "alias": "edit"; "required": false; }; "collapsible": { "alias": "collapsible"; "required": false; }; "form": { "alias": "form"; "required": false; }; "controls": { "alias": "controls"; "required": false; }; "key": { "alias": "key"; "required": false; }; "label": { "alias": "label"; "required": false; }; "description": { "alias": "description"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "editIcon": { "alias": "editIcon"; "required": false; }; "removeIcon": { "alias": "removeIcon"; "required": false; }; "initialValue": { "alias": "initialValue"; "required": false; }; "canEdit": { "alias": "canEdit"; "required": false; }; "canRemove": { "alias": "canRemove"; "required": false; }; "shouldRemove": { "alias": "shouldRemove"; "required": false; }; "rowTemplate": { "alias": "rowTemplate"; "required": false; }; "columnLabelTemplate": { "alias": "columnLabelTemplate"; "required": false; }; }, { "onRemove": "onRemove"; "onEdit": "onEdit"; "onAdd": "onAdd"; "change": "change"; }, never, never, false, never>;
}
