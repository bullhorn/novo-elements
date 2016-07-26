// Polyfills
import 'core-js/shim';
import 'zone.js/dist/zone';

if (ENV === 'production') {
    // Production
} else {
    // Development
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
