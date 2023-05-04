// NG2
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// APP
import { NovoAceEditorModule } from 'novo-elements/elements/ace-editor';
import { NovoAgendaModule } from 'novo-elements/elements/agenda';
import { NovoAsideModule } from 'novo-elements/elements/aside';
import { NovoAvatarModule } from 'novo-elements/elements/avatar';
import { NovoBreadcrumbModule } from 'novo-elements/elements/breadcrumbs';
import { NovoButtonModule } from 'novo-elements/elements/button';
import { NovoCalendarModule } from 'novo-elements/elements/calendar';
import { NovoCardModule } from 'novo-elements/elements/card';
import { NovoCategoryDropdownModule } from 'novo-elements/elements/category-dropdown';
import { NovoCheckboxModule } from 'novo-elements/elements/checkbox';
import { NovoChipsModule } from 'novo-elements/elements/chips';
import { NovoNovoCKEditorModule } from 'novo-elements/elements/ckeditor';
import { NovoColorPickerModule } from 'novo-elements/elements/color-picker';
import { NovoCommonModule, NovoOptionModule, NovoOverlayModule } from 'novo-elements/elements/common';
import { NovoDataTableModule } from 'novo-elements/elements/data-table';
import { NovoDatePickerModule } from 'novo-elements/elements/date-picker';
import { NovoDateTimePickerModule } from 'novo-elements/elements/date-time-picker';
import { NovoDividerModule } from 'novo-elements/elements/divider';
import { NovoDragulaModule, NovoDragulaService } from 'novo-elements/elements/dragula';
import { NovoDropdownModule } from 'novo-elements/elements/dropdown';
import { NovoExpansionModule } from 'novo-elements/elements/expansion';
import { NovoFieldModule } from 'novo-elements/elements/field';
import { NovoFlexModule } from 'novo-elements/elements/flex';
import { FormUtils, NovoFormExtrasModule, NovoFormModule } from 'novo-elements/elements/form';
import { NovoHeaderModule } from 'novo-elements/elements/header';
import { NovoIconModule } from 'novo-elements/elements/icon';
import { NovoLayoutModule } from 'novo-elements/elements/layout';
import { NovoListModule } from 'novo-elements/elements/list';
import { NovoLoadingModule } from 'novo-elements/elements/loading';
import { NovoMenuModule } from 'novo-elements/elements/menu';
import { NovoModalModule } from 'novo-elements/elements/modal';
import { NovoMultiPickerModule } from 'novo-elements/elements/multi-picker';
import { NovoNonIdealStateModule } from 'novo-elements/elements/non-ideal-state';
import { NovoPickerModule } from 'novo-elements/elements/picker';
import { GooglePlacesModule, GooglePlacesService } from 'novo-elements/elements/places';
import { NovoPopOverModule } from 'novo-elements/elements/popover';
import { NovoProgressModule } from 'novo-elements/elements/progress';
import { NovoQueryBuilderModule } from 'novo-elements/elements/query-builder';
import { NovoQuickNoteModule } from 'novo-elements/elements/quick-note';
import { NovoRadioModule } from 'novo-elements/elements/radio';
import { NovoSearchBoxModule } from 'novo-elements/elements/search';
import { NovoSelectSearchModule } from 'novo-elements/elements/select-search';
import { NovoSelectModule } from 'novo-elements/elements/select';
import { NovoSimpleTableModule } from 'novo-elements/elements/simple-table';
import { NovoSliderModule } from 'novo-elements/elements/slider';
import { NovoStepperModule } from 'novo-elements/elements/stepper';
import { NovoSwitchModule } from 'novo-elements/elements/switch';
import { NovoTabbedGroupPickerModule } from 'novo-elements/elements/tabbed-group-picker';
import { NovoTableExtrasModule, NovoTableModule } from 'novo-elements/elements/table';
import { NovoTabModule } from 'novo-elements/elements/tabs';
import { NovoTilesModule } from 'novo-elements/elements/tiles';
import { NovoTimePickerModule } from 'novo-elements/elements/time-picker';
import { NovoTipWellModule } from 'novo-elements/elements/tip-well';
import { NovoToastModule } from 'novo-elements/elements/toast';
import { NovoToolbarModule } from 'novo-elements/elements/toolbar';
import { NovoTooltipModule } from 'novo-elements/elements/tooltip';
import { UnlessModule } from 'novo-elements/elements/unless';
import { NovoValueModule } from 'novo-elements/elements/value';
import { NovoPipesModule } from 'novo-elements/pipes';
import {
  BrowserGlobalRef,
  ComponentUtils,
  DateFormatService,
  GlobalRef,
  LocalStorageService,
  NovoLabelService,
  OptionsService,
} from 'novo-elements/services';

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
