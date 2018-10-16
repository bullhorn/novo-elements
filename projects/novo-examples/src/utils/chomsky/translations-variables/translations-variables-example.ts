import { Component } from '@angular/core';
import { TranslateService } from 'chomsky';

/**
 * @title Translations with Variables Example
 */
@Component({
  selector: 'translations-variables-example',
  templateUrl: 'translations-variables-example.html',
  styleUrls: ['translations-variables-example.css'],
})
export class TranslationsVariablesExample {
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
    // Listen for changes
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
