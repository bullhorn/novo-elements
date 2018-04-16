import { isDevMode } from '@angular/core';

const notifications: { [key: string]: boolean } = {};

export function notify(message: string): void {
  if (!isDevMode() || message in notifications) {
    return;
  }
  notifications[message] = true;
  console.warn(message); // tslint:disable-line
}
