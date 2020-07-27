import { Component, Output, EventEmitter, Injector } from '@angular/core';
import { slideInOut } from './aside.animation';
import { AnimationEvent } from '@angular/animations';
import { Portal, ComponentPortal } from '@angular/cdk/portal';
import { NovoAsideRef } from './aside-ref';

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
