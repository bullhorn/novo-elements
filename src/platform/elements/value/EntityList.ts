// NG2
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'entity-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div *ngFor="let entity of data.data" class="entity">
            <a *ngIf="isLinkable(entity)" (click)="openLink(entity)">
                {{ entity | render : meta }}
            </a>
            <span *ngIf="!isLinkable(entity)">
                {{ entity | render : meta }}
            </span>
        </div>
    `
})
export class EntityList implements OnInit {
    @Input() data: any;
    @Input() meta: any;
    baseEntity: string = '';

    constructor() {
    }

    ngOnInit(): any {
        this.meta.type = 'TO_ONE';
        this.baseEntity = this.meta.associatedEntity.entity;
    }

    openLink(entity: any): void {
        entity.openLink(entity);
    }

    isLinkable(entity: any): boolean {
        let type: any = entity.personSubtype || this.baseEntity;
        return ['Candidate', 'ClientContact', 'Lead', 'Opportunity', 'Placement', 'JobOrder', 'ClientCorporation', 'Appointment', 'Task'].indexOf(type) >= 0;
    }
}
