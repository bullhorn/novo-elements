import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NovoTabComponent } from './tab.component';
import { NovoNavComponent } from './tabs.component';
import { NovoTabsModule } from './tabs.module';

describe('NovoNavComponent', () => {
    let comp: NovoNavComponent;
    let fixture: ComponentFixture<NovoNavComponent>;

    beforeEach(() => {
        const novoTabComponentStub: any = {
            activate: () => ({}),
        };
        TestBed.configureTestingModule({
            imports: [NovoTabsModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: NovoTabComponent, useValue: novoTabComponentStub },
            ],
        });
        fixture = TestBed.createComponent(NovoNavComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('condensed defaults to: false', () => {
        expect(comp.condensed).toEqual(false);
    });

    xdescribe('onSelect', () => {
        it('makes expected calls', () => {
            const novoTabComponentStub: NovoTabComponent = fixture.debugElement.injector.get(NovoTabComponent);
            spyOn(novoTabComponentStub, 'activate');
            comp.onSelect(novoTabComponentStub);
            expect(novoTabComponentStub.activate).toHaveBeenCalled();
        });
    });

});
