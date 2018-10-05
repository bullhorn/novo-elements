import { Component } from '@angular/core';
import { Security } from 'novo-elements';

/**
 * @title Security Example
 */
@Component({
  selector: 'security-example',
  templateUrl: 'security-example.html',
  styleUrls: ['security-example.css'],
})
export class SecurityExample {
  perms: any[] = [];

  constructor(private security: Security) {}

  shufflePermissions(): void {
    let numOfPerms: number = Math.floor(Math.random() * 2) + 1;
    this.perms = this.shuffle(['A', 'B', 'C']).slice(0, numOfPerms);
    this.security.clear();
    this.security.grant(this.perms);
  }

  shuffle(array: string[]): any[] {
    let currentIndex: number = array.length;
    let temporaryValue: string;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
