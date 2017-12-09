import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { NovoHeaderComponent } from './header.component';
import { NovoHeaderModule } from './header.module';

describe('Component: NovoHeaderComponent', () => {
  let fixture: ComponentFixture<NovoHeaderComponent>;
  let component: NovoHeaderComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NovoHeaderModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoHeaderComponent);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: ngOnInit()', () => {
    it('should setup the iconClass if icon is passed', () => {
      component.icon = 'test';
      component.ngOnInit();
      expect(component.iconClass).toBe('bhi-test');
    });
  });
});
