import { Subscription } from 'rxjs';
import { ResultsTemplateType } from './FormInterfaces';
type OptionsFunctionConfig = {
    format?: string;
} & ({
    where: string;
    emptyPickerMessage?: string;
} | {
    optionsPromise: (query: string, http: CustomHttp, page?: number) => Promise<unknown[]>;
} | {
    optionsUrl: string;
} | {
    optionsUrlBuilder: (query: string) => string;
});
export type ModifyPickerConfigArgs = {
    options: unknown[];
} | {
    resultsTemplateType: ResultsTemplateType;
} | OptionsFunctionConfig;
export type OptionsFunction = (query: string, page?: number) => Promise<unknown[]>;
export interface CustomHttp<T = any> {
    url: string;
    options: any;
    mapFn: (o: unknown) => T;
    get(url: string, options?: any): CustomHttp;
    map(mapFn: (o: unknown) => T): CustomHttp;
    subscribe(resolve: any, reject?: any): Subscription;
}
export {};
