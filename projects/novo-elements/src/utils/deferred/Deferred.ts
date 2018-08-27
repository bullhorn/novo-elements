/**
 * A Promise that uses the deferred anti-pattern
 */
export function Deferred() {
  const temp: any = {};
  const promise: any = new Promise((resolve: any, reject: any) => {
    temp.resolve = resolve;
    temp.reject = reject;
  });
  promise.resolve = temp.resolve;
  promise.reject = temp.reject;
  return promise;
}
