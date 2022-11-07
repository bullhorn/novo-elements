import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { SortDirection } from './sort-direction';

const activeStyle = { opacity: 1, pointerEvents: 'all', top: 0 };
const inactiveStyle = { opacity: 0, pointerEvents: 'none' };

/** Animation that moves the sort indicator. */
export const sortAscAnim: AnimationTriggerMetadata = trigger('sortAsc', [
  // ...
  state(SortDirection.ASC, style(activeStyle)),
  state(SortDirection.DESC, style(inactiveStyle)),
  state(SortDirection.NONE, style(inactiveStyle)),
  transition('* => ascending', [animate('1s')]),
  transition('ascending => *', [animate('0.5s')]),
]);

export const sortDescAnim: AnimationTriggerMetadata = trigger('sortDesc', [
  // ...
  state(SortDirection.ASC, style(inactiveStyle)),
  state(SortDirection.DESC, style(activeStyle)),
  state(SortDirection.NONE, style(inactiveStyle)),
  transition('* => descending', [animate('1s')]),
  transition('descending => *', [animate('0.5s')]),
]);

export const sortNoneAnim: AnimationTriggerMetadata = trigger('sortNone', [
  // ...
  state(SortDirection.ASC, style(inactiveStyle)),
  state(SortDirection.DESC, style(inactiveStyle)),
  state(SortDirection.NONE, style(activeStyle)),
  transition('* => none', [animate('1s')]),
  transition('none => *', [animate('0.5s')]),
]);
