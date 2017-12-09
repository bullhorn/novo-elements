import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { NovoSlidesComponent } from './slides.component';
import { NovoLabelService } from '../../services';

describe('Elements: NovoSlidesComponent', () => {
  let fixture: ComponentFixture<NovoSlidesComponent>;
  let component: NovoSlidesComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NovoSlidesComponent,
      ],
      providers: [
        { provide: NovoLabelService, useClass: NovoLabelService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoSlidesComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeTruthy();
  });
  describe('Method: ngOnInit()', () => {
    it('should setup currSlides', () => {
      component.slides = 3;
      let expected: string[] = ['active', 'inactive', 'inactive'];
      component.ngOnInit();
      expect(component.currSlides).toEqual(expected);
    });
    it('should add event listener to keydown', () => {
      spyOn(component.element.nativeElement, 'addEventListener');
      component.ngOnInit();
      expect(component.element.nativeElement.addEventListener).toHaveBeenCalled();
    });
    it('should initSlides if set to auto', () => {
      component.auto = true;
      spyOn(component, 'initSlides').and.callFake(() => { });
      component.ngOnInit();
      expect(component.initSlides).toHaveBeenCalled();
    });
  });
  describe('Method: ngOnDestroy()', () => {
    it('should add event listener to keydown', () => {
      spyOn(component.element.nativeElement, 'removeEventListener');
      component.ngOnDestroy();
      expect(component.element.nativeElement.removeEventListener).toHaveBeenCalled();
    });
  });
  describe('Method: handleKeyDown()', () => {
    it('should stop event for keycode 9', () => {
      let event: KeyboardEvent = new KeyboardEvent('keypress', { code: 'enter' });
      spyOn(event, 'stopImmediatePropagation');
      spyOn(event, 'preventDefault');
      component.handleKeyDown(event);
      expect(event.stopImmediatePropagation).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should stop event for keycode 9', () => {
      let event: KeyboardEvent = new KeyboardEvent('keypress', { code: 'tab' });
      spyOn(event, 'stopImmediatePropagation');
      spyOn(event, 'preventDefault');
      component.handleKeyDown(event);
      expect(event.stopImmediatePropagation).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
  describe('Method: goToSlide()', () => {
    it('should set current slide and update display', () => {
      spyOn(component, 'updateDisplayProperties');
      component.goToSlide(1);
      expect(component.currentSlide).toEqual(1);
    });
  });
  describe('Method: changeSlide()', () => {
    it('should display next slide', () => {
      component.slides = 3;
      component.currentSlide = 0;
      component.changeSlide('next');
      expect(component.currentSlide).toEqual(1);
      expect(component.currSlides[0]).toEqual('inactive');
      expect(component.currSlides[component.currentSlide]).toEqual('active');
      expect(component.start).toBeFalsy();
      expect(component.end).toBeFalsy();
      expect(component.currentClass).toEqual('slide-1');
    });
    it('should display first slide', () => {
      component.slides = 3;
      component.currentSlide = 1;
      component.changeSlide('previous');
      expect(component.currentSlide).toEqual(0);
      expect(component.currSlides[1]).toEqual('inactive');
      expect(component.currSlides[component.currentSlide]).toEqual('active');
      expect(component.start).toBeTruthy();
      expect(component.end).toBeFalsy();
      expect(component.currentClass).toEqual('slide-0');
    });
    it('should display last slide', () => {
      component.slides = 3;
      component.currentSlide = 1;
      component.changeSlide('next');
      expect(component.currentSlide).toEqual(2);
      expect(component.currSlides[1]).toEqual('inactive');
      expect(component.currSlides[component.currentSlide]).toEqual('active');
      expect(component.end).toBeTruthy();
      expect(component.start).toBeFalsy();
      expect(component.currentClass).toEqual('slide-2');
    });
    it('should go to last slide if on first slide already', () => {
      component.slides = 3;
      component.currentSlide = 0;
      component.changeSlide('previous');
      expect(component.currentSlide).toEqual(2);
    });
    it('should go to first slide if calling next on last slide', () => {
      component.slides = 3;
      component.currentSlide = 2;
      component.changeSlide('next');
      expect(component.currentSlide).toEqual(0);
    });
  });
  describe('Method: initSlides()', () => {
    it('should change slide automatically', () => {
      component.secondsDelay = 1;
      jest.useFakeTimers();
      spyOn(component, 'initSlides').and.callThrough();
      spyOn(component, 'changeSlide');
      component.initSlides();
      expect(setTimeout.mock.calls.length).toBe(1);
      expect(setTimeout.mock.calls[0][1]).toBe(1000);
      jest.runOnlyPendingTimers();
      expect(component.changeSlide).toHaveBeenCalled();
      expect(component.initSlides).toHaveBeenCalled();
      expect(setTimeout.mock.calls.length).toBe(2);
      expect(setTimeout.mock.calls[1][1]).toBe(1000);
    });
  });
});
