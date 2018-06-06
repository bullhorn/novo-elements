// APP
import { Helpers } from './Helpers';

describe('Utils: Helpers', () => {

    xdescribe('Method: swallowEvent(event)', () => {
        it('should be defined.', () => {
            let event = new Event('open');
            expect(Helpers.swallowEvent(event));
        });
    });

    describe('Method: interpolate(str, props)', () => {
        it('should be defined.', () => {
            expect(Helpers.interpolate('', {})).toBeDefined();
        });
        it('should be defined', () => {
            expect(Helpers.interpolate).toBeDefined();
        });

        it('should interpolate using the right properties', () => {
            let format: string = '$name';
            let data: { name: string } = {
                name: 'Stuff',
            };
            let expected: string = 'Stuff';
            expect(Helpers.interpolate(format, data)).toBe(expected);
        });

        it('should interpolate correctly when format requires 2 properties', () => {
            let format: string = '$firstName $lastName';
            let data: { firstName: string, lastName: string } = {
                firstName: 'James',
                lastName: 'Bond',
            };
            let expected: string = 'James Bond';
            expect(Helpers.interpolate(format, data)).toBe(expected);
        });

        it('should interpolate correctly when format has non-replacable characters', () => {
            let format: string = '$id: $title';
            let data: { id: number, title: string } = {
                id: 213,
                title: 'Bond',
            };
            let expected: string = '213: Bond';
            expect(Helpers.interpolate(format, data)).toBe(expected);
        });

        it('should interpolate correctly when properties are undefined', () => {
            let format: string = '$id: $title';
            let data: { id: number } = {
                id: 123,
            };
            let expected: string = '123: ';
            expect(Helpers.interpolate(format, data)).toBe(expected);
        });
    });

    xdescribe('Method: validateInterpolationProps(str, props)', () => {
        it('should be defined.', () => {
            expect(Helpers.validateInterpolationProps('', {})).toBeDefined();
        });
    });

    describe('Method: isString(obj)', () => {
        it('should be defined.', () => {
            expect(Helpers.isString({})).toBeDefined();
        });
    });

    describe('Method: isBlank(obj)', () => {
        it('should be defined.', () => {
            expect(Helpers.isBlank({})).toBeDefined();
        });
    });

    describe('Method: isEmpty(obj)', () => {
        it('should be defined.', () => {
            expect(Helpers.isEmpty({})).toBeDefined();
        });
    });

    describe('Method: isFunction(obj)', () => {
        it('should be defined.', () => {
            expect(Helpers.isFunction({})).toBeDefined();
        });
    });

    describe('Method: isDate(obj)', () => {
        it('should be defined.', () => {
            expect(Helpers.isDate(1)).toBeDefined();
        });
    });

    describe('Method: sortByField(fields, reverse)', () => {
        it('should be defined.', () => {
            expect(Helpers.sortByField(1, false)).toBeDefined();
        });
    });

    describe('Method: filterByField(key, value)', () => {
        it('should be defined.', () => {
            expect(Helpers.filterByField(1, 1)).toBeDefined();
        });
    });

    describe('Method: getNextElementSibling(element)', () => {
        it('should return nextElementSibling if present.', () => {
            let parent = document.createElement('div');
            let origin = document.createElement('h1');
            let sibling = document.createElement('h2');
            parent.appendChild(origin);
            parent.appendChild(sibling);
            expect(Helpers.getNextElementSibling(origin)).toEqual(sibling);
        });
        it('should skip over non-element sibling nodes.', () => {
            let parent = document.createElement('div');
            let origin = document.createElement('h1');
            let textNode = document.createTextNode('Some Text');
            let sibling = document.createElement('h2');
            parent.appendChild(origin);
            parent.appendChild(textNode);
            parent.appendChild(sibling);
            expect(Helpers.getNextElementSibling(origin)).toEqual(sibling);
        });
        it('should return null if sibling is not present.', () => {
            let parent = document.createElement('div');
            let origin = document.createElement('h1');
            parent.appendChild(origin);
            expect(Helpers.getNextElementSibling(origin)).toEqual(null);
        });
    });

    xdescribe('Method: findAncestor(element, selector)', () => {
        it('should be defined.', () => {
            let element = new Element();
            expect(Helpers.findAncestor(element, '1')).toBeDefined();
        });
    });
});
