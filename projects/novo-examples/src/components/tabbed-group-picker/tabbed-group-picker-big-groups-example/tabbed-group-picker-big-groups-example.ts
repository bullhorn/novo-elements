import { Component } from '@angular/core';
import { ChildTab, ParentTab, TabbedGroupPickerTab } from 'novo-elements';

/**
 * @title Tabbed Group Picker - Big Groups Example
 */

@Component({
  selector: 'tabbed-group-picker-big-groups-example',
  templateUrl: 'tabbed-group-picker-big-groups-example.html',
  styleUrls: ['../tabbed-group-picker-example.scss'],
})
export class TabbedGroupPickerBigGroupsExample {
  isPrime(number): boolean {
    const squareRoot = Math.ceil(Math.sqrt(number));
    return !Array(squareRoot)
      .fill(0)
      .map((value, index) => index + 2)
      .some((divisor) => number % divisor === 0);
  }
  example_tab = [
    {
      typeName: 'integers',
      typeLabel: 'Integers',
      valueField: 'value',
      labelField: 'label',
      data: Array(2000)
        .fill(0)
        .map((value, index) => index + 1)
        .map((value) => ({ value, label: String(value) })),
    },
    {
      typeName: 'divisibles',
      typeLabel: 'Divisible By',
      valueField: 'v',
      labelField: 'l',
      childTypeName: 'integers',
      data: Array(100)
        .fill(0)
        .map((v, i) => i + 1)
        .map((v) => ({
          v,
          l: `Divisible By ${v}`,
          children: Array(2000)
            .fill(0)
            .map((value, index) => index + 1)
            .filter((number) => number % v === 0)
            .map((child) => ({ value: child, label: String(child) })),
        })),
    },
    {
      typeName: 'prime factorization',
      typeLabel: 'Prime Factors',
      valueField: 'v',
      labelField: 'l',
      childTypeName: 'integers',
      data: Array(100)
        .fill(0)
        .map((v, i) => i + 1990)
        .map((parent) => ({
          v: parent,
          l: `Prime Factors of ${parent}`,
          children: Array(2000)
            .fill(0)
            .map((value, index) => index + 1)
            .filter((child) => parent % child === 0 && this.isPrime(child))
            .map((child) => ({ value: child, label: String(child) })),
        })),
    },
  ];

  public buttonLabel: string = 'Nothing Selected';
  public example_buttonConfig = {
    theme: 'select',
    side: 'right',
    icon: 'collapse',
    label: this.buttonLabel,
    selector: 'buttonConfig',
  };

  selectedPrimeFactorizations: string[] = [];
  selectedDivisibles: string[] = [];

  selectedIntegers: string[] = [];

  onSelectionChange(selectedData: TabbedGroupPickerTab[]) {
    this.selectedIntegers = (selectedData.find(({ typeName }) => typeName === 'integers') as ChildTab).data.map(({ value }) => value);
    this.selectedDivisibles = (selectedData.find(({ typeName }) => typeName === 'divisibles') as ParentTab).data.map(({ v }) => v);
    this.selectedPrimeFactorizations = (selectedData.find(({ typeName }) => typeName === 'prime factorization') as ParentTab).data.map(
      ({ v }) => v,
    );
    this.example_buttonConfig.label = this.buildButtonLabel();
  }

  buildButtonLabel(): string {
    return this.selectedIntegers.length ? `Integers (${this.selectedIntegers.length})` : 'Nothing Selected';
  }
}
