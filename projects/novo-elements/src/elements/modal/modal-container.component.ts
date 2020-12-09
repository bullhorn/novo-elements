import { AnimationEvent } from '@angular/animations';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { NovoModalRef } from './modal-ref';
import { zoomInOut } from './modal.animation';

@Component({
  selector: 'novo-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  animations: [zoomInOut],
})
export class NovoModalContainerComponent {
  @Output() animationStateChanged = new EventEmitter<AnimationEvent>();

  animationState: 'void' | 'enter' | 'leave' = 'enter';

  component: Portal<any>;

  constructor(private injector: Injector, private modalRef: NovoModalRef) {
    this.component = new ComponentPortal(modalRef.component, null, injector);
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation() {
    this.animationState = 'leave';
  }
}
