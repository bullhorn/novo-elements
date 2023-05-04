// NG2
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoCheckboxElement } from './Checkbox';

describe('Elements: NovoCheckboxElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoCheckboxElement],
      imports: [FormsModule],
      providers: [
        // { provide: NovoLabelService, useClass: NovoLabelService }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoCheckboxElement);
    component = fixture.debugElement.componentInstance;
  }));
  it('should initialize correctly.', () => {
    expect(component).toBeDefined();
  });
});
