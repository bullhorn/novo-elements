import { OnChanges, SimpleChanges } from '@angular/core';
import { NovoDragFinishEvent } from 'novo-elements/elements/drag-drop';
import * as i0 from "@angular/core";
interface DemoButtonObject {
    name: string;
    headerText: string;
    bgClass: string;
}
/**
 * @title Drag and Drop Example
 */
export declare class DragDropExample implements OnChanges {
    objects: DemoButtonObject[];
    objects2: DemoButtonObject[];
    objects3: DemoButtonObject[];
    ngOnChanges(changes: SimpleChanges): void;
    objectMoved?: DemoButtonObject;
    dragFinished(event: NovoDragFinishEvent<DemoButtonObject>): void;
    dragFinished2(event: NovoDragFinishEvent<DemoButtonObject>): void;
    dragFinished3(event: NovoDragFinishEvent<DemoButtonObject>): void;
    addObject2(): void;
    removeObject(item: DemoButtonObject): void;
    removeObject2(item: DemoButtonObject): void;
    get objectsAsString(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DragDropExample, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DragDropExample, "drag-drop-example", never, {}, {}, never, never, false, never>;
}
export {};
