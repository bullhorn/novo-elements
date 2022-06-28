import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder } from '@angular/forms';
import { NOVO_QUERY_BUILDER } from './query-builder.tokens';

@Component({
  selector: 'novo-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NOVO_QUERY_BUILDER, useExisting: QueryBuilderComponent }],
})
export class QueryBuilderComponent implements OnInit {
  queryForm: AbstractControl;
  config: any = null;

  constructor(private controlContainer: ControlContainer, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.controlContainer) {
      this.queryForm = this.controlContainer.control.get('query');
    } else {
      this.queryForm = this.formBuilder.group({
        description: [''],
        include: this.formBuilder.array([]),
        exclude: this.formBuilder.array([]),
      });
    }
  }
}
