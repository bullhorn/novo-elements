import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { Helpers } from '../../utils';

@Pipe({ name: 'decodeURI' })
@Injectable()
export class DecodeURIPipe implements PipeTransform {
  public transform(encodedString: string): string {
    let decodedString: string = '';
    if (!Helpers.isBlank(encodedString) && typeof encodedString === 'string') {
      decodedString = decodeURIComponent(encodedString);
    }
    return decodedString;
  }
}
