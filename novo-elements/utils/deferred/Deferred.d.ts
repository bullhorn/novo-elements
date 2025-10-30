/**
 * A Promise that uses the deferred anti-pattern
 */
export interface DeferredPromise<T = any> extends Promise<T> {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}
export declare function Deferred(): DeferredPromise;
