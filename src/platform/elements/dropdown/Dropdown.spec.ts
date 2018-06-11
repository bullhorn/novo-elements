// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDropdownElement, NovoDropdownContainer } from './Dropdown';

describe('Elements: NovoDropdownElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        window.removeEventListener = () => {};
        TestBed.configureTestingModule({
            declarations: [
                NovoDropdownElement,
                NovoDropdownContainer
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDropdownElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
