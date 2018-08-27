// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { QuickNoteResults } from './QuickNoteResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoLoadingElement } from '../../../loading/Loading';
import { NovoListElement, NovoListItemElement, NovoItemContentElement } from '../../../list/List';

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
