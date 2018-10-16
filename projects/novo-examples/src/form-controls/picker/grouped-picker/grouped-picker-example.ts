import { Component } from '@angular/core';
import { GroupedMultiPickerResults } from 'novo-elements';

/**
 * @title Grouped Picker Example
 */
@Component({
  selector: 'grouped-picker-example',
  templateUrl: 'grouped-picker-example.html',
  styleUrls: ['grouped-picker-example.css'],
})
export class GroupedPickerExample {
  public placeholder: string = 'Select...';
  public groupedPicker1: any;
  public groupedPicker2: any;
  public groupedPicker3: any;
  public groupedPicker4: any;
  public groupedPicker1Value: any;
  public groupedPicker2Value: any;
  public groupedPicker3Value: any;
  public groupedPicker4Value: any;

  constructor() {
    this.setupGroupedPickerDemo();
  }

  setupGroupedPickerDemo() {
    let categoryMap = new Map<string, { value: string; label: string; items: { value: string; label: string }[] }>();
    for (let i = 0; i < 10; i++) {
      let items = [];
      for (let j = 0; j < 10; j++) {
        items.push({ value: `${i}-${j}`, label: `Category ${i} - Item ${j}` });
      }
      categoryMap.set(`${i}`, { value: `${i}`, label: `Category ${i}`, items: items });
    }
    let filterCategoryMap = new Map<string, { value: string; label: string; items: { value: string; label: string; data: any }[] }>();
    for (let i = 0; i < 10; i++) {
      let items = [];
      for (let j = 0; j < 10; j++) {
        let filter = Math.random() >= 0.5;
        items.push({ value: `${i}-${j}`, label: `Category ${i} - Item ${j} - Data - ${filter}`, data: { filter: filter } });
      }
      filterCategoryMap.set(`${i}`, { value: `${i}`, label: `Category ${i}`, items: items });
    }
    this.groupedPicker1 = {
      categoryMap: categoryMap,
      resultsTemplate: GroupedMultiPickerResults,
      displayAll: true,
    };
    this.groupedPicker2 = {
      categoryMap: categoryMap,
      resultsTemplate: GroupedMultiPickerResults,
    };
    this.groupedPicker3 = {
      categories: [
        { value: 'C1', label: 'Category 1' },
        { value: 'C2', label: 'Category 2' },
        { value: 'C3', label: 'Category 3' },
        { value: 'C4', label: 'Category 4' },
        { value: 'C5', label: 'Category 5' },
      ],
      getItemsForCategoryAsync: (category, customFilter) => {
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
    this.groupedPicker4 = {
      entityIcon: 'company',
      categoryMap: filterCategoryMap,
      displayAll: true,
      placeholder: 'Filter things...',
      customFilter: {
        matchFunction: (item, value) => {
          if (value) {
            return item.data.filter === value;
          }
          return true;
        },
        defaultFilterValue: false,
        label: 'Custom Filter!',
      },
      resultsTemplate: GroupedMultiPickerResults,
    };
  }

  onChanged(event) {
    console.log('EVENT', event); // tslint:disable-line
  }
}
