import { AnimationEvent } from '@angular/animations';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { NovoAsideRef } from './aside-ref';
import { slideInOut } from './aside.animation';

@Component({
  selector: 'novo-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  animations: [slideInOut],
})
export class AsideComponent {
  @Output() animationStateChanged = new EventEmitter<AnimationEvent>();

  animationState: 'void' | 'enter' | 'leave' = 'enter';

  component: Portal<any>;

  constructor(private injector: Injector, private asideRef: NovoAsideRef) {
    this.component = new ComponentPortal(asideRef.component, null, injector);
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
