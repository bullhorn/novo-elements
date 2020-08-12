import { NgModule } from '@angular/core';
import { ObserversModule } from '@angular/cdk/observers';
import { NovoIconComponent } from './Icon';

@NgModule({
  imports: [ObserversModule],
  exports: [NovoIconComponent],
  declarations: [NovoIconComponent],
})
export class NovoIconModule {}
