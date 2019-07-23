import {Component} from '@angular/core';

/**
 * @title Group Member Picker
 */
@Component({
  selector: 'group-member-picker-basic-example',
  templateUrl: 'group-member-picker-basic-example.html',
  // styleUrls: ['large-drop-down-example.css'],
})
export class GroupMemberPickerBasicExample {
  public mock_buttonLabel: string = 'Click Me';
  public mock_schema: any = {
    groupIdField: 'groupId',
    groupMembersField: 'members',
    memberIdField: 'memberId',
    memberGroupsField: 'groups',
    labelField: 'label',
  };
  public mock_groups: any[] = [
    {
      groupId: 1,
      label: 'First Group',
      members: [1, 2, 3, 4, 5],
    }, {
      groupId: 2,
      label: 'Second Group',
      members: [6, 7, 8, 9, 10],
    }, {
      groupId: 3,
      label: 'Third Group',
      members: [11, 12, 13, 14, 15],
    }
  ];
  public mock_groupSingleLabel: string = 'Group';
  public mock_groupPluralLabel: string = 'Groups';
  public mock_groupNoneLabel: string = 'Groups';

  public mock_members: any[] = [
    {
      memberId: 1,
      label: 'First Member',
      groups: [1],
    }, {
      memberId: 2,
      label: 'Second Member',
      groups: [1],
    }, {
      memberId: 3,
      label: 'Third Member',
      groups: [1],
    }, {
      memberId: 4,
      label: 'Fourth Member',
      groups: [1],
    }, {
      memberId: 5,
      label: 'Fifth Member',
      groups: [1],
    }, {
      memberId: 6,
      label: 'Sixth Member',
      groups: [2],
    }, {
      memberId: 7,
      label: 'Seventh Member',
      groups: [2],
    }, {
      memberId: 8,
      label: 'Eighth Member',
      groups: [2],
    }, {
      memberId: 9,
      label: 'Ninth Member',
      groups: [2],
    }, {
      memberId: 10,
      label: 'Tenth Member',
      groups: [2],
    }, {
      memberId: 11,
      label: 'Eleventh Member',
      groups: [3],
    }, {
      memberId: 12,
      label: 'Twelfth Member',
      groups: [3],
    }, {
      memberId: 13,
      label: 'Thirteenth Member',
      groups: [3],
    }, {
      memberId: 14,
      label: 'Fourteenth Member',
      groups: [3],
    }, {
      memberId: 15,
      label: 'Fifteenth Member',
      groups: [3],
    }
  ];
  public mock_memberSingleLabel: string = 'Member';
  public mock_memberPluralLabel: string = 'Members';
  public mock_memberNoneLabel: string = 'Members';

  public selectedGroups: string;
  public selectedMembers: string;

  onSelectionChange(event) {
    this.selectedGroups = event.groups.join(', ');
    this.selectedMembers = event.members.join(', ');
  }
}
