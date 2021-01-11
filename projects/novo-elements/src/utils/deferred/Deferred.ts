/**
 * A Promise that uses the deferred anti-pattern
 */
export interface DeferredPromise<T = any> extends Promise<T> {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}

export function Deferred(): DeferredPromise {
  const temp: any = {};
  const promise: any = new Promise((resolve: any, reject: any) => {
    temp.resolve = resolve;
    temp.reject = reject;
  });
  promise.resolve = temp.resolve;
  promise.reject = temp.reject;
  return promise;
}
