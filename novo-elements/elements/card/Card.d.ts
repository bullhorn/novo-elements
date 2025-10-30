import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NovoLabelService } from 'novo-elements/services';
import * as i0 from "@angular/core";
export declare class CardActionsElement {
    static ɵfac: i0.ɵɵFactoryDeclaration<CardActionsElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardActionsElement, "novo-card-actions", never, {}, {}, never, ["*"], false, never>;
}
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export declare class CardContentElement {
    condensed: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardContentElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardContentElement, "novo-card-content, [novo-card-content], [novoCardContent]", never, { "condensed": { "alias": "condensed"; "required": false; }; }, {}, never, ["*"], false, never>;
}
/**
 * Content of a card, needed as it's used as a selector in the API.
 */
export declare class CardHeaderElement {
    static ɵfac: i0.ɵɵFactoryDeclaration<CardHeaderElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardHeaderElement, "novo-card-header, [novo-card-header], [novoCardHeader]", never, {}, {}, never, ["novo-avatar, [novo-avatar], novo-icon", "novo-title, [novo-title], novo-text, novo-label, novo-caption", "*", "novo-action"], false, never>;
}
export declare class CardFooterElement {
    static ɵfac: i0.ɵɵFactoryDeclaration<CardFooterElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardFooterElement, "novo-card-footer, [novo-card-footer], [novoCardFooter]", never, {}, {}, never, ["*"], false, never>;
}
export declare class CardElement implements OnChanges, OnInit {
    padding: boolean;
    config: any;
    title: string;
    message: string;
    messageIcon: string;
    icon: string;
    iconTooltip: string;
    refresh: boolean;
    close: boolean;
    move: boolean;
    loading: boolean;
    inline: boolean;
    inset: string;
    get hbInset(): string;
    onClose: EventEmitter<void>;
    onRefresh: EventEmitter<void>;
    cardAutomationId: string;
    labels: NovoLabelService;
    iconClass: string | null;
    messageIconClass: string;
    constructor(labels: NovoLabelService);
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    toggleClose(): void;
    toggleRefresh(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardElement, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardElement, "novo-card", never, { "padding": { "alias": "padding"; "required": false; }; "config": { "alias": "config"; "required": false; }; "title": { "alias": "title"; "required": false; }; "message": { "alias": "message"; "required": false; }; "messageIcon": { "alias": "messageIcon"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "iconTooltip": { "alias": "iconTooltip"; "required": false; }; "refresh": { "alias": "refresh"; "required": false; }; "close": { "alias": "close"; "required": false; }; "move": { "alias": "move"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "inline": { "alias": "inline"; "required": false; }; "inset": { "alias": "inset"; "required": false; }; }, { "onClose": "onClose"; "onRefresh": "onRefresh"; }, never, ["novo-card-actions", "*", "footer,novo-card-footer,[novo-card-footer],[novoCardFooter]"], false, never>;
}
