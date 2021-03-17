function createParser(matcher: RegExp, replacer: (match: string) => string) {
  const regex = RegExp(matcher, 'g');
  return (value: string) => {
    // * throw an error if not a string
    if (typeof value !== 'string') {
      throw new TypeError(`expected an argument of type string, but got ${typeof value}`);
    }

    // * if no match between string and matcher
    if (!value.match(regex)) {
      return value;
    }

    // * executes the replacer function for each match
    // ? replacer can take any arguments valid for String.prototype.replace
    return value.replace(regex, replacer);
  };
}
export const camelToKebab = createParser(/[A-Z]/, (match: string) => `-${match.toLowerCase()}`);
export const snakeToKebab = createParser(/_/, () => '-');

export function traverseAndFlatten(currentNode: any, target: any, flattenedKey?: string) {
  for (const key in currentNode) {
    if (currentNode.hasOwnProperty(key)) {
      var newKey;
      if (flattenedKey === undefined) {
        newKey = camelToKebab(key);
      } else {
        newKey = flattenedKey + '-' + camelToKebab(key);
      }

      const value = currentNode[key];
      if (typeof value === 'object') {
        traverseAndFlatten(value, target, newKey);
      } else {
        target[newKey] = value;
      }
    }
  }
}

export function flatten(obj: any) {
  const flattenedObject = {};
  traverseAndFlatten(obj, flattenedObject);
  return flattenedObject;
}
