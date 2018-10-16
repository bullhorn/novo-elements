// NG2
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Security {
  credentials: string[] = [];
  change: EventEmitter<any> = new EventEmitter();

  grant(data: any[] | Object): void {
    let parsed: any[] = [];
    if (data instanceof Array) {
      for (let permission of data) {
        parsed.push(permission.replace(/\s/gi, ''));
      }
    } else if (typeof data === 'object') {
      for (let key in data) {
        if (data[key] instanceof Array) {
          for (let permission of data[key]) {
            parsed.push(`${key}.${permission}`);
          }
        }
      }
    }
    this.credentials = [].concat(this.credentials, parsed);
    this.change.emit(this.credentials);
  }

  has(value: any): boolean {
    return this.credentials.indexOf(value) > -1;
  }

  revoke(value: any): void {
    let i: number = this.credentials.indexOf(value);
    this.credentials.splice(i, 1);
    this.change.emit(this.credentials);
  }

  clear(): void {
    this.credentials = [];
    this.change.emit(this.credentials);
  }

  subscribe(fn: any): void {
    this.change.subscribe(fn);
  }

  checkRoutes(
    routes: { entities?: any[]; permissions?: any[] | Function; path?: string; label?: string; canDisable?: Boolean }[],
    options: { entityType?: string },
  ): any {
    let filtered: any[] = [];
    for (let route of routes) {
      if (route.entities && ~route.entities.indexOf(options.entityType)) {
        if (route.permissions instanceof Function) {
          if (route.permissions(options, this)) {
            filtered.push(route);
          }
        } else if (route.permissions && route.permissions.length) {
          if (route.permissions.every((perm) => this.has(perm))) {
            filtered.push(route);
          }
        } else {
          filtered.push(route);
        }
      }
    }

    return filtered;
  }
}
