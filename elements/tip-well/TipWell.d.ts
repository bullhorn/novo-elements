import { OnInit, EventEmitter } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
export declare class NovoTipWellElement implements OnInit {
    private labels;
    name: string | number;
    tip: string;
    buttonText: string;
    button: boolean;
    icon: string;
    confirmed: EventEmitter<{}>;
    isActive: boolean;
    isLocalStorageEnabled: any;
    localStorageKey: string;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    /**
     * @name hideTip
     */
    hideTip(): void;
}
