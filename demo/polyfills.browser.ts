// Polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'ts-helpers';

if (ENV === 'production') {
    // Production
} else {
    // Development
    require('zone.js/dist/long-stack-trace-zone');
}
