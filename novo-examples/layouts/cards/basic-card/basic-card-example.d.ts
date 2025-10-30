import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Basic Cards
 */
export declare class BasicCardExample {
    private toaster;
    refresh: boolean;
    close: boolean;
    move: boolean;
    padding: boolean;
    loading: boolean;
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
    singleAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BasicCardExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BasicCardExample, "basic-card-example", never, {}, {}, never, never, false, never>;
}
