import { TestBed } from '@angular/core/testing';
import { NovoHeaderComponent } from './Header';
import { NovoHeaderModule } from './Header.module';

describe('Elements: NovoHeaderElement', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NovoHeaderModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoHeaderComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
