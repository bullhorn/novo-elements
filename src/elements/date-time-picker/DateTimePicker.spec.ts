// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDateTimePickerElement } from './DateTimePicker';
import { NovoLabelService } from '../../services/novo-label-service';

describe('Elements: NovoDateTimePickerElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDateTimePickerElement
            ],
            providers: [
                { provide: NovoLabelService, useClass: NovoLabelService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDateTimePickerElement);
        component = fixture.debugElement.componentInstance;
    }));

    describe('Method: ngOnInit()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
        });
    });
});
