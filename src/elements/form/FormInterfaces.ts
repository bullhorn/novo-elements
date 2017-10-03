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
    sectionHeader?: boolean;
    sectionHeaderId?: string;
    title?: string;
    icon?: string;
    controls: any[];
}
