// NG2
import { TestBed, async } from '@angular/core/testing';
// APP
import { PopOverContent } from './PopOverContent';

describe('Elements: PopOverContent', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PopOverContent
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(PopOverContent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
