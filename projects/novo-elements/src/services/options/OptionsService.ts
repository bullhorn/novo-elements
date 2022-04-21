// NG2
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// App

@Injectable()
export class OptionsService {
  constructor() {}

  getOptionsConfig(http: HttpClient, field: any, config: { token?: string; restUrl?: string; military?: boolean }): any {
    return {
      field: 'value',
      format: '$label',
      options: (query) => {
        return new Promise((resolve, reject) => {
          if (query && query.length) {
            const exp = new RegExp('^(?:[a-z]+:)?//', 'i');
            let endpoint;
            if (exp.test(field.optionsUrl)) {
              const url = new URL(field.optionsUrl);
              url.searchParams.set('filter', query || '');
              endpoint = url.toString();
            } else {
              // Construct relative url (host will not be used but is required for construction)
              const url = new URL(`http://placeholder.com/${field.optionsUrl}`);
              url.searchParams.set('filter', query || '');
              endpoint = `${url.pathname}${url.search}`;
            }
            http.get(endpoint).subscribe(resolve, reject);
          } else {
            resolve([]);
          }
        });
      },
    };
  }
}
