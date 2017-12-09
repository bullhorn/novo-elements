import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { NovoValueComponent } from './value.component';
// import { NovoLabelService } from '../../services/novo-label-service';
import { NovoValueModule } from './value.module';

// TODO fix specs
describe('Elements: NovoValueComponent', () => {
  let fixture: ComponentFixture<NovoValueComponent>;
  let component: NovoValueComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NovoValueModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoValueComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });

});
