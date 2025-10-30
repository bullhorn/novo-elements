import { OverlayRef } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { AsideComponent } from './aside.component';
export declare class NovoAsideRef<T = any, R = any> {
    component: any;
    params: T;
    private overlayRef;
    constructor(component: any, params: T, overlayRef: OverlayRef);
    private _beforeClose;
    private _afterClosed;
    isClosed: boolean;
    componentInstance: AsideComponent;
    get onClosed(): Promise<R>;
    afterClosed(): Observable<R>;
    beforeClose(): Observable<R>;
    close(result?: R): void;
}
