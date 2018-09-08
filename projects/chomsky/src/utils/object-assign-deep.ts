export function isObject(obj: any): boolean {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export function isFunction(obj: any): boolean {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

export function mergeDeep(...args: any[]): any {
  const startIndex = 1;
  const output = Object(args[0] || {});

  // Cycle the source object arguments.
  for (let a = startIndex; a < args.length; a++) {
    const from = args[a];
    const keys = Object.keys(Object(from));

    // Cycle the properties.
    for (let k = 0; k < keys.length; k++) {
      const key = keys[k];
      // Merge arrays.
      if (Array.isArray(output[key]) || Array.isArray(from[key])) {
        const o = Array.isArray(output[key]) ? output[key].slice() : [];
        const f = Array.isArray(from[key]) ? from[key].slice() : [];
        output[key] = o.concat(f);
      } else if (isFunction(output[key]) || isFunction(from[key])) {
        // Copy functions references.
        output[key] = from[key];
      } else if (isObject(output[key]) || isObject(from[key])) {
        // Extend objects.
        output[key] = mergeDeep(output[key], from[key]);
      } else {
        // Copy all other types.
        output[key] = from[key];
      }
    }
  }
  return output;
}
