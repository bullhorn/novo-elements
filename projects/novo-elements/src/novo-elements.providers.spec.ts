import { NOVO_ADDRESS_CONFIG } from 'novo-elements/elements/places';
import { NovoElementProviders } from './novo-elements.providers';

describe('NovoElementProviders.forRoot', () => {
  const hasAddressProvider = (providers: any[]): boolean =>
    providers.some((p) => p && p.provide === NOVO_ADDRESS_CONFIG);

  it('registers NOVO_ADDRESS_CONFIG when an address config is supplied', () => {
    const address = { useGoogleGeoApi: false, geoPredictionServerUrl: 'https://x/predictions' };
    const moduleWithProviders = NovoElementProviders.forRoot({ address });

    expect(hasAddressProvider(moduleWithProviders.providers as any[])).toBe(true);
    const provider = (moduleWithProviders.providers as any[]).find((p) => p.provide === NOVO_ADDRESS_CONFIG);
    expect(provider.useValue).toBe(address);
  });

  it('passes googleApiKey through to NOVO_ADDRESS_CONFIG', () => {
    const address = { googleApiKey: 'managed-key' };
    const moduleWithProviders = NovoElementProviders.forRoot({ address });

    const provider = (moduleWithProviders.providers as any[]).find((p) => p.provide === NOVO_ADDRESS_CONFIG);
    expect(provider.useValue.googleApiKey).toBe('managed-key');
  });

  it('does NOT register NOVO_ADDRESS_CONFIG for a bare forRoot() (avoids shadowing root config)', () => {
    expect(hasAddressProvider(NovoElementProviders.forRoot().providers as any[])).toBe(false);
    expect(hasAddressProvider(NovoElementProviders.forRoot({}).providers as any[])).toBe(false);
    expect(hasAddressProvider(NovoElementProviders.forRoot({ menu: {} }).providers as any[])).toBe(false);
  });
});
