// NG2
import { ElementRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { WorkersCompCodesPickerResults } from './workers-comp-codes-picker-results';
import { NovoLoadingModule } from 'novo-elements/components/loading';
import { NovoListModule } from 'novo-elements/components/list';
import { NovoLabelService } from 'novo-elements/services';

describe('Components: DistributionListPickerResults', () => {
  let fixture: any;
  let component: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkersCompCodesPickerResults],
      providers: [
        { provide: NovoLabelService, useClass: NovoLabelService },
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
        { provide: DomSanitizer, useClass: DomSanitizer },
      ],
      imports: [NovoListModule, NovoLoadingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(WorkersCompCodesPickerResults);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });
});
