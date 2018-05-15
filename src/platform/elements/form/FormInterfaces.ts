export interface NovoFormGroup {
    layout?: any;
    controls: any[];
    novoControls: any[];
    fieldsets: any[];
    value: any;
    valid?: boolean;
    getRawValue?: any;
}

export interface NovoFieldset {
    title?: string;
    icon?: string;
    controls: any[];
}

export interface IFieldInteractionEvent {
    controlKey: string;
    prop: string;
    value: any;
}
