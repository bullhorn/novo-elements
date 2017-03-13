// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoTimePickerElement } from './TimePicker';

describe('Elements: NovoTimePickerElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoTimePickerElement
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoTimePickerElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
