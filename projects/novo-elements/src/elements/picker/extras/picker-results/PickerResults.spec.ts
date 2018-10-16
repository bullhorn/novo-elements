// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { PickerResults } from './PickerResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoLoadingElement } from '../../../loading/Loading';
import { NovoListModule } from '../../../list/List.module';

describe('Elements: PickerResults', () => {
  let fixture;
  let component;

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
});
