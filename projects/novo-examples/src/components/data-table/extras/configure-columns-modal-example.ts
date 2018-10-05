import { Component } from '@angular/core';

import { IDataTableColumn, NovoModalRef, NovoModalParams } from 'novo-elements';
import { MockData } from './mock-data';

/**
 * @title Configure Columns Modal Example
 */

@Component({
  selector: 'configure-columns-modal-example',
  template: `
    <novo-modal>
      <header title="Configure Columns"
              theme="contact">
        <utils>
          <util-action icon="times"
                      (click)="close()"></util-action>
        </utils>
      </header>
      <section>
        <novo-list direction="vertical">
          <novo-list-item *ngFor="let column of columns">
            <item-header>
                  <item-title>{{ column.id }}</item-title>
                  <item-header-end>
                    <novo-checkbox [(ngModel)]="column.enabled"></novo-checkbox>
                  </item-header-end>
              </item-header>
          </novo-list-item>
        </novo-list>
      </section>
      <button theme="standard"
              (click)="close()">Cancel</button>
      <button theme="primary"
              color="success"
              icon="check"
              (click)="save()">Save</button>
    </novo-modal>
  `,
})
export class ConfigureColumnsModal {
  public columns: IDataTableColumn<MockData>;

  constructor(private modalRef: NovoModalRef, private params: NovoModalParams) {
    this.columns = params['columns'];
  }

  public close(): void {
    this.modalRef.close();
  }

  public save() {
    this.modalRef.close(this.columns);
  }
}
