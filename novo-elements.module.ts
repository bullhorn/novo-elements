// NG2
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from './src/pipes/Pipes.module';
import { NovoButtonModule } from './src/elements/button/Button.module';
import { NovoLoadingModule } from './src/elements/loading/Loading.module';
import { NovoCardModule } from './src/elements/card/Card.module';
import { NovoToastModule } from './src/elements/toast/Toast.module';
import { NovoTooltipModule } from './src/elements/tooltip/Tooltip.module';
import { NovoHeaderModule } from './src/elements/header/Header.module';
import { NovoTabModule } from './src/elements/tabs/Tabs.module';
import { NovoTilesModule } from './src/elements/tiles/Tiles.module';
import { NovoModalModule } from './src/elements/modal/Modal.module';
import { NovoQuickNoteModule } from './src/elements/quick-note/QuickNote.module';
import { NovoRadioModule } from './src/elements/radio/Radio.module';
import { NovoDropdownModule } from './src/elements/dropdown/Dropdown.module';
import { NovoSelectModule } from './src/elements/select/Select.module';
import { NovoListModule } from './src/elements/list/List.module';
import { NovoSwitchModule } from './src/elements/switch/Switch.module';
import { NovoDrawerModule } from './src/elements/drawer/Drawer.module';
import { NovoDragulaModule } from './src/elements/dragula/Dragula.module';
import { NovoSliderModule } from './src/elements/slider/Slider.module';
import { NovoPickerModule } from './src/elements/picker/Picker.module';
import { NovoChipsModule } from './src/elements/chips/Chips.module';
import { NovoDatePickerModule } from './src/elements/date-picker/DatePicker.module';
import { NovoTimePickerModule } from './src/elements/time-picker/TimePicker.module';
import { NovoDateTimePickerModule } from './src/elements/date-time-picker/DateTimePicker.module';
import { NovoNovoCKEditorModule } from './src/elements/ckeditor/CKEditor.module';
import { NovoTipWellModule } from './src/elements/tip-well/TipWell.module';
import { NovoTableModule } from './src/elements/table/Table.module';
import { NovoTableExtrasModule } from './src/elements/table/extras/TableExtras.module';
import { NovoFormModule } from './src/elements/form/Form.module';
import { NovoFormExtrasModule } from './src/elements/form/extras/FormExtras.module';
import { NovoCategoryDropdownModule } from './src/elements/category-dropdown/CategoryDropdown.module';
import { NovoMultiPickerModule } from './src/elements/multi-picker/MultiPicker.module';
import { NovoPopOverModule } from './src/elements/popover/PopOver.module';

import { NovoLabelService } from './src/services/novo-label-service';
import { NovoDragulaService } from './src/elements/dragula/DragulaService';
import { ComponentUtils } from './src/utils/component-utils/ComponentUtils';

@NgModule({
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        NovoPipesModule,
        NovoButtonModule,
        NovoLoadingModule,
        NovoCardModule,
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
        NovoDrawerModule,
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
        NovoPopOverModule
    ],
    providers: [
        { provide: ComponentUtils, useClass: ComponentUtils },
        { provide: NovoLabelService, useClass: NovoLabelService },
        { provide: NovoDragulaService, useClass: NovoDragulaService }
    ]
})
export class NovoElementsModule {
}
