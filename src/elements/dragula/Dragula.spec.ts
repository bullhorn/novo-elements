// NG2
import { TestBed, async } from '@angular/core/testing';
// App
import { NovoDragulaElement } from './Dragula';
import { NovoDragulaService } from './DragulaService';

xdescribe('Elements: NovoDragulaElement', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NovoDragulaElement
            ],
            providers: [
                { provide: NovoDragulaService, useClass: NovoDragulaService }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(NovoDragulaElement);
        component = fixture.debugElement.componentInstance;
    }));

    describe('Method: ngOnInit()', () => {
        it('should initialize correctly', () => {
            expect(component).toBeTruthy();
        });
    });
});
