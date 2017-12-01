import { EventEmitter } from '@angular/core';
export declare class NovoDragulaService {
    cancel: EventEmitter<any>;
    cloned: EventEmitter<any>;
    drag: EventEmitter<any>;
    dragend: EventEmitter<any>;
    drop: EventEmitter<any>;
    out: EventEmitter<any>;
    over: EventEmitter<any>;
    remove: EventEmitter<any>;
    shadow: EventEmitter<any>;
    dropModel: EventEmitter<any>;
    removeModel: EventEmitter<any>;
    events: Array<string>;
    bags: Array<any>;
    /**
     * @name add
     * @param name
     * @param drake
     * @returns {*}
     */
    add(name: any, drake: any): any;
    /**
     * @name find
     * @param name
     * @returns {*}
     */
    find(name: any): any;
    /**
     * @name destroy
     * @param name
     */
    destroy(name: any): void;
    /**
     * @name setOptions
     * @param name
     * @param options
     */
    setOptions(name: any, options: any): void;
    /**
     * @name handleModels
     * @param name
     * @param drake
     */
    handleModels(name: any, drake: any): void;
    /**
     * @name setupEvents
     * @param bag
     */
    setupEvents(bag: any): void;
    /**
     * @name domIndexOf
     * @param child
     * @param parent
     * @returns {*}
     */
    domIndexOf(child: any, parent: any): any;
}
