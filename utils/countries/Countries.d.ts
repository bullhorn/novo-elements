export declare const COUNTRIES: {
    code: string;
    id: number;
    name: string;
    states: {
        code: string;
        name: string;
    }[];
}[];
export declare function getCountries(): string[];
export declare function findByCountryId(id: any): {
    code: string;
    id: number;
    name: string;
    states: {
        code: string;
        name: string;
    }[];
};
export declare function findByCountryName(name: any): {
    code: string;
    id: number;
    name: string;
    states: {
        code: string;
        name: string;
    }[];
};
export declare function findByCountryCode(code: any): {
    code: string;
    id: number;
    name: string;
    states: {
        code: string;
        name: string;
    }[];
};
export declare function getStateObjects(name: any): {
    code: string;
    name: string;
}[];
export declare function getStates(name: any): string[];
