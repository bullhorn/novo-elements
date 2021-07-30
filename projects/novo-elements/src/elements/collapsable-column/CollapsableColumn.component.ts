import { Component, Input } from '@angular/core';

@Component({
  selector: 'novo-collapsable-column',
  template: `
    <h1><i [class]="icon"></i> {{header}}</h1>
    <div [dragula]="dragulaName" [dragulaModel]="dragulaModelData" class="card-container">
      <div *ngFor="let card of dragulaModelData" class="info-card">
        {{ entity === 'Candidate' ? card?.jobOrder?.title : card?.candidate?.firstName + ' ' + card?.candidate?.lastName }}
      </div>
    </div>
  `,
  styleUrls: ['./CollapsableColumn.component.scss']
})
export class NovoCollapsableColumnElement {
  @Input()
  header: string;
  @Input()
  set icon(icon: string) {
    if (icon) {
      this._icon = `bhi-${icon}`;
    }
  }
  get icon(): string {
    return this._icon;
  }

  private _icon: string;
  @Input()
  dragulaName: string;
  @Input()
  dragulaModelData: any;
  @Input()
  entity: 'Candidate' | 'JobOrder';
}
