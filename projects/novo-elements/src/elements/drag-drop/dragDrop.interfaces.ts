import { NovoDragBoxParent } from './dragDropBox';

interface NovoDragItemTracker<T> {
    item: T;
    element: HTMLElement;
    eventRemovers: (() => void)[];
    parent: NovoDragBoxParent<T>;
}