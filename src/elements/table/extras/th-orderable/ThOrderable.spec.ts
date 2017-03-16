// NG2
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
// App
import { ThOrderable } from './ThOrderable';

@Component({
    selector: 'test-component',
    template: `
        <table>
            <tr>
                <th novoThOrderable="right"></th>
            </tr>
        </table>
    `
})
class TestComponent {}

describe('Elements: ThOrderable', () => {
    let fixture;
    let component;

    describe('Directive: ', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    ThOrderable,
                    TestComponent
                ]
            }).compileComponents();
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.debugElement.componentInstance;
        }));

        it('should initialize with defaults', () => {
            expect(component).toBeDefined();
        });
    });
    describe('Class: ', () => {

    });
});
