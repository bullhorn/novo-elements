import { Component } from '@angular/core';
import { NovoToastService } from 'novo-elements';

/**
 * @title Card With Image
 */
@Component({
  selector: 'card-with-image-example',
  templateUrl: 'card-with-image-example.html',
  styleUrls: ['card-with-image-example.css'],
})
export class CardWithImageExample {
  // Config for demos
  refresh: boolean = true;
  close: boolean = true;
  move: boolean = true;
  padding: boolean = true;
  loading: boolean = true;

  start: number = 2000;
  end: number = 2005;
  created: number = 1995;

  bestLabel: string = 'BEST TIME TO CONTACT';
  bestTime: string = '1-PM';
  bestDay: string = 'Friday';
  message: string;
  messageIcon: string;

  donutValue: number = 0.5;
  donutColor: string = '#662255';
  donutLabel: string = 'Probability of Win %';

  constructor(private toaster: NovoToastService) {}

  onClose() {
    this.toaster.alert({
      theme: 'info',
      title: 'Cards',
      message: 'Close Clicked!',
    });
  }

  onRefresh() {
    this.toaster.alert({
      theme: 'success',
      title: 'Cards',
      message: 'Refresh Clicked!',
    });
  }

  toggleLoading() {
    this.loading = !this.loading;
  }

  toggleMessage() {
    if (!this.message) {
      this.message = 'NO DATA!';
      this.messageIcon = 'email';
    } else {
      this.message = undefined;
    }
  }

  singleAction() {
    window.alert('HELLO!');
  }
}
