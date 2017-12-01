import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NovoLabelService } from '../../services/novo-label-service';
export declare class CardActionsElement {
}
export declare class CardElement implements OnChanges, OnInit {
    padding: boolean;
    config: any;
    title: string;
    message: string;
    messageIcon: string;
    icon: string;
    refresh: boolean;
    close: boolean;
    move: boolean;
    loading: boolean;
    onClose: EventEmitter<any>;
    onRefresh: EventEmitter<any>;
    cardAutomationId: string;
    labels: NovoLabelService;
    iconClass: string | null;
    messageIconClass: string;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    toggleClose(): void;
    toggleRefresh(): void;
}
