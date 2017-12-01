export interface Global {
}
export declare abstract class GlobalRef {
    readonly abstract nativeGlobal: Global;
}
export declare class BrowserGlobalRef extends GlobalRef {
    readonly nativeGlobal: Global;
}
export declare class NodeGlobalRef extends GlobalRef {
    readonly nativeGlobal: Global;
}
