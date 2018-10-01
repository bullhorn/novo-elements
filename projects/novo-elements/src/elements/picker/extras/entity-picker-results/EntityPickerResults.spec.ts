// NG2
import { TestBed, async } from '@angular/core/testing';
// APP
import { EntityPickerResult } from './EntityPickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoLoadingElement } from '../../../loading/Loading';
import {
  NovoListElement,
  NovoListItemElement,
  NovoItemAvatarElement,
  NovoItemHeaderElement,
  NovoItemTitleElement,
  NovoItemContentElement,
} from '../../../list/List';

describe('Elements: EntityPickerResult', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EntityPickerResult,
        NovoLoadingElement,
        NovoListElement,
        NovoListItemElement,
        NovoItemAvatarElement,
        NovoItemContentElement,
        NovoItemHeaderElement,
        NovoItemTitleElement,
      ],
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
    it('should return empty string for unrecognized entity names', () => {
      expect(component.getIconForResult({ searchEntity: 'Unknown' })).toBe('');
    });
  });

  describe('Method: getNameForResult(result)', () => {
    it('should return a correctly formatted name for ClientContact', () => {
      let input = {
        searchEntity: 'ClientContact',
        firstName: 'James',
        lastName: 'Bond',
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return a correctly formatted name for ClientCorporation', () => {
      let input = {
        searchEntity: 'ClientCorporation',
        name: 'Bottles, Inc.',
      };
      expect(component.getNameForResult(input)).toBe('Bottles, Inc.');
    });
    it('should return a correctly formatted name for Opportunity', () => {
      let input = {
        searchEntity: 'Opportunity',
        title: 'Lead Bottlemaker',
      };
      expect(component.getNameForResult(input)).toBe('Lead Bottlemaker');
    });
    it('should return a correctly formatted name for Lead', () => {
      let input = {
        searchEntity: 'Lead',
        firstName: 'James',
        lastName: 'Bond',
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return a correctly formatted name for Candidate', () => {
      let input = {
        searchEntity: 'Candidate',
        firstName: 'James',
        lastName: 'Bond',
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return a correctly formatted name for Job Order', () => {
      let input = {
        searchEntity: 'JobOrder',
        title: 'Mock Job Title',
      };
      expect(component.getNameForResult(input)).toBe('Mock Job Title');
    });
    it('should return a correctly formatted name for Placement', () => {
      let input = {
        searchEntity: 'Placement',
        candidate: {
          firstName: 'James',
          lastName: 'Bond',
        },
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return the name when present for an unknown entity', () => {
      let input = {
        searchEntity: 'Unknown',
        name: 'James Bond',
      };
      expect(component.getNameForResult(input)).toBe('James Bond');
    });
    it('should return an empty string when name is not present for an unknown entity', () => {
      let input = {
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
