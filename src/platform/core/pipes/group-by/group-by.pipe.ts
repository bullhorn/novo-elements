import { Pipe, PipeTransform } from '@angular/core';

import { Helpers } from '../../utils';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
  public transform(
    input: any,
    discriminator: any = [],
    delimiter: string = '|',
  ): any {
    if (!Array.isArray(input)) {
      return input;
    }

    return this.groupBy(input, discriminator, delimiter);
  }

  private groupBy(list: any[], discriminator: any, delimiter: string): any {
    return list.reduce((acc: any, payload: string) => {
      const key: string = this.extractKeyByDiscriminator(
        discriminator,
        payload,
        delimiter,
      );

      acc[key] = Array.isArray(acc[key])
        ? acc[key].concat([payload])
        : [payload];

      return acc;
    }, {});
  }

  private extractKeyByDiscriminator(
    discriminator: any,
    payload: string,
    delimiter: string,
  ): string {
    if (Helpers.isFunction(discriminator)) {
      return (<Function>discriminator)(payload);
    }

    if (Array.isArray(discriminator)) {
      return discriminator
        .map((k: string) => Helpers.extractDeepPropertyByMapKey(payload, k))
        .join(delimiter);
    }
    return Helpers.extractDeepPropertyByMapKey(payload, <string>discriminator);
  }
}
