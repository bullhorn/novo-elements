// NG2
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ComponentUtils } from 'novo-elements/services';
import { Key, KeyCodes } from 'novo-elements/utils';
// App
import { QuickNoteElement } from './QuickNote';

declare global {
  interface Window {
    CKEDITOR: any;
  }
}

describe('Elements: QuickNoteElement', () => {
  // Mocks and fakes used in the tests
  let fixture;
  let component;
  let fakeParentForm;
  let fakeCkEditorInstance;
  let fakeResultsDropdown;

  /**
   * A fake QuickNoteResults dropdown that provides behavior that mimics enough of the real dropdown for testing.
   */
  class FakeQuickNoteResults {
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

      // Create a fake nativeElement that captures the properties that are set on it.
      this.element = {
        nativeElement: {
          style: {
            setProperty: (property: string, value: string): void => {
              this.nativeElementProperties[property] = value;
            },
          },
        },
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

  /**
   * A fake component utils that is injected in order to return a fake results dropdown.
   */
  class FakeComponentUtils {
    appendNextToLocation() {
      fakeResultsDropdown.visible = true;
      return fakeResultsDropdown;
    }
    append() {
      fakeResultsDropdown.visible = true;
      return fakeResultsDropdown;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickNoteElement],
      imports: [FormsModule],
      providers: [{ provide: ComponentUtils, useClass: FakeComponentUtils }],
    }).compileComponents();
    fixture = TestBed.createComponent(QuickNoteElement);
    component = fixture.debugElement.componentInstance;

    // Create a config for tagging persons using '@'
    component.config = {
      triggers: {
        person: '@',
      },
      options: {
        person: ['John Bullhorn', 'Jane Bullhorn', 'Bob Bullhorn'],
      },
      renderer: {
        person: (symbol: string, item: any): string => {
          return `<a href="http://www.bullhorn.com">${symbol}${item.label}</a>`;
        },
      },
    };

    // Create a fake results dropdown
    fakeResultsDropdown = new FakeQuickNoteResults(component);

    /**
     * A fake CKEditor instance that allows simulating user input and testing changes from the component.
     *
     * Call valueSetByUser to simulate a user pasting text into the CKEditor and replacing all the existing text.
     * Call keyEnteredByUser to simulate a user pressing a key in CKEditor.
     * Call userPausedAfterEntry to simulate a user waiting for the keystrokes to be picked up.
     */
    fakeCkEditorInstance = {
      isPlaceholderVisible: function () {
        return this.placeholderVisible;
      },
      ui: { contentsElement: { $: { style: { cssText: 'height: 200px;' } } } },
      keyEnteredByUser: function (key: string, keyCode: number): void {
        if (key === 'Backspace') {
          this.editorValue = this.editorValue.slice(0, -1);
          this.currentWord = this.currentWord.slice(0, -1);
        }
        // Add the character to the editorValue if it's a character
        if (key.length === 1) {
          this.editorValue += key;
          this.currentWord += key;
        }
        // Return the CKEditor key event object
        this.keyEvent({
          data: {
            domEvent: {
              $: {
                // The native element
                key,
                keyCode,
              },
            },
          },
          cancel: function () {},
        });
      },
      blurByUser: function (): void {
        this.blurEvent({});
      },
      focusByUser: function (): void {
        this.focusEvent({});
      },
      valueSetByUser: function (value: string): void {
        // Call the changeEvent callback and simulate enough time for the debounce to occur
        this.editorValue = value;
        this.currentWord = '';
        this.previousWord = value;
        this.changeEvent();
        tick(251);
      },
      userPausedAfterEntry: function (): void {
        this.changeEvent();
        tick(251);
      },
      on: function (name: string, callback: any): void {
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
      getData: function (): any {
        return this.editorValue;
      },
      setData: function (model: any): void {
        this.editorValue = model;
      },
      getSelection: function (): any {
        return {
          getRanges: function () {
            return [
              {
                startContainer: {
                  getParent: function () {
                    return {
                      getHtml: function () {
                        return this.editorValue;
                      },
                      setHtml: function (html) {
                        this.editorValue = html;
                      },
                    };
                  },
                  getText: function () {
                    return this.currentWord;
                  },
                  type: 3, // CKEDITOR.NODE_TEXT
                  $: {
                    // The native element
                    parentElement: {
                      appendChild: function () {},
                    },
                  },
                  hasPrevious: function () {
                    return !!this.previousWord;
                  },
                  getPrevious: function () {
                    return {
                      getText: function () {
                        return this.previousWord;
                      },
                    };
                  },
                },
                startOffset: this.currentWord.length,
                moveToPosition: function () {},
              },
            ];
          },
          selectRanges: function () {},
        };
      },
      editable: function (): any {
        return {
          $: {
            // The native element
            scrollTop: 50,
            scrollLeft: 0,
          },
          getParent: function (): any {
            return {
              $: {
                // The native element
                appendChild: function (node) {
                  this.placeholderVisible = true;
                },
                removeChild: function (node) {
                  this.placeholderVisible = false;
                },
              },
            };
          },
        };
      },
      document: {
        getBody: function (): any {
          return {
            getHtml: function (): string {
              return this.editorValue;
            },
          };
        },
      },
      focusManager: {
        blur: function (): void {},
      },
      removeAllListeners: function (): void {},
      destroy: function (): void {},
      name: 'instance',
    };

    // Create a fake CKEDITOR global object that returns the fake CKEditor instance.
    window.CKEDITOR = {
      NODE_TEXT: 3,
      replace: () => {
        return fakeCkEditorInstance;
      },
      instances: {
        instance: {
          destroy: () => {},
        },
      },
    };

    // Initialize the component
    component.ngOnInit();
    component.ngAfterViewInit();

    // Create a fake parent form that this component is a part of - the form use ngModel to propagate up changes.
    fakeParentForm = {
      getValue: function (): any {
        return this.value;
      },
      onModelChange: function (value: any): void {
        this.value = value;
      },
      onModelTouched: function (): void {
        this.touchCount = this.touchCount ? this.touchCount++ : 0;
      },
    };

    // Initialize the component inside of the fake parent form
    component.registerOnChange(fakeParentForm.onModelChange);
    component.registerOnTouched(fakeParentForm.onModelTouched);
  });

  xdescribe('QuickNote Functionality', () => {
    it('should add the selected item to the list of references and populate note.', fakeAsync(() => {
      fakeCkEditorInstance.valueSetByUser('Note about: ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.keyEnteredByUser('o');
      fakeCkEditorInstance.keyEnteredByUser('h');
      fakeCkEditorInstance.keyEnteredByUser('n');

      expect(fakeResultsDropdown.visible).toBe(false);
      expect(fakeResultsDropdown.nativeElementProperties).toEqual({});

      fakeCkEditorInstance.userPausedAfterEntry();

      expect(fakeResultsDropdown.visible).toBe(true);
      expect(fakeResultsDropdown.nativeElementProperties).toEqual({ 'margin-top': '80px' });
      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: @john',
        references: {},
      });

      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);
      fakeCkEditorInstance.keyEnteredByUser(Key.Enter, KeyCodes.ENTER);

      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: <a href="http://www.bullhorn.com">@John Bullhorn</a> ',
        references: {
          person: [
            {
              value: 'j.bullhorn',
              label: 'John Bullhorn',
            },
          ],
        },
      });

      fakeCkEditorInstance.valueSetByUser('');

      expect(fakeParentForm.getValue()).toEqual(null);
    }));

    it('should remove references from the model when their rendered text is removed from the note.', fakeAsync(() => {
      fakeCkEditorInstance.valueSetByUser('Note about: ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.keyEnteredByUser('o');
      fakeCkEditorInstance.keyEnteredByUser('h');
      fakeCkEditorInstance.keyEnteredByUser('n');
      fakeCkEditorInstance.userPausedAfterEntry();
      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);
      fakeCkEditorInstance.keyEnteredByUser(Key.Enter, KeyCodes.ENTER);

      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: <a href="http://www.bullhorn.com">@John Bullhorn</a> ',
        references: {
          person: [
            {
              value: 'j.bullhorn',
              label: 'John Bullhorn',
            },
          ],
        },
      });

      fakeCkEditorInstance.valueSetByUser('Note about: ');

      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: ',
        references: {},
      });

      // Make sure that the model is set properly on the second time through
      fakeCkEditorInstance.valueSetByUser('Note about: ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.keyEnteredByUser('o');
      fakeCkEditorInstance.keyEnteredByUser('h');
      fakeCkEditorInstance.keyEnteredByUser('n');
      fakeCkEditorInstance.userPausedAfterEntry();
      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);
      fakeCkEditorInstance.keyEnteredByUser(Key.Enter, KeyCodes.ENTER);

      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: <a href="http://www.bullhorn.com">@John Bullhorn</a> ',
        references: {
          person: [
            {
              value: 'j.bullhorn',
              label: 'John Bullhorn',
            },
          ],
        },
      });
    }));

    it('should not add duplicate references to the model.', fakeAsync(() => {
      fakeCkEditorInstance.valueSetByUser('Note about: ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.keyEnteredByUser('o');
      fakeCkEditorInstance.keyEnteredByUser('h');
      fakeCkEditorInstance.keyEnteredByUser('n');
      fakeCkEditorInstance.userPausedAfterEntry();
      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);
      fakeCkEditorInstance.keyEnteredByUser(Key.Enter, KeyCodes.ENTER);

      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: <a href="http://www.bullhorn.com">@John Bullhorn</a> ',
        references: {
          person: [
            {
              value: 'j.bullhorn',
              label: 'John Bullhorn',
            },
          ],
        },
      });

      fakeCkEditorInstance.keyEnteredByUser(' ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.keyEnteredByUser('o');
      fakeCkEditorInstance.keyEnteredByUser('h');
      fakeCkEditorInstance.keyEnteredByUser('n');
      fakeCkEditorInstance.userPausedAfterEntry();
      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);
      fakeCkEditorInstance.keyEnteredByUser(Key.Enter, KeyCodes.ENTER);

      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: <a href="http://www.bullhorn.com">@John Bullhorn</a>  <a href="http://www.bullhorn.com">@John Bullhorn</a> ',
        references: {
          person: [
            {
              value: 'j.bullhorn',
              label: 'John Bullhorn',
            },
          ],
        },
      });
    }));

    it('should handle some keyboard events within resultsComponent.', fakeAsync(() => {
      fakeCkEditorInstance.valueSetByUser('Note about: ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.userPausedAfterEntry();

      expect(fakeResultsDropdown.visible).toBe(true);
      expect(fakeResultsDropdown.selectedIndex).toBe(0);

      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);
      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);

      expect(fakeResultsDropdown.visible).toBe(true);
      expect(fakeResultsDropdown.selectedIndex).toBe(2);

      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowUp, KeyCodes.UP);

      expect(fakeResultsDropdown.visible).toBe(true);
      expect(fakeResultsDropdown.selectedIndex).toBe(1);

      fakeCkEditorInstance.keyEnteredByUser(Key.Escape, KeyCodes.ESC);

      expect(fakeResultsDropdown.visible).toBe(false);

      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.userPausedAfterEntry();

      expect(fakeResultsDropdown.visible).toBe(false);

      fakeCkEditorInstance.keyEnteredByUser(' ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.userPausedAfterEntry();

      expect(fakeResultsDropdown.visible).toBe(true);
      expect(fakeResultsDropdown.selectedIndex).toBe(0);
      fakeCkEditorInstance.keyEnteredByUser(Key.Enter, KeyCodes.ENTER);

      expect(fakeResultsDropdown.visible).toBe(false);
    }));

    it('should hide resultsComponent when @ is backspaced over.', fakeAsync(() => {
      fakeCkEditorInstance.valueSetByUser('Note about: ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.userPausedAfterEntry();

      expect(fakeResultsDropdown.visible).toBe(true);

      fakeCkEditorInstance.keyEnteredByUser('Backspace', KeyCodes.BACKSPACE);
      fakeCkEditorInstance.keyEnteredByUser('Backspace', KeyCodes.BACKSPACE);
      fakeCkEditorInstance.userPausedAfterEntry();

      expect(fakeResultsDropdown.visible).toBe(false);

      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.userPausedAfterEntry();

      expect(fakeResultsDropdown.visible).toBe(true);
    }));

    it('should handle searching with spaces.', fakeAsync(() => {
      fakeCkEditorInstance.valueSetByUser('Note about: ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.keyEnteredByUser('o');
      fakeCkEditorInstance.keyEnteredByUser('h');
      fakeCkEditorInstance.keyEnteredByUser('n');
      fakeCkEditorInstance.keyEnteredByUser(' ');
      fakeCkEditorInstance.keyEnteredByUser('b');
      fakeCkEditorInstance.keyEnteredByUser('u');
      fakeCkEditorInstance.userPausedAfterEntry();
      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);
      fakeCkEditorInstance.keyEnteredByUser(Key.Enter, KeyCodes.ENTER);

      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: <a href="http://www.bullhorn.com">@John Bullhorn</a> ',
        references: {
          person: [
            {
              value: 'j.bullhorn',
              label: 'John Bullhorn',
            },
          ],
        },
      });
    }));

    it('should handle searching with a space afterwards.', fakeAsync(() => {
      fakeCkEditorInstance.valueSetByUser('Note about: ');
      fakeCkEditorInstance.keyEnteredByUser('@');
      fakeCkEditorInstance.keyEnteredByUser('j');
      fakeCkEditorInstance.keyEnteredByUser('o');
      fakeCkEditorInstance.keyEnteredByUser('h');
      fakeCkEditorInstance.keyEnteredByUser('n');
      fakeCkEditorInstance.keyEnteredByUser(' ');
      fakeCkEditorInstance.userPausedAfterEntry();
      fakeCkEditorInstance.keyEnteredByUser(Key.ArrowDown, KeyCodes.DOWN);
      fakeCkEditorInstance.keyEnteredByUser(Key.Enter, KeyCodes.ENTER);

      expect(fakeParentForm.getValue()).toEqual({
        note: 'Note about: <a href="http://www.bullhorn.com">@John Bullhorn</a>  ',
        references: {
          person: [
            {
              value: 'j.bullhorn',
              label: 'John Bullhorn',
            },
          ],
        },
      });
    }));

    it('should show/hide placeholder text properly.', fakeAsync(() => {
      fakeCkEditorInstance.valueSetByUser('');

      expect(fakeCkEditorInstance.isPlaceholderVisible()).toBe(true);

      fakeCkEditorInstance.focusByUser();

      expect(fakeCkEditorInstance.isPlaceholderVisible()).toBe(false);

      fakeCkEditorInstance.blurByUser();

      expect(fakeCkEditorInstance.isPlaceholderVisible()).toBe(true);

      fakeCkEditorInstance.focusByUser();
      fakeCkEditorInstance.valueSetByUser('.');
      fakeCkEditorInstance.blurByUser();

      expect(fakeCkEditorInstance.isPlaceholderVisible()).toBe(false);

      fakeCkEditorInstance.focusByUser();
      fakeCkEditorInstance.valueSetByUser('');
      fakeCkEditorInstance.blurByUser();

      expect(fakeCkEditorInstance.isPlaceholderVisible()).toBe(true);
    }));
  });
});
