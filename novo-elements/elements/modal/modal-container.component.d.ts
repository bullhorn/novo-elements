import { AnimationEvent } from '@angular/animations';
import { Portal } from '@angular/cdk/portal';
import { EventEmitter, Injector } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import * as i0 from "@angular/core";
export declare class NovoModalContainerComponent {
    private injector;
    private modalRef;
    animationStateChanged: EventEmitter<AnimationEvent>;
    animationState: 'void' | 'enter' | 'leave';
    component: Portal<any>;
    initTimestamp: number;
    id: string;
    constructor(injector: Injector, modalRef: NovoModalRef);
    onAnimationStart(event: AnimationEvent): void;
    onAnimationDone(event: AnimationEvent): void;
    startExitAnimation(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NovoModalContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NovoModalContainerComponent, "novo-modal-container", never, {}, { "animationStateChanged": "animationStateChanged"; }, never, never, false, never>;
}
