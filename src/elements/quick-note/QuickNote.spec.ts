// NG2
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { QuickNoteElement } from './QuickNote';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';

describe('Elements: QuickNoteElement', () => {
    let fixture;
    let component;

    class MockComponentUtils {
        appendNextToLocation() {
            return {
                instance: {
                    prevActiveMatch: () => {},
                    nextActiveMatch: () => {},
                    selectActiveMatch: () => {}
                },
                destroy: () => {}
            };
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                QuickNoteElement
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: ComponentUtils, useClass: MockComponentUtils }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(QuickNoteElement);
        component = fixture.debugElement.componentInstance;

        component.config = {
            triggers: {
                person: '@'
            },
            options: {
                person: ['John Bullhorn', 'TEST_LABEL_2']
            },
            renderer: {
                person: (symbol, item) => {
                    return `<a href="http://www.bullhorn.com">${symbol}${item.label}</a>`;
                }
            }
        };

        // Mock out CKEDITOR global variable
        window['CKEDITOR'] = { NODE_TEXT: 3 };

        // Mock out the necessary CKEditor instance calls
        component.instance = {
            getSelection: () => {
                return {
                    getRanges: () => {
                        return [{
                            startContainer: {
                                getText: () => '@john',
                                type: 3 // CKEDITOR.NODE_TEXT
                            },
                            startOffset: 5
                        }];
                    }
                };
            },
            getData: () => '<p>Note about: @john</p>',
            setData: (model) => {
                component.writeValue(model);
            },
            removeAllListeners: () => {
            },
            destroy: () => {
            }
        };

        // Initialize to an empty model
        component.writeValue('');

        // Initialize the state of the keyboard entry to match the range returned by CKEditor
        component.onKey({ key: '@' });
        component.onKey({ key: 'j' });
        component.onKey({ key: 'o' });
        component.onKey({ key: 'h' });
        component.onKey({ key: 'n' });
        component.onValueChange();
    }));

    it('should initialize correctly', () => {
        expect(component).toBeTruthy();
    });

    describe('Method: showResults()', () => {
        it('should be defined.', () => {
            expect(component.showResults).toBeDefined();
            component.showResults();
        });
    });

    describe('Method: hideResults()', () => {
        it('should be defined.', () => {
            expect(component.hideResults).toBeDefined();
            component.hideResults();
        });
    });

    describe('Method: onSelected(taggingMode, selected)', () => {
        let taggingMode = 'person';
        let selected = { value: 'j.bullhorn', label: 'John Bullhorn' };

        it('should add the selected item to the list of references and populate note.', () => {
            expect(component.onSelected).toBeDefined();
            component.onSelected(taggingMode, selected);
            expect(component.model).toEqual({
                note: '<p>Note about: <a href=\"http://www.bullhorn.com\">@John Bullhorn</a></p>',
                references: {
                    person: [{
                        value: 'j.bullhorn',
                        label: 'John Bullhorn'
                    }]
                }
            });
        });
    });

    describe('Method: get searchTerm()', () => {
        it('should return the current word minus the tag.', () => {
            expect(component.searchTerm).toBeDefined();
            expect(component.searchTerm).toEqual('john');
        });
    });

    describe('Method: getWordAtCursor()', () => {
        it('should return the word at the cursor.', () => {
            expect(component.getWordAtCursor).toBeDefined();
            expect(component.getWordAtCursor()).toEqual('@john');
        });
    });
});
