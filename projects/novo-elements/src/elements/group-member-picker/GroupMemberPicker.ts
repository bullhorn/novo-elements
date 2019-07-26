import {Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {OutsideClick} from '../..';

export type GroupMemberPickerSchemaType = {
  typeName: string,
  typeLabel: string,
  valueField: string,
  labelField: string,
} & ({ childTypeName?: string } | { parentTypeName?: string });

@Component({
  selector: 'novo-group-member-picker',
  templateUrl: './GroupMemberPicker.html',
})
export class NovoGroupMemberPickerElement extends OutsideClick implements OnInit {
  @HostBinding('class.loading') public loading = true;
  @Input() buttonConfig: {
    theme: string,
    side: string,
    icon: string,
    label: string,
  };
  @Input() typeSchema: GroupMemberPickerSchemaType[];
  @Input() data;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

  public activeType: GroupMemberPickerSchemaType;
  public items: any[] = [];

  constructor(element: ElementRef) {
    super(element);
  }

  ngOnInit(): void {
    this.loading = true;
    this.setActiveType(this.typeSchema[0]);
    this.loading = false;
  }

  onDropdownToggled(event) {
    // this.setActiveType(this.schema.group.typeName);
    this.toggleActive(event);
  }

  setActiveType(newActiveSchema: GroupMemberPickerSchemaType) {
    this.activeType = newActiveSchema;
    this.items = this.data[newActiveSchema.typeName];
  }

  onItemToggled() {
    let currentSelection = {};
    this.typeSchema.forEach((type) => {
      currentSelection[type.typeName] = this.data[type.typeName].filter(item => item.selected).map(item => item[type.valueField]);
    });
    this.selectionChange.emit(currentSelection);
  }
}
