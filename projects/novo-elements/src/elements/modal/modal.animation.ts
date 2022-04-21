import { animate, style, transition, trigger } from '@angular/animations';

export const zoomInOut = trigger('zoomInOut', [
  transition('void => *', [style({ transform: 'scale3d(.3, .3, .3)' }), animate(50)]),
  transition('* => void', [animate(50, style({ transform: 'scale3d(.0, .0, .0)' }))]),
]);
