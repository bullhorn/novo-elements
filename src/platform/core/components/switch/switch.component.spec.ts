import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NovoSwitchComponent } from './switch.component';
import { NovoSwitchModule } from './switch.module';

describe('NovoSwitchComponent', () => {
    let comp: NovoSwitchComponent;
    let fixture: ComponentFixture<NovoSwitchComponent>;

    beforeEach(() => {
        const changeDetectorRefStub: any = {
            markForCheck: () => ({}),
        };
        TestBed.configureTestingModule({
            imports: [NovoSwitchModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ChangeDetectorRef, useValue: changeDetectorRefStub }
            ],
        });
        fixture = TestBed.createComponent(NovoSwitchComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('role defaults to: checkbox', () => {
        expect(comp.role).toEqual('checkbox');
    });

});
