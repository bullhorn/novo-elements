import { Pipe, ChangeDetectorRef, PipeTransform, OnDestroy } from '@angular/core';

import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  lastKey = '';
  lastParams = '';
  value: string;
  onLangChange: any = null;

  constructor(private changeDetector?: ChangeDetectorRef) {
    this.changeDetector = changeDetector;
  }

  equals(objectOne, objectTwo) {
    if (objectOne === objectTwo) {
      return true;
    }
    if (objectOne === null || objectTwo === null) {
      return false;
    }
    const typeOne = typeof objectOne;
    const typeTwo = typeof objectTwo;
    let length;
    let key;
    let keySet;
    if (typeOne === typeTwo && typeOne === 'object') {
      if (Array.isArray(objectOne)) {
        // Array checker
        if (!Array.isArray(objectTwo)) {
          return false;
        }
        if ((length = objectOne.length) === objectTwo.length) {
          for (key = 0; key < length; key++) {
            if (!this.equals(objectOne[key], objectTwo[key])) {
              return false;
            }
          }
          return true;
        }
      } else {
        // Object checker
        if (Array.isArray(objectTwo)) {
          return false;
        }
        keySet = Object.create(null);
        for (key in objectOne) {
          if (key) {
            if (!this.equals(objectOne[key], objectTwo[key])) {
              return false;
            }
            keySet[key] = true;
          }
        }
        for (key in objectTwo) {
          if (!(key in keySet) && typeof objectTwo[key] !== 'undefined') {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  updateValue(phraseKey, dynamicVariables) {
    this.value = TranslateService.translate(phraseKey, dynamicVariables);
    this.changeDetector.markForCheck();
  }

  transform(phraseKey: string, dynamicVariables?: any): string {
    if (!phraseKey || phraseKey.length === 0) {
      return null;
    }
    if (this.equals(phraseKey, this.lastKey) && this.equals(dynamicVariables, this.lastParams)) {
      return this.value;
    }
    this.lastKey = phraseKey;
    this.lastParams = dynamicVariables;
    this.updateValue(phraseKey, dynamicVariables);
    this.unsubscribe();
    this.onLangChange = TranslateService.onLocaleChange.subscribe(() => {
      this.updateValue(phraseKey, dynamicVariables);
    });
    return this.value;
  }

  unsubscribe() {
    if (this.onLangChange) {
      this.onLangChange.unsubscribe();
      this.onLangChange = undefined;
    }
  }
}
