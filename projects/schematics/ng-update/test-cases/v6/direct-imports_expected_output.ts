import { Component } from '@angular/core';
import { ModifyPickerConfigArgs, NovoFormGroup, ToastPositions } from 'novo-elements';

@Component({
  template: ` <div></div> `,
})
class A {
  position: ToastPositions = 'fixedTop';
  args: ModifyPickerConfigArgs;
  group: NovoFormGroup;
}
