// NG2
import { ElementRef } from '@angular/core';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
// App
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoLabelService } from 'novo-elements/services';
import { DistributionListPickerResults } from './DistributionListPickerResults';

describe('Components: DistributionListPickerResults', () => {
  let fixture: any;
  let component: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionListPickerResults],
      providers: [
        { provide: NovoLabelService, useClass: NovoLabelService },
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
        { provide: DomSanitizer, useClass: DomSanitizer },
      ],
      imports: [NovoListModule, NovoLoadingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(DistributionListPickerResults);
    component = fixture.debugElement.componentInstance;
  }));

  it('should initialize correctly', () => {
    expect(component).toBeDefined();
  });
});
