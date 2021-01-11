// NG2
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'default', pure: true })
@Injectable()
export class DefaultPipe implements PipeTransform {
  transform(value: any, defaultValue: any): any {
    return value || defaultValue;
  }
}
