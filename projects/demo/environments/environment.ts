// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // To enable Google Places address autocomplete in the demo, set your own Google Maps API key here.
  // See https://developers.google.com/maps/documentation/javascript/get-api-key
  // Never commit a real key — add it locally or supply it via an environment variable at build time.
  googlePlacesKey: '',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
