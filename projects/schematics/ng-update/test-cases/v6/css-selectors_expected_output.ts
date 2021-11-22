import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const a = By.css('.button-contents');

@Component({
  template: `
    <ng-content select=".button-contents"></ng-content>

    <style>
      .button-contents {
        border: red 1px solid;
      }
    </style>
  `,
})
class F {}
