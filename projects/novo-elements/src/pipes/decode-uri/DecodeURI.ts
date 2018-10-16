// NG2
import { Injectable, Pipe, PipeTransform } from '@angular/core';
// App
import { Helpers } from '../../utils/Helpers';

@Pipe({ name: 'decodeURI' })
@Injectable()
export class DecodeURIPipe implements PipeTransform {
  transform(encodedString: string): string {
    let decodedString: string = '';
    if (!Helpers.isBlank(encodedString) && typeof encodedString === 'string') {
      decodedString = decodeURIComponent(encodedString);
    }
    return decodedString;
  }
}
