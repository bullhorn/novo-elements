import { trigger, state, style, transition, animate } from '@angular/animations';

export const zoomInOut = trigger('zoomInOut', [
  transition('void => *', [style({ transform: 'scale3d(.3, .3, .3)' }), animate(100)]),
  transition('* => void', [animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))]),
]);
