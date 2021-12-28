import { Component } from '@angular/core';
import { ModifyPickerConfigArgs } from 'novo-elements/elements/form/FieldInteractionApiTypes';
import { NovoFormGroup } from 'novo-elements/elements/form/FormInterfaces';
import { ToastPositions } from 'novo-elements/elements/toast/ToastService';

@Component({
  template: ` <div></div> `,
})
class A {
  position: ToastPositions = 'fixedTop';
  args: ModifyPickerConfigArgs;
  group: NovoFormGroup;
}
