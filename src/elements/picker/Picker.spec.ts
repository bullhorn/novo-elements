// NG2
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { NovoPickerContainer, NovoPickerElement } from './Picker';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';

describe('Elements: NovoPickerContainer', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoPickerContainer
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoPickerContainer);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});

describe('Elements: NovoPickerElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoPickerElement,
                NovoPickerContainer
            ],
            providers: [
                { provide: ComponentUtils, useClass: ComponentUtils }
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoPickerElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
