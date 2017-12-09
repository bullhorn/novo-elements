import { Component } from '@angular/core';

@Component({
  selector: 'demo-buttons-loading',
  templateUrl: './loading.html',
})
export class DemoButtonsLoadingComponent {
  public loading: boolean = false;
  public loadingButtonText: string = 'Delete';

  public fakeRequest(): void {
    this.loading = true;
    this.loadingButtonText = this.loading ? 'Removing... ' : 'Delete';
    setTimeout(() => {
      this.loading = false;
      this.loadingButtonText = this.loading ? 'Removing... ' : 'Delete';
    }, 3000);
  }
}
