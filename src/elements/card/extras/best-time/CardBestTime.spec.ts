// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { CardBestTimeElement } from './CardBestTime';

describe('Elements: CardElement', () => {
    describe('Extras: CardBestTimeElement: ', () => {
        let fixture;
        let component;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    CardBestTimeElement
                ]
            }).compileComponents();
            fixture = TestBed.createComponent(CardBestTimeElement);
            component = fixture.debugElement.componentInstance;
        }));

        describe('Method: ngOnChanges()', () => {
            it('should initialize correctly', () => {
                expect(component).toBeTruthy();
                expect(component.ngOnChanges).toBeDefined();
            });
        });

        describe('Method: getTimeOfDayStyleAndIcon()', () => {
            it('should be defined.', () => {
                expect(component.getTimeOfDayStyleAndIcon).toBeDefined();
            });
        });
    });
});
