import { Subscription } from 'rxjs';
type OptionsFunctionConfig = {
  format?: string;
} & (
  | { where: string; emptyPickerMessage?: string }
  | { optionsPromise: (query: string, http: CustomHttp) => Promise<unknown[]> }
  | { optionsUrl: string }
  | { optionsUrlBuilder: (query: string) => string });

export type ModifyPickerConfigArgs =
  | {
      options: unknown[];
    }
  | OptionsFunctionConfig;

export type OptionsFunction = (query: string) => Promise<unknown[]>;

export interface CustomHttp<T = any> {
  url: string;
  options: any;
  mapFn: (o: unknown) => T;

  get(url: string, options?: any): CustomHttp;

  map(mapFn: (o: unknown) => T): CustomHttp;

  subscribe(resolve: any, reject?: any): Subscription;
}
