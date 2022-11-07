import { InjectionToken } from '@angular/core';

export interface LiveExample {
  title: string;
  component: any;
  additionalFiles?: string[];
  selectorName?: string;
  tsSource?: string;
  cssSource?: string;
  htmlSource?: string;
}

export type CodeExampleConfig = { [key: string]: LiveExample };

/**
 * Injection token used to provide the parent component to options.
 */
export const CODE_EXAMPLES = new InjectionToken<CodeExampleConfig>('CODE_EXAMPLES');
