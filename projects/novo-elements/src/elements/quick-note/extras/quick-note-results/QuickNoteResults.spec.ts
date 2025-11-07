// NG2
import { waitForAsync, TestBed } from '@angular/core/testing';
// App
import { NovoItemContentElement, NovoListElement, NovoListItemElement } from 'novo-elements/elements/list';
import { NovoLoadingElement } from 'novo-elements/elements/loading';
import { NovoLabelService } from 'novo-elements/services';
import { QuickNoteResults } from './QuickNoteResults';

describe('Elements: QuickNoteResults', () => {
  describe('Extras: ', () => {
    let fixture;
    let component;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuickNoteResults, NovoLoadingElement, NovoListElement, NovoListItemElement, NovoItemContentElement],
        providers: [{ provide: NovoLabelService, useClass: NovoLabelService }],
      }).compileComponents();
      fixture = TestBed.createComponent(QuickNoteResults);
      component = fixture.debugElement.componentInstance;
    }));

    it('should initialize correctly', () => {
      expect(component).toBeTruthy();
    });

    describe('Method: search()', () => {
      it('should be defined.', () => {
        expect(component.search).toBeDefined();
      });
    });

    describe('Method: structureArray()', () => {
      it('should be defined.', () => {
        expect(component.structureArray).toBeDefined();
        component.structureArray([1]);
      });
    });

    describe('Method: selectMatch()', () => {
      it('should be defined.', () => {
        expect(component.selectMatch).toBeDefined();
        component.selectMatch();
      });
    });
  });
});
