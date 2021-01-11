// NG2
import { async, TestBed } from '@angular/core/testing';
// App
import { NovoHeaderComponent } from './Header';

describe('Elements: NovoHeaderElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoHeaderComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoHeaderComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
});
