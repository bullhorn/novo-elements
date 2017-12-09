// NG2
import { SimpleChange, SimpleChanges } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// APP
import { NovoTilesComponent, IItem } from './tiles.component';
import { NovoTilesModule } from './tiles.module';
import { Helpers } from '../../utils/helpers/helpers.service';

describe('Elements: NovoTilesComponent', () => {
    let fixture: ComponentFixture<NovoTilesComponent>;
    let component: NovoTilesComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NovoTilesModule,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(NovoTilesComponent);
        component = fixture.debugElement.componentInstance;
    }));

    describe('Method: ngOnInit()', () => {
        it('should reformat array options to an object', () => {
            expect(component.ngOnInit).toBeDefined();
            component.options = ['cat', 'dog', 'bird', 'horse', 'bunny'];
            component.ngOnInit();
            expect(component._options).toBeDefined();
            expect(component._options[0].value).toBe(component.options[0]);
            expect(component._options[0].label).toBe(component.options[0]);
        });

        xit('should add checked status to options', () => {
            component.ngOnInit();
            expect('checked' in component._options[0]).toBeTruthy();
        });
    });

    describe('Method: ngOnChanges()', () => {
        it('should be defined', () => {
            expect(component.ngOnChanges).toBeDefined();
        });

        it('should change the options array if changes exist', () => {
            spyOn(component, 'setupOptions');
            component._options = [1, 2, 3, 4, 5];
            let changeSet: SimpleChanges = { options: new SimpleChange([1, 2, 3, 4, 5], [5, 4, 3, 2, 1], false) };
            component.ngOnChanges(changeSet);
            expect(component.setupOptions).toHaveBeenCalled();
        });

        it('should NOT change the options array there is not previous values', () => {
            spyOn(component, 'setupOptions');
            component._options = [1, 2, 3, 4, 5];
            let changeSet: SimpleChanges = { options: new SimpleChange({}, [5, 4, 3, 2, 1], true) };
            component.ngOnChanges(changeSet);
            expect(component.setupOptions).not.toHaveBeenCalled();
        });
    });

    xdescribe('Method: select(event, item)', () => {
        it('should be defined.', () => {
            expect(component.select).toBeDefined();
        });

        it('should set label 2 with checked equal to true', () => {
            component.options[1].checked = false;
            component.select(undefined, component.options[1]);
            expect(component.options[1].checked).toBeTruthy();
        });

        it('should only allow one tile to be checked true', () => {
            component.ngOnInit();
            component.select(undefined, component.options[0]);
            expect(component.options[0].checked).toBeTruthy();
            expect(component.options[1].checked).toBeFalsy();
            expect(component.options[2].checked).toBeFalsy();
            component.select(undefined, component.options[1]);
            expect(component.options[0].checked).toBeFalsy();
            expect(component.options[1].checked).toBeTruthy();
            expect(component.options[2].checked).toBeFalsy();
            component.select(undefined, component.options[2]);
            expect(component.options[0].checked).toBeFalsy();
            expect(component.options[1].checked).toBeFalsy();
            expect(component.options[2].checked).toBeTruthy();
        });
    });

    describe('Method: writeValue()', () => {
        it('should be defined.', () => {
            expect(component.writeValue).toBeDefined();
        });

        it('should change the value', () => {
            component.options = [{ label: 'cat', value: 'cat' }];
            spyOn(component, 'setupOptions');
            spyOn(Helpers, 'isBlank').and.returnValue(false);
            component.writeValue(10);
            expect(component.model).toBe(10);
            expect(component.setupOptions).toHaveBeenCalled();
        });
        it('should not call setup if model is blank', () => {
            component.options = [{ label: 'cat', value: 'cat' }];
            spyOn(component, 'setupOptions');
            spyOn(Helpers, 'isBlank').and.returnValue(true);
            component.writeValue(10);
            expect(component.model).toBe(10);
            expect(component.setupOptions).not.toHaveBeenCalled();
        });
    });

    describe('Method: setFocus()', () => {
        it('should be defined.', () => {
            expect(component.setFocus).toBeDefined();
        });

        it('should set focus correctly', () => {
            component.setFocus(true);
            expect(component.focused).toBeTruthy();
            component.setFocus(false);
            expect(component.focused).toBeFalsy();
        });
    });

    describe('Method: registerOnChange()', () => {
        it('should be defined.', () => {
            expect(component.registerOnChange).toBeDefined();
        });
        it('should set onModelChange.', () => {
            let testFn: Function = () => { return 'novo novo'; };
            component.registerOnChange(testFn);
            expect(component.onModelChange).toEqual(testFn);
        });
    });

    describe('Method: registerOnTouched()', () => {
        it('should be defined.', () => {
            expect(component.registerOnTouched).toBeDefined();
        });
        it('should set onModelChange.', () => {
            let testFn: Function = () => { return 'novo novo'; };
            component.registerOnTouched(testFn);
            expect(component.onModelTouched).toEqual(testFn);
        });
    });

    describe('Method: setTile()', () => {
        it('should be defined.', () => {
            expect(component.setTile).toBeDefined();
        });
        it('should set activeTile and move tile.', () => {
            let item: IItem = { label: 'Cat!', value: 'Cat' };
            spyOn(component, 'moveTile');
            component.setTile(item);
            expect(component.activeTile).toEqual(item.value);
            expect(component.moveTile).toHaveBeenCalled();
        });
        it('should do nothing if no value provided.', () => {
            spyOn(component, 'moveTile');
            component.setTile(undefined);
            expect(component.moveTile).not.toHaveBeenCalled();
        });
    });
    describe('Method: setupOptions()', () => {
        it('should be defined.', () => {
            expect(component.setupOptions).toBeDefined();
        });
        it('should setup options if only values passed in.', () => {
            component.options = ['item1', 'item2'];
            let expected: IItem[] = [
                { value: 'item1', label: 'item1', checked: false },
                { value: 'item2', label: 'item2', checked: false },
            ];
            component.setupOptions();
            expect(component._options).toBeDefined();
            expect(component._options).toEqual(expected);
        });
        it('should setup options if formatted objects passed in.', () => {
            component.options = [
                { value: 'item1', label: 'item1' },
                { value: 'item2', label: 'item2' },
            ];
            let expected: IItem[] = [
                { value: 'item1', label: 'item1', checked: false },
                { value: 'item2', label: 'item2', checked: false },
            ];
            component.setupOptions();
            expect(component._options).toBeDefined();
            expect(component._options).toEqual(expected);
        });
        it('should set tile while setting up objects.', () => {
            let selected: IItem = { value: 'item1', label: 'item1', checked: true };
            let expected: IItem[] = [
                selected,
                { value: 'item2', label: 'item2', checked: false },
            ];
            component.options = [
                { value: 'item1', label: 'item1' },
                { value: 'item2', label: 'item2' },
            ];
            component.model = selected.value;
            spyOn(component, 'setTile');
            component.setupOptions();
            expect(component._options).toBeDefined();
            expect(component._options).toEqual(expected);
            expect(component.setTile).toHaveBeenCalledWith(selected);
        });
    });
    describe('Method: select()', () => {
        it('should be defined.', () => {
            expect(component.select).toBeDefined();
        });
        it('should select a non-disabled item.', () => {
            let item: IItem = { value: 'item1', label: 'item1', checked: false, disabled: false };
            let event: Event = new Event('type');
            component._options = [
                item,
                { value: 'item2', label: 'item2', checked: true },
            ];
            spyOn(event, 'stopPropagation');
            spyOn(event, 'preventDefault');
            spyOn(component, 'onModelChange');
            spyOn(component, 'setTile');
            spyOn(component.onChange, 'emit');
            component.select(event, item);
            expect(component._options[0].checked).toBeTruthy();
            expect(component._options[1].checked).toBeFalsy();
            expect(event.stopPropagation).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
            expect(component.onModelChange).toHaveBeenCalledWith(item.value);
            expect(component.onChange.emit).toHaveBeenCalledWith(item.value);
            expect(component.setTile).toHaveBeenCalledWith(item);
        });
        it('should handle a disabled item.', () => {
            let item: IItem = { value: 'item1', label: 'item1', checked: false, disabled: true };
            let event: Event = new Event('type');
            spyOn(component.onDisabledOptionClick, 'emit');
            component.select(event, item);
            expect(component.onDisabledOptionClick.emit).toHaveBeenCalledWith(item);
        });
    });
    describe('Method: moveTile()', () => {
        it('should be defined.', () => {
            expect(component.moveTile).toBeDefined();
        });
        it('should modify styling of selected tile.', () => {
            jest.useFakeTimers();
            let ind: HTMLElement = document.createElement('div');
            let el: HTMLElement = document.createElement('div');
            let fakeQuerySelector: any = (selector: string) => {
                if (selector === '.active-indicator') {
                    return ind;
                } else {
                    return el;
                }
            };
            spyOn(component.element.nativeElement, 'querySelector').and.callFake(fakeQuerySelector);
            component.moveTile();
            jest.runAllTimers();
            expect(component.state).toEqual('active');
            expect(ind.style.width).toEqual('4px');
            expect(ind.style.transform).toEqual('translateX(0px)');
        });
    });
});
