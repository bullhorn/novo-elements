// NG2
import { Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
// Vendor
// import { PageSDK, EntityUtils } from 'bh-elements';
// App
// import { EntityService } from '../../services/entity/EntityService';

@Component({
    selector: 'entity-list',
    templateUrl: './EntityList.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityList implements OnInit {
    @Input() data: any;
    @Input() meta: any;
    loading: boolean = false;
    baseEntity: string = '';
    offset: number = 5;
    storedData: any[];

    constructor(private ref: ChangeDetectorRef) {
    }

    ngOnInit(): any {
        try {
            this.meta.type = 'TO_ONE';
            this.baseEntity = this.meta.associatedEntity.entity;
            if (this.baseEntity === 'Skill' && this.data.total > 5) {
                this.loading = true;
                this.data.data = [];
                // let { entityType, entityId } = this.pageSDK.config;
                let fields: string = 'id,name';
                // this.service.getToMany(entityType, entityId, this.meta.name, fields, 0, 500, undefined, 'name').then((result) => {
                //     this.data.data = result.data.slice(0, 5);
                //     this.storedData = result.data.slice(5);
                //     this.hasMore = (this.data.total - this.data.data.length) > 0;
                //     this.loading = false;
                //     this.ref.markForCheck();
                // });
            }
        } catch (e) {
            // do nothing
        }
    }

    open(entity: any): void {
    }

    isLinkable(entity: any): boolean {
        let type: any = entity._subtype || this.baseEntity;
        return ['Candidate', 'ClientContact', 'Lead', 'Opportunity', 'Placement', 'JobOrder', 'ClientCorporation', 'Appointment', 'Task'].indexOf(type) >= 0;
    }
}
