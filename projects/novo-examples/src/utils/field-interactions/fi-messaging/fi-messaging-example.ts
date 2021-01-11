import { Component } from '@angular/core';
// Vendor
import { CheckboxControl, FieldInteractionApi, FormUtils, TextBoxControl } from 'novo-elements';

/**
 * @title Fi Messaging Example
 */
@Component({
  selector: 'fi-messaging-example',
  templateUrl: 'fi-messaging-example.html',
  styleUrls: ['fi-messaging-example.css'],
})
export class FiMessagingExample {
  public form: any = {};
  public controls: any = {};

  constructor(private formUtils: FormUtils) {
    const messagingFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - messagingFunction'); // tslint:disable-line
      if (API.getActiveKey() === 'toast') {
        API.displayToast({
          title: 'New Value',
          message: API.getActiveValue(),
        });
      } else if (API.getActiveKey() === 'tip' || API.getActiveKey() === 'tipHtml') {
        const sanitize = !API.getValue('tipHtml');
        API.displayTip('tip', API.getValue('tip'), 'info', true, sanitize);
      } else if (API.getActiveKey() === 'prompt') {
        API.promptUser(API.getActiveKey(), ['Update Fee Arrangement from Selected Company', 'Update DateLastModified to right now!']).then(
          function (result) {
            if (result) {
              console.log('PERFORM'); // tslint:disable-line
            } else {
              console.log("DON'T PERFORM"); // tslint:disable-line
            }
          },
        );
      }
    };

    // Messaging Field Interactions
    this.controls.toastControl = new TextBoxControl({
      type: 'text',
      key: 'toast',
      label: 'Toast',
      description: 'I will trigger a toast as you change the value!',
      interactions: [{ event: 'change', script: messagingFunction }],
    });
    this.controls.tipControl = new TextBoxControl({
      type: 'text',
      key: 'tip',
      label: 'Tip',
      description: 'I will trigger a tip well as you change the value!',
      interactions: [{ event: 'change', script: messagingFunction }],
    });
    this.controls.tipHtmlControl = new CheckboxControl({
      key: 'tipHtml',
      label: 'Display Tip as HTML',
      description: 'Sets the API.displayTip() sanitize parameter to false.',
      value: false,
      interactions: [{ event: 'change', script: messagingFunction }],
    });
    this.controls.promptControl = new TextBoxControl({
      type: 'text',
      key: 'prompt',
      label: 'Prompt User of Downstream Changes',
      interactions: [{ event: 'change', script: messagingFunction }],
    });
    this.form = formUtils.toFormGroup([
      this.controls.toastControl,
      this.controls.tipControl,
      this.controls.tipHtmlControl,
      this.controls.promptControl,
    ]);
  }
}
