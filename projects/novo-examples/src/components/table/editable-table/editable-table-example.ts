import { Component } from '@angular/core';
import { NovoTableConfig, ArrayCollection, PercentageCell } from 'novo-elements';

/**
 * @title Editable Table Example
 */
@Component({
  selector: 'editable-table-example',
  templateUrl: 'editable-table-example.html',
  styleUrls: ['editable-table-example.css'],
})
export class EditableTableExample {
  public configuration: any = {
    columns: [
      {
        title: 'Name',
        name: 'name',
        ordering: true,
        filtering: true,
        editorType: 'TablePickerControl',
        editorConfig: {
          key: 'name',
          config: {
            options: [
              'Joshua Godi',
              'Kameron Sween',
              'Brian Kimball',
              'Sweeney Todd',
              'Tom Cruise',
              'Ed Bailey',
              'Bo Jackson',
              'Ernie McDudson',
            ],
          },
        },
      },
      {
        title: 'Job Type',
        name: 'jobType',
        ordering: true,
        filtering: true,
        options: ['Freelance', 'Contact', 'Billable'],
        multiple: true,
        editorType: 'SelectControl',
        editorConfig: {
          key: 'jobType',
          options: [
            { value: 'Freelance', label: 'Freelance' },
            { value: 'Contract', label: 'Contract' },
            { value: 'Billable', label: 'Billable' },
          ],
        },
      },
      {
        title: 'Rate',
        name: 'rate',
        ordering: true,
        filtering: true,
        renderer: PercentageCell,
        editorType: 'TextBoxControl',
        editorConfig: {
          key: 'rate',
          type: 'percentage',
          required: true,
          interactions: [
            {
              event: 'change',
              script: (form) => {
                console.log('Form Interaction Called!', form); // tslint:disable-line
                if (form.value.rate) {
                  if (Number(form.value.rate) >= 0.75) {
                    form.controls.rating.setValue('High');
                  } else if (Number(form.value.rate) >= 0.5) {
                    form.controls.rating.setValue('Medium');
                  } else {
                    form.controls.rating.setValue('Low');
                  }
                }
              },
            },
          ],
        },
      },
      { title: 'Rating', name: 'rating' },
    ],
    rows: new ArrayCollection([
      { id: 1, name: 'Joshua Godi', jobType: 'Freelance', rate: null, rating: 'Low' },
      { id: 2, name: 'Brian Kimball', jobType: 'Contact', rate: 0.5, rating: 'Medium' },
      { id: 3, name: 'Kameron Sween', jobType: 'Billable', rate: 1.0, rating: 'High' },
    ]),
    config: {
      paging: {
        current: 1,
        itemsPerPage: 10,
        onPageChange: (event) => {
          this.configuration.config.paging.current = event.page;
          this.configuration.config.paging.itemsPerPage = event.itemsPerPage;
        },
      },
      filtering: true,
      sorting: true,
      ordering: true,
      resizing: true,
    },
  };
  public editableNewRowDefault: any = { name: 'Default', jobType: 'Contract' };
}
