// NG2
import { async, TestBed } from '@angular/core/testing';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoItemContentElement, NovoListElement, NovoListItemElement } from '../../../list/List';
import { NovoLoadingElement } from '../../../loading/Loading';
// App
import { QuickNoteResults } from './QuickNoteResults';

describe('Elements: QuickNoteResults', () => {
  describe('Extras: ', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
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
        // component.search();
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
