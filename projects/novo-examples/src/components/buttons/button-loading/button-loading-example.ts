import { Component } from '@angular/core';

/**
 * @title Loading buttons
 */
@Component({
    selector: 'button-loading-example',
    templateUrl: 'button-loading-example.html',
    styleUrls: ['button-loading-example.css'],
    standalone: false
})
export class ButtonLoadingExample {
  loading: boolean = false;
  loadingButtonText: string = 'Delete';
  fakeRequest() {
    console.log('making fake request');
    this.loading = true;
    this.loadingButtonText = this.loading ? 'Removing... ' : 'Delete';
    setTimeout(() => {
      this.loading = false;
      this.loadingButtonText = this.loading ? 'Removing... ' : 'Delete';
    }, 5000);
  }
}
