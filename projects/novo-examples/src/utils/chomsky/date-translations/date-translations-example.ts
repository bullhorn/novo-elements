import { Component } from '@angular/core';
import { TranslateService } from 'chomsky';

/**
 * @title Date Translations Example
 */
@Component({
  selector: 'date-translations-example',
  templateUrl: 'date-translations-example.html',
  styleUrls: ['date-translations-example.css'],
})
export class DateTranslationsExample {
  public currentLocale: string = 'en-US';
  public useMilitaryTime: boolean = false;
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
  public militaryTime: Array<any> = [
    {
      label: '12 Hour',
      value: false,
    },
    {
      label: '24 Hour',
      value: true,
    },
  ];
  public greeting: string = 'greeting';
  public demoVariables: any = {
    today: new Date(),
    name: 'Jane',
    balance: 9874.34,
    count: 1,
    timestamp: 1506470400000,
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

  changeMilitaryTime(useMilitaryTime) {
    this.useMilitaryTime = useMilitaryTime;
    TranslateService.forceDisplayTo24HourTime(useMilitaryTime);
    this.changeLanguage(this.currentLocale);
  }
}
