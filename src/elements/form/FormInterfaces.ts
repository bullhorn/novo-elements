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
    controls: any[];
}
