// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Google Places key for the demo. Passed to NovoElementProviders.forRoot via NOVO_ADDRESS_CONFIG
  // so the address components lazy-load the Maps SDK. Real apps supply their own Bullhorn-managed key.
  googlePlacesKey: 'AIzaSyA7AU3UZXB5frMpSa0koWN096kb6MMtmN8',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
