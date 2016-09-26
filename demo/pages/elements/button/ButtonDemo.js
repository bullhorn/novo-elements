// NG2
import { Component } from '@angular/core';
// APP
import PrimaryButtonDemoTpl from './templates/PrimaryButtonDemo.html';
import DialogueButtonDemoTpl from './templates/DialogueButtonDemo.html';
import HeaderButtonDemoTpl from './templates/HeaderButtonDemo.html';
import IconButtonDemoTpl from './templates/IconButtonDemo.html';
import StandardButtonDemoTpl from './templates/StandardButtonDemo.html';
import SecondaryButtonDemoTpl from './templates/SecondaryButtonDemo.html';
import DynamicButtonDemoTpl from './templates/DynamicButtonDemo.html';
import LoadingButtonDemoTpl from './templates/LoadingButtonDemo.html';

const template = `
<div class="container">
    <h1>Button <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/tree/master/src/elements/button">(source)</a></small></h1>
    <p>A button clearly indicates a point of action for the user. Bullhorn buttons
     come in a variety of themes, custom tailored to fit your use-case.</p>

    <h2>Themes</h2>
    <p>
        Bullhorn button themes were hand crafted to make your life easier.
         Most buttons used in the Bullhorn platform should utilize a
         <code>theme</code> attribute. Theme attributes provide access to every
         variation of Bullhorn UX approved buttons. Depending on the theme, some
         buttons may also utilize <code>icon</code>, <code>side</code>, and
         <code>inverse</code> attributes. Button are divided by function into
         four main categories: Primary, Secondary, Neutralizing, Subtractive.
         There are also three other button types that are independent of function:
         Dialogue, Icon, and Header.
    </p>

    <h5>Colors</h5>
    <p>
        Acceptable colors include <code>Primary</code>, <code>Success</code>, <code>Warning</code>, <code>Negative</code>,
         and <strong>all analytics colors</strong> which can be found in the color section of the style guide.
    </p>

    <br/>

    <h5>Primary</h5>
    <p>
        Primary buttons are used to as primary calls-to-action. They should <strong>always</strong>
         get an <code>icon</code> attribute. Primary buttons with a "success" color
         <code>color="success"</code> are used for saving and will almost always contain a "check" icon.
         Negative color primary buttons <code>color="negative"</code> are used to delete,
         clear, or otherwise remove an extant element. Primary buttons should never have a <code>side</code> attribute.
    </p>
    <div class="example buttons-demo">${PrimaryButtonDemoTpl}</div>
    <code-snippet [code]="PrimaryButtonDemoTpl"></code-snippet>

    <h5>Secondary</h5>
    <p>
        Secondary buttons are used as an alternative Primary button or when there
         is a second major action on a page. They usually appears only in Overview
         and Slideout headers. This theme with an <code>inverse</code> attribute is
         often used as the action button in dropdown menus.
    </p>
    <div class="example buttons-demo">${SecondaryButtonDemoTpl}</div>
    <code-snippet [code]="SecondaryButtonDemoTpl"></code-snippet>
    <p>
        Secondary buttons can also get an <code>inverse</code> attribute for use on a colored background.
    </p>
    <div class="example header buttons-demo" [ngClass]="color" (click)="changeColor()" tooltip="Click Me!" tooltipPlacement="top">${HeaderButtonDemoTpl}</div>
    <code-snippet [code]="HeaderButtonDemoTpl"></code-snippet>

    <h5>Dialogue</h5>
    <p>
        Similar to icon buttons, dialogue buttons require less visual dominance but often need additional helper text. Dialogue buttons
        <em>may</em> contain <strong>any</strong> icon and a
        <code>side</code> may be specified eg:<code>side="right"</code> to place the icon on the right or left side of the text. Dialogue buttons may also use an
        <code>inverse</code> attribute to change its text color to white.
    </p>
    <div class="example buttons-demo">${DialogueButtonDemoTpl}</div>
    <code-snippet [code]="DialogueButtonDemoTpl"></code-snippet>

    <h5>Standard</h5>
    <p>
        Standard buttons are the most generic button style. Standard buttons by default are
         styled identically to standard buttons with a <code>color="light"</code>
         attribute. Typically, a standard button is used to cancel an action,
         or to cease any additional progress. Although standard buttons <em>can</em>
         get an <code>icon</code> attribute, they should almost never be used with an icon.
         If your proposed design calls for a standard button with an icon, consider using
         a different button theme, like dialogue.
    </p>
    <div class="example buttons-demo">${StandardButtonDemoTpl}</div>
    <code-snippet [code]="NeutralButtonDemoTpl"></code-snippet>

    <h5>Icon</h5>
    <p>
        The <code>icon</code> theme is used to create
        <strong>icon-only</strong> buttons, which contain no text. They can occupy any of the four main functions but require far less visual dominance than normal buttons. Icon buttons
        <strong>always</strong> have an <code>icon</code> attribute and can use
        <strong>any</strong> icon. Icon buttons may also use an
        <code>inverse</code> attribute to change its icon color to white.
    </p>
    <div class="example buttons-demo icons" [ngClass]="color" (click)="changeColor()" tooltip="Click Me!" tooltipPlacement="top">${IconButtonDemoTpl}</div>
    <code-snippet [code]="IconButtonDemoTpl"></code-snippet>

    <h5>Dynamic</h5>
    <p>
        Button parameters can be dynamically set and change at runtime.  The styles should
        change and be applied when the values change.
    </p>
    <div class="example buttons-demo">${DynamicButtonDemoTpl}</div>
    <code-snippet [code]="DynamicButtonDemoTpl"></code-snippet>

    <h5>Loading</h5>
    <p>
        Lipsum.
    </p>
    <div class="example buttons-demo">${LoadingButtonDemoTpl}</div>
    <code-snippet [code]="LoadingButtonDemoTpl"></code-snippet>
</div>
`;

const HEADER_COLORS = ['blue', 'green', 'yellow', 'orange', 'red', 'purple'];

@Component({
    selector: 'buttons-demo',
    template: template
})
export class ButtonDemoComponent {
    loading:Boolean = false;
    loadingButtonText:String = 'Delete';

    constructor() {
        this.PrimaryButtonDemoTpl = PrimaryButtonDemoTpl;
        this.SecondaryButtonDemoTpl = SecondaryButtonDemoTpl;
        this.DialogueButtonDemoTpl = DialogueButtonDemoTpl;
        this.NeutralButtonDemoTpl = StandardButtonDemoTpl;
        this.HeaderButtonDemoTpl = HeaderButtonDemoTpl;
        this.IconButtonDemoTpl = IconButtonDemoTpl;
        this.DynamicButtonDemoTpl = DynamicButtonDemoTpl;
        this.LoadingButtonDemoTpl = LoadingButtonDemoTpl;

        this.theme = 'primary';
        this.isChecked = false;
    }

    ngOnInit() {
        this.color = 'blue';
        this.negativeColor = 'negative';
    }

    changeColor() {
        let idx = HEADER_COLORS.indexOf(this.color);
        this.color = HEADER_COLORS[idx + 1];
    }

    changeTheme() {
        let i = Math.floor(Math.random() * 4);
        this.theme = ['primary', 'secondary', 'dialogue', 'standard', 'icon'][i];
    }

    fakeRequest() {
        this.loading = true;
        this.loadingButtonText = (this.loading) ? 'Removing... ' : 'Delete';
        setTimeout(() => {
            this.loading = false;
            this.loadingButtonText = (this.loading) ? 'Removing... ' : 'Delete';
        }, 60000);
    }
}
