// NG2
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDragulaElement } from './Dragula';
import { NovoDragulaService } from './DragulaService';

@Component({
  selector: 'test',
  template: `
        <div dragula=""></div>
    `,
})
class TestComponent {}

describe('Elements: NovoDragulaElement', () => {
  describe('Directive: ', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [NovoDragulaElement, TestComponent],
        providers: [{ provide: NovoDragulaService, useClass: NovoDragulaService }],
      }).compileComponents();
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.debugElement.componentInstance;
    }));
    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Class: ', () => {
    let mockElement = document.createElement('div');
    let component = new NovoDragulaElement({ nativeElement: mockElement }, new NovoDragulaService());

    describe('Method: ngOnInit()', () => {
      it('should initialize the dragula with the element reference passed into the constructor if the service doesn\'t return any containers.', () => {
        expect(component.ngOnInit).toBeDefined();
        component.ngOnInit();
        expect(component.drake.dragging).toBe(false);
        expect(component.drake.containers.length).toBe(1);
        expect(component.drake.containers[0].outerHTML).toContain('div');
      });
    });

    describe('Method: checkModel()', () => {
      it('should insert the dragulaModel into the drake models when they\'re defined.', () => {
        expect(component.checkModel).toBeDefined();
        component.dragulaModel = {};
        component.drake = {
          models: [],
        };
        expect(component.drake.models.length).toBe(0);
        component.checkModel();
        expect(component.drake.models.length).toBe(1);
      });
      it('should create drake models from the dragulaModel when their\'s no models defined.', () => {
        expect(component.checkModel).toBeDefined();
        component.dragulaModel = {};
        component.drake = {};
        expect(component.drake.models).toBeUndefined();
        component.checkModel();
        expect(component.drake.models.length).toBe(1);
      });
      it('should not do anything when no dragulaModel is present', () => {
        expect(component.checkModel).toBeDefined();
        component.dragulaModel = undefined;
        component.drake = undefined;
        expect(component.drake).toBeUndefined();
        component.checkModel();
        expect(component.drake).toBeUndefined();
      });
    });

    describe('Method: ngOnChanges()', () => {
      it('should remove a model from the drake models when that model is passed in and then append the new value.', () => {
        expect(component.ngOnChanges).toBeDefined();
        component.drake = {
          models: [1],
        };
        expect(component.drake.models.length).toBe(1);
        component.ngOnChanges({ dragulaModel: { currentValue: 2, previousValue: 1 } });
        expect(component.drake.models[0]).toBe(2);
      });
      it('should create the drake models from the changes when there are none.', () => {
        expect(component.ngOnChanges).toBeDefined();
        component.drake = {
          models: null,
        };
        expect(component.drake.models).toBe(null);
        component.ngOnChanges({ dragulaModel: { currentValue: 1 } });
        expect(component.drake.models[0]).toBe(1);
      });
    });
  });
});
