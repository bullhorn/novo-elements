import { Component } from '@angular/core';
import { GroupedMultiPickerResults } from 'novo-elements';

/**
 * @title Grouped Multi Picker Example
 */
@Component({
  selector: 'grouped-multi-picker-example',
  templateUrl: 'grouped-multi-picker-example.html',
  styleUrls: ['grouped-multi-picker-example.css'],
})
export class GroupedMultiPickerExample {
  public placeholder: string = 'Select...';
  public groupedMultiPicker1: any;
  public groupedMultiPicker2: any;
  public groupedMultiPicker3: any;
  public groupedMultiPicker1Value: any;
  public groupedMultiPicker2Value: any;
  public groupedMultiPicker3Value: any;

  constructor() {
    this.setupGroupedMultiPickerDemo();
  }

  setupGroupedMultiPickerDemo() {
    let categoryMap = new Map<string, { value: string; label: string; items: { value: string; label: string }[] }>();
    for (let i = 0; i < 10; i++) {
      let items = [];
      for (let j = 0; j < 10; j++) {
        items.push({ value: `${i}-${j}`, label: `Category ${i} - Item ${j}` });
      }
      categoryMap.set(`${i}`, { value: `${i}`, label: `Category ${i}`, items: items });
    }
    this.groupedMultiPicker1 = {
      categoryMap: categoryMap,
      resultsTemplate: GroupedMultiPickerResults,
      displayAll: true,
    };
    this.groupedMultiPicker2 = {
      categoryMap: categoryMap,
      resultsTemplate: GroupedMultiPickerResults,
    };
    this.groupedMultiPicker3 = {
      categories: [
        { value: 'C1', label: 'Category 1' },
        { value: 'C2', label: 'Category 2' },
        { value: 'C3', label: 'Category 3' },
        { value: 'C4', label: 'Category 4' },
        { value: 'C5', label: 'Category 5' },
      ],
      getItemsForCategoryAsync: (category) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { value: 'A1', label: 'Async 1' },
              { value: 'A2', label: 'Async 2' },
              { value: 'A3', label: 'Async 3' },
              { value: 'A4', label: 'Async 4' },
              { value: 'A5', label: 'Async 5' },
            ]);
          }, 1000);
        });
      },
      resultsTemplate: GroupedMultiPickerResults,
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
