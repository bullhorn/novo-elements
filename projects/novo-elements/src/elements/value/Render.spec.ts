// NG2
import { TestBed, async } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// APP
import { RenderPipe } from './Render';
import { NovoLabelService } from '../../services/novo-label-service';
// TODO fix specs
xdescribe('Render', () => {
  let fixture: any;
  let pipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RenderPipe],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }, ChangeDetectorRef, DomSanitizer],
    }).compileComponents();
    fixture = TestBed.createComponent(RenderPipe);
    pipe = fixture.debugElement.componentInstance;
  }));

  it('should initialize with its defaults.', () => {
    expect(pipe).toBeDefined();
    expect(pipe.onLangChange).toBeDefined();
  });

  describe('Function: equals(objectOne, objectTwo)', () => {
    let a: any;
    beforeEach(() => {
      a = {
        id: 1,
        sub: {
          subSub: {
            id: 1,
          },
        },
      };
    });
    it('should return true when two objects are identical.', () => {
      expect(pipe.equals).toBeDefined();
      let b: any = a;
      expect(pipe.equals(a, b)).toBeTruthy();
    });
    it('should return false when two objects are not identical.', () => {
      let b: any = {
        id: 1,
        sub: {
          subSub: {
            id: 2,
          },
        },
      };
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals(a, b)).toBeFalsy();
    });
    it('should return false when either object is null.', () => {
      expect(pipe.equals).toBeDefined();
      expect(pipe.equals(a, null)).toBeFalsy();
    });
    it('should return true when both objects are NaN.', () => {
      expect(pipe.equals(NaN, NaN)).toBeTruthy();
    });
    it('should return false when object one is an array and object two is not.', () => {
      expect(pipe.equals([], {})).toBeFalsy();
    });
    it('should return false when two arrays are different lengths.', () => {
      expect(pipe.equals(['stuff', 'thing'], ['bears'])).toBeFalsy();
    });
    it('should return false when two arrays are the same length with different objects.', () => {
      expect(pipe.equals([{ bacon: 'burger' }], [{ bacon: 'buck' }])).toBeFalsy();
    });
    it('should return true when two arrays are the same.', () => {
      expect(pipe.equals([{ bacon: 'burger' }], [{ bacon: 'burger' }])).toBeTruthy();
    });
    it('should return false object one is not an array, but object two is.', () => {
      expect(pipe.equals({}, [])).toBeFalsy();
    });
  });

  describe('Function: render(value, args)', () => {
    it('should return text when there is no value or args.', () => {
      expect(pipe.render).toBeDefined();
      expect(pipe.render('Derp')).toBe('Derp');
      expect(pipe.render(null, 'Derp')).toBe(null);
    });
    it('should render an address.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = {
        address1: 'Derp',
        address2: '264 Hess Rd',
        city: 'Leola',
        state: 'PA',
        zip: '17540',
      };
      let mockArgs: any = {
        type: 'Address',
      };
      expect(pipe.render(mockValue, mockArgs)).toBe(mockValue);
    });
    // TODO: DateTime
    // WILL BREAK THE NEXT DAY
    xit('should render a timestamp.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = new Date();
      let mockArgs: any = {
        dataType: 'Timestamp',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toEqual('12/02/2016');
    });
    it('should render a timestamp with conversion skipped.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = new Date('5/10/2017 23:59:59').getTime();
      let mockArgs: any = {
        dataType: 'Timestamp',
        optionsType: 'skipConversion',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toEqual('5/10/2017');
    });
    // TODO: Phone/Email
    it('should render money.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = 123.56;
      let mockArgs: any = {
        dataSpecialization: 'MONEY',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toEqual('$123.56');
    });
    it('should render a percentage.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = 0.1556;
      let mockArgs: any = {
        dataSpecialization: 'PERCENTAGE',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toEqual('15.56%');
    });
    // TODO: Double/BigDecimal
    it('should render a Integer.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = 103;
      let mockArgs: any = {
        dataType: 'Integer',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe(103);
    });
    // TODO: Lead/Candidate/ClientContact/CorporateUser/Person
    // TODO: Opportunity/JobOrder
    // TODO: JobSubmission
    // TODO: WorkersCompensationRate
    it('should render a Options.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = 'John';
      let mockArgs: any = {
        inputType: 'SELECT',
        options: [
          {
            value: 'John',
            label: 'John Snow',
          },
        ],
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('John Snow');
    });
    it('should render a ToMany.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = {
        data: [
          {
            firstName: 'Jane',
            lastName: 'Smith',
          },
        ],
      };
      let mockArgs: any = {
        type: 'TO_MANY',
        associatedEntity: {
          entity: 'Candidate',
        },
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('Jane Smith');
    });
    it('should render a Country.', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = 1;
      let mockArgs: any = {
        optionsType: 'Country',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('United States');
    });
    it('should render a DistributionList', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'DistributionList',
        },
      };
      let mockValue: any = {
        name: 'distributionList',
        label: 'List of Cheese Farmers',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('List of Cheese Farmers');
    });
    it('should render a Tearsheet', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'Tearsheet',
        },
      };
      let mockValue: any = {
        name: 'tearsheet',
        label: 'ShortList of Cheese Farmers',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('ShortList of Cheese Farmers');
    });
    it('should render a Skill', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'Skill',
        },
      };
      let mockValue: any = {
        name: 'skill',
        label: 'Makes awesome cheese',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('Makes awesome cheese');
    });
    it('should render a Category', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'Category',
        },
      };
      let mockValue: any = {
        name: 'category',
        label: 'Cheese Making',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('Cheese Making');
    });
    it('should render a Business Sector', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'BusinessSector',
        },
      };
      let mockValue: any = {
        name: 'businessSector',
        label: 'Dairy',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('Dairy');
    });
    it('should render a Certification', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'Certification',
        },
      };
      let mockValue: any = {
        name: 'certification',
        label: 'CMP - Cheese Making Professional',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('CMP - Cheese Making Professional');
    });
    it('should render a ClientCorporation', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'ClientCorporation',
        },
      };
      let mockValue: any = {
        name: 'clientCorporation',
        label: 'Cheese R Us',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('Cheese R Us');
    });
    it('should render a CorporationDepartment', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'CorporationDepartment',
        },
      };
      let mockValue: any = {
        name: 'corporationDepartment',
        label: 'Bringers of Cheese',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('Bringers of Cheese');
    });
    // checking name conditional for TO_ONE
    it('should render a CorporationDepartment', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'CorporationDepartment',
        },
      };
      let mockValue: any = {
        name: 'corporationDepartment',
        label: '',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('corporationDepartment');
    });
    // checking blank conditional for TO_ONE
    it('should render a CorporationDepartment', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'CorporationDepartment',
        },
      };
      let mockValue: any = {
        name: '',
        label: '',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('');
    });
    it('should render a CandidateComment.', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'CandidateComment',
        },
      };
      let mockValue: any = {
        name: 'David S. Pumpkins',
        comments: 'I am so in the weeds with David Pumpkins!',
        dateLastModified: 1500999002330,
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('7/25/2017 (David S. Pumpkins) - I am so in the weeds with David Pumpkins!');
    });
    it('should render a CandidateComment.', () => {
      expect(pipe.render).toBeDefined();
      let mockArgs: any = {
        type: 'TO_ONE',
        associatedEntity: {
          entity: 'CandidateComment',
        },
      };
      let mockValue: any = {
        name: 'David S. Pumpkins',
        comments: '',
        dateLastModified: 1500999002330,
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('');
    });
    it('should render SkillText if array passed in', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = ['Skill1', 'Skill2', 'Skill3'];
      let mockArgs: any = {
        optionsType: 'SkillText',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('Skill1, Skill2, Skill3');
    });
    it('should render SkillText if array not passed in', () => {
      expect(pipe.render).toBeDefined();
      let mockValue: any = 'Skill1';
      let mockArgs: any = {
        optionsType: 'SkillText',
      };
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toBe('Skill1');
    });
    it('should render Html strings as sanitized Html content.', () => {
      let mockArgs: any = {
        type: 'SCALAR',
        dataType: 'String',
        dataSpecialization: 'HTML',
      };
      let mockValue: any = '<span style="color:#c0392b">Some Green Text</span>';
      let result: any = pipe.render(mockValue, mockArgs);
      expect(result).toEqual('TrustedHTML');
    });
  });

  describe('Function: ngOnDestroy()', () => {
    it('should be defined.', () => {
      expect(pipe.ngOnDestroy).toBeDefined();
    });
  });

  describe('Function: transform(value, args)', () => {
    it('should be defined.', () => {
      expect(pipe.transform).toBeDefined();
    });
  });

  describe('Function: concat(list, ...fields)', () => {
    it('should concatenate properties of the object being passed in.', () => {
      expect(pipe.concat).toBeDefined();
      let result: any = pipe.concat([{ firstName: 'Jane', lastName: 'Smith' }], 'firstName', 'lastName');
      expect(result).toBe('Jane Smith');
    });
  });

  describe('Function: options(value, list)', () => {
    it('should be defined.', () => {
      expect(pipe.options).toBeDefined();
    });
  });

  describe('Function: getNumberDecimalPlaces(number)', () => {
    it('should return 1 zero to the right of the decimal point when a whole number is passed in', () => {
      expect(pipe.getNumberDecimalPlaces(1)).toBe(1);
    });
    it('should return 1 zero to the right of the decimal point when the number passed in has 1 decimal place', () => {
      expect(pipe.getNumberDecimalPlaces(1.2)).toBe(1);
    });
    it('should return 2 zeroes to the right of the decimal point when the number passed in has 2 decimal places', () => {
      expect(pipe.getNumberDecimalPlaces(1.23)).toBe(2);
    });
    it('should return 3 zeroes to the right of the decimal point when the number passed in has 3 decimal places', () => {
      expect(pipe.getNumberDecimalPlaces(1.232)).toBe(3);
    });
    it('should return 4 zeroes to the right of the decimal point when the number passed in has 4 decimal places', () => {
      expect(pipe.getNumberDecimalPlaces(1.2323)).toBe(4);
    });
    it('should return 4 zeroes to the right of the decimal point when the number passed in has more than 4 decimal places', () => {
      expect(pipe.getNumberDecimalPlaces(1.232324)).toBe(6);
    });
    it('should return 2 zeroes to the right of the decimal point when the number passed in has 3 decimal places and one is non-numeric', () => {
      expect(pipe.getNumberDecimalPlaces('1.23o')).toBe(2);
    });
  });

  describe('Function: capitalize(string)', () => {
    it('should capitalize a string.', () => {
      expect(pipe.capitalize).toBeDefined();
      expect(pipe.capitalize('hello world!')).toBe('Hello world!');
    });
  });
});
