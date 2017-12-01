// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { CardTimelineElement } from './CardTimeline';

describe('Elements: CardElement', () => {
    describe('Extras: CardTimelineElement: ', () => {
        let fixture;
        let component;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    CardTimelineElement
                ]
            }).compileComponents();
            fixture = TestBed.createComponent(CardTimelineElement);
            component = fixture.debugElement.componentInstance;
        }));

        describe('Method: ngOnChanges()', () => {
            it('should initialize correctly', () => {
                expect(component).toBeTruthy();
            });
        });
    });
});
