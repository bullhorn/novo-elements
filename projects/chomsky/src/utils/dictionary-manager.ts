import { mergeDeep } from './object-assign-deep';

export class DictionaryManager {
  private dictionaries: any = {};

  public contains(locale: string): boolean {
    return !!this.dictionaries[locale];
  }

  public get(locale: string): any {
    return this.dictionaries[locale] || this.dictionaries[locale.split('-')[0]];
  }

  public add(locale: string, translations: any, fallbackTranslations: any): void {
    this.dictionaries[locale] = mergeDeep({}, fallbackTranslations, translations);
  }
}
