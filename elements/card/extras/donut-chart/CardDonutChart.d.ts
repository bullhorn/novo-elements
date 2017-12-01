import { ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
export declare class CardDonutChartElement implements OnInit, OnChanges {
    private element;
    value: number;
    label: any;
    color: any;
    chartFillMax: any;
    uid: any;
    isChartDrawing: any;
    constructor(element: ElementRef);
    ngOnChanges(changes?: SimpleChanges): void;
    ngOnInit(): void;
    drawChart(): void;
}
