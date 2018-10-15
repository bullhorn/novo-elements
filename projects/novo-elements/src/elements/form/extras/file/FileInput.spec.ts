// NG
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoFileInputElement } from './FileInput';
import { NovoLoadingElement } from '../../../loading/Loading';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoDragulaElement } from '../../../../elements/dragula/Dragula';
import { NovoDragulaService } from '../../../../elements/dragula/DragulaService';
import { DecodeURIPipe } from '../../../../pipes/decode-uri/DecodeURI';

describe('Elements: NovoFileInputElement', () => {
  let fixture;
  let component;

  let FakeEvent = () => {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NovoFileInputElement, NovoLoadingElement, NovoDragulaElement, DecodeURIPipe],
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }, { provide: NovoDragulaService, useClass: NovoDragulaService }],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoFileInputElement);
    component = fixture.debugElement.componentInstance;
  }));
  it('should initialize correctly.', () => {
    expect(component).toBeDefined();
  });

  describe('Method: ngOnInit()', () => {
    it('should setup drag events', () => {
      expect(component.ngOnInit).toBeDefined();
      spyOn(component.element.nativeElement, 'addEventListener');
      component.ngOnInit();
      expect(component.element.nativeElement.addEventListener).toHaveBeenCalled();
    });
    it('should update layout', () => {
      expect(component.ngOnInit).toBeDefined();
      spyOn(component, 'updateLayout');
      component.ngOnInit();
      expect(component.updateLayout).toHaveBeenCalled();
    });
    it('should setup initial files list', () => {
      expect(component.ngOnInit).toBeDefined();
      spyOn(component, 'setInitialFileList');
      component.ngOnInit();
      expect(component.setInitialFileList).toHaveBeenCalled();
    });
    it('should initialize dragula', () => {
      expect(component.ngOnInit).toBeDefined();
      spyOn(component, 'initializeDragula');
      component.ngOnInit();
      expect(component.initializeDragula).toHaveBeenCalled();
    });
  });
  describe('Method: updateLayout()', () => {
    it('should set default layoutOptions and call insertTemplatesBasedOnLayout', () => {
      expect(component.updateLayout).toBeDefined();
      expect(component.layoutOptions).not.toBeDefined();
      spyOn(component, 'insertTemplatesBasedOnLayout');
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
  describe('Method: initializeDragula()', () => {
    it('should correctly initialize dragula', () => {
      let expectedBag = 'file-output-1';
      component.dragula = {
        bags: [{ name: 'TEST', drake: {} }],
        setOptions: () => {},
      };
      expect(component.initializeDragula).toBeDefined();
      expect(component.fileOutputBag).not.toBeDefined();
      spyOn(component.dragula, 'setOptions');
      component.initializeDragula();
      expect(component.fileOutputBag).toBe(expectedBag);
      expect(component.dragula.setOptions).toHaveBeenCalled();
    });
  });
  describe('Method: insertTemplatesBasedOnLayout()', () => {
    beforeEach(() => {
      component.layoutOptions = { order: 'default', download: true, edit: true, labelStyle: 'default' };
    });
    it('should correctly insert templates by default', () => {
      expect(component.insertTemplatesBasedOnLayout).toBeDefined();
      spyOn(component.container, 'createEmbeddedView');
      let expected = ['fileOutput', 'fileInput'];
      let insertedOrder = component.insertTemplatesBasedOnLayout();
      expect(component.container.createEmbeddedView).toHaveBeenCalled();
      expect(insertedOrder).toEqual(expected);
    });
    it('should correctly insert template if order is displayFilesBelow', () => {
      component.layoutOptions.order = 'displayFilesBelow';
      expect(component.insertTemplatesBasedOnLayout).toBeDefined();
      spyOn(component.container, 'createEmbeddedView');
      let expected = ['fileInput', 'fileOutput'];
      let insertedOrder = component.insertTemplatesBasedOnLayout();
      expect(component.container.createEmbeddedView).toHaveBeenCalled();
      expect(insertedOrder).toEqual(expected);
    });
  });

  describe('Method: ngOnDestroy()', () => {
    it('should destroy events.', () => {
      expect(component.ngOnDestroy).toBeDefined();
      spyOn(component.element.nativeElement, 'removeEventListener');
      component.ngOnDestroy();
      expect(component.element.nativeElement.removeEventListener).toHaveBeenCalled();
    });
  });

  describe('Method: customEdit(file)', () => {
    beforeEach(() => {
      spyOn(component.edit, 'emit');
    });
    it('should emit an event', () => {
      component.customEdit({ name: 'file.pdf', loaded: true });
      expect(component.edit.emit).toHaveBeenCalledWith({ name: 'file.pdf', loaded: true });
    });
  });

  describe('Method: customSave(file)', () => {
    beforeEach(() => {
      spyOn(component.save, 'emit');
    });
    it('should emit an event', () => {
      component.customSave({ name: 'file.pdf', loaded: true });
      expect(component.save.emit).toHaveBeenCalledWith({ name: 'file.pdf', loaded: true });
    });
  });

  describe('Method: customDelete(file)', () => {
    beforeEach(() => {
      spyOn(component.delete, 'emit');
    });
    it('should emit an event', () => {
      component.customDelete({ name: 'file.pdf', loaded: true });
      expect(component.delete.emit).toHaveBeenCalledWith({ name: 'file.pdf', loaded: true });
    });
  });

  describe('Method: customCheck(files)', () => {
    beforeEach(() => {
      spyOn(component.upload, 'emit');
    });
    it('should emit an event', () => {
      component.customCheck({ name: 'file.pdf', loaded: true });
      expect(component.upload.emit).toHaveBeenCalledWith({ name: 'file.pdf', loaded: true });
    });
  });
  //
  // describe('Method: dragEnterHandler(event)', () => {
  //     it('should set active to true.', () => {
  //         expect(component.dragEnterHandler).toBeDefined();
  //         let evt = new FakeEvent();
  //         component.dragEnterHandler(evt);
  //         expect(evt.dataTransfer.dropEffect).toBe('copy');
  //         expect(component.active).toBe(true);
  //     });
  // });
  //
  // describe('Method: dragLeaveHandler(event)', () => {
  //     it('should set active to false.', () => {
  //         expect(component.dragLeaveHandler).toBeDefined();
  //         let evt = new FakeEvent();
  //         component.dragLeaveHandler(evt);
  //         expect(component.active).toBe(false);
  //     });
  // });
  //
  // describe('Method: dropHandler(event)', () => {
  //     it('should set active to false.', () => {
  //         expect(component.dropHandler).toBeDefined();
  //         let evt = new FakeEvent();
  //         component.dropHandler(evt);
  //         expect(component.active).toBe(false);
  //     });
  // });
  //
  // describe('Method: writeValue()', () => {
  //     it('should be defined.', () => {
  //         expect(component.writeValue).toBeDefined();
  //     });
  //
  //     it('should change the value', () => {
  //         component.writeValue(10);
  //         expect(component.model).toBe(10);
  //     });
  // });
  //
  // describe('Method: registerOnChange()', () => {
  //     it('should be defined.', () => {
  //         expect(component.registerOnChange).toBeDefined();
  //     });
  // });
  //
  // describe('Method: registerOnTouched()', () => {
  //     it('should be defined.', () => {
  //         expect(component.registerOnTouched).toBeDefined();
  //     });
  // });
});
