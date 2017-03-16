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

        component.config = {
            triggers: {},
            options: {}
        };
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });

    xdescribe('Method: ngOnInit(event)', () => {
        it('should be defined.', () => {
            expect(component.ngOnInit).toBeDefined();
            component.ngOnInit();
        });
    });

    describe('Method: onKeyPress(event)', () => {
        it('should be defined.', () => {
            expect(component.onKeyPress).toBeDefined();
            component.onKeyPress();
        });
    });

    xdescribe('Method: onChange(event)', () => {
        it('should be defined.', () => {
            expect(component.onChange).toBeDefined();
            component.onChange();
        });
    });

    describe('Method: onKeyUp(event)', () => {
        it('should be defined.', () => {
            expect(component.onKeyUp).toBeDefined();
            component.onKeyUp();
        });
    });

    xdescribe('Method: onScroll(event)', () => {
        it('should be defined.', () => {
            expect(component.onScroll).toBeDefined();
            component.onScroll();
        });
    });

    xdescribe('Method: updateFormattedNote(event)', () => {
        it('should be defined.', () => {
            expect(component.updateFormattedNote).toBeDefined();
            component.updateFormattedNote();
        });
    });

    xdescribe('Method: renderLink(event)', () => {
        it('should be defined.', () => {
            expect(component.renderLink).toBeDefined();
            component.renderLink();
        });
    });

    xdescribe('Method: extractSearchQuery(event)', () => {
        it('should be defined.', () => {
            expect(component.extractSearchQuery).toBeDefined();
            component.extractSearchQuery();
        });
    });

    describe('Method: onFocus(event)', () => {
        it('should be defined.', () => {
            expect(component.onFocus).toBeDefined();
            component.onFocus();
        });
    });

    describe('Method: showResults(event)', () => {
        it('should be defined.', () => {
            expect(component.showResults).toBeDefined();
            component.showResults();
        });
    });

    describe('Method: hideResults(event)', () => {
        it('should be defined.', () => {
            expect(component.hideResults).toBeDefined();
            component.hideResults();
        });
    });

    xdescribe('Method: onSelected(event)', () => {
        it('should be defined.', () => {
            expect(component.onSelected).toBeDefined();
            component.onSelected();
        });
    });

    xdescribe('Method: replaceLastOccurrence(event)', () => {
        it('should be defined.', () => {
            expect(component.replaceLastOccurrence).toBeDefined();
            component.replaceLastOccurrence();
        });
    });

    describe('Method: onTouched(event)', () => {
        it('should be defined.', () => {
            expect(component.onTouched).toBeDefined();
            component.onTouched();
        });
    });

    describe('Method: writeValue(event)', () => {
        it('should be defined.', () => {
            expect(component.writeValue).toBeDefined();
            component.writeValue();
        });
    });

    describe('Method: registerOnChange(event)', () => {
        it('should be defined.', () => {
            expect(component.registerOnChange).toBeDefined();
            component.registerOnChange();
        });
    });

    describe('Method: registerOnTouched(event)', () => {
        it('should be defined.', () => {
            expect(component.registerOnTouched).toBeDefined();
            component.registerOnTouched();
        });
    });

    xdescribe('Method: getCaretCoordinates(event)', () => {
        it('should be defined.', () => {
            expect(component.getCaretCoordinates).toBeDefined();
            component.getCaretCoordinates();
        });
    });
});
