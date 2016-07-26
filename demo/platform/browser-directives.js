// These are globally available directives in any template
import { PLATFORM_DIRECTIVES } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from '@angular/forms';

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
    ...ROUTER_DIRECTIVES,
    ...FORM_DIRECTIVES,
    ...REACTIVE_FORM_DIRECTIVES
];

export const DIRECTIVES = [
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];
