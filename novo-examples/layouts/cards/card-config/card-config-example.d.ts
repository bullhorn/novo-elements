import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Full Configuration Cards
 */
export declare class CardConfigExample {
    private toaster;
    refresh: boolean;
    close: boolean;
    move: boolean;
    padding: boolean;
    loading: boolean;
    fullConfig: any;
    start: number;
    end: number;
    created: number;
    bestLabel: string;
    bestTime: string;
    bestDay: string;
    message: string;
    messageIcon: string;
    donutValue: number;
    donutColor: string;
    donutLabel: string;
    constructor(toaster: NovoToastService);
    onClose(): void;
    onRefresh(): void;
    toggleLoading(): void;
    toggleMessage(): void;
    toggleLoadingConfig(): void;
    toggleMessageConfig(): void;
    singleAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardConfigExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardConfigExample, "card-config-example", never, {}, {}, never, never, false, never>;
}
