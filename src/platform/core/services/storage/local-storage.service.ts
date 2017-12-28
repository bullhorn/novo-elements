import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    public setItem(key: any, value: any): any {
        localStorage.setItem(key, value);
    }

    public getItem(key: any): any {
        return localStorage.getItem(key);
    }

    public removeItem(key: any): any {
        localStorage.removeItem(key);
    }
}
