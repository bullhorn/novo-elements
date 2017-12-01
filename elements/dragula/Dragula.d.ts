import { ElementRef, OnInit, OnChanges } from '@angular/core';
import { NovoDragulaService } from './DragulaService';
export declare class NovoDragulaElement implements OnInit, OnChanges {
    private dragulaService;
    bag: any;
    dragulaModel: any;
    drake: any;
    container: any;
    constructor(element: ElementRef, dragulaService: NovoDragulaService);
    ngOnInit(): void;
    checkModel(): void;
    ngOnChanges(changes: any): void;
}
