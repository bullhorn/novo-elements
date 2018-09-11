import { Component } from '@angular/core';

// Vendor
import { FormUtils, TextBoxControl, QuickNoteControl, TextAreaControl, AceEditorControl } from 'novo-elements';

// import { MockMeta, MockMetaHeaders } from './MockMeta';

/**
 * @title Text Based Controls Example
 */
@Component({
  selector: 'text-based-controls-example',
  templateUrl: 'text-based-controls-example.html',
  styleUrls: ['text-based-controls-example.css'],
})
export class TextBasedControlsExample {
  public quickNoteConfig: any;
  public textControl: any;
  public emailControl: any;
  public numberControl: any;
  public currencyControl: any;
  public aceEditorControl: any;
  public floatControl: any;
  public percentageControl: any;
  public quickNoteControl: any;
  public textAreaControl: any;
  public textForm: any;

  constructor(private formUtils: FormUtils) {
    // Quick note config;
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
    this.textControl = new TextBoxControl({
      key: 'text',
      label: 'Text Box',
      tooltip: 'Textbox',
      readOnly: true,
      value: 'HI',
      required: true,
    });
    this.textAreaControl = new TextAreaControl({
      key: 'textarea',
      label: 'Text Area',
      tooltip: 'Text Area',
      value:
        'Bro ipsum dolor sit amet yard sale saddle pipe, poaching cork 360 punter ACL back country cornice Whistler.  Avie Ski taco mitt, manny first tracks yard sale caballerial heli fatty.  Epic dope grab, brain bucket japan air wack bowl  mute heli corn Snowboard Whistler giblets table top.  Crunchy Snowboard washboard line grab reverse camber.  Bump epic granny gear heli sketching wheelie huckfest face plant crank pow pow chain ring  dirtbag washboard.  Flow endo ski bum sucker hole, death cookies manny schwag pipe.  Dope heli stomp yard sale, saddle shreddin booter gear jammer grom bonk OTB brain bucket bonk japan air Whistler.Clipless pow pow pow, core shot corn butter bomb hole glades face plant dust on crust.  Poaching park face shots bump, Bike cornice death cookies.  Avie cruiser sucker hole face plant switch.  ACL snake bite bonk, twin tip euro rig nose press McTwist.  Ripping skinny trucks shreddin.  Apres pow line euro sharkbite gapers lid.Snake bite derailleur wheels bomb hole.  Huck apres steeps BB first tracks bowl  daffy park euro park rat euro.  North shore death cookies snake bite carve, freshies dirtbag huck reverse camber hellflip frozen chicken heads apres taco glove gnar face shots bro.  Ride flow twister cornice afterbang saddle first tracks rig berm bro face shots.  Ride stoked wack park twin tip trucks chillax shuttle Whistler gondy laps.  Grind berm schwag, table top face shots steed liftie afterbang taco glove frozen chicken heads free ride clean huck.  Rock-ectomy white room nose press avie.Frozen chicken heads gondy bail travel huckfest big ring phat clean.  Taco couloir piste derailleur wack scream backside steeps groomer glades pipe gondy switch skid lid.  Brain bucket betty bowl, moguls gondy Whistler air hardtail.  Flow euro granny gear, McTwist cruiser bonk grom chain suck.  Trucks line huck, stomp ripper washboard euro corduroy death cookies yard sale dope face plant shreddin chain suck.ACL T-bar hellflip, first tracks gondy hardtail rip wack dust on crust schwag frontside couloir laps presta backside.  Road rash Ski ski bum gnar wack flow carve lid.  Nose white room ollie rail table top grom back country washboard dust on crust chillax gear jammer bro stomp stoked.  Lid wheels nose press frontside, park ACL dirtbag huck epic bowl  taco glove OTB.  Fatty mute whip stunt, Whistler McTwist stoked Bike.  Endo brain bucket crank dust on crust back country line ollie gapers afterbang bump stoked taco road rash granny gear.  Deck dirtbag 360 gnar snake bite couloir Bike corduroy frontside crank lid bro.Air tele schwag ollie, hardtail betty crunchy epic  face shots.  Travel flowy misty huck Bike 180 schwag drop hellflip ripping bunny slope carbon roadie tele bail.  Cornice sharkbite 360 frozen chicken heads dope hellflip clipless.  Switch sketching grind brain bucket stunt taco daffy OTB ride liftie brain bucket air huckfest park 360.',
    });
    this.emailControl = new TextBoxControl({ type: 'email', key: 'email', label: 'Email', tooltip: 'Email' });
    this.numberControl = new TextBoxControl({ type: 'number', key: 'number', tooltip: 'Number', label: 'Number' });
    this.currencyControl = new TextBoxControl({
      type: 'currency',
      key: 'currency',
      tooltip: 'Currency',
      label: 'Currency',
      currencyFormat: '$ USD',
    });
    this.floatControl = new TextBoxControl({ type: 'float', key: 'float', tooltip: 'Float', label: 'Float' });
    this.percentageControl = new TextBoxControl({
      type: 'percentage',
      key: 'percentage',
      tooltip: 'Percent',
      label: 'Percent',
      required: true,
    });
    this.quickNoteControl = new QuickNoteControl({
      key: 'note',
      label: 'Note',
      config: this.quickNoteConfig,
      required: true,
      tooltip: 'Quicknote',
    });
    this.aceEditorControl = new AceEditorControl({ key: 'ace', label: 'CODE', tooltip: 'CODE', value: 'var i = 0;' });
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
  }
}
