import { Component } from '@angular/core';
import { ModifyPickerConfigArgs } from 'novo-elements';
import { NovoFormGroup } from 'novo-elements';
import { ToastPositions } from 'novo-elements';

@Component({
  template: ` <div></div> `,
})
class A {
  position: ToastPositions = 'fixedTop';
  args: ModifyPickerConfigArgs;
  group: NovoFormGroup;
}
