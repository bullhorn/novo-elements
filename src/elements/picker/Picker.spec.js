// TODO - covert!
/*global spyOn, xit*/
import { describe, expect, beforeEach, beforeEachProviders, it, inject } from 'angular2/testing';
import { ElementRef, DynamicComponentLoader } from 'angular2/core';
import { NgModel } from 'angular2/common';

import { Picker, PickerResultsTemplate, PickerNullResults, PickerNullRecentResults, PickerErrorTemplate, PickerLoadTemplate } from './BhPicker';
import { KeyCodes } from './../../utils/key-codes/KeyCodes';

describe('Element: Picker', () => {
    describe('Directive: Picker', () => {
        beforeEachProviders(() => [
            NgModel,
            ElementRef,
            DynamicComponentLoader,
            Picker
        ]);

        describe('Function: ngOnInit()', () => {
            it('should setup the defaults of the picker.', inject([Picker], picker => {
                picker.pickerOptions = {
                    options: [1, 2, 3]
                };
                picker.ngOnInit();
                expect(picker.field).toBe('name');
                expect(picker.pickerOptions).toBeDefined();
                expect(picker.pickerOptions.options[0]).toBe(1);
                expect(picker.updateModel).toBeDefined();
            }));
        });

        describe('Function: structureData(matchData)', () => {
            xit('should wrap an array in a promise and resolve a flat array as objects.', inject([Picker], picker => {
                expect(picker.structureData).toBeDefined();
                let mockStructuredData = picker.structureData([1, 2, 3]).then(data => {
                    expect(data[0].name).toBe(1);
                    expect(data.length).toBe(3);
                }).then(() => {
                    expect(mockStructuredData.hasOwnProperty('_result')).toBeTruthy();
                });
            }));
            xit('should accept a promise with a flat array resolution and convert it to a collection of objects.', inject([Picker], picker => {
                let mockStructuredData = picker.structureData(new Promise((resolve) => {
                    resolve([1, 2, 3]);
                })).then(data => {
                    expect(data[0].name).toBe(1);
                    expect(data.length).toBe(3);
                }).then(() => {
                    expect(mockStructuredData.hasOwnProperty('_result')).toBeTruthy();
                });
            }));
        });

        describe('Function: structureArray(collection)', () => {
            it('should structure an array into a collection of objects.', inject([Picker], picker => {
                let mockData = [1, 2, 3];
                expect(picker.structureArray).toBeDefined();
                expect(picker.structureArray(mockData).length).toBe(3);
                expect(picker.structureArray(mockData)[0].name).toBe(1);
            }));
            it('should leave an existing object-based array alone.', inject([Picker], picker => {
                let mockData = [{
                    id: 1
                }, {
                    id: 2
                }];
                expect(picker.structureArray(mockData).length).toBe(2);
                expect(picker.structureArray(mockData)[0].id).toBe(1);
            }));
        });

        describe('Function: debounceWrapper(func, wait, immediate)', () => {
            it('should wrap a function in a timeout that prevents it from propagation.', inject([Picker], picker => {
                let mockFunction = () => {
                    return {
                        call: () => {
                        }
                    };
                };
                let mockDebouncedFunction = picker.debounceWrapper(() => {
                    mockFunction.call();
                }, 10, true);
                spyOn(mockFunction, 'call').and.callThrough();
                mockDebouncedFunction();
                mockDebouncedFunction();
                mockDebouncedFunction();
                expect(mockFunction.call.calls.count()).toEqual(1);
            }));
        });

        describe('Function: onChange(event)', () => {
            it('should call the hideResults() function when the escape key is pressed.', inject([Picker], picker => {
                picker.container = {};
                spyOn(picker, 'hideResults').and.callFake(() => {
                    return;
                });
                let mockEvent = {
                    keyCode: KeyCodes.ESC
                };
                picker.onChange(mockEvent);
                expect(picker.hideResults).toHaveBeenCalled();
            }));
            it('should call the prevActiveMatch() function of the results when the results are visible and the up arrow is pressed.', inject([Picker], picker => {
                picker.container = {
                    resultContainer: {
                        prevActiveMatch: () => {
                            return true;
                        }
                    }
                };
                spyOn(picker.container.resultContainer, 'prevActiveMatch').and.callThrough();
                let mockEvent = {
                    keyCode: KeyCodes.UP
                };
                picker.onChange(mockEvent);
                expect(picker.container.resultContainer.prevActiveMatch).toHaveBeenCalled();
            }));
            it('should call the nextActiveMatch() function of the results when the results are visible and the down arrow is pressed.', inject([Picker], picker => {
                picker.container = {
                    resultContainer: {
                        nextActiveMatch: () => {
                        }
                    }
                };
                spyOn(picker.container.resultContainer, 'nextActiveMatch').and.callThrough();
                let mockEvent = {
                    keyCode: KeyCodes.DOWN
                };
                picker.onChange(mockEvent);
                expect(picker.container.resultContainer.nextActiveMatch).toHaveBeenCalled();
            }));
            it('should set a new value on the updateSearchString() function and hide the results when the enter key is pressed.', inject([Picker], picker => {
                picker.container = {
                    resultContainer: {
                        activeMatch: {
                            name: '1'
                        }
                    }
                };
                picker.field = 'name';
                let mockEvent = {
                    keyCode: KeyCodes.ENTER
                };
                spyOn(picker, 'updateSearchString').and.callFake(() => {
                });
                spyOn(picker, 'hideResults').and.callFake(() => {
                });
                picker.onChange(mockEvent);
                expect(picker.updateSearchString).toHaveBeenCalledWith({
                    name: '1'
                });
                expect(picker.hideResults).toHaveBeenCalled();
            }));
        });

        describe('Function: updateSearchString(newValue)', () => {
            it('should update the searchString (ngModel) and the queryChange EventEmitter.', inject([Picker], picker => {
                picker.searchString = {
                    update: {
                        emit: () => {
                        }
                    }
                };
                spyOn(picker.searchString.update, 'emit').and.callFake(() => {
                });
                spyOn(picker.queryChange, 'emit').and.callFake(() => {
                });
                picker.field = 'name';
                picker.updateSearchString({
                    name: '1'
                });
                expect(picker.searchString.update.emit).toHaveBeenCalledWith('1');
                expect(picker.queryChange.emit).toHaveBeenCalledWith('1');
            }));
        });

        describe('Function: filterData(newSearch, matchData, field)', () => {
            let mockMatchData,
                mockField;
            beforeEach(() => {
                mockMatchData = [{
                    name: 'aaa'
                }, {
                    name: 'bbb'
                }];
                mockField = 'name';
            });
            it('should update the filteredMatches with matches for the search.', inject([Picker], picker => {
                picker.isStatic = true;
                picker.filterData('a', mockMatchData, mockField);
                expect(picker.filteredMatches.length).toBe(1);
                expect(picker.showNoRecents).toBeFalsy();
            }));
            it('should set showNoRecents to true when there is no `filteredMatches` and no `newSearch`', inject([Picker], picker => {
                picker.filterData(null, [], mockField);
                expect(picker.filteredMatches.length).toBe(0);
                expect(picker.showNoRecents).toBeTruthy();
            }));
        });

        describe('Function: showResults()', () => {
            // TODO: @krsween
        });

        describe('Function: onFocus()', () => {
            it('should call the updateModel function which shows the results.', inject([Picker], picker => {
                picker.pickerOptions = {
                    options: [],
                    field: ''
                };
                picker.ngOnInit();

                spyOn(picker, 'updateModel').and.callFake(() => {
                });
                picker.onFocus();
                expect(picker.updateModel).toHaveBeenCalled();
            }));
        });

        describe('Function: hideResults()', () => {
            it('should dispose of the results HTML element.', inject([Picker], picker => {
                picker.popup = {
                    then: () => {
                    }
                };
                picker.container = {};
                spyOn(picker.popup, 'then').and.callFake(() => {
                });
                picker.hideResults();
                expect(picker.popup.then).toHaveBeenCalled();
            }));
        });
    });

    describe('Component: PickerResultsTemplate', () => {
        beforeEachProviders(() => [
            PickerResultsTemplate
        ]);

        let mockActive,
            mockMatches;

        beforeEach(() => {
            mockActive = {
                name: '1'
            };
            mockMatches = [
                {
                    name: '1'
                },
                {
                    name: '2'
                },
                {
                    name: '3'
                }
            ];
        });

        describe('Function: selectActiveMatch()', () => {
            it('should call the selectMatch function with the current activeMatch.', inject([PickerResultsTemplate], pickerResultsTemplate => {
                spyOn(pickerResultsTemplate, 'selectMatch').and.callFake(() => {
                });
                pickerResultsTemplate.activeMatch = mockActive;
                expect(pickerResultsTemplate.selectActiveMatch).toBeDefined();
                pickerResultsTemplate.selectActiveMatch();
                expect(pickerResultsTemplate.selectMatch).toHaveBeenCalled();
            }));
        });

        describe('Function: prevActiveMatch()', () => {
            it('should set activeMatch to the match before the current node.', inject([PickerResultsTemplate], pickerResultsTemplate => {
                expect(pickerResultsTemplate.prevActiveMatch).toBeDefined();
                pickerResultsTemplate.activeMatch = mockActive;
                pickerResultsTemplate.matches = mockMatches;
                pickerResultsTemplate.prevActiveMatch();
                expect(pickerResultsTemplate.activeMatch.name).toBe('3');
            }));
        });

        describe('Function: nextActiveMatch()', () => {
            it('should set activeMatch to the match after the current node.', inject([PickerResultsTemplate], pickerResultsTemplate => {
                expect(pickerResultsTemplate.nextActiveMatch).toBeDefined();
                pickerResultsTemplate.activeMatch = {
                    name: '2'
                };
                pickerResultsTemplate.matches = mockMatches;
                pickerResultsTemplate.nextActiveMatch();
                expect(pickerResultsTemplate.activeMatch.name).toBe('1');
            }));
        });

        describe('Function: selectActive(match)', () => {
            it('should set activeMatch equal to match.', inject([PickerResultsTemplate], pickerResultsTemplate => {
                expect(pickerResultsTemplate.selectActive).toBeDefined();
                pickerResultsTemplate.activeMatch = {
                    name: '2'
                };
                expect(pickerResultsTemplate.activeMatch.name).toBe('2');
                pickerResultsTemplate.selectActive(mockActive);
                expect(pickerResultsTemplate.activeMatch.name).toBe('1');
            }));
        });

        describe('Function: isActive(match)', () => {
            it('should return true if match is equal to activeMatch and false if not.', inject([PickerResultsTemplate], pickerResultsTemplate => {
                pickerResultsTemplate.activeMatch = mockActive;
                expect(pickerResultsTemplate.isActive(mockActive)).toBeTruthy();
                expect(pickerResultsTemplate.isActive({
                    name: '2'
                })).toBeFalsy();
            }));
        });

        describe('Function: selectMatch(value, event)', () => {
            it('should call three methods on the parent controller.', inject([PickerResultsTemplate], pickerResultsTemplate => {
                pickerResultsTemplate.parent = {
                    updateSearchString: () => {
                    },
                    select: {
                        emit: () => {
                        }
                    },
                    hideResults: () => {
                    },
                    field: 'name'
                };
                pickerResultsTemplate.activeMatch = mockActive;
                spyOn(pickerResultsTemplate.parent, 'updateSearchString').and.callThrough();
                spyOn(pickerResultsTemplate.parent.select, 'emit').and.callThrough();
                spyOn(pickerResultsTemplate.parent, 'hideResults').and.callThrough();
                pickerResultsTemplate.selectMatch(null, mockActive);
                expect(pickerResultsTemplate.parent.updateSearchString).toHaveBeenCalledWith({
                    name: '1'
                });
                expect(pickerResultsTemplate.parent.select.emit).toHaveBeenCalledWith(mockActive);
                expect(pickerResultsTemplate.parent.hideResults).toHaveBeenCalled();
            }));
        });

        describe('Function: escapeRegexp(queryToEscape)', () => {
            it('should capture the whole query string and replace it with the string that will be used to match.', inject([PickerResultsTemplate], pickerResultsTemplate => {
                expect(pickerResultsTemplate.escapeRegexp('this')).toBe('this');
            }));
        });

        describe('Function: highlight(matchString, query)', () => {
            it('should return a <strong>-tag wrapped HTML string.', inject([PickerResultsTemplate], pickerResultsTemplate => {
                expect(pickerResultsTemplate.highlight('1', '1')).toBe('<strong>1</strong>');
            }));
        });
    });

    describe('Component: PickerResults', () => {
        // TODO: I'm omitting this test because what I really want is to shed this layer of complexity once DCL improves
        beforeEachProviders(() => [
            //PickerResults
        ]);
    //xit('should wrap the input in the picker\'s HTML partials', inject([PickerResults], pickerResults => {
    //}));
    });

    describe('Component: PickerNullResults', () => {
        beforeEachProviders(() => [
            PickerNullResults
        ]);
        it('should be defined.', inject([PickerNullResults], pickerNullResults => {
            expect(pickerNullResults).toBeDefined();
        }));
    });

    describe('Component: PickerNullRecentResults', () => {
        beforeEachProviders(() => [
            PickerNullRecentResults
        ]);
        it('should be defined.', inject([PickerNullRecentResults], pickerNullRecentResults => {
            expect(pickerNullRecentResults).toBeDefined();
        }));
    });

    describe('Component: PickerErrorTemplate', () => {
        beforeEachProviders(() => [
            PickerErrorTemplate
        ]);
        it('should be defined.', inject([PickerErrorTemplate], pickerErrorTemplate => {
            expect(pickerErrorTemplate).toBeDefined();
        }));
    });

    describe('Component: PickerLoadTemplate', () => {
        beforeEachProviders(() => [
            PickerLoadTemplate
        ]);
        it('should be defined.', inject([PickerLoadTemplate], pickerLoadTemplate => {
            expect(pickerLoadTemplate).toBeDefined();
        }));
    });
});
