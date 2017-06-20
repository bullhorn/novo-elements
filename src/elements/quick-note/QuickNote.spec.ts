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
    let mockResults;

    class MockQuickNoteResults {
        public instance: any = this;
        public element: any = null;
        public parentComponent: any = null;
        public visible: boolean = false;
        public taggingMode: string = 'person';
        public selectedIndex: number = 0; // 0 = nothing is selected
        public selectedValue: any = { value: 'j.bullhorn', label: 'John Bullhorn' };
        public nativeElementProperties: any = {};

        constructor(parentComponent: any) {
            this.parentComponent = parentComponent;

            // Mock out the native element
            this.element = {
                nativeElement: {
                    style: {
                        setProperty: (property: string, value: string): void => {
                            this.nativeElementProperties[property] = value;
                        }
                    }
                }
            };
        }

        prevActiveMatch(): void {
            this.selectedIndex--;
        }

        nextActiveMatch(): void {
            this.selectedIndex++;
        }

        selectActiveMatch(): void {
            // Call onSelected and hideResults on the parent, if a match is selected,
            // just like the real QuickNoteResults
            if (this.selectedIndex) {
                this.parentComponent.onSelected(this.taggingMode, this.selectedValue);
                this.parentComponent.hideResults();
            }
            component.hideResults();
        }

        destroy(): void {
            this.visible = false;
            this.selectedIndex = 0;
        }
    }

    class MockComponentUtils {
        appendNextToLocation() {
            mockResults.visible = true;
            return mockResults;
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

        // Create the mock results dropdown
        mockResults = new MockQuickNoteResults(component);

        /**
         * CKEditor mock instance.
         *
         * Call valueSetByUser to simulate a user pasting text into the CKEditor and replacing all the existing text.
         * Call keyEnteredByUser to simulate a user pressing a key in CKEditor.
         * Call userPausedAfterEntry to simulate a user waiting for the keystrokes to be picked up.
         */
        ckEditorInstance = {
            isPlaceholderVisible: () => this.placeholderVisible,
            config: {
                height: 200
            },
            keyEnteredByUser: (key: string, keyCode: number): void => {
                // Add the character to the editorValue if it's a character
                if (key.length === 1) {
                    this.editorValue += key;
                }
                // Return the CKEditor key event object
                this.keyEvent({
                    data: {
                        domEvent: {
                            $: { // The native element
                                key: key,
                                keyCode: keyCode
                            }
                        }
                    },
                    cancel: () => {}
                });
            },
            blurByUser: (): void => {
                this.blurEvent({});
            },
            focusByUser: (): void => {
                this.focusEvent({});
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
                } else if (name === 'blur') {
                    this.blurEvent = callback;
                } else if (name === 'focus') {
                    this.focusEvent = callback;
                } else if (name === 'instanceReady') {
                    // Immediately invoke the instanceReady callback
                    callback({});
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
                                getParent: () => {
                                    return {
                                        getHtml: () => this.editorValue,
                                        setHtml: (html) => {
                                            this.editorValue = html;
                                        }
                                    };
                                },
                                getText: () => '@john',
                                type: 3, // CKEDITOR.NODE_TEXT
                                $: { // The native element
                                    parentElement: {
                                        offsetTop: 100,
                                        offsetLeft: 0
                                    }
                                }
                            },
                            startOffset: 5,
                            moveToPosition: () => {}
                        }];
                    },
                    selectRanges: () => {}
                };
            },
            editable: (): any => {
                return {
                    $: { // The native element
                        scrollTop: 50,
                        scrollLeft: 0
                    },
                    getParent: (): any => {
                        return {
                            $: { // The native element
                                appendChild: (node) => {
                                    this.placeholderVisible = true;
                                },
                                removeChild: (node) => {
                                    this.placeholderVisible = false;
                                }
                            },
                        };
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

            expect(mockResults.visible).toBe(false);
            expect(mockResults.nativeElementProperties).toEqual({});

            ckEditorInstance.userPausedAfterEntry();

            expect(mockResults.visible).toBe(true);
            expect(mockResults.nativeElementProperties).toEqual({'margin-top': '120px'});
            expect(parentForm.getValue()).toEqual({
                note: 'Note about: @john',
                references: {}
            });

            ckEditorInstance.keyEnteredByUser('DownArrow', KeyCodes.DOWN);
            ckEditorInstance.keyEnteredByUser('Enter', KeyCodes.ENTER);

            expect(parentForm.getValue()).toEqual({
                note: 'Note about: <a href=\"http://www.bullhorn.com\">@John Bullhorn</a> ',
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

            expect(mockResults.visible).toBe(true);
            expect(mockResults.selectedIndex).toBe(0);

            ckEditorInstance.keyEnteredByUser('DownArrow', KeyCodes.DOWN);
            ckEditorInstance.keyEnteredByUser('DownArrow', KeyCodes.DOWN);

            expect(mockResults.visible).toBe(true);
            expect(mockResults.selectedIndex).toBe(2);

            ckEditorInstance.keyEnteredByUser('UpArrow', KeyCodes.UP);

            expect(mockResults.visible).toBe(true);
            expect(mockResults.selectedIndex).toBe(1);

            ckEditorInstance.keyEnteredByUser('Escape', KeyCodes.ESC);

            expect(mockResults.visible).toBe(false);

            ckEditorInstance.keyEnteredByUser('@');
            ckEditorInstance.userPausedAfterEntry();

            expect(mockResults.visible).toBe(true);
            expect(mockResults.selectedIndex).toBe(0);

            ckEditorInstance.keyEnteredByUser('Enter', KeyCodes.ENTER);

            expect(mockResults.visible).toBe(false);
        }));

        it('should show/hide placeholder text properly.', fakeAsync(() => {
            ckEditorInstance.valueSetByUser('');

            expect(ckEditorInstance.isPlaceholderVisible()).toBe(true);

            ckEditorInstance.focusByUser();

            expect(ckEditorInstance.isPlaceholderVisible()).toBe(false);

            ckEditorInstance.blurByUser();

            expect(ckEditorInstance.isPlaceholderVisible()).toBe(true);

            ckEditorInstance.focusByUser();
            ckEditorInstance.valueSetByUser('.');
            ckEditorInstance.blurByUser();

            expect(ckEditorInstance.isPlaceholderVisible()).toBe(false);

            ckEditorInstance.focusByUser();
            ckEditorInstance.valueSetByUser('');
            ckEditorInstance.blurByUser();

            expect(ckEditorInstance.isPlaceholderVisible()).toBe(true);
        }));
    });
});
