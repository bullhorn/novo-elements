import { animate, animateChild, AnimationTriggerMetadata, group, query, state, style, transition, trigger } from '@angular/animations';

/** Time and timing curve for expansion panel animations. */
export const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

/** Animations used by the Material expansion panel. */
export const novoExpansionAnimations: {
  readonly indicatorRotate: AnimationTriggerMetadata;
  readonly expansionHeaderHeight: AnimationTriggerMetadata;
  readonly bodyExpansion: AnimationTriggerMetadata;
} = {
  /** Animation that rotates the indicator arrow. */
  indicatorRotate: trigger('indicatorRotate', [
    state('collapsed', style({ transform: 'rotate(0deg)' })),
    state('expanded', style({ transform: 'rotate(90deg)' })),
    transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
  ]),

  /** Animation that expands and collapses the panel header height. */
  expansionHeaderHeight: trigger('expansionHeight', [
    state(
      'collapsed',
      style({
        height: '{{collapsedHeight}}',
      }),
      {
        params: { collapsedHeight: '48px' },
      },
    ),
    state(
      'expanded',
      style({
        height: '{{expandedHeight}}',
      }),
      {
        params: { expandedHeight: '56px' },
      },
    ),
    transition(
      'expanded <=> collapsed',
      group([query('@indicatorRotate', animateChild(), { optional: true }), animate(EXPANSION_PANEL_ANIMATION_TIMING)]),
    ),
  ]),

  /** Animation that expands and collapses the panel content. */
  bodyExpansion: trigger('bodyExpansion', [
    state('collapsed', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
  ]),
};
