import { AddressControl } from './address';
import { BaseControl } from './base-control';
import { CheckListControl } from './check-list';
import { CheckboxControl } from './checkbox';
import { DateTimeControl } from './date-time';
import { EditorControl } from './editor';
import { FileControl } from './file';
import { NativeSelectControl } from './native-select';
import { PickerControl, TablePickerControl } from './picker';
import { QuickNoteControl } from './quick-note';
import { RadioControl } from './radio';
import { ReadOnlyControl } from './read-only';
import { SelectControl } from './select';
import { SwitchControl } from './switch';
import { TextAreaControl } from './text-area';
import { TextBoxControl } from './textbox';
import { TilesControl } from './tiles';
import { TimeControl } from './time';

export class ControlFactory {
  static create(type: string, config: BaseControl): BaseControl {
    switch (type) {
      case 'AddressControl':
        return new AddressControl(config);
      case 'CheckboxControl':
        return new CheckboxControl(config);
      case 'CheckListControl':
        return new CheckListControl(config);
      case 'CheckListControl':
        return new CheckListControl(config);
      case 'DateTimeControl':
        return new DateTimeControl(config);
      case 'EditorControl':
        return new EditorControl(config);
      case 'FileControl':
        return new FileControl(config);
      case 'NativeSelectControl':
        return new NativeSelectControl(config);
      case 'PickerControl':
        return new PickerControl(config);
      case 'TablePickerControl':
        return new TablePickerControl(config);
      case 'QuickNoteControl':
        return new QuickNoteControl(config);
      case 'RadioControl':
        return new RadioControl(config);
      case 'ReadOnlyControl':
        return new ReadOnlyControl(config);
      case 'TextAreaControl':
        return new TextAreaControl(config);
      case 'TextBoxControl':
        return new TextBoxControl(config);
      case 'SelectControl':
        return new SelectControl(config);
      case 'SwitchControl':
        return new SwitchControl(config);
      case 'TilesControl':
        return new TilesControl(config);
      case 'TimeControl':
        return new TimeControl(config);
      default:
        console.warn(
          '[ControlFactory] - unable to find control for type. Make sure to set "editorType" and "editorConfig" on your column',
          type,
        );
        return null;
    }
  }
}
