import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PreloadSelectModulesStrategy implements PreloadingStrategy {
  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      return load();
    } else {
      return of(null); // tslint:disable-line
    }
  }
}
