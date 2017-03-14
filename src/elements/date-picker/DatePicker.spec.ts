// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDatePickerElement } from './DatePicker';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoDatePickerElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDatePickerElement
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDatePickerElement);
        component = fixture.debugElement.componentInstance;
    }));

    describe('Method: ngOnInit()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
        });
    });
});
