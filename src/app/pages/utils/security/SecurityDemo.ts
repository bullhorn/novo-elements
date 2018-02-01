// NG2
import { Component } from '@angular/core';
// Vendor
import { Security } from './../../../../platform/index';
// APP
let securityDemoTpl: any = require('./templates/SecurityDemo.html');

const template: string = `
<div class="container">
    <article>
        <h1>Security</h1>
        <p>The security component for this library a simple wrapper to implement ngIf functionality with a Security service.</p>
    </article>
    <article>
        <h4>Configuration</h4>
        <p>blah blah blah</p>
    </article>

    <article>
        <div class="example">${securityDemoTpl}</div>
        <code-snippet [code]="securityDemoTpl"></code-snippet>
    </article>
</div>
`;

@Component({
    selector: 'security-demo',
    template: template,
})
export class SecurityDemoComponent {
    perms: any[] = [];
    private securityDemoTpl: string = securityDemoTpl;

    constructor(private security: Security) {
    }

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
