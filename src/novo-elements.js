// Labels
import { NOVO_ELEMENTS_LABELS_PROVIDERS, NovoLabelService } from './services/novo-label-service';
export * from './services/novo-label-service';

import { NOVO_BUTTON_ELEMENTS } from './elements/button';
import { NOVO_TAB_ELEMENTS } from './elements/tabs';
import { NOVO_TOAST_ELEMENTS, TOAST_PROVIDERS } from './elements/toast';
import { NOVO_MODAL_ELEMENTS, MODAL_PROVIDERS } from './elements/modal';
import { NOVO_SWITCH_ELEMENTS } from './elements/switch';
import { NOVO_CARD_ELEMENTS, NOVO_CARD_EXTRA_ELEMENTS } from './elements/card';
import { NOVO_LOADING_ELEMENTS } from './elements/loading';
import { NOVO_TOOLTIP_ELEMENTS } from './elements/tooltip';
import { NOVO_DRAWER_ELEMENTS } from './elements/drawer';
import { NOVO_SELECT_ELEMENTS } from './elements/select';
import { NOVO_PICKER_ELEMENTS } from './elements/picker';
import { NOVO_QUICK_NOTE_ELEMENTS } from './elements/quicknote';
import { NOVO_CHIPS_ELEMENTS } from './elements/chips';
import { PICKER_EXTRAS } from './elements/picker/extras/PickerExtras';
import { QUICK_NOTE_EXTRAS } from './elements/quick-note/extras/QuickNoteExtras';
import { NOVO_DATE_PICKER_ELEMENTS } from './elements/datepicker';
import { NOVO_TIME_PICKER_ELEMENTS } from './elements/timepicker';
import { NOVO_DROPDOWN_ELEMENTS } from './elements/dropdown';
import { NOVO_HEADER_ELEMENTS } from './elements/header';
import { NOVO_LIST_ELEMENTS } from './elements/list';
import { NOVO_TABLE_ELEMENTS, NOVO_TABLE_EXTRA_ELEMENTS } from './elements/table';
import { NOVO_DRAGULA_ELEMENTS } from './elements/dragula';
import { NOVO_FORM_ELEMENTS, NOVO_FORM_CORE, NOVO_FORM_EXTRAS } from './elements/form';

// Elements
export * from './elements/button';
export * from './elements/tabs';
export * from './elements/toast';
export * from './elements/modal';
export * from './elements/switch';
export * from './elements/card';
export * from './elements/loading';
export * from './elements/select';
export * from './elements/picker';
export * from './elements/quicknote';
export * from './elements/picker/extras/PickerExtras';
export * from './elements/quick-note/extras/QuickNoteExtras';
export * from './elements/chips';
export * from './elements/dropdown';
export * from './elements/tooltip';
export * from './elements/drawer';
export * from './elements/switch';
export * from './elements/datepicker';
export * from './elements/timepicker';
export * from './elements/header';
export * from './elements/list';
export * from './elements/table';
export * from './elements/dragula';
export * from './elements/form';

// Pipes
export * from './pipes/plural/Plural';

// Utils
export * from './utils/outside-click/OutsideClick';
export * from './utils/key-codes/KeyCodes';
export * from './utils/deferred/Deferred';
export * from './utils/countries/Countries';
export * from './utils/Helpers';

export const NOVO_ELEMENTS = [
    ...NOVO_BUTTON_ELEMENTS,
    ...NOVO_TAB_ELEMENTS,
    ...NOVO_TOAST_ELEMENTS,
    ...NOVO_MODAL_ELEMENTS,
    ...NOVO_SWITCH_ELEMENTS,
    ...NOVO_CARD_ELEMENTS,
    ...NOVO_CARD_EXTRA_ELEMENTS,
    ...NOVO_LOADING_ELEMENTS,
    ...NOVO_SELECT_ELEMENTS,
    ...NOVO_PICKER_ELEMENTS,
    ...NOVO_CHIPS_ELEMENTS,
    ...NOVO_DROPDOWN_ELEMENTS,
    ...NOVO_TOOLTIP_ELEMENTS,
    ...NOVO_DRAWER_ELEMENTS,
    ...NOVO_HEADER_ELEMENTS,
    ...NOVO_LIST_ELEMENTS,
    ...NOVO_TABLE_ELEMENTS,
    ...NOVO_TABLE_EXTRA_ELEMENTS,
    ...NOVO_DRAWER_ELEMENTS,
    ...NOVO_QUICK_NOTE_ELEMENTS,
    ...NOVO_DATE_PICKER_ELEMENTS,
    ...NOVO_TIME_PICKER_ELEMENTS,
    ...NOVO_DRAGULA_ELEMENTS,
    ...PICKER_EXTRAS,
    ...QUICK_NOTE_EXTRAS,
    ...NOVO_FORM_ELEMENTS,
    ...NOVO_FORM_CORE,
    ...NOVO_FORM_EXTRAS
];

export const NOVO_SERVICES = [
    NovoLabelService
];

export const NOVO_PROVIDERS = [
    ...TOAST_PROVIDERS,
    ...MODAL_PROVIDERS,
    ...NOVO_ELEMENTS_LABELS_PROVIDERS
];
