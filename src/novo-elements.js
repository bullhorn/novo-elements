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
import { NOVO_DATE_PICKER_ELEMENTS } from './elements/datepicker';
import { NOVO_TIME_PICKER_ELEMENTS } from './elements/timepicker';
import { NOVO_DROPDOWN_ELEMENTS } from './elements/dropdown';
import { NOVO_HEADER_ELEMENTS } from './elements/header';
import { NOVO_LIST_ELEMENTS } from './elements/list';
import { NOVO_TABLE_ELEMENTS, NOVO_TABLE_EXTRA_ELEMENTS } from './elements/table';

// Elements
export * from './elements/button';
export * from './elements/tabs';
export * from './elements/toast';
export * from './elements/modal';
export * from './elements/switch';
export * from './elements/card';
export * from './elements/loading';
export * from './elements/select';
export * from './elements/dropdown';
export * from './elements/tooltip';
export * from './elements/drawer';
export * from './elements/switch';
export * from './elements/datepicker';
export * from './elements/timepicker';
export * from './elements/header';
export * from './elements/list';
export * from './elements/table';

// Pipes
export * from './pipes/plural/Plural';

// Utils
export * from './utils/outside-click/OutsideClick';
export * from './utils/key-codes/KeyCodes';
export * from './utils/deferred/Deferred';
export * from './utils/Helpers';

export const NOVO_ELEMENTS = [
    NOVO_BUTTON_ELEMENTS,
    NOVO_TAB_ELEMENTS,
    NOVO_TOAST_ELEMENTS,
    NOVO_MODAL_ELEMENTS,
    NOVO_SWITCH_ELEMENTS,
    NOVO_CARD_ELEMENTS,
    NOVO_CARD_EXTRA_ELEMENTS,
    NOVO_LOADING_ELEMENTS,
    NOVO_SELECT_ELEMENTS,
    NOVO_DROPDOWN_ELEMENTS,
    NOVO_TOOLTIP_ELEMENTS,
    NOVO_DRAWER_ELEMENTS,
    NOVO_HEADER_ELEMENTS,
    NOVO_LIST_ELEMENTS,
    NOVO_TABLE_ELEMENTS,
    NOVO_TABLE_EXTRA_ELEMENTS,
    NOVO_DRAWER_ELEMENTS,
    NOVO_DATE_PICKER_ELEMENTS,
    NOVO_TIME_PICKER_ELEMENTS
];

export const NOVO_PROVIDERS = [
    TOAST_PROVIDERS,
    MODAL_PROVIDERS
];
