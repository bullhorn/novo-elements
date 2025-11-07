// NG2
import { ElementRef } from '@angular/core';
import { waitForAsync, TestBed } from '@angular/core/testing';
// App
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoLabelService } from 'novo-elements/services';
import { SkillsSpecialtyPickerResults } from './SkillsSpecialtyPickerResults';

describe('Components: SkillsSpecialtyPickerResults', () => {
  let fixture: any;
  let component: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsSpecialtyPickerResults],
      providers: [
        { provide: NovoLabelService, useClass: NovoLabelService },
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
      ],
      imports: [NovoListModule, NovoLoadingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(SkillsSpecialtyPickerResults);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Function: getListElement()', () => {
    it('should return novo-list', () => {
      jest.spyOn(component.element.nativeElement, 'querySelector').mockImplementation((arg) => arg);
      expect(component.getListElement()).toEqual('novo-list');
    });
  });
});
