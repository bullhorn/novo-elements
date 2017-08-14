// NG2
import { Component } from '@angular/core';
// Vendor
import {
    FormUtils, NovoFormGroup, TextBoxControl, CheckboxControl, FieldInteractionApi,
    SelectControl, PickerControl, DateTimeControl
} from './../../../../index';
// APP
let ValidationTpl = require('./templates/Validation.html');
let RequiredTpl = require('./templates/Required.html');
let CalculationTpl = require('./templates/Calculation.html');
let HideShowTpl = require('./templates/HideShow.html');
let EnableDisableTpl = require('./templates/EnableDisable.html');
let MessagingTpl = require('./templates/Messaging.html');
let ModifyOptionsTpl = require('./templates/ModifyOptions.html');
let GlobalsTpl = require('./templates/Globals.html');
let AsyncTpl = require('./templates/Async.html');
let ConfirmTpl = require('./templates/Confirm.html');

const template = `
<div class="container">
    <h1>Field Interactions</h1>
    <p>Field Interactions is a simple API that allows you to modify NovoForms based on field changes.</p>
    <p>The Field Interaction API gives you a simple to use API object when writing your field interaction functions.</p>
    <p>Look below for samples of what you can do with this API...</p>

    <h2>Configuration</h2>

    <main class="tabs">
        <novo-nav theme="white" [outlet]="config" direction="vertical">
            <novo-tab><span>Setup</span></novo-tab>
            <novo-tab><span>Inspect Form</span></novo-tab>
            <novo-tab><span>Configuration on Field</span></novo-tab>
            <novo-tab><span>Write Field Interaction</span></novo-tab>
        </novo-nav>

        <novo-nav-outlet #config>
            <novo-nav-content>
                <h5>Setup</h5>
                <p>TODO - How to setup providers in module -- how to setup for custom globals</p>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Inspect Form</h5>
                <p>TODO - GIF to show how to grab the field name</p>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Configuration on Field</h5>
                <pre class="field-config"><code>event: 'change|focus|blur|init', script: Function, invokeOnInit?: boolean</code></pre>
                <p>The Field Interactions are configured on a per control basis. There are three scenarios in which they will be fired: "change", "focus" and "blur".</p>
                <p><label>init</label> -- gets fired only when the form is initialized (make sure to use invokeOnInit!)</p>
                <p><label>change</label> -- gets fired when the value of the form control changes</p>
                <p><label>focus</label> -- gets fired when the field gets focused</p>
                <p><label>blue</label> -- gets fired when the field loses focus</p>
                <p>The script function represents the function that will be fired for the event, you can see examples of these below.</p>
                <p>Lastly, "invokeOnInit" will just trigger the Field Interaction when the form is created as well.</p>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Write Field Interaction</h5>
                <p>TODO - write field interactions like below!</p>
            </novo-nav-content>
        </novo-nav-outlet>
    </main>

    <br/>
    <br/>

    <h2>Basic API</h2>

    <main class="tabs">
        <novo-nav theme="white" [outlet]="api" direction="vertical">
            <novo-tab><span>Validation</span></novo-tab>
            <novo-tab><span>Mark Fields as Required</span></novo-tab>
            <novo-tab><span>Field Calculations & Modification</span></novo-tab>
            <novo-tab><span>Hide / Show Fields</span></novo-tab>
            <novo-tab><span>Enable / Disable Fields</span></novo-tab>
            <novo-tab><span>Messaging / Notifications</span></novo-tab>
            <novo-tab><span>Modifying Options on Static Pickers / Selects</span></novo-tab>
            <novo-tab><span>Using Globals</span></novo-tab>
            <novo-tab><span>Async Interactions</span></novo-tab>
            <novo-tab><span>Confirm Changes</span></novo-tab>
        </novo-nav>

        <novo-nav-outlet #api>
            <novo-nav-content>
                <h5>Validation</h5>
                <p>If you need to perform some custom validation on a field, you can use the API to quickly mark a field as invalid</p>
                <div class="example field-interaction-demo">${ValidationTpl}</div>
                <multi-code-snippet [code]="snippets.validation"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Mark Fields as Required</h5>
                <p>If you need to mark fields as required or not based on some changes in the form, you can use the API to do that!</p>
                <div class="example field-interaction-demo">${RequiredTpl}</div>
                <multi-code-snippet [code]="snippets.required"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Field Calculations & Modification</h5>
                <p>If you need to do some custom calculations based off other form data, you can do that easily with the API</p>
                <div class="example field-interaction-demo">${CalculationTpl}</div>
                <multi-code-snippet [code]="snippets.calculation"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Hide / Show Fields</h5>
                <p>You can also hide or show certain fields based on interaction with the form. Note that the value is still present in the form's value</p>
                <div class="example field-interaction-demo">${HideShowTpl}</div>
                <multi-code-snippet [code]="snippets.hideShow"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Enable / Disable Fields</h5>
                <p>You can also enable or disable certain fields based on interaction with the form. Note that the value is still present in the form's value but does not respond to any interactions</p>
                <div class="example field-interaction-demo">${EnableDisableTpl}</div>
                <multi-code-snippet [code]="snippets.enableDisable"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Messaging / Notifications</h5>
                <p>You can trigger messages to users in a few different ways using the API</p>
                <div class="example field-interaction-demo">${MessagingTpl}</div>
                <multi-code-snippet [code]="snippets.messaging"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Modifying Options on Static Pickers / Selects</h5>
                <p>You have full control over the control, you can modify the options array of static pickers and select controls!</p>
                <div class="example field-interaction-demo">${ModifyOptionsTpl}</div>
                <multi-code-snippet [code]="snippets.modifyOptions"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Using Globals</h5>
                <p>Using the config from above, you can figure the API to have a set of global variables that you can key off of inside your field interactions</p>
                <div class="example field-interaction-demo">${GlobalsTpl}</div>
                <multi-code-snippet [code]="snippets.globals"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Async Interactions</h5>
                <p>You can perform async interactions and keep the form from saving by setting a loading state</p>
                <div class="example field-interaction-demo">${AsyncTpl}</div>
                <multi-code-snippet [code]="snippets.async"></multi-code-snippet>
            </novo-nav-content>
            <novo-nav-content>
                <h5>Confirm Changes</h5>
                <p>You can prompt the user if they want to update the field or not too!</p>
                <div class="example field-interaction-demo">${ConfirmTpl}</div>
                <multi-code-snippet [code]="snippets.confirm"></multi-code-snippet>
            </novo-nav-content>
        </novo-nav-outlet>
    </main>
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
    public ModifyOptionsTpl: any = ModifyOptionsTpl;
    public GlobalsTpl: any = GlobalsTpl;
    public AsyncTpl: any = AsyncTpl;
    public ConfirmTpl: any = ConfirmTpl;

    public forms: any = {};
    public controls: any = {
        validation: {},
        required: {},
        calculation: {},
        hideShow: {},
        enableDisable: {},
        messaging: {},
        modifyOptions: {},
        globals: {},
        async: {},
        confirm: {}
    };
    public snippets: any = {
        validation: {},
        required: {},
        calculation: {},
        hideShow: {},
        enableDisable: {},
        messaging: {},
        modifyOptions: {},
        globals: {},
        async: {},
        confirm: {}
    };

    constructor(private formUtils: FormUtils) {
        let validationFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - validationFunction'); // tslint:disable-line
            let activeValue = API.getActiveValue();
            if (activeValue > 10) {
                API.markAsInvalid(API.getActiveKey(), 'Too high! Make it a lot lower!!');
            }
        };
        let requiredFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - requiredFunction'); // tslint:disable-line
            let activeValue = API.getActiveValue();
            if (activeValue) {
                API.setRequired('required', true);
            } else {
                API.setRequired('required', false);
            }
        };
        let calculationFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - calculationFunction'); // tslint:disable-line
            let a = Number(API.getValue('a'));
            let b = Number(API.getValue('b'));
            API.setValue('sum', a + b);
            API.setValue('date', new Date());
        };
        let hideShowFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - hideShowFunction'); // tslint:disable-line
            let activeValue = API.getActiveValue();
            if (!activeValue) {
                API.show('text');
            } else {
                API.hide('text');
            }
        };
        let enableDisableFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - enableDisableFunction'); // tslint:disable-line
            let currentValue = API.getActiveValue();
            if (!currentValue) {
                API.enable('text');
            } else {
                API.disable('text');
            }
        };
        let messagingFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - messagingFunction'); // tslint:disable-line
            if (API.getActiveKey() === 'toast') {
                API.displayToast({
                    title: 'New Value',
                    message: API.getActiveValue()
                });
            } else if (API.getActiveKey() === 'tip') {
                API.displayTip(API.getActiveKey(), API.getActiveValue(), 'info', true);
            }
        };
        let modifyOptionsAddFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - modifyOptionsAddFunction'); // tslint:disable-line
            let currentValue = API.getActiveValue();
            if (!currentValue) {
                API.removeStaticOption('select', 'NEW');
                API.removeStaticOption('picker', 'NEW');
            } else {
                API.addStaticOption('select', 'NEW');
                API.addStaticOption('picker', 'NEW');
            }
        };
        let modifyOptionsAsyncFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - modifyOptionsAsyncFunction'); // tslint:disable-line
            let currentValue = API.getActiveValue();
            if (currentValue) {
                API.setProperty('picker', 'label', 'Async Picker');
                API.modifyPickerConfig('picker', {
                    format: '$name $test',
                    optionsUrl: 'http://novo-elements-mock.getsandbox.com/users'
                }, (result) => { result.test = 'MAPPED!'; return result; });
            } else {
                API.setProperty('picker', 'label', 'Static Picker');
                API.modifyPickerConfig('picker', {
                    options: ['A', 'B', 'C']
                });
            }
        };
        let globalsFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - globalsFunction'); // tslint:disable-line
            API.setProperty(API.getActiveKey(), 'label', `${API.getProperty(API.getActiveKey(), 'label')} -- ${API.globals.TEST}`);
        };
        let asyncFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - asyncFunction'); // tslint:disable-line
            API.setLoading(API.getActiveKey(), true);
            setTimeout(() => {
                API.setLoading(API.getActiveKey(), false);
            }, 3000);
        };
        let confirmFunction = (API: FieldInteractionApi) => {
            console.log('[FieldInteractionDemo] - confirmFunction'); // tslint:disable-line
            let activeValue = API.getActiveValue();
            API.confirmChanges(API.getActiveKey());
        };

        // Validation Field Interactions
        this.controls.validation.validationControl = new TextBoxControl({
            type: 'number',
            key: 'validation',
            value: 5,
            label: 'Validation Test',
            description: 'Try to input a number larger then 10!',
            interactions: [
                { event: 'change', script: validationFunction, invokeOnInit: true }
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
            value: 1,
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
        this.controls.calculation.dateModifiedControl = new DateTimeControl({
            key: 'date',
            label: 'Date Last Modified'
        });
        this.forms.calculation = formUtils.toFormGroup([
            this.controls.calculation.aControl,
            this.controls.calculation.bControl,
            this.controls.calculation.sumControl,
            this.controls.calculation.dateModifiedControl
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
        this.controls.messaging.tipControl = new TextBoxControl({
            type: 'text',
            key: 'tip',
            label: 'Tip',
            description: 'I will trigger a tip well as you change the value!',
            interactions: [
                { event: 'change', script: messagingFunction }
            ]
        });
        this.forms.messaging = formUtils.toFormGroup([
            this.controls.messaging.toastControl,
            this.controls.messaging.tipControl
        ]);

        // Modify Options Field Interactions
        this.controls.modifyOptions.selectControl = new SelectControl({
            key: 'select',
            label: 'Select',
            options: ['A', 'B', 'C']
        });
        this.controls.modifyOptions.pickerControl = new PickerControl({
            key: 'picker',
            label: 'Static Picker',
            config: {
                options: ['A', 'B', 'C']
            }
        });
        this.controls.modifyOptions.toggleControl = new CheckboxControl({
            key: 'toggle',
            label: 'Add Option?',
            description: 'I will add options to the above field!',
            interactions: [
                { event: 'change', script: modifyOptionsAddFunction }
            ]
        });
        this.controls.modifyOptions.makePickerAsyncControl = new CheckboxControl({
            key: 'async',
            label: 'Async Picker?',
            description: 'I will make the picker now hit a service!',
            interactions: [
                { event: 'change', script: modifyOptionsAsyncFunction }
            ]
        });
        this.forms.modifyOptions = formUtils.toFormGroup([
            this.controls.modifyOptions.selectControl,
            this.controls.modifyOptions.pickerControl,
            this.controls.modifyOptions.toggleControl,
            this.controls.modifyOptions.makePickerAsyncControl
        ]);

        // Global Field Interactions
        this.controls.globals.globalControl = new TextBoxControl({
            type: 'number',
            key: 'global',
            value: 5,
            label: 'Form Input',
            description: 'The label gets updated on load to use a global!',
            interactions: [
                { event: 'init', script: globalsFunction, invokeOnInit: true }
            ]
        });
        this.forms.globals = formUtils.toFormGroup([this.controls.globals.globalControl]);

        // Async Interactions
        this.controls.async.textControl = new TextBoxControl({
            type: 'text',
            key: 'text',
            value: 5,
            label: 'Async Validation',
            description: 'As you finish typing, the async check will mark the form as invalid',
            interactions: [
                { event: 'change', script: asyncFunction }
            ]
        });
        this.forms.async = formUtils.toFormGroup([this.controls.async.textControl]);

        // Confirm Interactions
        this.controls.confirm.confirmControl = new TextBoxControl({
            type: 'text',
            key: 'prompt',
            value: 'Hello!',
            label: 'Prompt!',
            description: 'As you change this field you will be prompted for changes!',
            interactions: [
                { event: 'change', script: confirmFunction }
            ]
        });
        this.forms.confirm = formUtils.toFormGroup([this.controls.confirm.confirmControl]);

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
        this.snippets.modifyOptions = {
            'Template': ModifyOptionsTpl,
            'Field Interaction Script (add)': modifyOptionsAddFunction.toString(),
            'Field Interaction Script (async)': modifyOptionsAsyncFunction.toString()
        };
        this.snippets.globals = {
            'Template': GlobalsTpl,
            'Field Interaction Script': globalsFunction.toString()
        };
        this.snippets.async = {
            'Template': AsyncTpl,
            'Field Interaction Script': asyncFunction.toString()
        };
        this.snippets.confirm = {
            'Template': ConfirmTpl,
            'Field Interaction Script': confirmFunction.toString()
        };
    }
}
