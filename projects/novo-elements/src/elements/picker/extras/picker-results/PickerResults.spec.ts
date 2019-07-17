// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { PickerResults } from './PickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoLoadingElement } from '../../../loading/Loading';
import { NovoListModule } from '../../../list/List.module';

describe('Elements: PickerResults', () => {
  let fixture;
  let component: PickerResults;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NovoListModule],
      declarations: [PickerResults, NovoLoadingElement],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
    }).compileComponents();
    fixture = TestBed.createComponent(PickerResults);
    component = fixture.debugElement.componentInstance;
  }));

  it('should be defined.', () => {
    expect(component).toBeDefined();
  });

  describe('shouldShowMessageForZeroLengthSearch', () => {
    it('does not throw an error if config is not defined', () => {
      component.config = undefined;
      expect(() => component.shouldShowMessageForZeroLengthSearch()).not.toThrow();
    });
    it('returns true when it has a message and minSearchLength', () => {
      component.config = { minSearchLength: 0, emptyPickerMessage: 'this message brought to you by field interactions' };
      component.term = '';
      expect(component.shouldShowMessageForZeroLengthSearch()).toBeTruthy();
    });
  });

  describe('getEmptyMessage', () => {
    it('returns a emptyPickerMessage put on the config by field interactions if present & zero-length-term searching is enabled', () => {
      const emptyPickerMessage = 'this message brought to you by field interactions';
      component.config = { minSearchLength: 0, emptyPickerMessage };
      component.term = '';
      expect(component.getEmptyMessage()).toEqual(emptyPickerMessage);
    });
  });
});
