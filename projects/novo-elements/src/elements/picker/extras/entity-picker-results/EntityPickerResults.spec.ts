// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoPickerModule } from '../../Picker.module';
// APP
import { EntityPickerResult } from './EntityPickerResults';

describe('Elements: EntityPickerResult', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NovoPickerModule],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(EntityPickerResult);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Method: getIconForResult(result)', () => {
    it('should return the right icon name for ClientContact', () => {
      expect(component.getIconForResult({ searchEntity: 'ClientContact' })).toBe('person contact');
    });
    it('should return the right icon name for ClientCorporation', () => {
      expect(component.getIconForResult({ searchEntity: 'ClientCorporation' })).toBe('company');
    });
    it('should return the right icon name for Opportunity', () => {
      expect(component.getIconForResult({ searchEntity: 'Opportunity' })).toBe('opportunity');
    });
    it('should return the right icon name for Candidate', () => {
      expect(component.getIconForResult({ searchEntity: 'Candidate' })).toBe('candidate');
    });
    it('should return the right icon name for Lead', () => {
      expect(component.getIconForResult({ searchEntity: 'Lead' })).toBe('lead');
    });
    it('should return the right icon name for JobOrder', () => {
      expect(component.getIconForResult({ searchEntity: 'JobOrder' })).toBe('job');
    });
    it('should return the right icon name for Placement', () => {
      expect(component.getIconForResult({ searchEntity: 'Placement' })).toBe('star placement');
    });
    it('should return the right icon name for CorporationDepartment', () => {
      expect(component.getIconForResult({ searchEntity: 'CorporationDepartment' })).toBe('department');
    });
    it('should return empty string for unrecognized entity names', () => {
      expect(component.getIconForResult({ searchEntity: 'Unknown' })).toBe('');
    });
  });

  describe('Method: getNameForResult(result)', () => {
    it('should return a correctly formatted name for ClientContact', () => {
      const input = {
        searchEntity: 'ClientContact',
        firstName: 'James',
        lastName: 'Bond',
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return a correctly formatted name for ClientCorporation', () => {
      const input = {
        searchEntity: 'ClientCorporation',
        name: 'Bottles, Inc.',
      };
      expect(component.getNameForResult(input)).toBe('Bottles, Inc.');
    });
    it('should return a correctly formatted name for Opportunity', () => {
      const input = {
        searchEntity: 'Opportunity',
        id: 789,
        title: 'Bottlemaking Opportunity',
      };
      expect(component.getNameForResult(input)).toBe('789 | Bottlemaking Opportunity');
    });
    it('should return a correctly formatted name for Lead', () => {
      const input = {
        searchEntity: 'Lead',
        firstName: 'James',
        lastName: 'Bond',
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return a correctly formatted name for Candidate', () => {
      const input = {
        searchEntity: 'Candidate',
        firstName: 'James',
        lastName: 'Bond',
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return a correctly formatted name for Job Order', () => {
      const input = {
        searchEntity: 'JobOrder',
        id: 567,
        title: 'Mock Job Title',
      };
      expect(component.getNameForResult(input)).toBe('567 | Mock Job Title');
    });
    it('when candidate and job are defined, should concatenate id, candidate name, and job title', () => {
      const input = {
        searchEntity: 'Placement',
        id: 1234,
        candidate: {
          firstName: 'James',
          lastName: 'Bond',
        },
        jobOrder: {
          title: 'Gud Picker',
        },
      };
      expect(component.getNameForResult(input)).toBe('1234 | James Bond - Gud Picker');
    });
    it('when candidate is undefined and job is defined, should concatenate id and job title', () => {
      const input = {
        searchEntity: 'Placement',
        id: 1234,
        jobOrder: {
          title: 'Gud Picker',
        },
      };
      expect(component.getNameForResult(input)).toBe('1234 | Gud Picker');
    });
    it('when candidate and job are undefined, should only return id', () => {
      const input = {
        searchEntity: 'Placement',
        id: 1234,
      };
      expect(component.getNameForResult(input)).toBe('1234');
    });
    it('when candidate is defined and job is undefined, should concatenate id and candidate name', () => {
      const input = {
        searchEntity: 'Placement',
        id: 1234,
        candidate: {
          firstName: 'James',
          lastName: 'Bond',
        },
      };
      expect(component.getNameForResult(input)).toBe('1234 | James Bond');
    });
    it('should return the name when present for an unknown entity', () => {
      const input = {
        searchEntity: 'Unknown',
        name: 'James Bond',
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return an empty string when name is not present for an unknown entity', () => {
      const input = {
        searchEntity: 'Unknown',
        title: 'Mock Job Title',
      };
      expect(component.getNameForResult(input)).toBe('');
    });
  });

  describe('Method: highlight(match, query)', () => {
    it('should insert strong tags where matching occurs', () => {
      expect(component.highlight('Testing stuff...', 'stuff ')).toEqual('Testing <strong>stuff</strong>...');
    });
  });
});
