// NG2
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
// App
import { QuickNoteElement } from './QuickNote';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';

describe('Elements: QuickNoteElement', () => {
    // Mocks used in the tests
    let fixture;
    let component;
    let parentForm;
    let ckEditorInstance;

    // Variables used in the mocks
    let resultsComponentShown = false;
    let resultsDropdownSelectedIndex = 0; // 0 = nothing is selected
    let taggingMode = 'person';
    let selected = { value: 'j.bullhorn', label: 'John Bullhorn' };

    // QuickNoteResults Mock
    class MockComponentUtils {
        appendNextToLocation() {
            resultsComponentShown = true;
            return {
                instance: {
                    prevActiveMatch: (): void => {
                        resultsDropdownSelectedIndex--;
                    },
                    nextActiveMatch: (): void => {
                        resultsDropdownSelectedIndex++;
                    },
                    selectActiveMatch: (): void => {
                        // Call onSelected and hideResults on the parent, if a match is selected,
                        // just like the real QuickNoteResults
                        if (resultsDropdownSelectedIndex) {
                            component.onSelected(taggingMode, selected);
                            component.hideResults();
                        }

                        component.hideResults();
                    }
                },
                destroy: (): void => {
                    resultsComponentShown = false;
                    resultsDropdownSelectedIndex = 0;
                }
            };
        }
    }

    beforeEach(() => {
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

        // Create a config for tagging persons using '@'
        component.config = {
            triggers: {
                person: '@'
            },
            options: {
                person: ['John Bullhorn', 'Jane Bullhorn', 'Bob Bullhorn']
            },
            renderer: {
                person: (symbol: string, item: any): string => {
                    return `<a href="http://www.bullhorn.com">${symbol}${item.label}</a>`;
                }
            }
        };

        /**
         * CKEditor mock instance.
         *
         * Call valueSetByUser to simulate a user pasting text into the CKEditor and replacing all the existing text.
         * Call keyEnteredByUser to simulate a user pressing a key in CKEditor.
         * Call userPausedAfterEntry to simulate a user waiting for the keystrokes to be picked up.
         */
        ckEditorInstance = {
            keyEnteredByUser: (key: string, keyCode: number): void => {
                // Add the character to the editorValue if it's a character
                if (key.length === 1) {
                    this.editorValue += key;
                }
                // Return the CKEditor key event object
                this.keyEvent({
                    data: {
                        domEvent: {
                            $: {
                                key: key,
                                keyCode: keyCode
                            }
                        }
                    },
                    cancel: () => {}
                });
            },
            valueSetByUser: (value: string): void => {
                // Call the changeEvent callback and simulate enough time for the debounce to occur
                this.editorValue = value;
                this.changeEvent();
                tick(251);
            },
            userPausedAfterEntry: (): void => {
                this.changeEvent();
                tick(251);
            },
            on: (name: string, callback: any): void => {
                if (name === 'key') {
                    this.keyEvent = callback;
                } else if (name === 'change') {
                    this.changeEvent = callback;
                }
            },
            getData: (): any => {
                return this.editorValue;
            },
            setData: (model: any): void => {
                this.editorValue = model;
            },
            getSelection: (): any => {
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
            removeAllListeners: (): void => {
            },
            destroy: (): void => {
            }
        };

        // Mock out CKEDITOR global object that returns the CKEditor test instance
        window['CKEDITOR'] = {
            NODE_TEXT: 3,
            replace: () => {
                return ckEditorInstance;
            }
        };

        // Mock out the form that this element is a part of - forms use ngModel
        parentForm = {
            getValue: (): any => this.value,
            onModelChange: (value: any): void => {
                this.value = value;
            },
            onModelTouched: (): void => {
                this.touchCount = this.touchCount ? this.touchCount++ : 0;
            }
        };

        // Initialize the component
        component.ngOnInit();
        component.ngAfterViewInit();

        // Initialize the component within the mock parent form
        component.registerOnChange(parentForm.onModelChange);
        component.registerOnTouched(parentForm.onModelTouched);
    });

    afterAll(fakeAsync(() => {
        component.ngOnDestroy();
    }));

    describe('QuickNote Functionality', () => {

        it('should add the selected item to the list of references and populate note.', fakeAsync(() => {
            ckEditorInstance.valueSetByUser('Note about: ');
            ckEditorInstance.keyEnteredByUser('@');
            ckEditorInstance.keyEnteredByUser('j');
            ckEditorInstance.keyEnteredByUser('o');
            ckEditorInstance.keyEnteredByUser('h');
            ckEditorInstance.keyEnteredByUser('n');

            expect(resultsComponentShown).toBe(false);

            ckEditorInstance.userPausedAfterEntry();

            expect(resultsComponentShown).toBe(true);
            expect(parentForm.getValue()).toEqual({
                note: 'Note about: @john',
                references: {}
            });

            ckEditorInstance.keyEnteredByUser('DownArrow', KeyCodes.DOWN);
            ckEditorInstance.keyEnteredByUser('Enter', KeyCodes.ENTER);

            expect(parentForm.getValue()).toEqual({
                note: 'Note about: <a href=\"http://www.bullhorn.com\">@John Bullhorn</a>',
                references: {
                    person: [{
                        value: 'j.bullhorn',
                        label: 'John Bullhorn'
                    }]
                }
            });

            ckEditorInstance.valueSetByUser('');

            expect(parentForm.getValue()).toEqual(null);
        }));

        it('should handle some keyboard events within resultsComponent.', fakeAsync(() => {
            ckEditorInstance.valueSetByUser('Note about: ');
            ckEditorInstance.keyEnteredByUser('@');
            ckEditorInstance.userPausedAfterEntry();

            expect(resultsComponentShown).toBe(true);
            expect(resultsDropdownSelectedIndex).toBe(0);

            ckEditorInstance.keyEnteredByUser('DownArrow', KeyCodes.DOWN);
            ckEditorInstance.keyEnteredByUser('DownArrow', KeyCodes.DOWN);

            expect(resultsComponentShown).toBe(true);
            expect(resultsDropdownSelectedIndex).toBe(2);

            ckEditorInstance.keyEnteredByUser('UpArrow', KeyCodes.UP);

            expect(resultsComponentShown).toBe(true);
            expect(resultsDropdownSelectedIndex).toBe(1);

            ckEditorInstance.keyEnteredByUser('Escape', KeyCodes.ESC);

            expect(resultsComponentShown).toBe(false);

            ckEditorInstance.keyEnteredByUser('@');
            ckEditorInstance.userPausedAfterEntry();

            expect(resultsComponentShown).toBe(true);
            expect(resultsDropdownSelectedIndex).toBe(0);

            ckEditorInstance.keyEnteredByUser('Enter', KeyCodes.ENTER);

            expect(resultsComponentShown).toBe(false);
        }));
    });
});
