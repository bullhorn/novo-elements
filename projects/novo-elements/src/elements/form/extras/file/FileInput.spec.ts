// NG
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NovoLoadingElement } from 'novo-elements/elements/loading';
import { DecodeURIPipe } from 'novo-elements/pipes';
import { GlobalRef, NovoLabelService } from 'novo-elements/services';
// App
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NovoFileInputElement } from './FileInput';

describe('Elements: NovoFileInputElement', () => {
  let fixture: ComponentFixture<NovoFileInputElement>;
  let component: NovoFileInputElement;
  let mockGlobal: {
    nativeWindow: {
      open: (url, target) => {}
    }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DragDropModule],
      declarations: [NovoFileInputElement, NovoLoadingElement, DecodeURIPipe],
      providers: [
        { provide: NovoLabelService, useClass: NovoLabelService },
        { provide: GlobalRef, useValue: mockGlobal },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoFileInputElement);
    component = fixture.debugElement.componentInstance;
  }));
  it('should initialize correctly.', () => {
    expect(component).toBeDefined();
  });

  describe('Method: ngOnInit()', () => {
    it('should update layout', () => {
      expect(component.ngOnInit).toBeDefined();
      jest.spyOn(component, 'updateLayout');
      component.ngOnInit();
      expect(component.updateLayout).toHaveBeenCalled();
    });
    it('should setup initial files list', () => {
      component.value = [{name: 'TestFile1'}];
      component.ngOnInit();
      expect(component.files[0].name).toBe('TestFile1');
    });
  });
  describe('Method: updateLayout()', () => {
    it('should set default layoutOptions and call insertTemplatesBasedOnLayout', () => {
      expect(component.updateLayout).toBeDefined();
      jest.spyOn(component, 'insertTemplatesBasedOnLayout');
      component.updateLayout();
      expect(component.layoutOptions).toBeDefined();
      expect(component.layoutOptions).toEqual({
        order: 'default',
        download: true,
        removable: true,
        labelStyle: 'default',
        draggable: false,
      });
      expect(component.insertTemplatesBasedOnLayout).toHaveBeenCalled();
    });
  });
  describe('Method: insertTemplatesBasedOnLayout()', () => {
    beforeEach(() => {
      component.layoutOptions = { order: 'default', download: true, edit: true, labelStyle: 'default' };
    });
    it('should correctly insert templates by default', () => {
      expect(component.insertTemplatesBasedOnLayout).toBeDefined();
      jest.spyOn(component.container, 'createEmbeddedView');
      const expected = ['fileOutput', 'fileInput'];
      const insertedOrder = component.insertTemplatesBasedOnLayout();
      expect(component.container.createEmbeddedView).toHaveBeenCalled();
      expect(insertedOrder).toEqual(expected);
    });
    it('should correctly insert template if order is displayFilesBelow', () => {
      component.layoutOptions.order = 'displayFilesBelow';
      expect(component.insertTemplatesBasedOnLayout).toBeDefined();
      jest.spyOn(component.container, 'createEmbeddedView');
      const expected = ['fileInput', 'fileOutput'];
      const insertedOrder = component.insertTemplatesBasedOnLayout();
      expect(component.container.createEmbeddedView).toHaveBeenCalled();
      expect(insertedOrder).toEqual(expected);
    });
  });

  describe('Method: customEdit(file)', () => {
    beforeEach(() => {
      jest.spyOn(component.edit, 'emit');
    });
    it('should emit an event', () => {
      component.customEdit({ name: 'file.pdf', loaded: true });
      expect(component.edit.emit).toHaveBeenCalledWith({ name: 'file.pdf', loaded: true });
    });
  });

  describe('Method: customSave(file)', () => {
    beforeEach(() => {
      jest.spyOn(component.save, 'emit');
    });
    it('should emit an event', () => {
      component.customSave({ name: 'file.pdf', loaded: true });
      expect(component.save.emit).toHaveBeenCalledWith({ name: 'file.pdf', loaded: true });
    });
  });

  describe('Method: customDelete(file)', () => {
    beforeEach(() => {
      jest.spyOn(component.delete, 'emit');
    });
    it('should emit an event', () => {
      component.customDelete({ name: 'file.pdf', loaded: true });
      expect(component.delete.emit).toHaveBeenCalledWith({ name: 'file.pdf', loaded: true });
    });
  });

  describe('Method: customCheck(files)', () => {
    beforeEach(() => {
      jest.spyOn(component.upload, 'emit');
    });
    it('should emit an event', () => {
      component.customCheck({ name: 'file.pdf', loaded: true });
      expect(component.upload.emit).toHaveBeenCalledWith({ name: 'file.pdf', loaded: true });
    });
  });

  describe('Method: validate(files)', () => {
    it('should return true if undefined custom validation', () => {
      component.layoutOptions = {
        customValidation: undefined,
      };
      const result = component.validate([]);
      expect(result).toBeTruthy();
    });
    it('should return true if null custom validation', () => {
      component.layoutOptions = {
        customValidation: null,
      } as any;
      const result = component.validate([]);
      expect(result).toBeTruthy();
    });
    it('should return true if [] custom validation', () => {
      component.layoutOptions = {
        customValidation: [],
      };
      const result = component.validate([]);
      expect(result).toBeTruthy();
    });
    it('should return true if truthy custom validation', () => {
      component.layoutOptions = {
        customValidation: [{ action: 'upload', fn: () => true }],
      };
      const result = component.validate([]);
      expect(result).toBeTruthy();
    });
    it('should return false if falsey custom validation', () => {
      component.layoutOptions = {
        customValidation: [{ action: 'upload', fn: () => false }],
      };
      const result = component.validate([]);
      expect(result).toBeFalsy();
    });
  });

  describe('Drag events', () => {
    it('should rearrange items when dragged across', () => {
      component.files = [{name: 'TestFile1'}, {name: 'TestFile2'}] as any;
      component.dropOutputItem({previousIndex: 1, currentIndex: 0} as any);
      expect(component.files[0]?.name).toBe('TestFile2');
    });
  });
  describe('Method: writeValue()', () => {
      it('should change the value', () => {
        component.writeValue(10);
        expect(component.model).toBe(10);
      });

      it('should empty the file list if a falsey value is programmatically set', () => {
          component.writeValue(undefined);
          expect(component.files).toEqual([]);
      });
  });
  describe('Method: check(files)', () => {
    beforeEach(() => {
      component.layoutOptions = {};
    });

    it('should clear the input value after processing', async () => {
      component.check({target: { files: [], value: 'test.txt'}});
      await fixture.whenStable();
      const input = fixture.debugElement.query(By.css('#file'));
      if (input) {
        const el = input.nativeElement;
        expect(el.value).toBe('');
      }
    });
});
});
