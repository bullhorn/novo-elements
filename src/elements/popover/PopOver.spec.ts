// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { PopOverDirective } from './PopOver';

xdescribe('Elements: PopOverDirective', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PopOverDirective
            ],
            imports: [PopOverDirective]
        }).compileComponents();
        fixture = TestBed.createComponent(PopOverDirective);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
