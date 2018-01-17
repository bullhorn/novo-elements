import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { NovoCardComponent } from './card.component';
import { NovoCardModule } from './card.module';

describe('Component: NovoCardComponent', () => {
  let fixture: ComponentFixture<NovoCardComponent>;
  let component: NovoCardComponent;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [NovoCardModule],
      }).compileComponents();
      fixture = TestBed.createComponent(NovoCardComponent);
      component = fixture.debugElement.componentInstance;
    }),
  );

  it('should create component', () => {
    expect(component).toBeDefined();
    expect(component._useClassName).toBeTruthy();
  });
});
