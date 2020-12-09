// NG2
import { ElementRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { NovoLabelService } from '../../../../services/novo-label-service';
// App
import { NovoListModule } from './../../../list/List.module';
import { NovoLoadingModule } from './../../../loading/Loading.module';
import { WorkersCompCodesPickerResults } from './WorkersCompCodesPickerResults';

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
