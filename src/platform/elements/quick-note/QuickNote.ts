// NG2
import {
  Component,
  EventEmitter,
  forwardRef,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  Input,
  Output,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// APP
import { OutsideClick } from './../../utils/outside-click/OutsideClick';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';
import { QuickNoteResults } from './extras/quick-note-results/QuickNoteResults';
import { ComponentUtils } from './../../utils/component-utils/ComponentUtils';

// Value accessor for the component (supports ngModel)
const QUICK_NOTE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QuickNoteElement),
  multi: true,
};

declare var CKEDITOR: any;

@Component({
  selector: 'novo-quick-note',
  providers: [QUICK_NOTE_VALUE_ACCESSOR],
  template: `
        <div class="quick-note-wrapper" #wrapper>
            <textarea #host></textarea>
            <span #results></span>
        </div>
    `,
})
export class QuickNoteElement extends OutsideClick implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('wrapper')
  public wrapper: ElementRef;
  @ViewChild('host')
  public host: ElementRef;
  @ViewChild('results', { read: ViewContainerRef })
  results: ViewContainerRef;

  @Input()
  config: any;
  @Input()
  startupFocus: boolean = false;
  @Input()
  placeholder: string;

  // Emitter for selects
  @Output()
  focus: EventEmitter<any> = new EventEmitter();
  @Output()
  blur: EventEmitter<any> = new EventEmitter();
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  // The characters that the user enters in order to search for a person/thing to tag
  private resultsComponent: any;
  private quickNoteResults: any;
  private isTagging: boolean;
  private taggingMode: string;
  private model: any;
  private ckeInstance: any;
  private debounceTimeout: any;
  private placeholderVisible: boolean = false;
  private _placeholderElement: any = null;

  private static TOOLBAR_HEIGHT = 40; // in pixels - configured by stylesheet

  private onModelChange: Function = () => {};
  private onModelTouched: Function = () => {};

  constructor(private zone: NgZone, element: ElementRef, private componentUtils: ComponentUtils) {
    super(element);
    // Bind to the active change event from the OutsideClick
    this.onActiveChange.subscribe((active) => {
      if (!active) {
        setTimeout(() => {
          this.hideResults();
        });
      }
    });
  }

  public ngOnInit(): void {
    // Make sure we have a proper config
    if (!this.config) {
      throw new Error('No config set for QuickNote!');
    }
    // Make sure that we have triggers
    if (!this.config.triggers) {
      throw new Error('QuickNote config must supply triggers!');
    }
    // Make sure that we have options
    if (!this.config.options) {
      throw new Error('QuickNote config must supply options!');
    }
    // Allow for callers to use a custom results template class in the config
    this.resultsComponent = this.config.resultsTemplate || QuickNoteResults;
  }

  public ngOnDestroy(): void {
    // Tear down the CKEditor instance
    if (this.ckeInstance) {
      this.ckeInstance.focusManager.blur(true); // Remove focus from editor
      setTimeout(() => {
        this.ckeInstance.removeAllListeners();
        CKEDITOR.instances[this.ckeInstance.name].destroy();
        this.ckeInstance.destroy();
        this.ckeInstance = null;
      });
    }
  }

  /**
   * Connect to key/mouse events from CKEditor after the editor has been initialized
   */
  public ngAfterViewInit(): void {
    if (!CKEDITOR) {
      console.error('Make sure to include CKEditor sources in your dependencies!');
      return;
    }

    // Replace the textarea with an instance of CKEditor
    this.ckeInstance = CKEDITOR.replace(this.host.nativeElement, this.getCKEditorConfig());

    // Set initial value of the note in the editor
    this.writeValue(this.model);

    // Connect to the key event in CKEditor for showing results dropdown
    this.ckeInstance.on('key', (event: any) => {
      if (!this.onKey(event.data.domEvent.$)) {
        event.cancel();
      }
    });

    // Connect to the change event in CKEditor for debouncing user modifications
    this.ckeInstance.on('change', () => {
      // Debounce update
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      this.debounceTimeout = setTimeout(() => {
        // Run within the context of this angular element since we don't need to cancel event
        this.zone.run(() => {
          this.onValueChange();
        });
        this.debounceTimeout = null;
      }, 250);
    });

    // Propagate blur events from CKEditor to the Element's listeners
    this.ckeInstance.on('blur', (event: any) => {
      this.showPlaceholder();
      this.blur.emit(event);
    });

    // Propagate blur events from CKEditor to the Element's listeners
    this.ckeInstance.on('focus', (event: any) => {
      this.hidePlaceholder();
      this.focus.emit(event);
    });

    // Show placeholder if the note is empty, after the editor is instantiated
    this.ckeInstance.on('instanceReady', (event: any) => {
      this.showPlaceholder();
    });
  }

  // Set touched on blur
  public onTouched(event?: any) {
    this.onModelTouched();
  }

  /**
   * Handles setting the model and the view from the outside caller or the user's typing
   *
   * @param model A model that has a note (html content) and references (array of objects)
   */
  public writeValue(model: any): void {
    // Set value of the model
    if (model && (model.references || model.note)) {
      this.model = {
        note: model.note || '',
        references: model.references || {},
      };
    } else {
      this.model = {
        note: model,
        references: {},
      };
    }

    // Set the note html value in the editor
    if (this.ckeInstance) {
      this.ckeInstance.setData(this.model.note);
    }
  }

  public registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  /**
   * If a renderer is not provided, the QuickNote will default to using this one, an anchor tag with no href
   */
  private static defaultRenderer(symbol: string, item: any): string {
    return `<a>${symbol}${item.label}</a>`;
  }

  /**
   * Returns the renderer for a given tagging mode if it exists in the config, otherwise the default.
   */
  private getRenderer(taggingMode: string): any {
    return this.config.renderer ? this.config.renderer[taggingMode] : QuickNoteElement.defaultRenderer;
  }

  /**
   * Called every time a keystroke is made in the editor. Listens for particular keys (e.g. UP arrow, ESC, etc.)
   * to handle certain behaviors of the picker.
   *
   * Runs within the context of the CKEditor, so actions that affect the view have to be run back inside of the
   * Angular zone of this class.
   *
   * @param event The key press event
   * @return true to allow the event to occur, false to cancel the event
   */
  private onKey(event: KeyboardEvent): boolean {
    if (event.key) {
      if (this.quickNoteResults) {
        // Hide results on escape key
        if (event.keyCode === KeyCodes.ESC) {
          this.zone.run(() => {
            this.hideResults();
          });
          return false;
        }

        // Navigation inside the results
        if (event.keyCode === KeyCodes.UP) {
          this.zone.run(() => {
            this.quickNoteResults.instance.prevActiveMatch();
          });
          return false;
        }

        if (event.keyCode === KeyCodes.DOWN) {
          this.zone.run(() => {
            this.quickNoteResults.instance.nextActiveMatch();
          });
          return false;
        }

        if (event.keyCode === KeyCodes.ENTER) {
          this.zone.run(() => {
            this.quickNoteResults.instance.selectActiveMatch();
          });
          return false;
        }
      } else {
        // Loop through all triggers and turn on tagging mode if the user just pressed a trigger character
        let triggers = this.config.triggers || {};
        Object.keys(triggers).forEach((key) => {
          let trigger = triggers[key] || {};
          if (event.key === trigger) {
            this.isTagging = true;
            this.taggingMode = key;
          }
        });
      }
    }
    return true;
  }

  /**
   * Debounced method that is run in the proper Angular context when the user has modified the CKEditor.
   * After the value has been updated in CKEditor, this will propagate that change to the model and listeners.
   */
  private onValueChange(): void {
    // Get the html text in CKEditor
    let value = this.ckeInstance.getData();

    // Remove empty 'ZERO WIDTH SPACE' characters that can get added erroneously by the editor
    let regex = new RegExp(String.fromCharCode(8203), 'g');
    value = value.replace(regex, '');

    // Make sure that any references in the model are still valid
    this.validateReferences();

    // Possibly show results if the user has entered a search term
    this.showResults();

    // Propagate change to ngModel for form validation, and send null if the note is empty
    let newModel = null;
    if (value) {
      newModel = {
        note: value,
        references: this.model.references,
      };
    }

    // Inform listeners to the ngModel change event that something has changed
    this.onModelChange(newModel);

    // Inform listeners of the `@Output() change` event that the model has been updated
    this.change.emit(newModel);

    // Inform listeners to the ngModel touched event that something has changed
    this.onTouched();
  }

  /**
   * Creates an instance of the results (called popup) and adds all the bindings to that instance.
   */
  private showResults(): void {
    if (this.isTagging) {
      let searchTerm = this.getSearchTerm();
      if (searchTerm.length) {
        // Update Matches
        if (this.quickNoteResults) {
          // Update existing list
          this.quickNoteResults.instance.term = {
            searchTerm: searchTerm,
            taggingMode: this.taggingMode,
          };
        } else {
          // Create the results DOM element
          this.quickNoteResults = this.componentUtils.appendNextToLocation(this.resultsComponent, this.results);
          this.quickNoteResults.instance.parent = this;
          this.quickNoteResults.instance.config = this.config;
          this.quickNoteResults.instance.term = {
            searchTerm: searchTerm,
            taggingMode: this.taggingMode,
          };
          this.positionResultsDropdown();
        }
      } else if (this.quickNoteResults) {
        this.quickNoteResults.destroy();
        this.quickNoteResults = null;
      }

      // Tell the OutsideClick base class to start listening for an outside clicks
      this.toggleActive(null, true);
    }
  }

  /**
   * Deletes the picker results from the DOM.
   */
  private hideResults(): void {
    this.isTagging = false;
    if (this.quickNoteResults) {
      this.quickNoteResults.destroy();
      this.quickNoteResults = null;
    }
  }

  /**
   * Handles the selection from the QuickNoteResults Component. Called by the QuickNoteResults component on it's
   * parent (this element).
   *
   * @param taggingMode - type of tags we are looking for
   * @param selected - selected object from the picker that has a label and value
   */
  private onSelected(taggingMode: string, selected: any): void {
    // Turn off tagging
    this.isTagging = false;

    // Replace searchTerm with link
    let symbol = this.config.triggers[taggingMode];
    let renderer = this.getRenderer(taggingMode);
    let renderedText = renderer(symbol, selected);

    this.replaceWordAtCursor(renderedText);

    // Add the new reference, if it doesn't already exist
    this.model.references = this.model.references || {};
    this.model.references[taggingMode] = this.model.references[taggingMode] || [];
    let matchingItems = this.model.references[taggingMode].filter((item) => JSON.stringify(item) === JSON.stringify(selected));
    if (matchingItems.length === 0) {
      this.model.references[taggingMode].push(selected);
    }

    // Update the quick note with the changes due to the user's selection of an item in the dropdown
    this.onValueChange();
  }

  /**
   * Convenience method that gets the current word that the cursor is on, minus the tag.
   * Also, trims any whitespace before/after the term to aid in searching.
   */
  private getSearchTerm(): string {
    let word = this.getWordAtCursor().trim();
    if (this.isTagging) {
      let symbol = this.config.triggers[this.taggingMode];
      if (!word.includes(symbol)) {
        this.hideResults();
        return '';
      }
      word = word.slice(word.indexOf(symbol) + symbol.length);
    }
    return word;
  }

  /**
   * Gets the current word that the cursor is on CKEditor. Current word starts at the beginning of the line or a
   * tag character if we are in tagging mode. Current word ends at the end of the line or an empty space.
   *
   * @returns plain text string (removes all html formatting)
   */
  private getWordAtCursor(): string {
    let range = this.ckeInstance.getSelection().getRanges()[0];
    let start = range.startContainer;

    if (start.type === CKEDITOR.NODE_TEXT && range.startOffset) {
      let text = start.getText();
      let symbol = this.config.triggers[this.taggingMode];
      let wordStart = text.lastIndexOf(symbol, range.startOffset - 1);

      if (wordStart > 0) {
        let beforeSymbol: string = text.charAt(wordStart - 1);
        // We don't want to trigger the lookup call unless the symbol was preceded by whitespace
        if (beforeSymbol !== '\u200B' && /\S/.test(beforeSymbol)) {
          return '';
        }
      } else if (start.hasPrevious() && /\S$/.test(start.getPrevious().getText())) {
        // When wordStart is <= 0, we need to check the previous node's text to see if it ended with whitespace or not
        return '';
      }

      let wordEnd = text.indexOf(' ', range.startOffset + 1);
      if (wordStart === -1) {
        wordStart = 0;
      }
      if (wordEnd === -1) {
        wordEnd = text.length;
      }

      return text.substring(wordStart, wordEnd);
    }

    // Selection starts at the 0 index of the text node or there's no previous text node in contents
    return '';
  }

  /**
   * Replaces the word that the user is on with the given html.
   *
   * CKEditor gives us access to the current line of html in the editor, so we replace the content of
   * the line, replacing only the current word.
   */
  private replaceWordAtCursor(newWord: string): void {
    let originalWord = this.getWordAtCursor().trim();
    let range = this.ckeInstance.getSelection().getRanges()[0];
    let start = range.startContainer;
    let parentNode = start.getParent();

    if (start.type === CKEDITOR.NODE_TEXT && parentNode) {
      let line = parentNode.getHtml();
      let index = line.lastIndexOf(originalWord);

      if (index >= 0) {
        // Add a space after the replaced word so that multiple references can be added back to back
        let newLine = line.substring(0, index) + newWord + ' ' + line.substring(index + originalWord.length);
        parentNode.setHtml(newLine);

        // Place selection at the end of the line
        range.moveToPosition(parentNode, CKEDITOR.POSITION_BEFORE_END);
        this.ckeInstance.getSelection().selectRanges([range]);
      }
    }
  }

  /**
   * Returns current references, minus any from the model that have been removed from the editor.
   */
  private validateReferences(): void {
    let html = this.ckeInstance.document.getBody().getHtml();

    // CKEditor stopped supporting the config.forceSimpleAmpersand setting, so we have to convert '&amp;' to '&'
    // when we pull html from the editor - see: https://dev.ckeditor.com/ticket/13723
    let ampRegex = new RegExp('&amp;', 'g');
    html = html.replace(ampRegex, '&');

    Object.keys(this.model.references).forEach((taggingMode) => {
      let array = this.model.references[taggingMode] || [];
      let symbol = this.config.triggers[taggingMode];
      let renderer = this.getRenderer(taggingMode);

      this.model.references[taggingMode] = array.filter((item) => {
        let renderedText = renderer(symbol, item);
        return html.includes(renderedText);
      });

      // If no references, then delete the key
      if (this.model.references[taggingMode].length === 0) {
        delete this.model.references[taggingMode];
      }
    });
  }

  /**
   * Configures the CKEditor for QuickNote functionality.
   *
   * Sets the height of the CKEditor dynamically to the height of the wrapper upon initialization.
   * Removes the toolbar on the bottom and configures a slimmed down version of the toolbar.
   * Removes plugins and turns off setting to allow browser based spell checking.
   */
  private getCKEditorConfig(): any {
    // Use the height of the wrapper element to set the initial height of the editor, then
    // set it to 100% to allow the editor to resize using the grippy.
    let editorHeight = this.wrapper.nativeElement.clientHeight - QuickNoteElement.TOOLBAR_HEIGHT;
    this.wrapper.nativeElement.style.setProperty('height', '100%');

    return {
      enterMode: CKEDITOR.ENTER_BR,
      shiftEnterMode: CKEDITOR.ENTER_P,
      disableNativeSpellChecker: false,
      height: editorHeight,
      startupFocus: this.startupFocus,
      removePlugins: 'liststyle,tabletools,contextmenu', // allows browser based spell checking
      toolbar: [
        {
          name: 'basicstyles',
          items: [
            'Styles',
            'FontSize',
            'Bold',
            'Italic',
            'Underline',
            'TextColor',
            '-',
            'NumberedList',
            'BulletedList',
            'Outdent',
            'Indent',
            'Link',
          ],
        },
      ],
    };
  }

  /**
   * Returns the current screen position of the cursor in CKEditor, accounting for any scrolling in the editor.
   *
   * @returns {{top: number, left: number}}
   */
  private getCursorPosition(): any {
    let range = this.ckeInstance.getSelection().getRanges()[0];
    let parentElement = range.startContainer.$.parentElement;
    let editorElement = this.ckeInstance.editable().$;

    // Since the editor is a text node in the DOM that does not know about it's position, a temporary element has to
    // be inserted in order to locate the cursor position.
    let cursorElement = document.createElement('img');
    cursorElement.setAttribute('src', 'null');
    cursorElement.setAttribute('width', '0');
    cursorElement.setAttribute('height', '0');

    parentElement.appendChild(cursorElement);
    let cursorPosition = {
      top: cursorElement.offsetTop - editorElement.scrollTop,
      left: cursorElement.offsetLeft - editorElement.scrollLeft,
    };
    cursorElement.remove();

    return cursorPosition;
  }

  /**
   * Positions the results dropdown based on the location of the cursor in the text field
   */
  private positionResultsDropdown(): void {
    const MIN_MARGIN_TOP: number = QuickNoteElement.TOOLBAR_HEIGHT * 2;
    const MAX_MARGIN_TOP: number = this.getContentHeight() + QuickNoteElement.TOOLBAR_HEIGHT;

    let cursorPosition = this.getCursorPosition();
    let marginTop: number = cursorPosition.top + QuickNoteElement.TOOLBAR_HEIGHT;

    // Check that the margin is within the visible bounds
    marginTop = Math.max(marginTop, MIN_MARGIN_TOP);
    marginTop = Math.min(marginTop, MAX_MARGIN_TOP);

    // Set the margin-top of the dropdown
    this.quickNoteResults.instance.element.nativeElement.style.setProperty('margin-top', marginTop + 'px');
  }

  /**
   * Returns the height in pixels of the content area - the text that the user has entered.
   */
  private getContentHeight(): number {
    let contentHeight: number = 0;
    if (
      this.ckeInstance.ui &&
      this.ckeInstance.ui.contentsElement &&
      this.ckeInstance.ui.contentsElement.$ &&
      this.ckeInstance.ui.contentsElement.$.style
    ) {
      let cssText: string = this.ckeInstance.ui.contentsElement.$.style.cssText;
      if (cssText.indexOf('height: ') !== -1) {
        let height: string = cssText.split('height: ')[1];
        height = height.split('px')[0];
        contentHeight = parseInt(height);
      }
    }
    return contentHeight;
  }

  /**
   * Show the placeholder text if the editor is empty
   */
  private showPlaceholder(): void {
    if (!this.ckeInstance.getData() && !this.startupFocus) {
      this.ckeInstance
        .editable()
        .getParent()
        .$.appendChild(this.placeholderElement);
      this.placeholderVisible = true;
    }
  }

  /**
   * Hide the placeholder text by removing the placeholder element from the DOM
   */
  private hidePlaceholder(): void {
    if (this.placeholderVisible) {
      this.ckeInstance
        .editable()
        .getParent()
        .$.removeChild(this.placeholderElement);
      this.placeholderVisible = false;
    }
  }

  /**
   * Get or create the single placeholder object that is constructed only when needed.
   */
  private get placeholderElement(): any {
    if (!this._placeholderElement) {
      this._placeholderElement = document.createElement('div');
      this._placeholderElement.className = 'placeholder';
      this._placeholderElement.style.cssText =
        'margin: 20px; color: #AAAAAA; font-family: sans-serif; font-size: 13px; line-height: 20px; position: absolute; top: 0';
      this._placeholderElement.textContent = this.placeholder;
    }
    return this._placeholderElement;
  }
}
