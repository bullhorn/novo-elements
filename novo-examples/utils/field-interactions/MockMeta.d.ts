export declare const MockMeta: {
    entity: string;
    entityMetaUrl: string;
    label: string;
    fields: ({
        name: string;
        type: string;
        label: string;
        sortOrder: number;
        description?: undefined;
        options?: undefined;
    } | {
        name: string;
        type: string;
        label: string;
        description: string;
        sortOrder: number;
        options?: undefined;
    } | {
        name: string;
        type: string;
        label: string;
        options: string[];
        sortOrder: number;
        description?: undefined;
    })[];
};
export declare const MockMetaHeaders: {
    sectionHeaders: {
        label: string;
        name: string;
        sortOrder: number;
        enabled: boolean;
    }[];
};
