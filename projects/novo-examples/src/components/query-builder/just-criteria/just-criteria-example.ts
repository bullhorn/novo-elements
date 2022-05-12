import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MockMeta } from './MockMeta';

/**
 * @title Just Criteria Example
 */
@Component({
  selector: 'just-criteria-example',
  templateUrl: 'just-criteria-example.html',
  styleUrls: ['just-criteria-example.css'],
})
export class JustCriteriaExample implements OnInit {
  queryForm: AbstractControl;
  config: any = null;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    // this.service.getFieldsForSegment().then((fields) => {
    //   this.config = { fields };
    //   this.cdr.detectChanges();
    // });
  }

  ngOnInit() {
    this.getFieldConfig().then((fields) => {
      this.config = { fields };
      this.cdr.detectChanges();
    });

    this.queryForm = this.formBuilder.group({
      criteria: this.formBuilder.array([]),
    });
  }

  getFieldConfig() {
    return Promise.all([MockMeta]).then((metas) => {
      return metas.map((it) => ({
        value: it.entity,
        label: it.label,
        options: it.fields,
        find: (name: string) => it.fields.find((f) => f.name === name),
        search: (term: string) => {
          return it.fields.filter((f) => f.name.includes(term) || f.label.includes(term));
        },
      }));
    });
  }

  onSubmit() {
    console.log('Your form data : ', this.queryForm.value);
  }
}
