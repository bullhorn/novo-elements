export class ActivityTableRenderers {
  static propertyRenderer<T>(prop: string): Function {
    const ret = (data: T): string => {
      // TODO - allow for dots and sub props
      return data[prop];
    };
    return ret;
  }

  static dateRenderer<T>(prop: string): Function {
    const ret = (data: T): string => {
      return data[prop] ? new Date(data[prop]).toLocaleDateString() : '';
    };
    return ret;
  }
}
