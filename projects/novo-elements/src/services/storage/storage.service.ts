import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  setItem(key: any, value: any): any {
    localStorage.setItem(key, value);
  }

  getItem(key: any): any {
    return localStorage.getItem(key);
  }

  removeItem(key: any): any {
    localStorage.removeItem(key);
  }
}
