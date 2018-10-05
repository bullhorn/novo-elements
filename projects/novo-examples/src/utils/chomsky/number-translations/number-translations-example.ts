import { Component } from '@angular/core';
import { TranslateService } from 'chomsky';

/**
 * @title Number & Currency Translations Example
 */
@Component({
  selector: 'number-translations-example',
  templateUrl: 'number-translations-example.html',
  styleUrls: ['number-translations-example.css'],
})
export class NumberTranslationsExample {
  public currentLocale: string = 'en-US';
  public locales: Array<any> = [
    {
      label: 'en-US',
      value: 'en-US',
    },
    {
      label: 'fr-FR',
      value: 'fr-FR',
    },
    {
      label: 'ru-RU',
      value: 'ru-RU',
    },
  ];
  public greeting: string = 'greeting';
  public demoVariables: any = {
    today: new Date(),
    name: 'Jane',
    balance: 9874.34,
    count: 1,
  };

  public translateService: any = TranslateService;

  constructor() {
    TranslateService.setLocation('assets/i18n/');
    TranslateService.onLocaleChange.subscribe((locale) => {
      this.currentLocale = locale;
    });
    // Use en-US
    this.changeLanguage('en-US');
  }

  changeLanguage(locale) {
    this.currentLocale = locale;
    TranslateService.use(locale);
  }
}
