export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface RGBA extends RGB {
    a: number;
}
export interface HSL {
    h: number;
    s: number;
    l: number;
}
export interface HSLA extends HSL {
    a: number;
}
export interface HSV {
    h: number;
    s: number;
    v: number;
}
export interface HSVA extends HSV {
    a: number;
}
export declare class Color {
    source: string;
    isValid: boolean;
    constructor(value: HSLA | HSVA | RGBA | string);
    get hex(): string;
    get rgb(): RGB;
    get hsl(): HSL;
    get hsv(): HSV;
    static isValidHex(h: string): boolean;
    static isRGB(obj: any): boolean;
    static isRGBA(obj: any): boolean;
    static isHSL(obj: any): boolean;
    static isHSLA(obj: any): boolean;
    static isHSV(obj: any): boolean;
    static isHSVA(obj: any): boolean;
}
