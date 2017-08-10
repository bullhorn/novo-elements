// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoRadioLargeIconElement } from './RadioLargeIcon';
import { NovoButtonModule } from '../button/Button.module';

describe('Elements: NovoRadioLargeIconElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoRadioLargeIconElement
            ],
            imports: [
                NovoButtonModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoRadioLargeIconElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
