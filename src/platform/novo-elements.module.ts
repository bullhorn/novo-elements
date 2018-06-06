// NG2
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from './pipes/Pipes.module';
import { NovoButtonModule } from './elements/button/Button.module';
import { NovoAceEditorModule } from './elements/ace-editor/AceEditor.module';
import { NovoLoadingModule } from './elements/loading/Loading.module';
import { NovoCardModule } from './elements/card/Card.module';
import { NovoCalendarModule } from './elements/calendar/Calendar.module';
import { NovoToastModule } from './elements/toast/Toast.module';
import { NovoTooltipModule } from './elements/tooltip/Tooltip.module';
import { NovoHeaderModule } from './elements/header/Header.module';
import { NovoTabModule } from './elements/tabs/Tabs.module';
import { NovoTilesModule } from './elements/tiles/Tiles.module';
import { NovoModalModule } from './elements/modal/Modal.module';
import { NovoQuickNoteModule } from './elements/quick-note/QuickNote.module';
import { NovoRadioModule } from './elements/radio/Radio.module';
import { NovoDropdownModule } from './elements/dropdown/Dropdown.module';
import { NovoSelectModule } from './elements/select/Select.module';
import { NovoListModule } from './elements/list/List.module';
import { NovoSwitchModule } from './elements/switch/Switch.module';
import { NovoDragulaModule } from './elements/dragula/Dragula.module';
import { NovoSliderModule } from './elements/slider/Slider.module';
import { NovoPickerModule } from './elements/picker/Picker.module';
import { NovoChipsModule } from './elements/chips/Chips.module';
import { NovoDatePickerModule } from './elements/date-picker/DatePicker.module';
import { NovoTimePickerModule } from './elements/time-picker/TimePicker.module';
import { NovoDateTimePickerModule } from './elements/date-time-picker/DateTimePicker.module';
import { NovoNovoCKEditorModule } from './elements/ckeditor/CKEditor.module';
import { NovoTipWellModule } from './elements/tip-well/TipWell.module';
import { NovoTableModule } from './elements/table/Table.module';
import { NovoTableExtrasModule } from './elements/table/extras/TableExtras.module';
import { NovoFormModule } from './elements/form/Form.module';
import { NovoFormExtrasModule } from './elements/form/extras/FormExtras.module';
import { NovoCategoryDropdownModule } from './elements/category-dropdown/CategoryDropdown.module';
import { NovoMultiPickerModule } from './elements/multi-picker/MultiPicker.module';
import { NovoPopOverModule } from './elements/popover/PopOver.module';
import { NovoSearchBoxModule } from './elements/search/SearchBox.module';
import { GooglePlacesModule } from './elements/places/places.module';
import { NovoValueModule } from './elements/value/Value.module';
import { NovoDataTableModule } from './elements/data-table/data-table.module';
import { NovoSimpleTableModule } from './elements/simple-table/simple-table.module';
import { NovoIconModule } from './elements/icon/Icon.module';
import { NovoExpansionModule } from './elements/expansion/expansion.module';
import { NovoStepperModule } from './elements/stepper/stepper.module';
import { UnlessModule } from './elements/unless/Unless.module';
import { NovoOverlayModule } from './elements/overlay/Overlay.module';
import { DateFormatService } from './services/date-format/DateFormat';
import { NovoLabelService } from './services/novo-label-service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { GooglePlacesService } from './elements/places/places.service';
import { GlobalRef, BrowserGlobalRef } from './services/global/global.service';
import { LocalStorageService } from './services/storage/storage.service';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
import { FormUtils } from './utils/form-utils/FormUtils';
import { OptionsService } from './services/options/OptionsService';

import { NovoCommonModule } from './elements/common/common.module';

@NgModule({
  imports: [ReactiveFormsModule],
  exports: [
    NovoPipesModule,
    NovoButtonModule,
    NovoLoadingModule,
    NovoCardModule,
    NovoCalendarModule,
    NovoToastModule,
    NovoTooltipModule,
    NovoHeaderModule,
    NovoTabModule,
    NovoTilesModule,
    NovoModalModule,
    NovoQuickNoteModule,
    NovoRadioModule,
    NovoDropdownModule,
    NovoSelectModule,
    NovoListModule,
    NovoSwitchModule,
    NovoDragulaModule,
    NovoSliderModule,
    NovoPickerModule,
    NovoChipsModule,
    NovoDatePickerModule,
    NovoTimePickerModule,
    NovoDateTimePickerModule,
    NovoNovoCKEditorModule,
    NovoTipWellModule,
    NovoTableModule,
    NovoTableExtrasModule,
    NovoFormModule,
    NovoFormExtrasModule,
    NovoCategoryDropdownModule,
    NovoMultiPickerModule,
    NovoPopOverModule,
    NovoDataTableModule,
    NovoSimpleTableModule,
    NovoSearchBoxModule,
    NovoOverlayModule,
    GooglePlacesModule,
    NovoValueModule,
    NovoAceEditorModule,
    NovoIconModule,
    NovoExpansionModule,
    UnlessModule,
    NovoCommonModule,
    NovoStepperModule,
  ],
  providers: [
    { provide: ComponentUtils, useClass: ComponentUtils },
    { provide: DateFormatService, useClass: DateFormatService },
    { provide: NovoLabelService, useClass: NovoLabelService },
    { provide: NovoDragulaService, useClass: NovoDragulaService },
    { provide: GooglePlacesService, useClass: GooglePlacesService },
    { provide: GlobalRef, useClass: BrowserGlobalRef },
    { provide: LocalStorageService, useClass: LocalStorageService },
    { provide: OptionsService, useClass: OptionsService },
    { provide: FormUtils, useClass: FormUtils },
  ],
})
export class NovoElementsModule {}
