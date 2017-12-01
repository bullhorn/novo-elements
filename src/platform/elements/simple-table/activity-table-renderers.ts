export class ActivityTableRenderers {
    static propertyRenderer<T>(prop: string): Function {
        return (data: T): string => {
            // TODO - allow for dots and sub props
            return data[prop];
        }
    }

    static dateRenderer<T>(prop: string): Function {
        return (data: T): string => {
            return data[prop] ? new Date(data[prop]).toLocaleDateString() : '';
        }
    }
}
