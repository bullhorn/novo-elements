import { ObserversModule } from '@angular/cdk/observers';
import { NgModule } from '@angular/core';
import { NovoIconComponent } from './Icon';

@NgModule({
  imports: [ObserversModule],
  exports: [NovoIconComponent],
  declarations: [NovoIconComponent],
})
export class NovoIconModule {}
