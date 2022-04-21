// NG2
import { ElementRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { NovoLabelService } from '../../../../services/novo-label-service';
// App
import { NovoListModule } from './../../../list/List.module';
import { NovoLoadingModule } from './../../../loading/Loading.module';
import { SkillsSpecialtyPickerResults } from './SkillsSpecialtyPickerResults';

describe('Components: SkillsSpecialtyPickerResults', () => {
  let fixture: any;
  let component: any;

  beforeEach(async(() => {
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
