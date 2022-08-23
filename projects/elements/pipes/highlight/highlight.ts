// NG2
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlight', pure: true })
@Injectable()
export class HighlightPipe implements PipeTransform {
  transform(value: any, term: any): any {
    return term ? value.replace(new RegExp(this.escapeRegexp(term.trim()), 'gi'), '<strong>$&</strong>') : value;
  }

  escapeRegexp(queryToEscape) {
    // Ex: if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
}
