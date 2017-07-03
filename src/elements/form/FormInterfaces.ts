export interface NovoFormGroup {
    layout?: any;
    controls?: any;
    value?: any;
    valid?: boolean;
    getRawValue?: any;
}

export interface NovoFieldset {
    title?: string;
    controls: Array<any>;
}
