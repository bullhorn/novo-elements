import { OnChanges, SimpleChanges } from '@angular/core';
export declare class NovoButtonElement implements OnChanges {
    icon: string;
    color: string;
    side: string;
    theme: string;
    loading: boolean;
    leftSide: boolean;
    rightSide: boolean;
    iconClass: string;
    flex: string;
    ngOnChanges(changes?: SimpleChanges): void;
}
