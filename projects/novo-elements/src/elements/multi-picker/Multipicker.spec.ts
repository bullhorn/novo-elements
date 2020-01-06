// NG2
import { FormsModule } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';
// App
import { NovoMultiPickerElement } from './MultiPicker';
import { NovoMultiPickerModule } from './MultiPicker.module';
import { KeyCodes } from '../../utils/key-codes/KeyCodes';
import { NovoLabelService } from '../../services/novo-label-service';
import { ComponentUtils } from '../../utils/component-utils/ComponentUtils';

describe('Element: NovoMultiPickerElement', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NovoLabelService, useClass: NovoLabelService }, { provide: ComponentUtils, useClass: ComponentUtils }],
      imports: [FormsModule, NovoMultiPickerModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NovoMultiPickerElement);
    component = fixture.debugElement.componentInstance;
  }));

  describe('Method: ngOnInit()', () => {
    it('should initialize properly', () => {
      expect(component.ngOnInit).toBeDefined();
      expect(component.clearValue).toBeDefined();
      expect(component.setupOptions).toBeDefined();
    });
  });

  describe('Method: clearValue()', () => {
    it('should clear items, uncheck options, and reset value', () => {
      component.types = [{ value: 'numbers' }];
      component.items = [1, 2];
      component.value = [1, 2];
      const one = { value: 1, checked: true };
      const two = { value: 2, checked: false, indeterminate: true };
      component._options = [{ type: 'numbers', data: [one, two], originalData: [one, two] }];
      component.clearValue();
      expect(component.items.length).toBe(0);
      expect(component.value).toEqual({ numbers: [] });
      expect(component._options[0].data[0].checked).toBeFalsy();
      expect(component._options[0].data[1].indeterminate).toBeFalsy();
    });
  });

  xdescribe('Method: setupOptions()', () => {
    it('should correctly setup options', () => {
      component.source = { options: [{ type: 'numbers', data: [1] }] };
      component.setupOptions();
      const data = [
        {
          value: 'ALL',
          label: 'All numbers',
          type: 'numbers',
          checked: undefined,
          isParentOf: undefined,
          isChildOf: undefined,
        },
        { value: 1, label: '1', type: 'numbers', checked: undefined, isParentOf: undefined, isChildOf: undefined },
      ];
      const originalData = data;
      expect(component._options).toEqual([{ type: 'numbers', data, originalData }]);
      expect(component.source.options).toBe(component._options);
    });
  });

  describe('Method: formatOption(section)', () => {
    it('should correctly format a parent option', () => {
      const section = { type: 'cats', isParentOf: 'kittens' };
      const item = { value: 1 };
      const expectedObj = {
        value: 1,
        label: '1',
        type: 'cats',
        checked: undefined,
        isParentOf: 'kittens',
        isChildOf: undefined,
      };
      const actual = component.formatOption(section, item);
      expect(actual).toEqual(expectedObj);
    });
    it('should correctly format a child option', () => {
      const section = { type: 'kittens', isChildOf: 'cats' };
      const item = { value: 1, cats: [{ id: 1 }] };
      const expectedObj = {
        value: 1,
        label: '1',
        type: 'kittens',
        checked: undefined,
        isChildOf: 'cats',
        isParentOf: undefined,
        cats: [{ id: 1 }],
      };
      const actual = component.formatOption(section, item);
      expect(actual).toEqual(expectedObj);
    });
    it('should correctly format a non parent/child option', () => {
      const section = { type: 'kittens' };
      const item = { value: 1 };
      const expectedObj = {
        value: 1,
        label: '1',
        type: 'kittens',
        checked: undefined,
        isChildOf: undefined,
        isParentOf: undefined,
      };
      const actual = component.formatOption(section, item);
      expect(actual).toEqual(expectedObj);
    });
  });

  describe('Method: createSelectAllOption(section, item)', () => {
    it('should correctly create a select all option for a child type', () => {
      const section = { type: 'kittens', isChildOf: 'cats', data: [{ cats: [{ id: 1 }, { id: 2 }] }] };
      const expected = {
        value: 'ALL',
        label: 'All kittens',
        type: 'kittens',
        checked: undefined,
        isParentOf: undefined,
        isChildOf: 'cats',
        cats: [{ id: 1 }, { id: 2 }],
      };
      const actualResult = component.createSelectAllOption(section);
      expect(actualResult).toEqual(expected);
    });
    it('should correctly create a select all option for a parent type', () => {
      const section = { type: 'cats', isParentOf: 'kittens', data: [{ cats: [{ id: 1 }, { id: 2 }] }] };
      const expected = {
        value: 'ALL',
        label: 'All cats',
        type: 'cats',
        checked: undefined,
        isParentOf: 'kittens',
        isChildOf: undefined,
      };
      const actualResult = component.createSelectAllOption(section);
      expect(actualResult).toEqual(expected);
    });
  });

  describe('Method: setupOptionByType(section)', () => {
    it('should correctly format a section of options without the ALL section', () => {
      component.selectAllOption = false;
      const section = { type: 'cats', label: 'cats', data: ['Kitty'] };
      const data = [{ value: 'Kitty', label: 'Kitty', type: 'cats', checked: undefined, isParentOf: undefined, isChildOf: undefined }];
      const expected = { type: 'cats', label: 'cats', data, originalData: data };
      const actualResult = component.setupOptionsByType(section);
      expect(actualResult).toEqual(expected);
    });
    it('should correctly format a section of options with the ALL section', () => {
      component.selectAllOption = true;
      const section = { type: 'cats', label: 'cats', data: ['Kitty'] };
      const data = [
        {
          value: 'ALL',
          label: 'All cats',
          type: 'cats',
          checked: undefined,
          isParentOf: undefined,
          isChildOf: undefined,
        },
        { value: 'Kitty', label: 'Kitty', type: 'cats', checked: undefined, isParentOf: undefined, isChildOf: undefined },
      ];
      const expected = { type: 'cats', label: 'cats', data, originalData: data };
      const actualResult = component.setupOptionsByType(section);
      expect(actualResult).toEqual(expected);
    });
  });

  describe('Method: deselectAll()', () => {
    it('should remove selection', () => {
      component.selected = 'test';
      component.deselectAll();
      expect(component.selected).toBeFalsy();
    });
  });

  xdescribe('Method: select(event, item)', () => {
    it('should select item', () => {
      component.selected = 'before';
      component.select(null, 'after');
      expect(component.selected).toBe('after');
    });
  });

  xdescribe('Method: clickOption(event)', () => {
    it('should remove item if checked is false', () => {
      const item = { checked: false };
      jest.spyOn(component, 'remove').mockImplementation(() => {});
      jest.spyOn(component, 'modifyAffectedParentsOrChildren').mockImplementation(() => {});
      component.clickOption(item);
      expect(component.remove).toHaveBeenCalled();
      expect(component.modifyAffectedParentsOrChildren).toHaveBeenCalled();
    });

    it('should add item if checked is true', () => {
      const item = { checked: true };
      jest.spyOn(component, 'add').mockImplementation(() => {});
      jest.spyOn(component, 'modifyAffectedParentsOrChildren').mockImplementation(() => {});
      component.clickOption(item);
      expect(component.add).toHaveBeenCalled();
      expect(component.modifyAffectedParentsOrChildren).toHaveBeenCalled();
    });
  });

  describe('Method: updateDisplayItems(item, action)', () => {
    it('should update items if adding', () => {
      component.items = [];
      const item = { value: 'Cat', label: 'Cat' };
      component.updateDisplayItems(item, 'add');
      expect(component.items.length).toBe(1);
    });

    it('should update items if removing', () => {
      const item = { value: 'Cat', label: 'Cat' };
      component.items = [item];
      component.updateDisplayItems(item, 'remove');
      expect(component.items.length).toBe(0);
    });
  });

  describe('Method: remove(event, item)', () => {
    it('should remove ALL item correctly', () => {
      const item = { value: 'ALL' };
      jest.spyOn(component, 'modifyAllOfType').mockImplementation(() => {});
      jest.spyOn(component, 'removeItem').mockImplementation(() => {});
      component.remove(null, item);
      expect(component.modifyAllOfType).toHaveBeenCalled();
      expect(component.removeItem).toHaveBeenCalled();
    });

    it('should remove normal item if ALL selected', () => {
      component.items = [{ value: 'ALL', label: 'Cat', type: 'cats' }];
      const itemToRemove = { value: 'Cat', label: 'Cat', type: 'cats' };
      jest.spyOn(component, 'handleRemoveItemIfAllSelected').mockImplementation(() => {});
      jest.spyOn(component, 'removeItem').mockImplementation(() => {});
      component.remove(null, itemToRemove);
      expect(component.handleRemoveItemIfAllSelected).toHaveBeenCalled();
      expect(component.removeItem).toHaveBeenCalled();
    });

    it('should remove item normally if ALL is not selected', () => {
      component.items = [{ value: 'Cat', label: 'Cat', type: 'cats' }];
      const itemToRemove = { value: 'Cat', label: 'Cat', type: 'cats' };
      jest.spyOn(component, 'removeItem').mockImplementation(() => {});
      component.remove(null, itemToRemove);
      expect(component.removeItem).toHaveBeenCalled();
    });
  });

  describe('Method: add(event)', () => {
    it('should add ALL item correctly', () => {
      const item = { value: 'ALL' };
      jest.spyOn(component, 'modifyAllOfType').mockImplementation(() => {});
      jest.spyOn(component, 'select').mockImplementation(() => {});
      component.add(item);
      expect(component.modifyAllOfType).toHaveBeenCalled();
      expect(component.select).toHaveBeenCalled();
    });

    it('should correctly add individual item', () => {
      component.types = [{ value: 'cats' }];
      component.value = { cats: [] };
      component._options = [{ type: 'cats', data: [{ value: 'ALL', indeterminate: undefined }, { value: 'Kitty' }, { value: 'Tiger' }] }];
      const itemToAdd = { value: 'Cat', label: 'Cat', type: 'cats' };
      jest.spyOn(component, 'updateDisplayItems').mockImplementation(() => {});
      jest.spyOn(component, 'updateAllItemState').mockImplementation(() => {});
      component.add(itemToAdd);
      expect(component.updateDisplayItems).toHaveBeenCalled();
      expect(component.updateAllItemState).toHaveBeenCalled();
      expect(component.value.cats.length).toBe(1);
    });
  });

  describe('Method: removeItem(item)', () => {
    it('should handle removing item correctly from value and items and update checked state', () => {
      const item = { value: 'Cat', checked: true, type: 'cats' };
      jest.spyOn(component, 'removeValue').mockImplementation(() => {});
      jest.spyOn(component, 'updateParentOrChildren').mockImplementation(() => {});
      component.removeItem(item);
      expect(item.checked).toBeFalsy();
      expect(component.removeValue).toHaveBeenCalled();
      expect(component.updateParentOrChildren).toHaveBeenCalled();
    });
  });

  describe('Method: removeValue(item)', () => {
    it('should handle removing item correctly from value', () => {
      const item = { value: 'Cat', type: 'cats' };
      component.types = [{ value: 'cats' }];
      component.value = { cats: ['Tiger', 'Cat'] };
      jest.spyOn(component, 'updateDisplayItems').mockImplementation(() => {});
      component.removeValue(item);
      expect(component.updateDisplayItems).toHaveBeenCalled();
      expect(component.value.cats).toEqual(['Tiger']);
      component.removeValue({ value: 'Tiger', type: 'cats' });
      expect(component.value.cats).toEqual([]);
      expect(component.updateDisplayItems).toHaveBeenCalled();
    });
  });

  describe('Method: updateDisplayText(items)', () => {
    it('should create an object with correct type and count when count is above 2', () => {
      const items = [
        { value: 1, type: 'numbers' },
        { value: 2, type: 'numbers' },
        { value: 3, type: 'numbers' },
        {
          value: 4,
          type: 'numbers',
        },
        { value: 5, type: 'numbers' },
        { value: 6, type: 'numbers' },
      ];
      component.types = [{ value: 'numbers' }];
      component.updateDisplayText(items);
      expect(component.notShown.length).toBe(1);
      expect(component.notShown[0].type).toBe('numbers');
      expect(component.notShown[0].count).toBe(2);
    });
    it('not add type and count to object if count is 0', () => {
      const items = [
        { value: 1, type: 'numbers' },
        { value: 2, type: 'numbers' },
        { value: 3, type: 'numbers' },
        { value: 4, type: 'numbers' },
      ];
      component.types = [{ value: 'numbers' }];
      component.updateDisplayText(items);
      expect(component.notShown.length).toBe(0);
    });
    it('add all items to count if all of type is selected', () => {
      const items = [
        { value: 1, type: 'numbers' },
        { value: 2, type: 'numbers' },
        { value: 3, type: 'numbers' },
        {
          value: 4,
          type: 'numbers',
        },
        { value: 'ALL', type: 'cats' },
      ];
      component.types = [{ value: 'numbers' }, { value: 'cats' }];
      component._options = [
        { type: 'numbers', data: [1, 2, 3, 4], originalData: [1, 2, 3, 4] },
        {
          type: 'cats',
          data: ['ALL', 2, 3, 4, 5, 6, 7, 8],
          originalData: ['ALL', 2, 3, 4, 5, 6, 7, 8],
        },
      ];
      component.updateDisplayText(items);
      expect(component.notShown.length).toBe(1);
      expect(component.notShown[0].type).toBe('cats');
      expect(component.notShown[0].count).toBe(7);
    });
    it('should create an object with correct type, count, and singular label when count is 1 above chipsCount', () => {
      const items = [
        { value: 1, type: 'numbers' },
        { value: 2, type: 'numbers' },
        { value: 3, type: 'numbers' },
        {
          value: 4,
          type: 'numbers',
        },
        { value: 5, type: 'numbers' },
      ];
      component.chipsCount = 4;
      component.types = [{ value: 'numbers', singular: 'singularnumber', plural: 'pluralnumbers' }];
      component.updateDisplayText(items);
      expect(component.notShown.length).toBe(1);
      expect(component.notShown[0].type).toBe('singularnumber');
      expect(component.notShown[0].count).toBe(1);
    });
    it('should create an object with correct type, count, and plural label when count is 2+ above chipsCount', () => {
      const items = [
        { value: 1, type: 'numbers' },
        { value: 2, type: 'numbers' },
        { value: 3, type: 'numbers' },
        {
          value: 4,
          type: 'numbers',
        },
        { value: 5, type: 'numbers' },
        { value: 6, type: 'numbers' },
      ];
      component.chipsCount = 2;
      component.types = [{ value: 'numbers', singular: 'singularnumber', plural: 'pluralnumbers' }];
      component.updateDisplayText(items);
      expect(component.notShown.length).toBe(1);
      expect(component.notShown[0].type).toBe('pluralnumbers');
      expect(component.notShown[0].count).toBe(4);
    });
  });

  describe('Method: allOfTypeSelected(type)', () => {
    it('should return true if ALL of type is selected', () => {
      const item = { value: 'ALL', checked: true, type: 'cats' };
      component.items = [item];
      expect(component.allOfTypeSelected('cats')).toBeTruthy();
    });

    it('should return false if ALL of type is not selected', () => {
      const item = { value: 'Kitty', checked: true, type: 'cats' };
      component.items = [item];
      expect(component.allOfTypeSelected('cats')).toBeFalsy();
    });
  });

  xdescribe('Method: modifyAllOfType(type, action)', () => {
    it('should select all if selecting', () => {
      component.types = [{ value: 'cats' }];
      const kitty = { value: 'Kitty', checked: true, type: 'cats' };
      const allItem = { value: 'ALL', checked: false, type: 'cats' };
      component._options = [{ type: 'cats', data: [allItem, kitty], originalData: [allItem, kitty] }];
      component.value = { cats: [] };
      component.modifyAllOfType('cats', 'select');
      expect(component._options[0].data[0].checked).toBeTruthy();
      expect(component._options[0].data[1].checked).toBeTruthy();
      expect(component.value.cats).toEqual(['Kitty']);
    });

    it('should unselect all if unselecting', () => {
      component.types = [{ value: 'cats' }];
      const kitty = { value: 'Kitty', checked: true, type: 'cats' };
      component._options = [
        {
          type: 'cats',
          data: [{ value: 'ALL', checked: false, type: 'cats' }, kitty],
          originalData: [{ value: 'ALL', checked: false, type: 'cats' }, kitty],
        },
      ];
      component.value = { cats: [{ value: 'Kitty', checked: true, type: 'cats' }] };
      component.modifyAllOfType('cats', 'unselect');
      expect(component._options[0].data[1].checked).toBeFalsy();
      expect(component.value.cats.length).toBe(0);
    });
  });

  xdescribe('Method: selectAll(type)', () => {
    it('should correctly update value and items when selecting all', () => {
      component.types = [{ value: 'cats' }];
      const kitty = { value: 'Kitty', checked: false, type: 'cats' };
      const allItem = { value: 'ALL', checked: false, type: 'cats' };
      const tiger = { value: 'Tiger', checked: false, type: 'cats' };
      component._options = [{ type: 'cats', data: [allItem, kitty, tiger], originalData: [allItem, kitty, tiger] }];
      component.value = { cats: [{ value: 'Kitty', checked: false, type: 'cats' }] };
      component.selectAll(component._options[0].data, 'cats');
      expect(component.value.cats.length).toBe(2);
      expect(component.items.length).toBe(1);
      expect(component.items[0].value).toBe('ALL');
    });
  });

  // xdescribe('Method: handleRemoveItemIfAllSelected(item)', () => {
  //     it('should correctly update value and items when removing an item AND ALL is currently selected', () => {
  //         component.types = [{ value: 'cats' }];
  //         let kitty = { value: 'Kitty', checked: false, type: 'cats' };
  //         let allItem = { value: 'ALL', checked: true, type: 'cats' };
  //         let tiger = { value: 'Tiger', checked: true, type: 'cats' };
  //         let cat = { value: 'Cat', checked: true, type: 'cats' };
  //         component._options = [{ type: 'cats', data: [allItem, kitty, tiger, cat], originalData: [allItem, kitty, tiger, cat] }];
  //         component.value = { cats: [kitty, tiger, cat] };
  //         component.items = [allItem];
  //         component.handleRemoveItemIfAllSelected({ type: 'cats' });
  //         expect(allItem.indeterminate).toBeTruthy();
  //         expect(component.value.cats.length).toBe(2);
  //         expect(component.items.length).toBe(2);
  //     });
  // });

  xdescribe('Method: setInitialValue(model)', () => {
    it('should correctly set intial value and items if a model is passed in to start', () => {
      const model = { cats: ['Kitty'] };
      component.types = [{ value: 'cats' }];
      const allItem = { value: 'ALL', checked: false, type: 'cats' };
      const kitty = { value: 'Kitty', checked: true, type: 'cats' };
      component._options = [{ type: 'cats', data: [allItem, kitty], originalData: [allItem, kitty] }];
      component.setInitialValue(model);
      expect(component._options[0].data[1].checked).toBeTruthy();
      expect(component.items.length).toBe(1);
      expect(component.value.cats).toEqual(['Kitty']);
    });
    it('should correctly set intial value and items if no model is passed in to start', () => {
      component.types = [{ value: 'cats' }];
      component._options = [
        {
          type: 'cats',
          data: [
            { value: 'ALL', checked: false, type: 'cats' },
            { value: 'Kitty', checked: true, type: 'cats' },
            {
              value: 'Tiger',
              checked: true,
              type: 'cats',
            },
          ],
        },
      ];
      component.setInitialValue(null);
      expect(component.items).toEqual([]);
      expect(component.value.cats).toEqual([]);
    });
  });

  xdescribe('Method: setIndeterminateState(type, status)', () => {
    it('should correctly set "ALL [type]" to true', () => {
      component.types = [{ value: 'cats' }];
      const allOfType = [{ value: 'ALL', checked: false, type: 'cats', indeterminate: undefined }];
      component.setIndeterminateState(allOfType, true);
      expect(allOfType[0].indeterminate).toBeTruthy();
    });
    it('should correctly set "ALL [type]" to false', () => {
      component.types = [{ value: 'cats' }];
      const allOfType = [{ value: 'ALL', checked: false, type: 'cats', indeterminate: undefined }];
      component.setIndeterminateState(allOfType, false);
      expect(allOfType[0].indeterminate).toBeFalsy();
    });
  });

  describe('Method: getAllOfType(type)', () => {
    it('should get all of type', () => {
      component.types = [{ value: 'cats' }];
      component._options = [{ type: 'cats', originalData: [1, 2, 3, 4] }];
      const result = component.getAllOfType('cats');
      expect(result.length).toBe(4);
    });
  });

  describe('Method: allItemsSelected(optionsByType, type)', () => {
    it('should return true if all individual items are selected', () => {
      component.types = [{ value: 'cats' }];
      const options = ['All', 'Kitty', 'Tiger'];
      component.value = { cats: ['Kitty', 'Tiger'] };
      expect(component.allItemsSelected(options, 'cats')).toBeTruthy();
    });
    it('should return false if all individual items are not selected', () => {
      component.types = [{ value: 'cats' }];
      const options = ['All', 'Kitty', 'Tiger'];
      component.value = { cats: ['Kitty'] };
      expect(component.allItemsSelected(options, 'cats')).toBeFalsy();
    });
  });

  xdescribe('Method: addIndividualChildren(parent, checked)', () => {
    it('should add an item', () => {
      component.value = { cats: [1] };
      const item = { type: 'cats', value: 2 };
      jest.spyOn(component, 'add').mockImplementation(() => {});
      component.addIndividualChildren([item]);
      expect(component.add).toHaveBeenCalled();
    });
    it('should not add a duplicate item', () => {
      component.value = { cats: [1] };
      const item = { type: 'cats', value: 1 };
      jest.spyOn(component, 'add').mockImplementation(() => {});
      component.addIndividualChildren([item]);
      expect(component.add).not.toHaveBeenCalled();
    });
  });

  xdescribe('Method: updateParentOrChildren(item, action)', () => {
    it('should call updateChildrenValue if item isParentOf', () => {
      const item = { isParentOf: true };
      jest.spyOn(component, 'updateChildrenValue').mockImplementation(() => {});
      jest.spyOn(component, 'updateParentValue').mockImplementation(() => {});
      component.updateParentOrChildren(item);
      expect(component.updateChildrenValue).toHaveBeenCalled();
      expect(component.updateParentValue).not.toHaveBeenCalled();
    });
    it('should call updateParentValue if item isChildOf', () => {
      const item = { isChildOf: true };
      jest.spyOn(component, 'updateChildrenValue').mockImplementation(() => {});
      jest.spyOn(component, 'updateParentValue').mockImplementation(() => {});
      component.updateParentOrChildren(item);
      expect(component.updateParentValue).toHaveBeenCalled();
      expect(component.updateChildrenValue).not.toHaveBeenCalled();
    });
  });

  xdescribe('Method: updateParentOrChildren(item, action)', () => {
    it('should call updateChildrenValue if item isParentOf', () => {
      const item = { isParentOf: true };
      jest.spyOn(component, 'updateChildrenValue').mockImplementation(() => {});
      jest.spyOn(component, 'updateParentValue').mockImplementation(() => {});
      component.updateParentOrChildren(item);
      expect(component.updateChildrenValue).toHaveBeenCalled();
      expect(component.updateParentValue).not.toHaveBeenCalled();
    });
    it('should call updateParentValue if item isChildOf', () => {
      const item = { isChildOf: true };
      jest.spyOn(component, 'updateChildrenValue').mockImplementation(() => {});
      jest.spyOn(component, 'updateParentValue').mockImplementation(() => {});
      component.updateParentOrChildren(item);
      expect(component.updateParentValue).toHaveBeenCalled();
      expect(component.updateChildrenValue).not.toHaveBeenCalled();
    });
  });

  xdescribe('Method: updateAllParentsOrChildren(item, action)', () => {
    it('should call updateChildrenValue if item isParentOf', () => {
      const item = { isParentOf: true };
      jest.spyOn(component, 'updateAllChildrenValue').mockImplementation(() => {});
      jest.spyOn(component, 'updateAllParentValue').mockImplementation(() => {});
      component.updateAllParentsOrChildren(item);
      expect(component.updateAllChildrenValue).toHaveBeenCalled();
      expect(component.updateAllParentValue).not.toHaveBeenCalled();
    });
    it('should call updateParentValue if item isChildOf', () => {
      const item = { isChildOf: true };
      jest.spyOn(component, 'updateAllChildrenValue').mockImplementation(() => {});
      jest.spyOn(component, 'updateAllParentValue').mockImplementation(() => {});
      component.updateAllParentsOrChildren(item);
      expect(component.updateAllParentValue).toHaveBeenCalled();
      expect(component.updateAllChildrenValue).not.toHaveBeenCalled();
    });
  });

  describe('Method: updateParentValue(item, action)', () => {
    it('should handle removing item while all parents selected', () => {
      component._options = [{ type: 'cats', data: [{ checked: true, type: 'cats' }], originalData: [{ checked: true, type: 'cats' }] }];
      jest.spyOn(component, 'handleRemoveItemIfAllSelected').mockImplementation(() => {});
      component.updateParentValue({ isChildOf: 'cats' }, 'remove');
      expect(component.handleRemoveItemIfAllSelected).toHaveBeenCalled();
    });
  });

  describe('Method: updateAllParentValue(item, action)', () => {
    it('should set all parents to indeterminate if not already checked', () => {
      const cat = { checked: false, type: 'cats', indeterminate: false };
      component._options = [{ type: 'cats', data: [cat], originalData: [cat] }];
      component.updateAllParentValue({ isChildOf: 'cats' }, 'select');
      expect(component._options[0].data[0].indeterminate).toBeTruthy();
    });
  });

  describe('Method: updateChildrenValue(parent, action)', () => {
    it('should set children to checked if selecting', () => {
      const cat = { checked: false, type: 'cats', indeterminate: false, cats: [1] };
      component._options = [{ type: 'kittens', data: [cat], originalData: [cat] }];
      component.updateChildrenValue({ type: 'cats', value: 1, isParentOf: 'kittens' }, 'select');
      expect(component._options[0].data[0].checked).toBeTruthy();
    });
  });

  describe('Method: onKeyDown(selecting, itemChanged)', () => {
    it('remove item if selected', () => {
      const event = {
        keyCode: KeyCodes.BACKSPACE,
        target: { value: [] },
        stopPropagation: () => {},
        preventDefault: () => {},
      };
      component.items = [1];
      component.selected = true;
      jest.spyOn(component, 'remove').mockImplementation(() => {});
      component.onKeyDown(event);
      expect(component.remove).toHaveBeenCalled();
    });
    it('select item if none selected', () => {
      const event = {
        keyCode: KeyCodes.BACKSPACE,
        target: { value: [] },
        stopPropagation: () => {},
        preventDefault: () => {},
      };
      component.items = [1];
      component.selected = false;
      jest.spyOn(component, 'select').mockImplementation(() => {});
      component.onKeyDown(event);
      expect(component.select).toHaveBeenCalled();
    });
  });

  xdescribe('Method: modifyAffectedParentsOrChildren(selecting, itemChanged)', () => {
    it('should update indeterminate states for parent and child type', () => {
      const kitty = { value: 'Kitty', checked: false, type: 'cats', isParentOf: 'kittens' };
      const allCat = { value: 'ALL', checked: true, type: 'cats', isParentOf: 'kittens' };
      const allKitten = { value: 'ALL', checked: true, type: 'kittens', isChildOf: 'cats', cats: [1] };
      const cat = { value: 'Cat', checked: true, type: 'kittens', isChildOf: 'cats', cats: [1] };
      component._options = [
        { type: 'cats', data: [allCat, kitty], originalData: [allCat, kitty] },
        { type: 'kittens', data: [allKitten, cat], originalData: [allKitten, cat] },
      ];
      jest.spyOn(component, 'setIndeterminateState').mockImplementation(() => {});
      component.modifyAffectedParentsOrChildren(true, { isParentOf: true, type: 'cats' });
      expect(component._options[0].data[0].checked).toBeTruthy();
      expect(component.setIndeterminateState).toHaveBeenCalled();
    });
  });
});
