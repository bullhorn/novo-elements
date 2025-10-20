import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NovoLabelService } from 'novo-elements/services';
import { findByCountryId } from 'novo-elements/utils';
import { RenderPipe } from './Render';

jest.mock('novo-elements/utils');

describe('RenderPipe', () => {
  let pipe: RenderPipe;
  let changeDetectorRef: jest.Mocked<ChangeDetectorRef>;
  let sanitizationService: jest.Mocked<DomSanitizer>;
  let labels: jest.Mocked<NovoLabelService>;

  beforeEach(() => {
    changeDetectorRef = {
      markForCheck: jest.fn(),
    } as any;

    sanitizationService = {
      bypassSecurityTrustHtml: jest.fn((html: string) => html as SafeHtml),
    } as any;

    labels = {
      formatDateShort: jest.fn((date) => '01/01/2023'),
      formatDate: jest.fn((date) => '01/01/2023'),
      formatTimeWithFormat: jest.fn((time, format) => '10:30 AM'),
      formatCurrency: jest.fn((value) => `$${value}.00`),
      formatNumber: jest.fn((value, options) => value.toString()),
      getToManyPlusMore: jest.fn((obj) => `+ ${obj.quantity} more`),
    } as any;

    pipe = new RenderPipe(changeDetectorRef, sanitizationService, labels);
  });

  describe('equals()', () => {
    describe('primitive values', () => {
      it('should return true for identical numbers', () => {
        expect(pipe.equals(5, 5)).toBe(true);
      });

      it('should return true for identical strings', () => {
        expect(pipe.equals('test', 'test')).toBe(true);
      });

      it('should return true for identical booleans', () => {
        expect(pipe.equals(true, true)).toBe(true);
      });

      it('should return false for different numbers', () => {
        expect(pipe.equals(5, 10)).toBe(false);
      });

      it('should return false for different strings', () => {
        expect(pipe.equals('test', 'other')).toBe(false);
      });
    });

    describe('null and undefined', () => {
      it('should return false when first value is null', () => {
        expect(pipe.equals(null, 5)).toBe(false);
      });

      it('should return false when second value is null', () => {
        expect(pipe.equals(5, null)).toBe(false);
      });

      it('should return true when both are null', () => {
        expect(pipe.equals(null, null)).toBe(true);
      });

      it('should return false when first value is undefined', () => {
        expect(pipe.equals(undefined, 5)).toBe(false);
      });

      it('should return false when second value is undefined', () => {
        expect(pipe.equals(5, undefined)).toBe(false);
      });

      it('should return true when both are undefined', () => {
        expect(pipe.equals(undefined, undefined)).toBe(true);
      });
    });

    describe('NaN values', () => {
      it('should return true for NaN values', () => {
        expect(pipe.equals(NaN, NaN)).toBe(true);
      });
    });

    describe('arrays', () => {
      it('should return true for identical arrays', () => {
        expect(pipe.equals([1, 2, 3], [1, 2, 3])).toBe(true);
      });

      it('should return false for arrays of different lengths', () => {
        expect(pipe.equals([1, 2, 3], [1, 2])).toBe(false);
      });

      it('should return false for arrays with different values', () => {
        expect(pipe.equals([1, 2, 3], [1, 2, 4])).toBe(false);
      });

      it('should return false when one is array and other is not', () => {
        expect(pipe.equals([1, 2], 'not array')).toBe(false);
      });

      it('should return false when comparing array to object', () => {
        expect(pipe.equals([1, 2], { 0: 1, 1: 2 })).toBe(false);
      });

      it('should handle nested arrays', () => {
        expect(pipe.equals([[1, 2], [3, 4]], [[1, 2], [3, 4]])).toBe(true);
      });

      it('should return false for nested arrays with different values', () => {
        expect(pipe.equals([[1, 2], [3, 4]], [[1, 2], [3, 5]])).toBe(false);
      });
    });

    describe('objects', () => {
      it('should return true for identical objects', () => {
        const obj = { a: 1, b: 2 };
        expect(pipe.equals(obj, obj)).toBe(true);
      });

      it('should return true for objects with same properties', () => {
        expect(pipe.equals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
      });

      it('should return false for objects with different properties', () => {
        expect(pipe.equals({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
      });

      it('should return false for objects with different keys', () => {
        expect(pipe.equals({ a: 1, b: 2 }, { a: 1, c: 2 })).toBe(false);
      });

      it('should handle nested objects', () => {
        const obj1 = { a: { b: 1 } };
        const obj2 = { a: { b: 1 } };
        expect(pipe.equals(obj1, obj2)).toBe(true);
      });

      it('should return false for nested objects with different values', () => {
        const obj1 = { a: { b: 1 } };
        const obj2 = { a: { b: 2 } };
        expect(pipe.equals(obj1, obj2)).toBe(false);
      });

      it('should ignore undefined properties in second object', () => {
        expect(pipe.equals({ a: 1 }, { a: 1, b: undefined })).toBe(true);
      });

      it('should return false if second object has extra defined properties', () => {
        expect(pipe.equals({ a: 1 }, { a: 1, b: 2 })).toBe(false);
      });
    });
  });

  describe('getEntityLabel()', () => {
    describe('person entities', () => {
      it('should return firstName and lastName for CorporateUser', () => {
        const item = { firstName: 'John', lastName: 'Doe' };
        expect(pipe.getEntityLabel(item, 'CorporateUser')).toBe('John Doe');
      });

      it('should return firstName and lastName for Candidate', () => {
        const item = { firstName: 'Jane', lastName: 'Smith' };
        expect(pipe.getEntityLabel(item, 'Candidate')).toBe('Jane Smith');
      });

      it('should return firstName and lastName for Lead', () => {
        const item = { firstName: 'Bob', lastName: 'Johnson' };
        expect(pipe.getEntityLabel(item, 'Lead')).toBe('Bob Johnson');
      });

      it('should return firstName and lastName for Person', () => {
        const item = { firstName: 'Alice', lastName: 'Williams' };
        expect(pipe.getEntityLabel(item, 'Person')).toBe('Alice Williams');
      });

      it('should handle missing firstName', () => {
        const item = { firstName: '', lastName: 'Doe' };
        expect(pipe.getEntityLabel(item, 'Candidate')).toBe('Doe');
      });

      it('should handle missing lastName', () => {
        const item = { firstName: 'John', lastName: '' };
        expect(pipe.getEntityLabel(item, 'Lead')).toBe('John');
      });

      it('should handle missing both names', () => {
        const item = { firstName: '', lastName: '' };
        expect(pipe.getEntityLabel(item, 'CorporateUser')).toBe('');
      });

      it('should handle ClientContact variants', () => {
        const item = { firstName: 'Jane', lastName: 'Smith' };
        expect(pipe.getEntityLabel(item, 'ClientContact1')).toBe('Jane Smith');
        expect(pipe.getEntityLabel(item, 'ClientContact2')).toBe('Jane Smith');
        expect(pipe.getEntityLabel(item, 'ClientContact5')).toBe('Jane Smith');
      });
    });

    describe('corporation entities', () => {
      it('should return name for ClientCorporation', () => {
        const item = { name: 'Acme Corp' };
        expect(pipe.getEntityLabel(item, 'ClientCorporation')).toBe('Acme Corp');
      });

      it('should handle ClientCorporation variants', () => {
        const item = { name: 'Tech Inc' };
        expect(pipe.getEntityLabel(item, 'ClientCorporation1')).toBe('Tech Inc');
        expect(pipe.getEntityLabel(item, 'ClientCorporation5')).toBe('Tech Inc');
      });

      it('should handle missing name', () => {
        const item = { name: '' };
        expect(pipe.getEntityLabel(item, 'ClientCorporation')).toBe('');
      });
    });

    describe('job entities', () => {
      it('should return title for JobOrder', () => {
        const item = { title: 'Software Engineer' };
        expect(pipe.getEntityLabel(item, 'JobOrder')).toBe('Software Engineer');
      });

      it('should return title for Opportunity', () => {
        const item = { title: 'Sales Opportunity' };
        expect(pipe.getEntityLabel(item, 'Opportunity')).toBe('Sales Opportunity');
      });

      it('should handle JobOrder variants', () => {
        const item = { title: 'Manager' };
        expect(pipe.getEntityLabel(item, 'JobOrder1')).toBe('Manager');
        expect(pipe.getEntityLabel(item, 'JobOrder5')).toBe('Manager');
      });

      it('should handle missing title', () => {
        const item = { title: '' };
        expect(pipe.getEntityLabel(item, 'JobOrder')).toBe('');
      });
    });

    describe('placement entity', () => {
      it('should format Placement with candidate and jobOrder', () => {
        const item = {
          candidate: { firstName: 'John', lastName: 'Doe' },
          jobOrder: { title: 'Developer' },
        };
        expect(pipe.getEntityLabel(item, 'Placement')).toBe('John Doe - Developer');
      });

      it('should format Placement with only candidate', () => {
        const item = {
          candidate: { firstName: 'John', lastName: 'Doe' },
        };
        expect(pipe.getEntityLabel(item, 'Placement')).toBe('John Doe');
      });

      it('should format Placement with only jobOrder', () => {
        const item = {
          jobOrder: { title: 'Developer' },
        };
        expect(pipe.getEntityLabel(item, 'Placement')).toBe('- Developer');
      });

      it('should handle Placement with no data', () => {
        const item = {};
        expect(pipe.getEntityLabel(item, 'Placement')).toBe('');
      });
    });

    describe('unknown entity', () => {
      it('should return empty string for unknown entity', () => {
        const item = { name: 'Test' };
        expect(pipe.getEntityLabel(item, 'UnknownEntity')).toBe('');
      });
    });
  });

  describe('render() - Type Detection', () => {
    describe('TO_MANY type', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'Submission' } };
      it('should detect TO_MANY type', () => {
        const value = { data: [{ id: 1 }], total: 1 };
        const result = pipe.render(value, args);
        expect(result).toBe('1');
      });
      it('should detect TO_MANY type - empty', () => {
        const value = { data: [], total: 0 };
        const result = pipe.render(value, args);
        expect(result).toBe('');
      });
    });

    describe('TO_ONE type', () => {
      it('should detect TO_ONE type from associatedEntity', () => {
        const args = { type: 'TO_ONE', associatedEntity: { entity: 'Candidate' } };
        const value = { firstName: 'John', lastName: 'Doe' };
        const result = pipe.render(value, args);
        expect(result).toBe('John Doe');
      });
    });

    describe('Date/Time types', () => {
      it('should detect DATETIME dataSpecialization', () => {
        const args = { dataSpecialization: 'DATETIME' };
        const value = new Date('2023-01-01');
        pipe.render(value, args);
        expect(labels.formatDateShort).toHaveBeenCalledWith(value);
      });

      it('should detect YEAR dataSpecialization', () => {
        const args = { dataSpecialization: 'YEAR' };
        const value = new Date('2023-02-01');
        const result = pipe.render(value, args);
        expect(result).toBe(2023);
      });

      it('should detect TIME dataSpecialization', () => {
        const args = { dataSpecialization: 'TIME' };
        const value = '10:30';
        pipe.render(value, args);
        expect(labels.formatTimeWithFormat).toHaveBeenCalled();
      });

      it('should detect DATE dataSpecialization', () => {
        const args = { dataSpecialization: 'DATE', dataType: 'Date' };
        const value = new Date('2023-01-01');
        pipe.render(value, args);
        expect(labels.formatDate).toHaveBeenCalled();
      });

      it('should detect Timestamp dataType', () => {
        const args = { dataType: 'Timestamp' };
        const value = new Date('2023-01-01');
        pipe.render(value, args);
        expect(labels.formatDateShort).toHaveBeenCalledWith(value);
      });
    });

    describe('Contact types', () => {
      it('should detect Phone type by field name', () => {
        const args = { name: 'phone' };
        const value = '555-1234';
        const result = pipe.render(value, args);
        expect(result).toBe('555-1234');
      });

      it('should detect phone1 field name', () => {
        const args = { name: 'phone1' };
        const value = '555-1234';
        const result = pipe.render(value, args);
        expect(result).toBe('555-1234');
      });

      it('should detect workPhone field name', () => {
        const args = { name: 'workPhone' };
        const value = '555-1234';
        const result = pipe.render(value, args);
        expect(result).toBe('555-1234');
      });

      it('should detect Email type by field name', () => {
        const args = { name: 'email' };
        const value = 'test@example.com';
        const result = pipe.render(value, args);
        expect(result).toBe('test@example.com');
      });

      it('should detect email1 field name', () => {
        const args = { name: 'email1' };
        const value = 'test@example.com';
        const result = pipe.render(value, args);
        expect(result).toBe('test@example.com');
      });
    });

    describe('Country type', () => {
      it('should detect Country type by field name', () => {
        (findByCountryId as jest.Mock).mockReturnValue({ name: 'United States' });
        const args = { name: 'address.countryID' };
        const result = pipe.render(1, args);
        expect(result).toBe('United States');
      });

      it('should detect Country type by optionsType', () => {
        (findByCountryId as jest.Mock).mockReturnValue({ name: 'Canada' });
        const args = { optionsType: 'Country' };
        const result = pipe.render(2, args);
        expect(result).toBe('Canada');
      });

      it('should handle country not found', () => {
        (findByCountryId as jest.Mock).mockReturnValue(null);
        const args = { optionsType: 'Country' };
        const result = pipe.render(999, args);
        expect(result).toBe(999);
      });
    });

    describe('SkillText type', () => {
      it('should detect SkillText type', () => {
        const args = { optionsType: 'SkillText' };
        const value = ['JavaScript', 'TypeScript'];
        const result = pipe.render(value, args);
        expect(result).toBe('JavaScript, TypeScript');
      });

      it('should handle non-array SkillText', () => {
        const args = { optionsType: 'SkillText' };
        const value = 'JavaScript';
        const result = pipe.render(value, args);
        expect(result).toBe('JavaScript');
      });
    });

    describe('Options type', () => {
      it('should detect Options type from options property', () => {
        const args = { options: [{ label: 'Yes', value: true }] };
        const value = true;
        const result = pipe.render(value, args);
        expect(Array.isArray(result)).toBe(true);
      });

      it('should detect Options type from inputType SELECT', () => {
        const args = { inputType: 'SELECT', options: [{ label: 'Option1', value: 1 }] };
        const value = 1;
        const result = pipe.render(value, args);
        expect(Array.isArray(result)).toBe(true);
      });

      it('should detect Options type from inputType CHECKBOX', () => {
        const args = { inputType: 'CHECKBOX', options: [{ label: 'Check', value: true }] };
        const value = true;
        const result = pipe.render(value, args);
        expect(Array.isArray(result)).toBe(true);
      });
    });

    describe('Specialized types', () => {
      it('should detect MONEY dataSpecialization', () => {
        const args = { dataSpecialization: 'MONEY' };
        const value = 100;
        pipe.render(value, args);
        expect(labels.formatCurrency).toHaveBeenCalledWith(value);
      });

      it('should detect PERCENTAGE dataSpecialization', () => {
        const args = { dataSpecialization: 'PERCENTAGE' };
        const value = 0.5;
        pipe.render(value, args);
        expect(labels.formatNumber).toHaveBeenCalled();
      });

      it('should detect HTML dataSpecialization', () => {
        const args = { dataSpecialization: 'HTML' };
        const value = '<p>test</p>';
        pipe.render(value, args);
        expect(sanitizationService.bypassSecurityTrustHtml).toHaveBeenCalled();
      });

      it('should detect SSN dataSpecialization', () => {
        const args = { dataSpecialization: 'SSN' };
        const value = '123-45-6789';
        const result = pipe.render(value, args);
        expect(result).toBe('123-45-6789');
      });
    });

    describe('Custom formatter', () => {
      it('should use custom formatter if provided', () => {
        const formatter = jest.fn().mockReturnValue('formatted');
        const args = { formatter };
        const value = 'test';
        const result = pipe.render(value, args);
        expect(formatter).toHaveBeenCalledWith(value, args);
        expect(result).toBe('formatted');
      });
    });
  });

  describe('render() - Address Types', () => {
    beforeEach(() => {
      sanitizationService.bypassSecurityTrustHtml.mockReturnValue('html' as SafeHtml);
    });
    it('should render Address type', () => {
      (findByCountryId as jest.Mock).mockReturnValue({ name: 'USA' });
      const args = { dataType: 'Address' };
      const value = {
        address1: '123 Main St',
        address2: 'Apt 4',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        countryName: 1,
      };
      pipe.render(value, args);
      expect(sanitizationService.bypassSecurityTrustHtml).toHaveBeenCalled();
    });

    it('should render Address1 type', () => {
      (findByCountryId as jest.Mock).mockReturnValue({ name: 'USA' });
      const args = { dataType: 'Address1' };
      const value = {
        address1: '123 Main St',
        address2: '',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        countryName: 1,
      };
      pipe.render(value, args);
      expect(sanitizationService.bypassSecurityTrustHtml).toHaveBeenCalled();
    });

    it('should handle Address with missing fields', () => {
      (findByCountryId as jest.Mock).mockReturnValue(null);
      const args = { dataType: 'Address' };
      const value = {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        countryName: '',
      };
      pipe.render(value, args);
      expect(sanitizationService.bypassSecurityTrustHtml).toHaveBeenCalled();
    });

    it('should handle SecondaryAddress type', () => {
      (findByCountryId as jest.Mock).mockReturnValue({ name: 'USA' });
      const args = { dataType: 'SecondaryAddress' };
      const value = {
        address1: '456 Oak Ave',
        address2: 'Suite 100',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        countryName: 1,
      };
      pipe.render(value, args);
      expect(sanitizationService.bypassSecurityTrustHtml).toHaveBeenCalled();
    });

    it('should handle BillingAddress type', () => {
      (findByCountryId as jest.Mock).mockReturnValue({ name: 'USA' });
      const args = { dataType: 'BillingAddress' };
      const value = {
        address1: '789 Pine Rd',
        address2: '',
        city: 'Boston',
        state: 'MA',
        zip: '02101',
        countryName: 1,
      };
      pipe.render(value, args);
      expect(sanitizationService.bypassSecurityTrustHtml).toHaveBeenCalled();
    });
  });

  describe('render() - Numeric Types', () => {
    it('should render Integer type', () => {
      const args = { dataType: 'Integer' };
      const value = 42;
      const result = pipe.render(value, args);
      expect(result).toBe(42);
    });

    it('should render Double type', () => {
      labels.formatNumber.mockReturnValue('3.14');
      const args = { dataType: 'Double' };
      const value = 3.14159;
      pipe.render(value, args);
      expect(labels.formatNumber).toHaveBeenCalled();
    });

    it('should render BigDecimal type', () => {
      labels.formatNumber.mockReturnValue('99.99');
      const args = { dataType: 'BigDecimal' };
      const value = 99.99;
      pipe.render(value, args);
      expect(labels.formatNumber).toHaveBeenCalled();
    });

    it('should render Money type', () => {
      labels.formatCurrency.mockReturnValue('$100.00');
      const args = { dataSpecialization: 'MONEY' };
      const value = 100;
      pipe.render(value, args);
      expect(labels.formatCurrency).toHaveBeenCalledWith(value);
    });

    it('should render Percentage type', () => {
      labels.formatNumber.mockReturnValue('50%');
      const args = { dataSpecialization: 'PERCENTAGE' };
      const value = 0.5;
      pipe.render(value, args);
      expect(labels.formatNumber).toHaveBeenCalled();
    });
  });

  describe('render() - Entity Types', () => {
    it('should render Candidate entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Candidate' } };
      const value = { firstName: 'John', lastName: 'Doe' };
      const result = pipe.render(value, args);
      expect(result).toBe('John Doe');
    });

    it('should render Lead entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Lead' } };
      const value = { firstName: 'Jane', lastName: 'Smith' };
      const result = pipe.render(value, args);
      expect(result).toBe('Jane Smith');
    });

    it('should render JobOrder entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'JobOrder' } };
      const value = { title: 'Software Engineer' };
      const result = pipe.render(value, args);
      expect(result).toBe('Software Engineer');
    });

    it('should render Opportunity entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Opportunity' } };
      const value = { title: 'Sales Opportunity' };
      const result = pipe.render(value, args);
      expect(result).toBe('Sales Opportunity');
    });

    it('should render Placement entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Placement' } };
      const value = {
        candidate: { firstName: 'John', lastName: 'Doe' },
        jobOrder: { title: 'Developer' },
      };
      const result = pipe.render(value, args);
      expect(result).toBe('John Doe - Developer');
    });

    it('should render JobSubmission entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'JobSubmission' } };
      const value = {
        jobOrder: { title: 'Manager' },
        candidate: { firstName: 'Bob', lastName: 'Johnson' },
      };
      const result = pipe.render(value, args);
      expect(result).toContain('Manager');
      expect(result).toContain('Bob');
    });

    it('should render WorkersCompensationRate entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'WorkersCompensationRate' } };
      const value = {
        compensation: { code: 'WC001', name: 'Standard Rate' },
      };
      const result = pipe.render(value, args);
      expect(result).toContain('WC001');
      expect(result).toContain('Standard Rate');
    });

    it('should render BusinessSector entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'BusinessSector' } };
      const value = { label: 'Technology', name: 'Tech' };
      const result = pipe.render(value, args);
      expect(result).toBe('Technology');
    });

    it('should render Skill entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Skill' } };
      const value = { name: 'JavaScript' };
      const result = pipe.render(value, args);
      expect(result).toBe('JavaScript');
    });

    it('should render Category entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Category' } };
      const value = { name: 'IT' };
      const result = pipe.render(value, args);
      expect(result).toBe('IT');
    });

    it('should render Certification entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Certification' } };
      const value = { name: 'PMP' };
      const result = pipe.render(value, args);
      expect(result).toBe('PMP');
    });

    it('should render Specialty entity', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Specialty' } };
      const value = { name: 'Cloud Computing' };
      const result = pipe.render(value, args);
      expect(result).toBe('Cloud Computing');
    });
  });

  describe('render() - ToMany Type', () => {
    it('should render ToMany with Candidate entities', () => {
      labels.getToManyPlusMore.mockReturnValue('+ 2 more');
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'Candidate' } };
      const value = {
        data: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Smith' },
        ],
        total: 4,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('John Doe');
      expect(result).toContain('Jane Smith');
      expect(result).toContain('+ 2 more');
    });

    it('should render ToMany with CorporateUser entities', () => {
      labels.getToManyPlusMore.mockReturnValue('+ 1 more');
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'CorporateUser' } };
      const value = {
        data: [
          { firstName: 'Alice', lastName: 'Brown' },
          { firstName: 'Bob', lastName: 'Green' },
        ],
        total: 3,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('Alice Brown');
      expect(result).toContain('Bob Green');
    });

    it('should render ToMany with Person entities', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'Person' } };
      const value = {
        data: [{ firstName: 'Charlie', lastName: 'White' }],
        total: 1,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('Charlie White');
    });

    it('should render ToMany with Skill entities', () => {
      labels.getToManyPlusMore.mockReturnValue('+ 1 more');
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'Skill' } };
      const value = {
        data: [{ name: 'JavaScript' }, { name: 'TypeScript' }],
        total: 3,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('JavaScript');
      expect(result).toContain('TypeScript');
    });

    it('should render ToMany with Category entities', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'Category' } };
      const value = {
        data: [{ name: 'IT' }, { name: 'Finance' }],
        total: 2,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('IT');
      expect(result).toContain('Finance');
    });

    it('should render ToMany with BusinessSector entities', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'BusinessSector' } };
      const value = {
        data: [{ name: 'Technology' }],
        total: 1,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('Technology');
    });

    it('should render ToMany with Specialty entities', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'Specialty' } };
      const value = {
        data: [{ name: 'Cloud' }],
        total: 1,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('Cloud');
    });

    it('should render ToMany with ClientCorporation entities', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'ClientCorporation' } };
      const value = {
        data: [{ name: 'Acme Corp' }],
        total: 1,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('Acme Corp');
    });

    it('should render ToMany with CorporationDepartment entities', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'CorporationDepartment' } };
      const value = {
        data: [{ name: 'Engineering' }],
        total: 1,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('Engineering');
    });

    it('should render ToMany with MailListPushHistoryDetail', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'MailListPushHistoryDetail' } };
      const value = {
        data: [{ externalListName: 'List1' }, { externalListName: 'List2' }],
        total: 2,
      };
      const result = pipe.render(value, args);
      expect(result).toContain('List1');
      expect(result).toContain('List2');
    });

    it('should render ToMany with unknown entity as total', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'UnknownEntity' } };
      const value = { data: [], total: 5 };
      const result = pipe.render(value, args);
      expect(result).toBe('5');
    });

    it('should not add plus more when all items are shown', () => {
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'Candidate' } };
      const value = {
        data: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Smith' },
        ],
        total: 2,
      };
      const result = pipe.render(value, args);
      expect(result).not.toContain('+ ');
    });
  });

  describe('render() - Special Cases', () => {
    it('should handle entity with _subtype when no args provided', () => {
      const value = { _subtype: 'Candidate', firstName: 'John', lastName: 'Doe' };
      const result = pipe.render(value, undefined);
      expect(result).toBe('John Doe');
    });

    it('should return value for null input', () => {
      const result = pipe.render(null, {});
      expect(result).toBeNull();
    });

    it('should return value for undefined input', () => {
      const result = pipe.render(undefined, {});
      expect(result).toBeUndefined();
    });

    it('should return value when args is not provided', () => {
      const result = pipe.render('test', undefined);
      expect(result).toBe('test');
    });

    it('should render CandidateComment with comments', () => {
      labels.formatDateShort.mockReturnValue('01/01/2023');
      const args = { dataType: 'CandidateComment' };
      const value = {
        comments: 'Great candidate',
        dateLastModified: new Date('2023-01-01'),
        name: 'John Doe',
      };
      const result = pipe.render(value, args);
      expect(result).toContain('01/01/2023');
      expect(result).toContain('John Doe');
      expect(result).toContain('Great candidate');
    });

    it('should return empty string for CandidateComment without comments', () => {
      const args = { dataType: 'CandidateComment' };
      const value = {
        comments: null,
        dateLastModified: new Date('2023-01-01'),
        name: 'John Doe',
      };
      const result = pipe.render(value, args);
      expect(result).toBe('');
    });

    it('should handle Html type with string value', () => {
      sanitizationService.bypassSecurityTrustHtml.mockReturnValue('html' as SafeHtml);
      const args = { dataSpecialization: 'HTML' };
      const value = '<a href="#">link</a>';
      pipe.render(value, args);
      expect(sanitizationService.bypassSecurityTrustHtml).toHaveBeenCalledWith(
        expect.stringContaining('target="_blank"')
      );
    });

    it('should trim string values by default', () => {
      const args = { dataType: 'String' };
      const value = '  test string  ';
      const result = pipe.render(value, args);
      expect(result).toBe('test string');
    });
  });

  describe('concat()', () => {
    it('should concatenate single field from list', () => {
      const list = [{ name: 'John' }, { name: 'Jane' }];
      const result = pipe.concat(list, 'name');
      expect(result).toBe('John, Jane');
    });

    it('should concatenate multiple fields from list', () => {
      const list = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
      ];
      const result = pipe.concat(list, 'firstName', 'lastName');
      expect(result).toBe('John Doe, Jane Smith');
    });

    it('should handle empty list', () => {
      const result = pipe.concat([], 'name');
      expect(result).toBe('');
    });

    it('should handle missing fields', () => {
      const list = [{ name: 'John' }, { name: undefined }];
      const result = pipe.concat(list, 'name');
      expect(result).toContain('John');
    });

    it('should handle single item list', () => {
      const list = [{ firstName: 'John', lastName: 'Doe' }];
      const result = pipe.concat(list, 'firstName', 'lastName');
      expect(result).toBe('John Doe');
    });

    it('should handle three fields', () => {
      const list = [
        { first: 'John', middle: 'Q', last: 'Doe' },
        { first: 'Jane', middle: 'M', last: 'Smith' },
      ];
      const result = pipe.concat(list, 'first', 'middle', 'last');
      expect(result).toBe('John Q Doe, Jane M Smith');
    });
  });

  describe('options()', () => {
    it('should map single value to label', () => {
      const list = [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ];
      const result = pipe.options(true, list, {});
      expect(result).toEqual(['Yes']);
    });

    it('should map multiple values to labels', () => {
      const list = [
        { label: 'Option1', value: 1 },
        { label: 'Option2', value: 2 },
        { label: 'Option3', value: 3 },
      ];
      const result = pipe.options([1, 3], list, {});
      expect(result).toEqual(['Option1', 'Option3']);
    });

    it('should return original value if no matching option found', () => {
      const list = [{ label: 'Yes', value: true }];
      const result = pipe.options(false, list, {});
      expect(result).toEqual([false]);
    });

    it('should handle non-array value by converting to array', () => {
      const list = [{ label: 'Yes', value: true }];
      const result = pipe.options(true, list, {});
      expect(Array.isArray(result)).toBe(true);
    });

    it('should throw error if list is invalid and no optionsType', () => {
      expect(() => {
        pipe.options(1, null, {});
      }).toThrow();
    });

    it('should return value if list is invalid but optionsType provided', () => {
      const result = pipe.options(1, null, { optionsType: 'Custom' });
      expect(result).toEqual([1]);
    });

    it('should handle mixed found and not found values', () => {
      const list = [
        { label: 'Option1', value: 1 },
        { label: 'Option2', value: 2 },
      ];
      const result = pipe.options([1, 99, 2], list, {});
      expect(result).toEqual(['Option1', 99, 'Option2']);
    });

    it('should handle empty options list', () => {
      const result = pipe.options(1, [], {});
      expect(result).toEqual([1]);
    });
  });

  describe('getNumberDecimalPlaces()', () => {
    it('should return decimal places for number with decimals', () => {
      const result = pipe.getNumberDecimalPlaces(3.14159);
      expect(result).toBe(5);
    });

    it('should return 1 for whole number', () => {
      const result = pipe.getNumberDecimalPlaces(42);
      expect(result).toBe(1);
    });

    it('should return 1 for null value', () => {
      const result = pipe.getNumberDecimalPlaces(null);
      expect(result).toBe(1);
    });

    it('should return 1 for undefined value', () => {
      const result = pipe.getNumberDecimalPlaces(undefined);
      expect(result).toBe(1);
    });

    it('should handle string numbers', () => {
      const result = pipe.getNumberDecimalPlaces('3.14');
      expect(result).toBe(2);
    });

    it('should handle zero', () => {
      const result = pipe.getNumberDecimalPlaces(0);
      expect(result).toBe(1);
    });

    it('should handle negative numbers', () => {
      const result = pipe.getNumberDecimalPlaces(-3.14);
      expect(result).toBe(2);
    });

    it('should handle very small decimals', () => {
      const result = pipe.getNumberDecimalPlaces(0.00001);
      expect(result).toBe(5);
    });
  });

  describe('capitalize()', () => {
    it('should capitalize first letter', () => {
      expect(pipe.capitalize('hello')).toBe('Hello');
    });

    it('should handle already capitalized string', () => {
      expect(pipe.capitalize('Hello')).toBe('Hello');
    });

    it('should handle single character', () => {
      expect(pipe.capitalize('a')).toBe('A');
    });

    it('should handle empty string', () => {
      expect(pipe.capitalize('')).toBe('');
    });

    it('should handle uppercase string', () => {
      expect(pipe.capitalize('HELLO')).toBe('HELLO');
    });

    it('should handle mixed case', () => {
      expect(pipe.capitalize('hELLO')).toBe('HELLO');
    });
  });

  describe('transform()', () => {
    it('should return empty string for null value', () => {
      const result = pipe.transform(null, {});
      expect(result).toBe('');
    });

    it('should return empty string for undefined value', () => {
      const result = pipe.transform(undefined, {});
      expect(result).toBe('');
    });

    it('should cache result if value and args are equal', () => {
      const args = { dataType: 'String' };
      const value = 'test';
      pipe.transform(value, args);
      const updateValueSpy = jest.spyOn(pipe, 'updateValue');
      const result = pipe.transform(value, args);
      expect(updateValueSpy).not.toHaveBeenCalled();
      expect(result).toBe(pipe.value);
      updateValueSpy.mockRestore();
    });

    it('should update value if value changes', () => {
      const args = { dataType: 'String' };
      pipe.transform('test1', args);
      const updateValueSpy = jest.spyOn(pipe, 'updateValue');
      pipe.transform('test2', args);
      expect(updateValueSpy).toHaveBeenCalled();
      updateValueSpy.mockRestore();
    });

    it('should update value if args change', () => {
      const value = 'test';
      pipe.transform(value, { dataType: 'String' });
      const updateValueSpy = jest.spyOn(pipe, 'updateValue');
      pipe.transform(value, { dataType: 'Integer' });
      expect(updateValueSpy).toHaveBeenCalled();
      updateValueSpy.mockRestore();
    });

    it('should call markForCheck on change detector', () => {
      const args = { dataType: 'String' };
      const value = 'test';
      pipe.transform(value, args);
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should handle complex object transformation', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Candidate' } };
      const value = { firstName: 'John', lastName: 'Doe' };
      const result = pipe.transform(value, args);
      expect(result).toBe('John Doe');
    });
  });

  describe('updateValue()', () => {
    it('should render value and mark for check', () => {
      const args = { dataType: 'String' };
      const value = 'test';
      pipe.updateValue(value, args);
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
      expect(pipe.value).toBe('test');
    });

    it('should update pipe value property', () => {
      const args = { dataType: 'Integer' };
      const value = 42;
      pipe.updateValue(value, args);
      expect(pipe.value).toBe(42);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complex nested entity rendering', () => {
      const args = { type: 'TO_ONE', associatedEntity: { entity: 'Placement' } };
      const value = {
        candidate: { firstName: 'John', lastName: 'Doe' },
        jobOrder: { title: 'Senior Developer' },
      };
      const result = pipe.transform(value, args);
      expect(result).toBe('John Doe - Senior Developer');
    });

    it('should handle currency formatting', () => {
      labels.formatCurrency.mockReturnValue('$1,000.00');
      const args = { dataSpecialization: 'MONEY' };
      const value = 1000;
      const result = pipe.transform(value, args);
      expect(result).toBe('$1,000.00');
    });

    it('should handle date formatting', () => {
      labels.formatDateShort.mockReturnValue('01/15/2023');
      const args = { dataSpecialization: 'DATETIME' };
      const value = new Date('2023-01-15');
      const result = pipe.transform(value, args);
      expect(result).toBe('01/15/2023');
    });

    it('should handle percentage formatting', () => {
      labels.formatNumber.mockReturnValue('50.00%');
      const args = { dataSpecialization: 'PERCENTAGE' };
      const value = 0.5;
      const result = pipe.transform(value, args);
      expect(result).toBe('50.00%');
    });

    it('should handle ToMany with multiple entities and plus more', () => {
      labels.getToManyPlusMore.mockReturnValue('+ 3 more');
      const args = { type: 'TO_MANY', associatedEntity: { entity: 'Candidate' } };
      const value = {
        data: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Smith' },
        ],
        total: 5,
      };
      const result = pipe.transform(value, args);
      expect(result).toContain('John Doe');
      expect(result).toContain('Jane Smith');
      expect(result).toContain('+ 3 more');
    });

    it('should handle address rendering with country lookup', () => {
      (findByCountryId as jest.Mock).mockReturnValue({ name: 'United States' });
      sanitizationService.bypassSecurityTrustHtml.mockReturnValue('html' as SafeHtml);
      const args = { dataType: 'Address' };
      const value = {
        address1: '123 Main St',
        address2: 'Apt 4',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        countryName: 1,
      };
      pipe.transform(value, args);
      expect(sanitizationService.bypassSecurityTrustHtml).toHaveBeenCalled();
    });

    it('should handle options mapping with multiple values', () => {
      const args = {
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' },
        ],
      };
      const value = ['active', 'pending'];
      const result = pipe.transform(value, args);
      expect(result).toContain('Active');
      expect(result).toContain('Pending');
    });
  });
});
