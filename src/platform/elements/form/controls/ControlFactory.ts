import {
  AddressControl, CheckboxControl, CheckListControl, DateTimeControl, EditorControl, FileControl, NativeSelectControl, PickerControl,
  QuickNoteControl, RadioControl, ReadOnlyControl, SelectControl, TablePickerControl, TextAreaControl, TextBoxControl, TilesControl, TimeControl
} from './index';
import { BaseControl } from './BaseControl';

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
      case 'TilesControl':
        return new TilesControl(config);
      case 'TimeControl':
        return new TimeControl(config);
      default:
        console.warn('[ControlFactory] - unable to find control for type. Make sure to set "editorType" and "editorConfig" on your column', type);
        return null;
    }
  }
}
