// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs/Rx';

if (ENV === 'production') {
    // Production
} else {
    // Development
    require('angular2-hmr');
}
