import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
export declare class NovoToastElement implements OnInit, OnChanges {
    theme: string;
    icon: string;
    title: string;
    message: string;
    hasDialogue: boolean;
    link: string;
    isCloseable: boolean;
    show: boolean;
    animate: boolean;
    parent: any;
    launched: boolean;
    position: any;
    time: any;
    iconClass: string;
    alertTheme: string;
    embedded: any;
    ngOnInit(): void;
    ngOnChanges(changes?: SimpleChanges): void;
    clickHandler(event: any): void;
    close(event: any): void;
}
