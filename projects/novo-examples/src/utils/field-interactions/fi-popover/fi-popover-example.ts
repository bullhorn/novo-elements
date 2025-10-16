import { Component } from '@angular/core';
// Vendor
import { FieldInteractionApi, FormUtils, TextBoxControl, TilesControl } from 'novo-elements';

/**
 * @title Fi Popover Example
 */
@Component({
    selector: 'fi-popover-example',
    templateUrl: 'fi-popover-example.html',
    styleUrls: ['fi-popover-example.css'],
    standalone: false
})
export class FiPopoverExample {
  public form: any = {};
  public controls: any = {};

  constructor(private formUtils: FormUtils) {

    const popoverUpdateFunction = (API: FieldInteractionApi) => {
      console.log('[FieldInteractionDemo] - popoverUpdateFunction'); // tslint:disable-line
      for (const key in this.controls) {
        API.setPopOver(this.controls[key].key, {
          title: API.getValue(this.controls.popoverTitleControl.key),
          content: API.getValue(this.controls.popoverContentControl.key),
          htmlContent: API.getValue(this.controls.popoverHtmlContentControl.key),
          onHover: API.getValue(this.controls.popoverOnHoverControl.key),
          placement: API.getValue(this.controls.popoverPlacementControl.key),
        });
      }
    };

    // Popover Field Interactions
    this.controls.popoverTitleControl = new TextBoxControl({
      type: 'text',
      key: 'popoverTitle',
      label: 'Title',
      value: 'Pop Over Title',
      description: 'I will add a popover title to the popover as a value is typed.',
      interactions: [{ event: 'change', invokeOnInit: true, script: popoverUpdateFunction }],
    });

    this.controls.popoverContentControl = new TextBoxControl({
      type: 'text',
      key: 'popoverContent',
      label: 'Content',
      value: 'Pop Over Content',
      description: 'I will add string content to the popover as a value is typed.',
      interactions: [{ event: 'change', script: popoverUpdateFunction }],
    });

    this.controls.popoverHtmlContentControl = new TextBoxControl({
      type: 'text',
      key: 'popoverHtmlContent',
      label: 'HTML Content',
      value: '',
      description: 'I will inject HTML content instead of the string content to the popover if specified.',
      interactions: [{ event: 'change', script: popoverUpdateFunction }],
    });

    this.controls.popoverOnHoverControl = new TilesControl({
      key: 'popoverOnHover',
      label: 'Popover On Hover',
      value: true,
      description: 'I will make the popover shown on hover over instead of on click.',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' },
      ],
      interactions: [{ event: 'change', script: popoverUpdateFunction }],
    });

    this.controls.popoverPlacementControl = new TilesControl({
      key: 'popoverPlacement',
      label: 'Popover Placement',
      description: 'I will change the positioning of the popover.',
      value: 'bottom',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
      ],
      interactions: [{ event: 'change', script: popoverUpdateFunction }],
    });

    this.form = formUtils.toFormGroup([
      this.controls.popoverTitleControl,
      this.controls.popoverContentControl,
      this.controls.popoverHtmlContentControl,
      this.controls.popoverOnHoverControl,
      this.controls.popoverPlacementControl,
    ]);
  }
}
