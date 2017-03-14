// NG2
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { QuickNoteElement } from './QuickNote';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';

describe('Elements: QuickNoteElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                QuickNoteElement
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: ComponentUtils, useClass: ComponentUtils }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(QuickNoteElement);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });
});
