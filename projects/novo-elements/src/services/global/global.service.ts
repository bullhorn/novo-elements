import { Injectable } from '@angular/core';

export interface Global {}

export abstract class GlobalRef {
  abstract get nativeGlobal(): Global;
  abstract get nativeWindow(): Window;
}

@Injectable()
export class BrowserGlobalRef extends GlobalRef {
  get nativeGlobal(): Global {
    return window as Global;
  }
  get nativeWindow(): Window {
    return window;
  }
}
export class NodeGlobalRef extends GlobalRef {
  get nativeGlobal(): Global {
    throw new Error(`global doesn't compile for some reason`);
  }
  get nativeWindow(): Window {
    throw new Error('Node does not have a window object');
  }
}
