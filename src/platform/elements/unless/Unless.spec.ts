// NG2
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// Vendor
// APP
import { Unless } from './Unless';
import { Security } from './../../services/security/Security';

@Component({
    selector: 'test-cmp',
    template: `
        <div bhUnless="false"></div>
    `,
})
class TestCmp {
}

xdescribe('Element: Unless', () => {
    let fixture: any;
    let component: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestCmp,
                Unless,
            ],
            providers: [
                { provide: TemplateRef, useClass: TemplateRef },
                { provide: Security, useClass: Security },
                { provide: ViewContainerRef, useClass: ViewContainerRef },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(TestCmp);
        component = fixture.debugElement.componentInstance;
    }));

    it('should initialize with all its defaults.', () => {
        expect(component).toBeDefined();
    });
});
