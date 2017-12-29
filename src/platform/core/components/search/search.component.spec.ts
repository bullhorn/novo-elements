import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { NovoSearchModule } from './search.module';
import { NovoSearchComponent } from './search.component';
import 'rxjs/add/operator/map';

xdescribe('NovoSearchComponent', () => {
    let comp: NovoSearchComponent;
    let fixture: ComponentFixture<NovoSearchComponent>;

    beforeEach(() => {
        const elementRefStub: any = {};
        const changeDetectorRefStub: any = {
            markForCheck: () => ({}),
        };
        const ngZoneStub: any = {
            run: () => ({}),
        };
        TestBed.configureTestingModule({
            imports: [NovoSearchModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ElementRef, useValue: elementRefStub },
                { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
                { provide: NgZone, useValue: ngZoneStub },
            ],
        });
        fixture = TestBed.createComponent(NovoSearchComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('icon defaults to: search', () => {
        expect(comp.icon).toEqual('search');
    });

    it('placeholder defaults to: Search...', () => {
        expect(comp.placeholder).toEqual('Search...');
    });

    it('alwaysOpen defaults to: false', () => {
        expect(comp.alwaysOpen).toEqual(false);
    });

    it('theme defaults to: positive', () => {
        expect(comp.theme).toEqual('positive');
    });

    it('closeOnSelect defaults to: true', () => {
        expect(comp.closeOnSelect).toEqual(true);
    });

    it('focused defaults to: false', () => {
        expect(comp.focused).toEqual(false);
    });

    describe('onFocus', () => {
        it('makes expected calls', () => {
            const ngZoneStub: NgZone = fixture.debugElement.injector.get(NgZone);
            spyOn(ngZoneStub, 'run');
            comp.onFocus();
            expect(ngZoneStub.run).toHaveBeenCalled();
        });
    });

});
