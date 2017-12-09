// NG2
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NovoLoadingComponent } from './loading.component';
import { NovoLoadingModule } from './loading.module';

describe('Component: NovoLoadingComponent', () => {
  let fixture: ComponentFixture<NovoLoadingComponent>;
  let component: NovoLoadingComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NovoLoadingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoLoadingComponent);
    component = fixture.debugElement.componentInstance;
  }));
  it('should work', () => {
    expect(component).toBeTruthy();
  });
});
