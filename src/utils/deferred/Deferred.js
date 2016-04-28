/**
 * A Promise that uses the deferred anti-pattern
 */
export function Deferred() {
    const temp = {};
    const promise = new Promise((resolve, reject) => {
        temp.resolve = resolve;
        temp.reject = reject;
    });
    promise.resolve = temp.resolve;
    promise.reject = temp.reject;
    return promise;
}
