export interface Global {}

export abstract class GlobalRef {
  abstract get nativeGlobal(): Global;
}

export class BrowserGlobalRef extends GlobalRef {
  get nativeGlobal(): Global {
    return window as Global;
  }
}
export class NodeGlobalRef extends GlobalRef {
  get nativeGlobal(): Global {
    throw new Error('global doesn\'t compile for some reason');
    // return global as Global;
  }
}
