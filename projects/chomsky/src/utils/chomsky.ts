import { Observable, Subject, of, from } from 'rxjs';

import { Loader } from './loader';
import { Formats, IFormatDefaults } from './formats';
import { DictionaryManager } from './dictionary-manager';
import { mergeDeep } from './object-assign-deep';

// Default formats
export const FORMAT_DEFAULTS: IFormatDefaults = {
  number: {
    style: 'decimal',
  },
  currency: {
    style: 'currency',
    currency: 'USD',
  },
  date: {
    short: {
      // DD/MM/YYYY, HH:MM A - 02/14/2017, 1:17 PM
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    },
    medium: {
      // MMM DD, YYYY, HH:MM A - Feb 14, 2017, 1:17 PM
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    },
    long: {
      // MMMM DD, YYYY, HH:MM A - Febuary 14, 2017, 1:17 PM
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    },
    dateShort: {
      // DEFAULT: DD/MM/YYYY - 02/14/2017
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    },
    dateMedium: {
      // MMM DD, YYYY - Feb 14, 2017
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    },
    dateLong: {
      // MMMM DD, YYYY - Febuary 14, 2017
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    },
    timeShort: {
      // HH:MM A - 1:17 PM
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    },
    timeLong: {
      // HH:MM A Z - 1:17 PM CST
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
      hour12: true,
    },
  },
};

export class Chomsky {
  // Loader to load translations from a JSON file
  private loader: Loader = new Loader();
  // Default location for translations
  private location = 'i18n/';
  // Current locale
  private currentLocale: string = window.navigator.language;
  // Dictionary Manger to handle translations that have been loaded
  private dictionaryManager = new DictionaryManager();
  // Custom formats based on the locale
  private formats = new Formats();
  // Object for default replacements, so users don't have to pass around each time
  private defaultReplacements: any = {};
  // Handle for when the locale changes
  public onLocaleChange: Subject<string> = new Subject<string>();

  constructor(locale?: string) {
    if (locale) {
      this.use(locale);
    }
  }

  public setLocation(location: string): void {
    this.location = location;
  }

  public setDefaultReplacements(defaultReplacements: any): void {
    this.defaultReplacements = defaultReplacements;
  }

  public overrideCurrency(currency: string): void {
    this.formats.overrideCurrency = currency;
  }

  public forceDisplayTo24HourTime(use24HourTime: boolean): void {
    this.formats.use24HourTime = use24HourTime;
  }

  public overrideDateFormat(dateFormatString: string): void {
    this.formats.overrideDateFormat = dateFormatString;
  }

  public use(locale: string): Observable<{ [key: string]: any }> {
    // Capture the pending task
    let pending;
    // If we don't have the translations, load them
    if (!this.dictionaryManager.get(locale)) {
      pending = this.getTranslations(locale);
    }
    // Return the pending if we are fetching
    if (typeof pending !== 'undefined') {
      return pending;
    } else {
      // Split out the language code from the locale
      const languageCode = (locale.split('-')[0] || '').toLowerCase();
      // Return the translations if they are already loaded
      const currentTranslations = [this.dictionaryManager.get(locale), this.dictionaryManager.get(languageCode)];
      this.applyLanguage(locale, currentTranslations[0], currentTranslations[1]);
      return of(currentTranslations);
    }
  }

  public translate(key: string, interpolation?: any): string {
    let value: any = this.getValue(key);
    // Handle pluralization
    if (value && typeof value === 'object') {
      if (typeof interpolation === 'object') {
        const gender = interpolation.gender || 'other';
        if (gender) {
          if (interpolation.quantity === 0 || interpolation.quantity) {
            if (value[gender].hasOwnProperty(interpolation.quantity)) {
              value = value[gender][interpolation.quantity];
            } else {
              if (interpolation.quantity === 0) {
                value = value[gender].zero;
              } else {
                value = value[gender].many;
              }
            }
          } else {
            throw new Error('Missing "quantity" property on the replacements!');
          }
        }
      }
    }

    // Handle interpolation
    if ((interpolation || this.defaultReplacements) && value) {
      const replacements = Object.assign({}, this.defaultReplacements, interpolation);
      value = value.replace(/{([^}]*)}/gi, (m, param) => {
        const params = param.split(':');
        if (params.length === 1) {
          let match = '';
          if (replacements.hasOwnProperty(param)) {
            match = replacements[param];
          } else {
            match = replacements;
          }
          return match;
        }
        const unparsedValue = replacements[params[0]] || interpolation;
        switch (params[1]) {
          case 'date':
            return this.formatDate(unparsedValue, params[2]);
          case 'currency':
            return this.formatCurrency(unparsedValue, params[2]);
          case 'number':
            return this.formatNumber(unparsedValue, params[2]);
          case 'format':
            const formats = params[2].split(',');
            let formattedString = unparsedValue;
            if (formats.length) {
              for (const format of formats) {
                formattedString = this.format(formattedString, format);
              }
            } else {
              formattedString = this.format(unparsedValue, params[2]);
            }
            return formattedString;
          default:
            return '';
        }
      });
    }

    // Return the key if no value is present.
    return value || key;
  }

  public format(value: any, format?: string): string {
    return this.formats.format(value, format);
  }

  public formatDate(date: any, format?: string | Intl.DateTimeFormatOptions): string {
    return this.formats.formatDate(date, format);
  }

  public formatTime(date: any, format?: string | Intl.DateTimeFormatOptions): string {
    return this.formats.formatTime(date, format);
  }

  public formatCurrency(value: any, format?: string | Intl.NumberFormatOptions): string {
    return this.formats.formatCurrency(value, format);
  }

  public formatNumber(value: any, format?: Intl.NumberFormatOptions): string {
    return this.formats.formatNumber(value, format);
  }

  private getValue(key: string): string | undefined {
    let value;
    const translations = this.dictionaryManager.get(this.currentLocale);

    if (translations) {
      const tokens = key.split('.');
      value = translations[tokens[0]];
      if (value) {
        for (let i = 1; i < tokens.length; i++) {
          if (!value) {
            value = translations[tokens[i]];
          } else {
            value = value[tokens[i]];
          }
        }
      }
    }
    return value;
  }

  private getTranslations(locale: string): Observable<any> {
    // Split out the language code from the locale
    const languageCode = (locale.split('-')[0] || '').toLowerCase();
    // Fetch the fallback language first
    return from(
      new Promise<any>((resolve, reject) => {
        this.translationFetcher(languageCode).then(
          (fallbackTranslations) => {
            this.translationFetcher(locale).then(
              (translations) => {
                this.applyLanguage(locale, translations, fallbackTranslations);
                resolve(true);
              },
              (error) => {
                console.error(`[Chomsky] - Cannot find the locale translation file! (${locale}):`, error);
                this.applyLanguage(locale, {}, fallbackTranslations);
                resolve(true);
              },
            );
          },
          (error) => {
            console.error(`[Chomsky] - Cannot find the base translation file! (${languageCode}):`, error);
            this.applyLanguage(locale, {}, {});
            resolve(true);
          },
        );
      }),
    );
  }

  private applyLanguage(locale: string, translations: any, fallbackTranslations: any): void {
    // Set current locale
    this.currentLocale = locale;
    // Set locale on formats too
    this.formats.setLocale(locale);
    // Handle overrides
    const overrides = {};
    if (translations && translations.hasOwnProperty('_defaults_')) {
      mergeDeep(overrides, translations._defaults_);
      delete translations['_defaults_'];
    }
    if (fallbackTranslations && fallbackTranslations.hasOwnProperty('_defaults_')) {
      mergeDeep(overrides, fallbackTranslations._defaults_);
      delete translations['_defaults_'];
    }
    this.formats.override(mergeDeep({}, FORMAT_DEFAULTS, overrides));
    // Add the translations to the DictionaryManager
    this.dictionaryManager.add(locale, translations, fallbackTranslations);
    // Emit a change event
    this.onLocaleChange.next(locale);
  }

  private translationFetcher(locale: string): Promise<string> {
    return this.loader.load(`${this.location}${locale}.json`);
  }
}
