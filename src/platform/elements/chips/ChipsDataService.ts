// NG2
import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
// Vendor
import { Subject } from 'rxjs/Subject';
import { Helpers } from '../../utils/Helpers';
// App
import { ChipsConfig } from './ChipsConfig';
// TODO: use this to refactor chips!!
@Injectable()
export class ChipsDataService {
  items;
  _items: Subject<any>;

  initialize(config: ChipsConfig, model: any): void {
    //add initialize config
  }

  setItems(model: any, source: any, changed: EventEmitter<any>) {
    this.items = [];
    if (model && Array.isArray(model)) {
      let noLabels = [];
      for (let value of model) {
        let label;
        if (source && source.format && Helpers.validateInterpolationProps(source.format, value)) {
          label = Helpers.interpolate(source.format, value);
        }
        if (source && label && label !== source.format) {
          this.items.push({
            value,
            label
          });
        } else if (source.getLabels && typeof source.getLabels === 'function') {
          noLabels.push(value);
        } else if (source.options && Array.isArray(source.options)) {
          this.items.push(this.getLabelFromOptions(value, source));
        } else {
          this.items.push({
            value,
            label: value
          });
        }
      }
      if (noLabels.length > 0 && source && source.getLabels && typeof source.getLabels === 'function') {
        source.getLabels(noLabels).then((result) => {
          for (let value of result) {
            if (value.hasOwnProperty('label')) {
              this.items.push({
                value,
                label: value.label
              });
            } else if (source.options && Array.isArray(source.options)) {
              this.items.push(this.getLabelFromOptions(value, source));
            } else {
              this.items.push(value);
            }
          }
          this._items.next(this.items);
        });
      }
    }
    changed.emit({ value: model, rawValue: this.items });
    this._items.next(this.items);
  }

  getLabelFromOptions(value, source) {
    let optLabel = source.options.find(val => val.value === value);
    return {
      value,
      label: optLabel ? optLabel.label : value
    };
  }

}
