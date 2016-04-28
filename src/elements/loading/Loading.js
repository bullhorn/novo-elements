import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

@Component({
    selector: 'novo-loading',
    inputs: [
        'theme',
        'stage'
    ],
    template: `
        <!--Circle-->
        <div *ngIf="theme == 'circle'" [class]="stage">
            <div><dot [class]="stage"></dot></div>
            <div><dot [class]="stage"></dot></div>
            <div><dot [class]="stage"></dot></div>
            <div><dot [class]="stage"></dot></div>
            <div><dot [class]="stage"></dot></div>
        </div>
        <!--Line-->
        <dot *ngIf="theme=='line'"></dot>
        <dot *ngIf="theme=='line'"></dot>
        <dot *ngIf="theme=='line'"></dot>
        <dot *ngIf="theme=='line'"></dot>
        <dot *ngIf="theme=='line'"></dot>
    `,
    directives: [
        CORE_DIRECTIVES
    ]
})
export class Loading {
    constructor() {
        this.stage = '';
    }
}

export const NOVO_LOADING_ELEMENTS = [Loading];
