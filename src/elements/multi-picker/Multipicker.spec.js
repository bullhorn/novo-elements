import { NovoMultiPickerElement } from './MultiPicker';
import { APP_TEST_PROVIDERS } from './../../testing/test-providers';

describe('Element: NovoMultiPickerElement', () => {
    let component;

    beforeEach(() => {
        addProviders([
            NovoMultiPickerElement,
            APP_TEST_PROVIDERS
        ]);
    });

    beforeEach(inject([NovoMultiPickerElement], _component => {
        component = _component;
    }));

    describe('Function: ngOnInit()', () => {
        it('should initialize properly', () => {
            expect(component.ngOnInit).toBeDefined();
            expect(component.clearValue).toBeDefined();
            expect(component.setupOptions).toBeDefined();
        });
    });

    describe('Function: clearValue()', () => {
        it('should clear items, uncheck options, and reset value', () => {
            component.types = ['numbers'];
            component.items = [1, 2];
            component.value = [1, 2];
            component._options = [{ type: 'numbers', data: [{ value: 1, checked: true }, { value: 2, checked: false, indeterminate: true }] }];
            component.clearValue();
            expect(component.items.length).toBe(0);
            expect(component.value).toEqual({ numbers: [] });
            expect(component._options[0].data[0].checked).toBeFalsy();
            expect(component._options[0].data[1].indeterminate).toBeFalsy();
        });
    });

    describe('Function: setupOptions()', () => {
        it('should correctly setup options', () => {
            component.source = { options: [{ type: 'numbers', data: [1] }] };
            component.setupOptions();
            let data = [{ value: 'ALL', label: 'All numbers', type: 'numbers', checked: undefined }, { value: 1, label: '1', type: 'numbers', checked: undefined }];
            let originalData = data;
            expect(component._options).toEqual([{ type: 'numbers', data: data, originalData: originalData }]);
            expect(component.source.options).toBe(component._options);
        });
    });

    describe('Function: setupOptionByType(section)', () => {
        it('should correctly format a section of options', () => {
            let section = { type: 'cats', data: ['Kitty'] };
            let data = [{ value: 'ALL', label: 'All cats', type: 'cats', checked: undefined }, { value: 'Kitty', label: 'Kitty', type: 'cats', checked: undefined }];
            let expected = { type: 'cats', data: data, originalData: data };
            let actualResult = component.setupOptionsByType(section);
            expect(actualResult).toEqual(expected);
        });
    });


    describe('Function: deselectAll()', () => {
        it('should remove selection', () => {
            component.selected = 'test';
            component.deselectAll();
            expect(component.selected).toBeFalsy();
        });
    });

    describe('Function: select(event, item)', () => {
        it('should select item', () => {
            component.selected = 'before';
            component.select(null, 'after');
            expect(component.selected).toBe('after');
        });
    });

    describe('Function: clickOption(event)', () => {
        it('should remove item if checked is false', () => {
            let item = { checked: false };
            spyOn(component, 'remove');
            component.clickOption(item);
            expect(component.remove).toHaveBeenCalled();
        });

        it('should add item if checked is true', () => {
            let item = { checked: true };
            spyOn(component, 'add');
            component.clickOption(item);
            expect(component.add).toHaveBeenCalled();
        });
    });

    describe('Function: updateItems(item, action)', () => {
        it('should update items if adding', () => {
            component.items = [];
            let item = { value: 'Cat', label: 'Cat' };
            component.updateItems(item, 'add');
            expect(component.items.length).toBe(1);
        });

        it('should update items if removing', () => {
            let item = { value: 'Cat', label: 'Cat' };
            component.items = [item];
            component.updateItems(item, 'remove');
            expect(component.items.length).toBe(0);
        });
    });

    describe('Function: remove(event, item)', () => {
        it('should remove ALL item correctly', () => {
            let item = { value: 'ALL' };
            spyOn(component, 'modifyAllOfType');
            spyOn(component, 'removeItem');
            component.remove(null, item);
            expect(component.modifyAllOfType).toHaveBeenCalled();
            expect(component.removeItem).toHaveBeenCalled();
        });

        it('should remove normal item if ALL selected', () => {
            component.items = [{ value: 'ALL', label: 'Cat', type: 'cats' }];
            let itemToRemove = { value: 'Cat', label: 'Cat', type: 'cats' };
            spyOn(component, 'handleRemoveItemIfAllSelected');
            spyOn(component, 'removeItem');
            component.remove(null, itemToRemove);
            expect(component.handleRemoveItemIfAllSelected).toHaveBeenCalled();
            expect(component.removeItem).toHaveBeenCalled();
        });

        it('should remove item normally if ALL is not selected', () => {
            component.items = [{ value: 'Cat', label: 'Cat', type: 'cats' }];
            let itemToRemove = { value: 'Cat', label: 'Cat', type: 'cats' };
            spyOn(component, 'removeItem');
            component.remove(null, itemToRemove);
            expect(component.removeItem).toHaveBeenCalled();
        });
    });

    describe('Function: add(event)', () => {
        it('should add ALL item correctly', () => {
            let item = { value: 'ALL' };
            spyOn(component, 'modifyAllOfType');
            spyOn(component, 'select');
            component.add(item);
            expect(component.modifyAllOfType).toHaveBeenCalled();
            expect(component.select).toHaveBeenCalled();
        });

        it('should correctly add individual item', () => {
            component.types = ['cats'];
            component.value = { cats: [] };
            component._options = [{ type: 'cats', data: [{ value: 'ALL', indeterminate: undefined }, { value: 'Kitty' }, { value: 'Tiger' }] }];
            let itemToAdd = { value: 'Cat', label: 'Cat', type: 'cats' };
            spyOn(component, 'updateItems');
            spyOn(component, 'updateIndeterminateState');
            component.add(itemToAdd);
            expect(component.updateItems).toHaveBeenCalled();
            expect(component.updateIndeterminateState).toHaveBeenCalled();
            expect(component.value.cats.length).toBe(1);
        });
    });

    describe('Function: remove(item)', () => {
        it('should handle removing item correctly from value and items and update checked state', () => {
            let item = { value: 'Cat', checked: true, type: 'cats' };
            component.types = ['cats'];
            component.items = [item, { value: 'Tiger' }];
            component.value = { cats: ['Tiger', 'Cat'] };
            component.removeItem(item);
            expect(item.checked).toBeFalsy();
            expect(component.items.length).toBe(1);
            expect(component.value.cats).toEqual(['Tiger']);
        });
    });

    describe('Function: updateMoreItemsText(items)', () => {
        it('should create an object with correct type and count when count is above 2', () => {
            let items = [{ value: 1, type: 'numbers' }, { value: 2, type: 'numbers' }, { value: 3, type: 'numbers' }, { value: 4, type: 'numbers' }, { value: 5, type: 'numbers' }, { value: 6, type: 'numbers' }];
            component.types = ['numbers'];
            component.updateMoreItemsText(items);
            expect(component.notShown.length).toBe(1);
            expect(component.notShown[0].type).toBe('numbers');
            expect(component.notShown[0].count).toBe(2);
        });
        it('not add type and count to object if count is 0', () => {
            let items = [{ value: 1, type: 'numbers' }, { value: 2, type: 'numbers' }, { value: 3, type: 'numbers' }, { value: 4, type: 'numbers' }];
            component.types = ['numbers'];
            component.updateMoreItemsText(items);
            expect(component.notShown.length).toBe(0);
        });
        it('add all items to count if all of type is selected', () => {
            let items = [{ value: 1, type: 'numbers' }, { value: 2, type: 'numbers' }, { value: 3, type: 'numbers' }, { value: 4, type: 'numbers' }, { value: 'ALL', type: 'cats' }];
            component.types = ['numbers', 'cats'];
            component._options = [{ type: 'numbers', data: [1, 2, 3, 4] }, { type: 'cats', data: ['ALL', 2, 3, 4, 5, 6, 7, 8] }];
            component.updateMoreItemsText(items);
            expect(component.notShown.length).toBe(1);
            expect(component.notShown[0].type).toBe('cats');
            expect(component.notShown[0].count).toBe(7);
        });
    });

    describe('Function: allOfTypeSelected(type)', () => {
        it('should return true if ALL of type is selected', () => {
            let item = { value: 'ALL', checked: true, type: 'cats' };
            component.items = [item];
            expect(component.allOfTypeSelected('cats')).toBeTruthy();
        });

        it('should return false if ALL of type is not selected', () => {
            let item = { value: 'Kitty', checked: true, type: 'cats' };
            component.items = [item];
            expect(component.allOfTypeSelected('cats')).toBeFalsy();
        });
    });

    describe('Function: modifyAllOfType(type, action)', () => {
        it('should select all if selecting', () => {
            component.types = ['cats'];
            component._options = [{ type: 'cats', data: [{ value: 'ALL', checked: false, type: 'cats' }, { value: 'Kitty', checked: false, type: 'cats' }] }];
            component.value = { cats: [] };
            component.modifyAllOfType('cats', 'select');
            expect(component._options[0].data[0].checked).toBeTruthy();
            expect(component._options[0].data[1].checked).toBeTruthy();
            expect(component.value.cats).toEqual(['Kitty']);
        });

        it('should unselect all if unselecting', () => {
            component.types = ['cats'];
            component._options = [{ type: 'cats', data: [{ value: 'ALL', checked: false, type: 'cats' }, { value: 'Kitty', checked: true, type: 'cats' }] }];
            component.value = { cats: [{ value: 'Kitty', checked: true, type: 'cats' }] };
            component.modifyAllOfType('cats', 'unselect');
            expect(component._options[0].data[1].checked).toBeFalsy();
            expect(component.value.cats.length).toBe(0);
        });
    });

    describe('Function: selectAll(type,)', () => {
        it('should correctly update value and items when selecting all', () => {
            component.types = ['cats'];
            component._options = [{ type: 'cats', data: [{ value: 'ALL', checked: false, type: 'cats' }, { value: 'Kitty', checked: false, type: 'cats' }, { value: 'Tiger', checked: false, type: 'cats' }] }];
            component.value = { cats: [{ value: 'Kitty', checked: false, type: 'cats' }] };
            component.selectAll(component._options[0].data, 'cats');
            expect(component.value.cats.length).toBe(2);
            expect(component.items.length).toBe(1);
            expect(component.items[0].value).toBe('ALL');
        });
    });

    describe('Function: handleRemoveItemIfAllSelected(item)', () => {
        it('should correctly update value and items when removing an item AND ALL is currently selected', () => {
            component.types = ['cats'];
            let allItem = { value: 'ALL', checked: true, type: 'cats' };
            component._options = [{ type: 'cats', data: [allItem, { value: 'Kitty', checked: true, type: 'cats' }, { value: 'Tiger', checked: true, type: 'cats' }] }];
            component.value = { cats: [{ value: 'ALL', checked: false, type: 'cats' }] };
            component.items = [allItem];
            component.handleRemoveItemIfAllSelected({ type: 'cats' });
            expect(allItem.indeterminate).toBeTruthy();
            expect(component.value.cats.length).toBe(2);
            expect(component.items.length).toBe(2);
        });
    });

    describe('Function: setInitialValue(model)', () => {
        it('should correctly set intial value and items if a model is passed in to start', () => {
            let model = { cats: ['Kitty'] };
            component.types = ['cats'];
            component._options = [{ type: 'cats', data: [{ value: 'ALL', checked: false, type: 'cats' }, { value: 'Kitty', checked: true, type: 'cats' }, { value: 'Tiger', checked: true, type: 'cats' }] }];
            component.setInitialValue(model);
            expect(component._options[0].data[1].checked).toBeTruthy();
            expect(component.items.length).toBe(1);
            expect(component.value.cats).toEqual(['Kitty']);
        });
        it('should correctly set intial value and items if no model is passed in to start', () => {
            component.types = ['cats'];
            component._options = [{ type: 'cats', data: [{ value: 'ALL', checked: false, type: 'cats' }, { value: 'Kitty', checked: true, type: 'cats' }, { value: 'Tiger', checked: true, type: 'cats' }] }];
            component.setInitialValue(null);
            expect(component.items).toEqual([]);
            expect(component.value.cats).toEqual([]);
        });
    });

    describe('Function: updateIndeterminateState(type, status)', () => {
        it('should correctly set "ALL [type" to true', () => {
            component.types = ['cats'];
            component._options = [{ type: 'cats', data: [{ value: 'ALL', checked: false, type: 'cats', indeterminate: undefined }] }];
            component.updateIndeterminateState('cats', true);
            expect(component._options[0].data[0].indeterminate).toBeTruthy();
        });
        it('should correctly set "ALL [type" to false', () => {
            component.types = ['cats'];
            component._options = [{ type: 'cats', data: [{ value: 'ALL', checked: false, type: 'cats', indeterminate: undefined }] }];
            component.updateIndeterminateState('cats', false);
            expect(component._options[0].data[0].indeterminate).toBeFalsy();
        });
    });

    describe('Function: getAllOfType(type)', () => {
        it('should get all of type', () => {
            component.types = ['cats'];
            component._options = [{ type: 'cats', data: [1, 2, 3, 4] }];
            let result = component.getAllOfType('cats');
            expect(result.length).toBe(4);
        });
    });
    describe('Function: allItemsSelected(optionsByType, type)', () => {
        it('should return true if all individual items are selected', () => {
            component.types = ['cats'];
            let options = ['All', 'Kitty', 'Tiger'];
            component.value = { cats: ['Kitty', 'Tiger'] };
            expect(component.allItemsSelected(options, 'cats')).toBeTruthy();
        });
        it('should return false if all individual items are not selected', () => {
            component.types = ['cats'];
            let options = ['All', 'Kitty', 'Tiger'];
            component.value = { cats: ['Kitty'] };
            expect(component.allItemsSelected(options, 'cats')).toBeFalsy();
        });
    });
});
