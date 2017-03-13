// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoHeaderElement } from './Header';

describe('Elements: NovoHeaderElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoHeaderElement
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoHeaderElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
