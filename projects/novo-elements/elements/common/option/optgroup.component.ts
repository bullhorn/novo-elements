import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Directive, Inject, InjectionToken, Optional, ViewEncapsulation } from '@angular/core';
import { CanDisable, CanDisableCtor, mixinDisabled } from '../mixins/disabled.mixin';
import { NovoOptionParentComponent, NOVO_OPTION_PARENT_COMPONENT } from './option-parent';

// Notes on the accessibility pattern used for `novo-optgroup`.
// The option group has two different "modes": regular and novoInert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `novo-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `novoInert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<novo-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<novo-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on

// Boilerplate for applying mixins to NovoOptgroup.
@Directive()
export class NovoOptgroupBase implements CanDisable {
  disabled: boolean;

  /** Label for the option group. */
  label: string;

  /** Unique id for the underlying label. */
  _labelId: string = `novo-optgroup-label-${_uniqueOptgroupIdCounter++}`;

  /** Whether the group is in novoInert a11y mode. */
  _novoInert: boolean;
}
export const NovoOptgroupMixinBase: CanDisableCtor & typeof NovoOptgroupBase = mixinDisabled(NovoOptgroupBase);

// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;

/**
 * Injection token that can be used to reference instances of `NovoOptgroup`. It serves as
 * alternative token to the actual `NovoOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export const NOVO_OPTGROUP = new InjectionToken<NovoOptgroup>('NovoOptgroup');

/**
 * Component that is used to group instances of `novo-option`.
 */
@Component({
  selector: 'novo-optgroup',
  exportAs: 'novoOptgroup',
  templateUrl: 'optgroup.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['disabled', 'label'],
  styleUrls: ['optgroup.component.scss'],
  host: {
    class: 'novo-optgroup',
    '[attr.role]': '_novoInert ? null : "group"',
    '[attr.aria-disabled]': '_novoInert ? null : disabled.toString()',
    '[attr.aria-labelledby]': '_novoInert ? null : _labelId',
    '[class.novo-optgroup-disabled]': 'disabled',
  },
  providers: [{ provide: NOVO_OPTGROUP, useExisting: NovoOptgroup }],
})
export class NovoOptgroup extends NovoOptgroupMixinBase {
  constructor(@Inject(NOVO_OPTION_PARENT_COMPONENT) @Optional() parent?: NovoOptionParentComponent) {
    super();
    this._novoInert = parent?.inertGroups ?? false;
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
