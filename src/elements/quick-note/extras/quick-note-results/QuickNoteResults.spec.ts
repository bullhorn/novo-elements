// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { QuickNoteResults } from './QuickNoteResults';
import { NovoLabelService } from '../../../../services/novo-label-service';
import { NovoLoadingElement } from '../../../loading/Loading';

describe('Elements: QuickNoteResults', () => {
    describe('Extras: ', () => {
        let fixture;
        let component;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    QuickNoteResults,
                    NovoLoadingElement
                ],
                providers: [
                    { provide: NovoLabelService, useClass: NovoLabelService }
                ]
            }).compileComponents();
            fixture = TestBed.createComponent(QuickNoteResults);
            component = fixture.debugElement.componentInstance;
        }));

        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
        });
    });
});
