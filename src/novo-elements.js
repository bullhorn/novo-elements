import { NOVO_BUTTON_ELEMENTS } from './elements/button';
import { NOVO_TAB_ELEMENTS } from './elements/tabs';
import { NOVO_CARD_ELEMENTS, NOVO_CARD_EXTRA_ELEMENTS } from './elements/card';
import { NOVO_LOADING_ELEMENTS } from './elements/loading';
import { NOVO_TOOLTIP_ELEMENTS } from './elements/tooltip';
import { NOVO_DRAWER_ELEMENTS } from './elements/drawer';
import { NOVO_SELECT_ELEMENTS } from './elements/select';

// Elements
export * from './elements/button';
export * from './elements/tabs';
export * from './elements/card';
export * from './elements/loading';
export * from './elements/select';
export * from './elements/tooltip';
export * from './elements/drawer';

// Pipes
export * from './pipes/plural/Plural';

// Utils
export * from './utils/outside-click/OutsideClick';
export * from './utils/key-codes/KeyCodes';
export * from './utils/deferred/Deferred';

export const NOVO_ELEMENTS = [
    NOVO_BUTTON_ELEMENTS,
    NOVO_TAB_ELEMENTS,
    NOVO_CARD_ELEMENTS,
    NOVO_CARD_EXTRA_ELEMENTS,
    NOVO_LOADING_ELEMENTS,
    NOVO_SELECT_ELEMENTS,
    NOVO_TOOLTIP_ELEMENTS,
    NOVO_DRAWER_ELEMENTS
];
