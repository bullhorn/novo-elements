// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoAceEditorModule } from './elements/ace-editor/AceEditor.module';
import { NovoAgendaModule } from './elements/agenda/Agenda.module';
import { NovoAsideModule } from './elements/aside/aside.module';
import { NovoAvatarModule } from './elements/avatar/Avatar.module';
import { NovoBreadcrumbModule } from './elements/breadcrumbs/Breadcrumb.module';
import { NovoButtonModule } from './elements/button/Button.module';
import { NovoCalendarModule } from './elements/calendar/Calendar.module';
import { NovoCardModule } from './elements/card/Card.module';
import { NovoCategoryDropdownModule } from './elements/category-dropdown/CategoryDropdown.module';
import { NovoCheckboxModule } from './elements/checkbox/Checkbox.module';
import { NovoChipsModule } from './elements/chips/Chips.module';
import { NovoNovoCKEditorModule } from './elements/ckeditor/CKEditor.module';
import { NovoColorPickerModule } from './elements/color-picker/color-picker.module';
import { NovoCommonModule, NovoOptionModule } from './elements/common';
import { NovoOverlayModule } from './elements/common/overlay/Overlay.module';
import { NovoDataTableModule } from './elements/data-table/data-table.module';
import { NovoDatePickerModule } from './elements/date-picker/DatePicker.module';
import { NovoDateTimePickerModule } from './elements/date-time-picker/DateTimePicker.module';
import { NovoDividerModule } from './elements/divider/divider.module';
import { NovoDragulaModule } from './elements/dragula/Dragula.module';
import { NovoDragulaService } from './elements/dragula/DragulaService';
import { NovoDropdownModule } from './elements/dropdown/Dropdown.module';
import { NovoExpansionModule } from './elements/expansion/expansion.module';
import { NovoFieldModule } from './elements/field/field.module';
import { NovoFlexModule } from './elements/flex/Flex.module';
import { NovoFormExtrasModule } from './elements/form/extras/FormExtras.module';
import { NovoFormModule } from './elements/form/Form.module';
import { NovoHeaderModule } from './elements/header/Header.module';
import { NovoIconModule } from './elements/icon/Icon.module';
import { NovoLayoutModule } from './elements/layout/layout.module';
import { NovoListModule } from './elements/list/List.module';
import { NovoLoadingModule } from './elements/loading/Loading.module';
import { NovoMenuModule } from './elements/menu/menu.module';
import { NovoModalModule } from './elements/modal/modal.module';
import { NovoMultiPickerModule } from './elements/multi-picker/MultiPicker.module';
import { NovoNonIdealStateModule } from './elements/non-ideal-state/NonIdealState.module';
import { NovoPickerModule } from './elements/picker/Picker.module';
import { GooglePlacesModule } from './elements/places/places.module';
import { GooglePlacesService } from './elements/places/places.service';
import { NovoPopOverModule } from './elements/popover/PopOver.module';
import { NovoProgressModule } from './elements/progress/Progress.module';
import { NovoQueryBuilderModule } from './elements/query-builder/query-builder.module';
import { NovoQuickNoteModule } from './elements/quick-note/QuickNote.module';
import { NovoRadioModule } from './elements/radio/Radio.module';
import { NovoSearchBoxModule } from './elements/search/SearchBox.module';
import { NovoSelectSearchModule } from './elements/select-search/select-search.module';
import { NovoSelectModule } from './elements/select/Select.module';
import { NovoSimpleTableModule } from './elements/simple-table/simple-table.module';
import { NovoSliderModule } from './elements/slider/Slider.module';
import { NovoStepperModule } from './elements/stepper/stepper.module';
import { NovoSwitchModule } from './elements/switch/Switch.module';
import { NovoTabbedGroupPickerModule } from './elements/tabbed-group-picker/TabbedGroupPicker.module';
import { NovoTableExtrasModule } from './elements/table/extras/TableExtras.module';
import { NovoTableModule } from './elements/table/Table.module';
import { NovoTabModule } from './elements/tabs/Tabs.module';
import { NovoTilesModule } from './elements/tiles/Tiles.module';
import { NovoTimePickerModule } from './elements/time-picker/TimePicker.module';
import { NovoTipWellModule } from './elements/tip-well/TipWell.module';
import { NovoToastModule } from './elements/toast/Toast.module';
import { NovoToolbarModule } from './elements/toolbar/toolbar.module';
import { NovoTooltipModule } from './elements/tooltip/Tooltip.module';
import { UnlessModule } from './elements/unless/Unless.module';
import { NovoValueModule } from './elements/value/Value.module';
import { NovoPipesModule } from './pipes/Pipes.module';
import { DateFormatService } from './services/date-format/DateFormat';
import { BrowserGlobalRef, GlobalRef } from './services/global/global.service';
import { NovoLabelService } from './services/novo-label-service';
import { OptionsService } from './services/options/OptionsService';
import { LocalStorageService } from './services/storage/storage.service';
import { ComponentUtils } from './utils/component-utils/ComponentUtils';
import { FormUtils } from './utils/form-utils/FormUtils';

@NgModule({
  imports: [ReactiveFormsModule],
  exports: [
    NovoAsideModule,
    NovoAvatarModule,
    NovoPipesModule,
    NovoButtonModule,
    NovoLoadingModule,
    NovoCardModule,
    NovoAgendaModule,
    NovoCalendarModule,
    NovoCheckboxModule,
    NovoFlexModule,
    NovoLayoutModule,
    NovoDividerModule,
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
    NovoSimpleTableModule,
    NovoTableModule,
    NovoTableExtrasModule,
    NovoFormModule,
    NovoFormExtrasModule,
    NovoCategoryDropdownModule,
    NovoMultiPickerModule,
    NovoPopOverModule,
    NovoDataTableModule,
    NovoSearchBoxModule,
    NovoProgressModule,
    NovoOverlayModule,
    GooglePlacesModule,
    NovoValueModule,
    NovoAceEditorModule,
    NovoIconModule,
    NovoExpansionModule,
    UnlessModule,
    NovoCommonModule,
    NovoOptionModule,
    NovoStepperModule,
    NovoToolbarModule,
    ScrollingModule,
    NovoTabbedGroupPickerModule,
    NovoNonIdealStateModule,
    NovoBreadcrumbModule,
    NovoFieldModule,
    NovoColorPickerModule,
    NovoMenuModule,
    NovoSelectSearchModule,
    NovoQueryBuilderModule,
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
