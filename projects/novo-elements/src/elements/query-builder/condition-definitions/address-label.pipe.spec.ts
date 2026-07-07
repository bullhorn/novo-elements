import { AddressLabelPipe } from './address-label.pipe';

describe('AddressLabelPipe', () => {
  let pipe: AddressLabelPipe;

  beforeEach(() => {
    pipe = new AddressLabelPipe();
  });

  it('uses formatted_address for the Google client-SDK shape', () => {
    expect(pipe.transform({ formatted_address: 'Boston, MA, USA' } as any)).toBe('Boston, MA, USA');
  });

  it('falls back to formattedAddress for the address-search-service shape', () => {
    expect(pipe.transform({ formattedAddress: 'Boston, MA, USA' } as any)).toBe('Boston, MA, USA');
  });

  it('returns empty string when neither field is present', () => {
    expect(pipe.transform({} as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });
});
