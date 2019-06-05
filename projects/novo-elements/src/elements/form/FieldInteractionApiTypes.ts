export type ModifyPickerConfigArgs = {
  format?: string;
} & (
  | (
      | {
          options?: unknown[];
        }
      | {
          optionsPromise?: (query: string, http: unknown) => Promise<unknown[]>;
        })
  | (
      | {
          optionsUrl: string;
        }
      | {
          optionsUrlBuilder: (query: string) => string;
        }));

export type OptionsFunction = (query: string) => Promise<unknown[]>;
