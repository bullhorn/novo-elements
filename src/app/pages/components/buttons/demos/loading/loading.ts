import { Component } from '@angular/core';

@Component({
  selector: 'demo-buttons-loading',
  templateUrl: './loading.html',
})
export class DemoButtonsLoadingComponent {
  public loading: boolean = false;
  public loadingButtonText: string = 'Click me to toggle loading! :)';

  public fakeRequest(): void {
    this.loading = true;
    this.loadingButtonText = this.loading
      ? 'Loading... '
      : 'Click me to toggle loading! :)';
    setTimeout(() => {
      this.loading = false;
      this.loadingButtonText = this.loading
        ? 'Loading... '
        : 'Click me to toggle loading! :)';
    }, 3000);
  }
}
