import { NovoToastService } from 'novo-elements';
import * as i0 from "@angular/core";
/**
 * @title Card With Image
 */
export declare class CardWithImageExample {
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
    static ɵfac: i0.ɵɵFactoryDeclaration<CardWithImageExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardWithImageExample, "card-with-image-example", never, {}, {}, never, never, false, never>;
}
