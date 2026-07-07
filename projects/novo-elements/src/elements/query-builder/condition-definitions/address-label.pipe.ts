import { Pipe, PipeTransform } from '@angular/core';
import { AddressData } from '../query-builder.types';

/**
 * Resolves a display label from an address value. Google client-SDK results use formatted_address;
 * address-search-service results use formattedAddress.
 */
@Pipe({
  name: 'addressLabel',
  standalone: false,
})
export class AddressLabelPipe implements PipeTransform {
  transform(item: AddressData): string {
    return item?.formatted_address ?? item?.formattedAddress ?? '';
  }
}
