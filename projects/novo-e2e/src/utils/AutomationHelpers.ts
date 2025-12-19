export enum ComparisonOperators {
    equals = '==',
    greaterThan = '>',
    lessThan = '<',
    greaterThanOrEqualTo = '>=',
    lessThanOrEqualTo = '<=',
}

export async function asyncForEach(array: any[] | WebdriverIO.ElementArray, callback: Function): Promise<any> {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export async function asyncFor(num: number, callback: Function): Promise<any> {
    for (let index = 0; index < num; index++) {
        await callback(index);
    }
}

export async function asyncForIn(object: Object, callback: Function): Promise<any> {
    for (const property in object) {
        if (object.hasOwnProperty(property)) {
            await callback(property, object);
        }
    }
}
