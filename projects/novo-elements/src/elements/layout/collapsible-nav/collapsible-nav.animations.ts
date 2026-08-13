import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

// WARNING: Angular plans to remove the animations library in v23. When upgrading there, use CSS transition effects
// to apply similar curves, and change event triggers to fire off of transitionstart/transitionend events.
/**
 * Animation that grows/shrinks the panel width between its expanded and collapsed (icon-rail) sizes.
 * Width is animated rather than transform because the panel shrinks in place rather than sliding away.
 */
export const novoCollapsibleNavAnimations: {
  readonly expandCollapse: AnimationTriggerMetadata;
} = {
  expandCollapse: trigger('expandCollapse', [
    state('expanded', style({ width: '{{ expandedWidth }}' }), { params: { expandedWidth: '18rem' } }),
    state('collapsed', style({ width: '{{ collapsedWidth }}' }), { params: { collapsedWidth: '4rem' } }),
    transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
  ]),
};
