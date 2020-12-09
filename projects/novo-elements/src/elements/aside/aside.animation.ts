import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  state('void', style({ transform: 'translateX(100%)' })),
  state('enter', style({ transform: 'none' })),
  state('leave', style({ transform: 'translateX(100%)' })),
  transition('* => *', animate('800ms cubic-bezier(0.2, 1, 0.3, 1)')),
]);
