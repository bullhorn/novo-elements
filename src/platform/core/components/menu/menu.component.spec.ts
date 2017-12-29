import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { NovoMenuModule } from './menu.module';
import { NovoMenuComponent } from './menu.component';

describe('NovoMenuComponent', () => {
    let comp: NovoMenuComponent;
    let fixture: ComponentFixture<NovoMenuComponent>;

    beforeEach(() => {
        const elementRefStub: any = {
            nativeElement: {
                querySelector: () => ({
                    addEventListener: () => ({}),
                }),
            },
        };
        const simpleChangesStub: any = {};
        TestBed.configureTestingModule({
            imports: [NovoMenuModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ElementRef, useValue: elementRefStub },
                { provide: SimpleChanges, useValue: simpleChangesStub },
            ],
        });
        fixture = TestBed.createComponent(NovoMenuComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('role defaults to: menu', () => {
        expect(comp.role).toEqual('menu');
    });

    it('align defaults to: left', () => {
        expect(comp.align).toEqual('left');
    });

});
