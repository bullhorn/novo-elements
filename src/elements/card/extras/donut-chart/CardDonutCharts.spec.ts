// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { CardDonutChartElement } from './CardDonutChart';

describe('Elements: CardElement', () => {
    describe('Extras: CardDonutChartElement: ', () => {
        let fixture;
        let component;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    CardDonutChartElement
                ]
            }).compileComponents();
            fixture = TestBed.createComponent(CardDonutChartElement);
            component = fixture.debugElement.componentInstance;
        }));

        describe('Method: ngOnInit()', () => {
            it('should initialize correctly', () => {
                expect(component).toBeTruthy();
            });
        });
    });
});
