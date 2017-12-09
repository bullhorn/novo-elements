// NG2
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// APP
import { NovoIconComponent } from './icon.component';
import { NovoIconModule } from './icon.module';

describe('Component: NovoIconComponent', () => {
    let fixture: ComponentFixture<NovoIconComponent>;
    let component: NovoIconComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NovoIconModule,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(NovoIconComponent);
        component = fixture.debugElement.componentInstance;
    }));

    describe('Method: ngAfterViewInit()', () => {
        it('should setup the iconClass if icon is passed as attribute', () => {
            component.name = 'test';
            component.ngAfterViewInit();
            expect(component.name).toBe('bhi-test');
        });

        it('should setup the iconClass if icon is passed as content', (done: Function) => {
            component.element.nativeElement.innerHTML = 'test';
            component.ngAfterViewInit();
            setTimeout(() => {
                // Need to wait for promise to resolve.
                expect(component.name).toBe('bhi-test');
                done();
            }, 10);
        });
    });
});
