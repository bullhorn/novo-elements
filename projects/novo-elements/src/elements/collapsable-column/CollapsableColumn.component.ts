import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'novo-collapsable-column',
  template: `
    <h1>{{header}}</h1>
    <div [dragula]="dragulaName" [dragulaModel]="dragulaModel" class="card-container">
      <div *ngFor="let card of dragulaModel" class="info-card">
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
  dragulaName: string;
  @Input()
  dragulaModel: any;
  @Input()
  entity: 'Candidate' | 'JobOrder';
}
