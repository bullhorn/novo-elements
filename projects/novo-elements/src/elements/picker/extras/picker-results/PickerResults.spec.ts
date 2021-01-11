// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoListModule } from '../../../list/List.module';
import { NovoLoadingElement } from '../../../loading/Loading';
// App
import { PickerResults } from './PickerResults';

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
