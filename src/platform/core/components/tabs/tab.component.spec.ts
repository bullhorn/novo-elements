import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NovoTabComponent } from './tab.component';
import { NovoTabsModule } from './tabs.module';

describe('NovoTabComponent', () => {
    let comp: NovoTabComponent;
    let fixture: ComponentFixture<NovoTabComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NovoTabsModule],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(NovoTabComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('active defaults to: false', () => {
        expect(comp.active).toEqual(false);
    });

    it('disabled defaults to: false', () => {
        expect(comp.disabled).toEqual(false);
    });

});
