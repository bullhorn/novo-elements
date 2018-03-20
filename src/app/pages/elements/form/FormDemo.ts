// NG2
import { Component, Input } from '@angular/core';
// APP
let DynamicFormDemoTpl = require('./templates/DynamicForm.html');
let VerticalDynamicFormDemoTpl = require('./templates/VerticalDynamicForm.html');
let TextBasedControlsDemoTpl = require('./templates/TextBasedControls.html');
let CheckBoxControlsDemoTpl = require('./templates/CheckBoxControls.html');
let FileInputControlsDemoTpl = require('./templates/FileInputControls.html');
let CalendarControlsDemoTpl = require('./templates/CalendarInputControls.html');
let FieldsetsFormDemoTpl = require('./templates/DynamicFormFieldSets.html');
let PickerControlsDemoTpl = require('./templates/PickerControls.html');
let UpdatingFormDemoTpl = require('./templates/UpdatingFormDemo.html');
import { MockMeta, MockMetaHeaders } from './MockMeta';
// Vendor
import {
    FormUtils, TextBoxControl, CheckboxControl, CheckListControl, FileControl,
    QuickNoteControl, TilesControl, DateControl, TimeControl, DateTimeControl,
    PickerControl, EntityPickerResult, EntityPickerResults, TextAreaControl,
    NovoFormGroup, BaseControl, AceEditorControl
} from './../../../../platform/index';

const template = `
<div class="container">
    <h1>Forms <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/form">(source)</a></small></h1>
    <p>Forms use inputs and labels to submit user content. But you already knew that. What you may not know is that our forms come in two styles 'Static' and 'Dynamic'</p>

    <h2>Static Form</h2>
    <p>Static forms <code>&lt;novo-form /&gt;</code>.

    <h5>Textbox Based Controls</h5>
    <div class="example form-demo">${TextBasedControlsDemoTpl}</div>
    <code-snippet [code]="TextBasedControlsDemoTpl"></code-snippet>

    <h5>Checkbox Controls</h5>
    <div class="example form-demo">${CheckBoxControlsDemoTpl}</div>
    <code-snippet [code]="CheckBoxControlsDemoTpl"></code-snippet>

    <h5>File Input Controls</h5>
    <div class="example form-demo">${FileInputControlsDemoTpl}</div>
    <code-snippet [code]="FileInputControlsDemoTpl"></code-snippet>

    <h5>Calendar Controls</h5>
    <div class="example form-demo">${CalendarControlsDemoTpl}</div>
    <code-snippet [code]="CalendarControlsDemoTpl"></code-snippet>

    <h5>Picker Controls</h5>
    <div class="example form-demo">${PickerControlsDemoTpl}</div>
    <code-snippet [code]="PickerControlsDemoTpl"></code-snippet>

    <h2>Dynamic Form</h2>
    <p>Dynamic forms are composed of one element, <code>&lt;novo-dynamic-form [controls]="controls"/&gt;</code> and allow you to pass in the controls and form and it will create the form for you.</p>

    <h5>Basic</h5>
    <div class="example form-demo dynamic">${DynamicFormDemoTpl}</div>
    <code-snippet [code]="DynamicFormDemoTpl"></code-snippet>

    <h5>Vertical</h5>
    <div class="example form-demo dynamic">${VerticalDynamicFormDemoTpl}</div>
    <code-snippet [code]="VerticalDynamicFormDemoTpl"></code-snippet>

    <h5>Fieldsets</h5>
    <div class="example form-demo fieldsets">${FieldsetsFormDemoTpl}</div>
    <code-snippet [code]="FieldsetsFormDemoTpl"></code-snippet>

    <h5>Updating Fields/Status</h5>
    <div class="example form-demo updating">${UpdatingFormDemoTpl}</div>
    <code-snippet [code]="UpdatingFormDemoTpl"></code-snippet>
</div>
`;

@Component({
  selector: 'custom-demo-component',
  template: `<novo-custom-control-container [formGroup]="form" [form]="form" [control]="control">
        My Custom Input <input [formControlName]="control.key" [id]="control.key" [type]="control.type" [placeholder]="control.placeholder">
    </novo-custom-control-container>`,
})
export class CustomDemoComponent {
  @Input() control;
  @Input() form: any;
  @Input() edit: any;
  @Input() save: any;
  @Input() delete: any;
  @Input() upload: any;
}

@Component({
  selector: 'form-demo',
  template: template,
})
export class FormDemoComponent {
  private DynamicFormDemoTpl: string = DynamicFormDemoTpl;
  private VerticalDynamicFormDemoTpl: string = VerticalDynamicFormDemoTpl;
  private TextBasedControlsDemoTpl: string = TextBasedControlsDemoTpl;
  private CheckBoxControlsDemoTpl: string = CheckBoxControlsDemoTpl;
  private FileInputControlsDemoTpl: string = FileInputControlsDemoTpl;
  private CalendarControlsDemoTpl: string = CalendarControlsDemoTpl;
  private FieldsetsFormDemoTpl: string = FieldsetsFormDemoTpl;
  private PickerControlsDemoTpl: string = PickerControlsDemoTpl;
  private UpdatingFormDemoTpl: string = UpdatingFormDemoTpl;
  private quickNoteConfig: any;
  private textControl: any;
  private emailControl: any;
  private numberControl: any;
  private currencyControl: any;
  private aceEditorControl: any;
  private floatControl: any;
  private percentageControl: any;
  private quickNoteControl: any;
  private textForm: any;
  private checkControl: any;
  private textAreaControl: any;
  private checkListControl: any;
  private tilesControl: any;
  private checkForm: any;
  private fileControl: any;
  private multiFileControl: any;
  private fileForm: any;
  private dateControl: any;
  private timeControl: any;
  private dateTimeControl: any;
  private dynamic: any;
  private dynamicForm: any;
  private dynamicVertical: any;
  private dynamicVerticalForm: any;
  private calendarForm: any;
  private fieldsets: Array<any>;
  private fieldsetsForm: any;
  private singlePickerControl: any;
  private multiPickerControl: any;
  private entityMultiPickerControl: any;
  private pickerForm: any;
  private updatingForm: any;
  private updatingFormControls: any[];
  private required: boolean = false;
  private disabled: boolean = true;

  constructor(private formUtils: FormUtils) {
    // Quick note config
    this.quickNoteConfig = {
      triggers: {
        tags: '@',
        references: '#',
        boos: '^',
      },
      options: {
        tags: ['First', 'Second'],
        references: ['Third', 'Fourth'],
        boos: ['Test'],
      },
      renderer: {
        tags: (symbol, item) => {
          return `<a class="tag">${symbol}${item.label}</a>`;
        },
        references: (symbol, item) => {
          return `<a class="tag">${symbol}${item.label}</a>`;
        },
        boos: (symbol, item) => {
          return `<strong>${symbol}${item.label}</strong>`;
        },
      },
    };
    // Text-based Controls
    this.textControl = new TextBoxControl({ key: 'text', label: 'Text Box', tooltip: 'Textbox', readOnly: true, value: 'HI', required: true });
    this.textAreaControl = new TextAreaControl({
      key: 'textarea',
      label: 'Text Area',
      value:
        'Bro ipsum dolor sit amet yard sale saddle pipe, poaching cork 360 punter ACL back country cornice Whistler.  Avie Ski taco mitt, manny first tracks yard sale caballerial heli fatty.  Epic dope grab, brain bucket japan air wack bowl  mute heli corn Snowboard Whistler giblets table top.  Crunchy Snowboard washboard line grab reverse camber.  Bump epic granny gear heli sketching wheelie huckfest face plant crank pow pow chain ring  dirtbag washboard.  Flow endo ski bum sucker hole, death cookies manny schwag pipe.  Dope heli stomp yard sale, saddle shreddin booter gear jammer grom bonk OTB brain bucket bonk japan air Whistler.Clipless pow pow pow, core shot corn butter bomb hole glades face plant dust on crust.  Poaching park face shots bump, Bike cornice death cookies.  Avie cruiser sucker hole face plant switch.  ACL snake bite bonk, twin tip euro rig nose press McTwist.  Ripping skinny trucks shreddin.  Apres pow line euro sharkbite gapers lid.Snake bite derailleur wheels bomb hole.  Huck apres steeps BB first tracks bowl  daffy park euro park rat euro.  North shore death cookies snake bite carve, freshies dirtbag huck reverse camber hellflip frozen chicken heads apres taco glove gnar face shots bro.  Ride flow twister cornice afterbang saddle first tracks rig berm bro face shots.  Ride stoked wack park twin tip trucks chillax shuttle Whistler gondy laps.  Grind berm schwag, table top face shots steed liftie afterbang taco glove frozen chicken heads free ride clean huck.  Rock-ectomy white room nose press avie.Frozen chicken heads gondy bail travel huckfest big ring phat clean.  Taco couloir piste derailleur wack scream backside steeps groomer glades pipe gondy switch skid lid.  Brain bucket betty bowl, moguls gondy Whistler air hardtail.  Flow euro granny gear, McTwist cruiser bonk grom chain suck.  Trucks line huck, stomp ripper washboard euro corduroy death cookies yard sale dope face plant shreddin chain suck.ACL T-bar hellflip, first tracks gondy hardtail rip wack dust on crust schwag frontside couloir laps presta backside.  Road rash Ski ski bum gnar wack flow carve lid.  Nose white room ollie rail table top grom back country washboard dust on crust chillax gear jammer bro stomp stoked.  Lid wheels nose press frontside, park ACL dirtbag huck epic bowl  taco glove OTB.  Fatty mute whip stunt, Whistler McTwist stoked Bike.  Endo brain bucket crank dust on crust back country line ollie gapers afterbang bump stoked taco road rash granny gear.  Deck dirtbag 360 gnar snake bite couloir Bike corduroy frontside crank lid bro.Air tele schwag ollie, hardtail betty crunchy epic  face shots.  Travel flowy misty huck Bike 180 schwag drop hellflip ripping bunny slope carbon roadie tele bail.  Cornice sharkbite 360 frozen chicken heads dope hellflip clipless.  Switch sketching grind brain bucket stunt taco daffy OTB ride liftie brain bucket air huckfest park 360.',
    });
    this.emailControl = new TextBoxControl({ type: 'email', key: 'email', label: 'Email', tooltip: 'Email' });
    this.numberControl = new TextBoxControl({ type: 'number', key: 'number', label: 'Number' });
    this.currencyControl = new TextBoxControl({ type: 'currency', key: 'currency', label: 'Currency', currencyFormat: '$ USD' });
    this.floatControl = new TextBoxControl({ type: 'float', key: 'float', label: 'Float' });
    this.percentageControl = new TextBoxControl({ type: 'percentage', key: 'percentage', label: 'Percent', required: true });
    this.quickNoteControl = new QuickNoteControl({ key: 'note', label: 'Note', config: this.quickNoteConfig, required: true, tooltip: 'Quicknote' });
    this.aceEditorControl = new AceEditorControl({ key: 'ace', label: 'CODE', value: 'var i = 0;' });
    this.textForm = formUtils.toFormGroup([
      this.textControl,
      this.emailControl,
      this.textAreaControl,
      this.numberControl,
      this.currencyControl,
      this.floatControl,
      this.percentageControl,
      this.quickNoteControl,
      this.aceEditorControl,
    ]);

    // Check box controls
    this.checkControl = new CheckboxControl({ key: 'check', label: 'Checkbox' });
    this.checkListControl = new CheckListControl({ key: 'checklist', label: 'Check List', options: ['One', 'Two', 'Three'], tooltip: 'CheckList', tooltipPosition: 'Top' });
    this.tilesControl = new TilesControl({ key: 'tiles', label: 'Tiles', options: [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }], tooltip: 'Tiles' });
    this.checkForm = formUtils.toFormGroup([this.checkControl, this.checkListControl, this.tilesControl]);

    // Picker controls
    this.singlePickerControl = new PickerControl({ key: 'singlePicker', label: 'Single', config: { options: ['One', 'Two', 'Three'] } });
    this.multiPickerControl = new PickerControl({ key: 'multiPicker', label: 'Multiple', multiple: true, config: { options: ['One', 'Two', 'Three'], type: 'candidate' } });
    this.entityMultiPickerControl = new PickerControl({
      key: 'entityMultiPicker',
      label: 'Entities',
      required: true,
      readOnly: false,
      multiple: true,
      config: {
        resultsTemplate: EntityPickerResults,
        previewTemplate: EntityPickerResult,
        format: '$title',
        options: [
          {
            title: 'Central Bank',
            name: 'Central Bank',
            email: 'new-bank-inquiries@centralbank.com',
            phone: '(651) 555-1234',
            address: { city: 'Washington', state: 'DC' },
            searchEntity: 'ClientCorporation',
          },
          { title: 'Federal Bank', name: 'Federal Bank', email: 'info@federalbank.com', phone: '(545) 555-1212', address: { city: 'Arlington', state: 'VA' }, searchEntity: 'ClientCorporation' },
          {
            title: 'Aaron Burr',
            firstName: 'Aaron',
            lastName: 'Burr',
            name: 'Aaron Burr',
            companyName: 'Central Bank',
            email: 'aburr@centralbank.com',
            phone: '(333) 555-3434',
            address: { city: 'Washington', state: 'DC' },
            status: 'Hold',
            searchEntity: 'ClientContact',
          },
          {
            title: 'Alexander Hamilton',
            firstName: 'Alexander',
            lastName: 'Hamilton',
            name: 'Alexander Hamilton',
            companyName: 'Federal Bank',
            email: 'ahamilton@federalbank.com',
            phone: '(333) 555-2222',
            address: { city: 'Arlington', state: 'VA' },
            status: 'Active',
            searchEntity: 'ClientContact',
          },
          {
            title: 'Ben Franklin',
            firstName: 'Ben',
            lastName: 'Franklin',
            name: 'Ben Franklin',
            email: 'bfranklin@gmail.com',
            phone: '(654) 525-2222',
            address: { city: 'Boston', state: 'MA' },
            status: 'Interviewing',
            searchEntity: 'Candidate',
          },
          {
            title: 'Thomas Jefferson',
            firstName: 'Thomas',
            lastName: 'Jefferson',
            name: 'Thomas Jefferson',
            email: 'tjefferson@usa.com',
            phone: '(123) 542-1234',
            address: { city: 'Arlington', state: 'VA' },
            status: 'New Lead',
            searchEntity: 'Candidate',
          },
        ],
      },
    });
    let controls = [this.singlePickerControl, this.multiPickerControl, this.entityMultiPickerControl];
    formUtils.setInitialValues(controls, {
      entityMultiPicker: [
        { title: 'Federal Bank', name: 'Federal Bank', email: 'info@federalbank.com', phone: '(545) 555-1212', address: { city: 'Arlington', state: 'VA' }, searchEntity: 'ClientCorporation' },
      ],
    });
    this.pickerForm = formUtils.toFormGroup(controls);

    // File input controls
    this.fileControl = new FileControl({ key: 'file', name: 'myfile', label: 'File', tooltip: 'Files Control' });
    this.multiFileControl = new FileControl({
      key: 'files',
      name: 'myfiles',
      label: 'Multiple Files',
      multiple: true,
      layoutOptions: { order: 'displayFilesBelow', download: true, edit: true, customActions: true, labelStyle: 'no-box' },
      value: [{ name: 'yourFile.pdf', loaded: true, link: 'www.google.com', description: 'file description' }],
    });
    this.fileForm = formUtils.toFormGroup([this.fileControl, this.multiFileControl]);

    // Calendar input controls
    this.dateControl = new DateControl({ key: 'date', label: 'Date', tooltip: 'Date' });
    this.timeControl = new TimeControl({ key: 'time', label: 'Time', tooltip: 'Time' });
    this.dateTimeControl = new DateTimeControl({ key: 'dateTime', label: 'Date Time', military: true });
    this.calendarForm = formUtils.toFormGroup([this.dateControl, this.timeControl, this.dateTimeControl]);

    // Dynamic
    this.dynamic = formUtils.toFieldSets(
      MockMeta,
      '$ USD',
      {},
      { token: 'TOKEN', military: true },
      {
        customfield: {
          customControl: CustomDemoComponent,
        },
      },
    );
    formUtils.setInitialValuesFieldsets(this.dynamic, { firstName: 'Initial F Name', number: 12 });
    this.dynamicForm = formUtils.toFormGroupFromFieldset(this.dynamic);

    this.dynamicVertical = formUtils.toControls(MockMeta, '$ USD', {}, { token: 'TOKEN', military: true });
    formUtils.setInitialValues(this.dynamicVertical, { number: 0, firstName: 'Bobby Flay' });
    this.dynamicVerticalForm = formUtils.toFormGroup(this.dynamicVertical);

    // Dynamic + Fieldsets
    this.fieldsets = formUtils.toFieldSets(
      MockMetaHeaders,
      '$ USD',
      {},
      { token: 'TOKEN' },
      {
        customfield: {
          customControl: CustomDemoComponent,
        },
      },
    );
    formUtils.setInitialValuesFieldsets(this.fieldsets, { firstName: 'Initial F Name', number: 12 });
    this.fieldsetsForm = formUtils.toFormGroupFromFieldset(this.fieldsets);

    // Updating form
    this.updatingFormControls = [this.textControl, this.percentageControl, this.checkControl, this.singlePickerControl, this.fileControl];
    this.updatingForm = formUtils.toFormGroup(this.updatingFormControls);
  }

  toggleEnabled() {
    this.disabled = !this.disabled;
    Object.keys(this.updatingForm.controls).forEach((key) => {
      if (this.disabled) {
        this.updatingForm.controls[key].enable();
      } else {
        this.updatingForm.controls[key].disable();
      }
    });
  }

  toggleRequired() {
    this.required = !this.required;
    Object.keys(this.updatingForm.controls).forEach((key) => {
      this.updatingForm.controls[key].setRequired(this.required);
    });
  }

  markAsInvalid() {
    Object.keys(this.updatingForm.controls).forEach((key) => {
      this.updatingForm.controls[key].markAsInvalid('Custom Error!');
    });
  }

  save(form) {
    if (!form.isValid) {
      form.showOnlyRequired(true);
    } else {
      alert('SAVING');
    }
  }

  clear() {
    this.dynamic.forEach((control) => {
      control.forceClear.emit();
    });
  }

  onChange(value) {
    console.log('I changed!', value); // tslint:disable-line
  }

  handleEdit(file) {
    console.log('This is an Edit Action!', file); // tslint:disable-line
  }

  handleSave(file) {
    console.log('This is a Save Action!', file); // tslint:disable-line
  }

  handleDelete(file) {
    console.log('This is a Delete Action!', file); // tslint:disable-line
  }

  handleUpload(files) {
    console.log('This is an upload Action!', files); // tslint:disable-line
  }
}
