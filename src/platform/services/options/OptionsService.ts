// NG2
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OptionsService {
  getOptionsConfig(http: HttpClient, field: any, config: { token?: string; restUrl?: string; military?: boolean }): any {
    return {
      field: 'value',
      format: '$label',
      options: (query) => {
        return new Promise((resolve, reject) => {
          if (query && query.length) {
            http.get(`${field.optionsUrl}?filter=${query || ''}`).subscribe(resolve, reject);
          } else {
            resolve([]);
          }
        });
      },
    };
  }
}
