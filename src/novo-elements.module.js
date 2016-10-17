// NG2
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoPipesModule } from './pipes/Pipes.module';
import { NovoButtonModule } from './elements/button/Button.module';
import { NovoLoadingModule } from './elements/loading/Loading.module';
import { NovoCardModule } from './elements/card/Card.module';
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
import { NovoDrawerModule } from './elements/drawer/Drawer.module';
import { NovoDragulaModule } from './elements/dragula/Dragula.module';
import { NovoSliderModule } from './elements/slider/Slider.module';
import { NovoPickerModule } from './elements/picker/Picker.module';
import { NovoChipsModule } from './elements/chips/Chips.module';
import { NovoDatePickerModule } from './elements/date-picker/DatePicker.module';
import { NovoTimePickerModule } from './elements/time-picker/TimePicker.module';
import { NovoNovoCKEditorModule } from './elements/ckeditor/CKEditor.module';
import { NovoTipWellModule } from './elements/tip-well/TipWell.module';
import { NovoTableModule } from './elements/table/Table.module';
import { NovoTableExtrasModule } from './elements/table/extras/TableExtras.module';
import { NovoFormModule } from './elements/form/Form.module';
import { NovoFormExtrasModule } from './elements/form/extras/FormExtras.module';
import { NovoCategoryDropdownModule } from './elements/category-dropdown/CategoryDropdown.module';

import { NovoLabelService } from './services/novo-label-service';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';

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
        NovoNovoCKEditorModule,
        NovoTipWellModule,
        NovoTableModule,
        NovoTableExtrasModule,
        NovoFormModule,
        NovoFormExtrasModule,
        NovoCategoryDropdownModule
    ],
    providers: [
        { provide: ComponentUtils, useClass: ComponentUtils },
        { provide: NovoLabelService, useClass: NovoLabelService },
        { provide: NovoDragulaService, useClass: NovoDragulaService }
    ]
})
export class NovoElementsModule {
}
