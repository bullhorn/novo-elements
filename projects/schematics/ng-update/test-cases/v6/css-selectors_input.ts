import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const a = By.css('.flex-wrapper');

@Component({
  template: `
    <ng-content select=".flex-wrapper"></ng-content>

    <style>
      .flex-wrapper {
        border: red 1px solid;
      }
    </style>
  `,
})
class F {}
