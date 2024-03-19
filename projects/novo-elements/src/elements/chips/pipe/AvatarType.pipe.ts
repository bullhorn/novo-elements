import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'avatarType' })
export class AvatarTypePipe implements PipeTransform {
  transform(item: any, type?: any): string {
    return (type || item?.value?.searchEntity || '').toLowerCase();
  }
}
