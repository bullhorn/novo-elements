// NG2
import { Component } from '@angular/core';
// Vendor
import {
    FormUtils, NovoFormGroup, TextBoxControl, CheckboxControl, FieldInteractionApi
} from './../../../../index';
// APP
let ValidationTpl = require('./templates/Validation.html');
let RequiredTpl = require('./templates/Required.html');
let CalculationTpl = require('./templates/Calculation.html');
let HideShowTpl = require('./templates/HideShow.html');
let EnableDisableTpl = require('./templates/EnableDisable.html');
let MessagingTpl = require('./templates/Messaging.html');

const template = `
<div class="container">
    <h1>Field Interactions</h1>
    <p>Field Interactions is a simple API that allows you to modify NovoForms based on field changes.</p>
    <p>The Field Interaction API gives you a simple to use API object when writing your field interaction functions.</p>
    <p>Look below for samples of what you can do with this API...</p>

    <h2>Config Block</h2>
    <pre class="field-config"><code>event: 'change|focus|blur', script: Function, invokeOnInit?: boolean</code></pre>
    <p>The Field Interactions are configured on a per control basis. There are three scenarios in which they will be fired: "change", "focus" and "blur".</p>
    <p><label>change</label> -- gets fired when the value of the form control changes</p>
    <p><label>focus</label> -- gets fired when the field gets focused</p>
    <p><label>blue</label> -- gets fired when the field loses focus</p>
    <p>The script function represents the function that will be fired for the event, you can see examples of these below.</p>
    <p>Lastly, "invokeOnInit" will just trigger the Field Interaction when the form is created as well.</p>

    <h2>Basic API</h2>

    <h5>Validation</h5>
    <p>If you need to perform some custom validation on a field, you can use the API to quickly mark a field as invalid</p>
    <div class="example field-interaction-demo">${ValidationTpl}</div>
    <multi-code-snippet [code]="snippets.validation"></multi-code-snippet>

    <h5>Mark Fields as Required</h5>
    <p>If you need to mark fields as required or not based on some changes in the form, you can use the API to do that!</p>
    <div class="example field-interaction-demo">${RequiredTpl}</div>
    <multi-code-snippet [code]="snippets.required"></multi-code-snippet>

    <h5>Field Calculations</h5>
    <p>If you need to do some custom calculations based off other form data, you can do that easily with the API</p>
    <div class="example field-interaction-demo">${CalculationTpl}</div>
    <multi-code-snippet [code]="snippets.calculation"></multi-code-snippet>

    <h5>Hide / Show Fields</h5>
    <p>You can also hide or show certain fields based on interaction with the form. Note that the value is still present in the form's value</p>
    <div class="example field-interaction-demo">${HideShowTpl}</div>
    <multi-code-snippet [code]="snippets.hideShow"></multi-code-snippet>

    <h5>Enable / Disable Fields</h5>
    <p>You can also enable or disable certain fields based on interaction with the form. Note that the value is still present in the form's value but does not respond to any interactions</p>
    <div class="example field-interaction-demo">${EnableDisableTpl}</div>
    <multi-code-snippet [code]="snippets.enableDisable"></multi-code-snippet>

    <h5>Messaging / Notifications</h5>
    <p>You can trigger messages to users in a few different ways using the API</p>
    <div class="example field-interaction-demo">${MessagingTpl}</div>
    <multi-code-snippet [code]="snippets.messaging"></multi-code-snippet>
</div>
`;

@Component({
    selector: 'field-interactions-demo',
    template: template
})
export class FieldInteractionsDemoComponent {
    // Templates
    public ValidationsTpl: any = ValidationTpl;
    public RequiredTpl: any = RequiredTpl;
    public CalculationTpl: any = CalculationTpl;
    public HideShowTpl: any = HideShowTpl;
    public EnableDisableTpl: any = EnableDisableTpl;
    public MessagingTpl: any = MessagingTpl;

    public forms: any = {};
    public controls: any = {
        validation: {},
        required: {},
        calculation: {},
        hideShow: {},
        enableDisable: {},
        messaging: {}
    };
    public snippets: any = {
        validation: {},
        required: {},
        calculation: {},
        hideShow: {},
        enableDisable: {},
        messaging: {}
    };

    constructor(private formUtils: FormUtils) {
        let validationFunction = (API: FieldInteractionApi) => {
            let activeValue = API.getActiveValue();
            if (activeValue > 10) {
                API.markAsInvalid(API.getActiveKey(), 'Too high! Make it a lot lower!!');
            }
        };
        let requiredFunction = (API: FieldInteractionApi) => {
            let activeValue = API.getActiveValue();
            if (activeValue) {
                API.setRequired('required', true);
            } else {
                API.setRequired('required', false);
            }
        };
        let calculationFunction = (API: FieldInteractionApi) => {
            let aValue = Number(API.getValue('a'));
            let bValue = Number(API.getValue('b'));
            API.setValue('sum', aValue + bValue);
        };
        let hideShowFunction = (API: FieldInteractionApi) => {
            let activeValue = API.getActiveValue();
            if (!activeValue) {
                API.show('text');
            } else {
                API.hide('text');
            }
        };
        let enableDisableFunction = (API: FieldInteractionApi) => {
            let currentValue = API.getActiveValue();
            if (!currentValue) {
                API.enable('text');
            } else {
                API.disable('text');
            }
        };
        let messagingFunction = (API: FieldInteractionApi) => {
            if (API.getActiveKey() === 'toast') {
                API.displayToast({
                    title: 'New Value',
                    message: API.getActiveValue()
                });
            }
        };

        // Validation Field Interactions
        this.controls.validation.validationControl = new TextBoxControl({
            type: 'number',
            key: 'validation',
            value: 5,
            label: 'Validation Test',
            description: 'Try to input a number larger then 10!',
            interactions: [
                { event: 'change', script: validationFunction }
            ]
        });
        this.forms.validation = formUtils.toFormGroup([this.controls.validation.validationControl]);

        // Required Field Interactions
        this.controls.required.requiredControl = new TextBoxControl({
            type: 'text',
            key: 'required',
            label: 'Test',
            description: 'I may or may not be required, play with the checkbox below!'
        });
        this.controls.required.toggleControl = new CheckboxControl({
            key: 'toggle',
            label: 'Required?',
            interactions: [
                { event: 'change', script: requiredFunction }
            ]
        });
        this.forms.required = formUtils.toFormGroup([
            this.controls.required.requiredControl,
            this.controls.required.toggleControl
        ]);

        // Calculation Field Interactions
        this.controls.calculation.aControl = new TextBoxControl({
            type: 'number',
            key: 'a',
            label: 'A',
            value: 1,
            interactions: [
                { event: 'change', invokeOnInit: true, script: calculationFunction }
            ]
        });
        this.controls.calculation.bControl = new TextBoxControl({
            type: 'number',
            key: 'b',
            label: 'B',
            value: 19,
            interactions: [
                { event: 'change', invokeOnInit: true, script: calculationFunction }
            ]
        });
        this.controls.calculation.sumControl = new TextBoxControl({
            type: 'number',
            key: 'sum',
            label: 'Sum',
            description: 'I am automatically set when you type in the boxes above me!',
            readOnly: true
        });
        this.forms.calculation = formUtils.toFormGroup([
            this.controls.calculation.aControl,
            this.controls.calculation.bControl,
            this.controls.calculation.sumControl
        ]);

        // Hide/Show Field Interactions
        this.controls.hideShow.textControl = new TextBoxControl({
            type: 'text',
            key: 'text',
            label: 'MyField'
        });
        this.controls.hideShow.toggleControl = new CheckboxControl({
            key: 'toggle',
            label: 'Hidden?',
            description: 'I will toggle the above field to display or not!',
            interactions: [
                { event: 'change', script: hideShowFunction }
            ]
        });
        this.forms.hideShow = formUtils.toFormGroup([
            this.controls.hideShow.textControl,
            this.controls.hideShow.toggleControl
        ]);

        // Enable/Disable Field Interactions
        this.controls.enableDisable.textControl = new TextBoxControl({
            type: 'text',
            key: 'text',
            label: 'MyField'
        });
        this.controls.enableDisable.toggleControl = new CheckboxControl({
            key: 'toggle',
            label: 'Disable?',
            description: 'I will disable the above field!',
            interactions: [
                { event: 'change', script: enableDisableFunction }
            ]
        });
        this.forms.enableDisable = formUtils.toFormGroup([
            this.controls.enableDisable.textControl,
            this.controls.enableDisable.toggleControl
        ]);

        // Messaging Field Interactions
        this.controls.messaging.toastControl = new TextBoxControl({
            type: 'text',
            key: 'toast',
            label: 'Toast',
            description: 'I will trigger a toast as you change the value!',
            interactions: [
                { event: 'change', script: messagingFunction }
            ]
        });
        this.forms.messaging = formUtils.toFormGroup([
            this.controls.messaging.toastControl
        ]);

        // Snippets
        this.snippets.validation = {
            'Template': ValidationTpl,
            'Field Interaction Script': validationFunction.toString()
        };
        this.snippets.required = {
            'Template': RequiredTpl,
            'Field Interaction Script': requiredFunction.toString()
        };
        this.snippets.calculation = {
            'Template': CalculationTpl,
            'Field Interaction Script': calculationFunction.toString()
        };
        this.snippets.hideShow = {
            'Template': HideShowTpl,
            'Field Interaction Script': hideShowFunction.toString()
        };
        this.snippets.enableDisable = {
            'Template': EnableDisableTpl,
            'Field Interaction Script': enableDisableFunction.toString()
        };
        this.snippets.messaging = {
            'Template': MessagingTpl,
            'Field Interaction Script': messagingFunction.toString()
        };
    }
}
