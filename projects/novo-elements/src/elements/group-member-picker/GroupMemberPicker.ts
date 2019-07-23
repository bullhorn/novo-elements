import {Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {OutsideClick} from '../..';

type SelectionChange = {
  groups: number[],
  members: number[],
};

@Component({
  selector: 'novo-group-member-picker',
  templateUrl: './GroupMemberPicker.html',
})
export class NovoGroupMemberPickerElement extends OutsideClick implements OnInit {
  @HostBinding('class.disabled') public loading = true;
  @Input() buttonLabel: string = 'HARDCODED BUTTON LABEL';
  @Input() schema: any = {
    groupIdField: 'groupId',
    groupMembersField: 'members',
    memberIdField: 'memberId',
    memberGroupsField: 'groups',
    labelField: 'label',
  };
  @Input() groups: any[] = [];
  @Input() groupSingleLabel: string;
  @Input() groupPluralLabel: string;
  @Input() groupNoneLabel: string;

  @Input() members: any[] = [];
  @Input() memberSingleLabel: string;
  @Input() memberPluralLabel: string;
  @Input() memberNoneLabel: string;

  @Output() selectionChange: EventEmitter<SelectionChange> = new EventEmitter<SelectionChange>();

  private selectedMembers: Set<number> | Set<string>;
  private selectedGroups: Set<number> | Set<string>;

  public readonly tabs: ('GROUPS' | 'MEMBERS')[] = ['GROUPS', 'MEMBERS'];

  public entityLabels;
  public activeTab = 'GROUPS';
  public items: any[] = [];

  constructor(element: ElementRef) {
    super(element);
  }

  ngOnInit(): void {
    this.loading = true;
    this.entityLabels = {
      GROUPS: {
        single: this.groupSingleLabel,
        plural: this.groupPluralLabel,
        none: this.groupNoneLabel,
      },
      MEMBERS: {
        single: this.memberSingleLabel,
        plural: this.memberPluralLabel,
        none: this.memberNoneLabel,
      },
    };
    this.items = this.groups;
    this.loading = false;
  }

  onDropdownToggled(event) {
    this.onTabSelected('GROUPS');
    this.toggleActive(event);
  }

  onTabSelected(tab: 'GROUPS' | 'MEMBERS') {
    this.activeTab = tab;
    this.items = tab === 'GROUPS' ? this.groups : this.members;
  }

  onItemToggled() {
    const currentSelection = {
      members: this.members.filter(member => member.selected).map(member => member[this.schema.memberIdField]),
      groups: this.groups.filter(group => group.selected).map(group => group[this.schema.groupIdField]),
    };
    this.selectionChange.emit(currentSelection);
  }
}
