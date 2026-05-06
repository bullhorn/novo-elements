import { ElementRef, NgZone } from '@angular/core';
import { ComponentUtils } from 'novo-elements/services';
import { vi } from 'vitest';
import { QuickNoteElement } from './QuickNote';

describe('Elements: QuickNoteElement', () => {
  let component: QuickNoteElement;
  let mockZone: NgZone;
  let mockComponentUtils: ComponentUtils;

  beforeEach(() => {
    mockZone = { run: (fn: any) => fn(), runOutsideAngular: (fn: any) => fn() } as any;
    mockComponentUtils = { append: vi.fn() } as any;

    const mockElement = { nativeElement: document.createElement('div') } as ElementRef;
    component = new QuickNoteElement(mockZone, mockElement, mockComponentUtils);
  });

  describe('ngOnInit', () => {
    it('should throw if no config is set', () => {
      expect(() => component.ngOnInit()).toThrow('No config set for QuickNote!');
    });

    it('should throw if config has no triggers', () => {
      component.config = { options: {} };
      expect(() => component.ngOnInit()).toThrow('QuickNote config must supply triggers!');
    });

    it('should throw if config has no options', () => {
      component.config = { triggers: {} };
      expect(() => component.ngOnInit()).toThrow('QuickNote config must supply options!');
    });

    it('should initialize successfully with valid config', () => {
      component.config = {
        triggers: { person: '@' },
        options: { person: ['John'] },
      };
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  describe('writeValue', () => {
    it('should set model with note and empty references when given a string', () => {
      component.writeValue('hello');
      expect((component as any).model).toEqual({ note: 'hello', references: {} });
    });

    it('should set model with provided note and references', () => {
      const model = { note: 'test note', references: { person: [{ label: 'John' }] } };
      component.writeValue(model);
      expect((component as any).model).toEqual(model);
    });

    it('should handle null/undefined by setting note to the value', () => {
      component.writeValue(null);
      expect((component as any).model).toEqual({ note: null, references: {} });
    });

    it('should handle model with only note', () => {
      component.writeValue({ note: 'just a note' });
      expect((component as any).model).toEqual({ note: 'just a note', references: {} });
    });

    it('should handle model with only references', () => {
      component.writeValue({ references: { person: [] } });
      expect((component as any).model).toEqual({ note: '', references: { person: [] } });
    });
  });

  describe('registerOnChange / registerOnTouched', () => {
    it('should register the change callback', () => {
      const fn = vi.fn();
      component.registerOnChange(fn);
      expect((component as any).onModelChange).toBe(fn);
    });

    it('should register the touched callback', () => {
      const fn = vi.fn();
      component.registerOnTouched(fn);
      expect((component as any).onModelTouched).toBe(fn);
    });
  });

  describe('onTouched', () => {
    it('should call the registered touched callback', () => {
      const fn = vi.fn();
      component.registerOnTouched(fn);
      component.onTouched();
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('onKey', () => {
    beforeEach(() => {
      component.config = {
        triggers: { person: '@', team: '#' },
        options: { person: [], team: [] },
      };
      component.ngOnInit();
    });

    it('should activate tagging mode when a trigger character is pressed', () => {
      const result = (component as any).onKey({ key: '@' });
      expect(result).toBe(true);
      expect((component as any).isTagging).toBe(true);
      expect((component as any).taggingMode).toBe('person');
    });

    it('should activate tagging mode for different triggers', () => {
      (component as any).onKey({ key: '#' });
      expect((component as any).isTagging).toBe(true);
      expect((component as any).taggingMode).toBe('team');
    });

    it('should not activate tagging on normal keys', () => {
      (component as any).onKey({ key: 'a' });
      expect((component as any).isTagging).toBeFalsy();
    });

    describe('with active results dropdown', () => {
      let mockResults: any;

      beforeEach(() => {
        mockResults = {
          instance: {
            prevActiveMatch: vi.fn(),
            nextActiveMatch: vi.fn(),
            selectActiveMatch: vi.fn(),
          },
          destroy: vi.fn(),
        };
        (component as any).quickNoteResults = mockResults;
      });

      it('should call prevActiveMatch on ArrowUp', () => {
        const result = (component as any).onKey({ key: 'ArrowUp' });
        expect(result).toBe(false);
        expect(mockResults.instance.prevActiveMatch).toHaveBeenCalled();
      });

      it('should call nextActiveMatch on ArrowDown', () => {
        const result = (component as any).onKey({ key: 'ArrowDown' });
        expect(result).toBe(false);
        expect(mockResults.instance.nextActiveMatch).toHaveBeenCalled();
      });

      it('should call selectActiveMatch on Enter', () => {
        const result = (component as any).onKey({ key: 'Enter' });
        expect(result).toBe(false);
        expect(mockResults.instance.selectActiveMatch).toHaveBeenCalled();
      });

      it('should hide results on Escape', () => {
        const result = (component as any).onKey({ key: 'Escape' });
        expect(result).toBe(false);
        expect((component as any).quickNoteResults).toBeNull();
      });

      it('should allow other keys to pass through', () => {
        const result = (component as any).onKey({ key: 'a' });
        expect(result).toBe(true);
      });
    });
  });

  describe('getRenderer', () => {
    it('should return the configured renderer for the tagging mode', () => {
      const personRenderer = vi.fn();
      component.config = {
        triggers: { person: '@' },
        options: { person: [] },
        renderer: { person: personRenderer },
      };
      expect((component as any).getRenderer('person')).toBe(personRenderer);
    });

    it('should return default renderer when no renderer configured', () => {
      component.config = { triggers: { person: '@' }, options: { person: [] } };
      const renderer = (component as any).getRenderer('person');
      expect(renderer('@', { label: 'John' })).toBe('<a>@John</a>');
    });
  });

  describe('onSelected', () => {
    beforeEach(() => {
      component.config = {
        triggers: { person: '@' },
        options: { person: [] },
        renderer: { person: (sym: string, item: any) => `<a>${sym}${item.label}</a>` },
      };
      component.ngOnInit();
      component.writeValue({ note: '', references: {} });

      // Mock methods that depend on CKEditor
      (component as any).replaceWordAtCursor = vi.fn();
      (component as any).onValueChange = vi.fn();
    });

    it('should add a reference to the model', () => {
      (component as any).onSelected('person', { value: 'j.doe', label: 'John Doe' });
      expect((component as any).model.references.person).toEqual([{ value: 'j.doe', label: 'John Doe' }]);
    });

    it('should not add duplicate references', () => {
      (component as any).onSelected('person', { value: 'j.doe', label: 'John Doe' });
      (component as any).onSelected('person', { value: 'j.doe', label: 'John Doe' });
      expect((component as any).model.references.person).toHaveLength(1);
    });

    it('should allow different references', () => {
      (component as any).onSelected('person', { value: 'j.doe', label: 'John Doe' });
      (component as any).onSelected('person', { value: 'j.smith', label: 'Jane Smith' });
      expect((component as any).model.references.person).toHaveLength(2);
    });

    it('should turn off tagging mode', () => {
      (component as any).isTagging = true;
      (component as any).onSelected('person', { value: 'j.doe', label: 'John Doe' });
      expect((component as any).isTagging).toBe(false);
    });

    it('should call replaceWordAtCursor with rendered text', () => {
      (component as any).onSelected('person', { value: 'j.doe', label: 'John Doe' });
      expect((component as any).replaceWordAtCursor).toHaveBeenCalledWith('<a>@John Doe</a>');
    });
  });

  describe('validateReferences', () => {
    beforeEach(() => {
      component.config = {
        triggers: { person: '@' },
        options: { person: [] },
        renderer: { person: (sym: string, item: any) => `<a>${sym}${item.label}</a>` },
      };
      component.ngOnInit();
    });

    it('should remove references whose rendered text is not in the editor html', () => {
      component.writeValue({
        note: 'Hello',
        references: { person: [{ value: 'j.doe', label: 'John Doe' }] },
      });

      // Mock ckeInstance.document.getBody().getHtml() to return content without the reference
      (component as any).ckeInstance = {
        document: { getBody: () => ({ getHtml: () => 'Hello world' }) },
      };

      (component as any).validateReferences();
      expect((component as any).model.references).toEqual({});
    });

    it('should keep references whose rendered text is still in the editor html', () => {
      component.writeValue({
        note: 'Hello <a>@John Doe</a>',
        references: { person: [{ value: 'j.doe', label: 'John Doe' }] },
      });

      (component as any).ckeInstance = {
        document: { getBody: () => ({ getHtml: () => 'Hello <a>@John Doe</a>' }) },
      };

      (component as any).validateReferences();
      expect((component as any).model.references.person).toHaveLength(1);
    });
  });

  describe('hideResults', () => {
    it('should set isTagging to false', () => {
      (component as any).isTagging = true;
      (component as any).hideResults();
      expect((component as any).isTagging).toBe(false);
    });

    it('should destroy and null out quickNoteResults', () => {
      const mockDestroy = vi.fn();
      (component as any).quickNoteResults = { destroy: mockDestroy };
      (component as any).hideResults();
      expect(mockDestroy).toHaveBeenCalled();
      expect((component as any).quickNoteResults).toBeNull();
    });

    it('should handle case when quickNoteResults is already null', () => {
      (component as any).quickNoteResults = null;
      expect(() => (component as any).hideResults()).not.toThrow();
    });
  });
});
