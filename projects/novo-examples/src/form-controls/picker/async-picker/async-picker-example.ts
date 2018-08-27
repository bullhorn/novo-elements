import { Component } from '@angular/core';

/**
 * @title Async Picker Example
 */
@Component({
  selector: 'async-picker-example',
  templateUrl: 'async-picker-example.html',
  styleUrls: ['async-picker-example.css'],
})
export class AsyncPickerExample {
  public placeholder: string = 'Select...';
  public value: string;
  public async: any;

  constructor() {
    this.value = null;
    this.async = {
      enableInfiniteScroll: true,
      options: (term, page) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            let arr = [];
            for (let i = 0; i < 20; i++) {
              arr.push({ value: `Page: ${page} - Item: ${i + 1}`, label: `Page: ${page} - Item: ${i + 1}` });
            }
            resolve(arr);
          }, 1000);
        });
      },
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
