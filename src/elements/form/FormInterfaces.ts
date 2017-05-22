export interface NovoFormGroup {
    layout?: any;
    controls?: any;
    value?: any;
    valid?: boolean;
}

export interface NovoFieldset {
    sectionHeader?: boolean;
    sectionHeaderId?: string;
    title?: string;
    controls: Array<any>;
}
