// NG2
import { Component } from '@angular/core';
// Vendor
import { NovoToastService } from 'novo-elements';

/**
 * @title Full Configuration Cards
 */
@Component({
  selector: 'card-config-example',
  templateUrl: 'card-config-example.html',
  styleUrls: ['card-config-example.css'],
})
export class CardConfigExample {
  // Config for demos
  refresh: boolean = true;
  close: boolean = true;
  move: boolean = true;
  padding: boolean = true;
  loading: boolean = true;

  fullConfig: any = {
    refresh: false,
    icon: 'email',
    messageIcon: 'email',
    close: false,
    move: true,
    onClose: this.onClose.bind(this),
    onRefresh: this.onRefresh.bind(this),
    title: 'Test',
    loading: false,
    padding: true,
  };

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

  toggleLoadingConfig() {
    this.fullConfig.loading = !this.fullConfig.loading;
  }

  toggleMessageConfig() {
    if (!this.fullConfig.message) {
      this.fullConfig.message = 'NO DATA!';
    } else {
      this.fullConfig.message = undefined;
    }
  }

  singleAction() {
    window.alert('HELLO!');
  }
}
