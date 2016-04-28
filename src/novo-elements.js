import { NOVO_BUTTON_ELEMENTS } from './elements/button';
import { NOVO_TAB_ELEMENTS } from './elements/tabs';
import { NOVO_TOAST_ELEMENTS } from './elements/toast';
import { NOVO_CARD_ELEMENTS, NOVO_CARD_EXTRA_ELEMENTS } from './elements/card';
import { NOVO_LOADING_ELEMENTS } from './elements/loading';

// Elements
export * from './elements/button';
export * from './elements/tabs';
export * from './elements/toast';
export * from './elements/card';
export * from './elements/loading';

// Pipes
export * from './pipes/plural/Plural';

// Utils
export * from './utils/outside-click/OutsideClick';
export * from './utils/key-codes/KeyCodes';
export * from './utils/deferred/Deferred';

export const NOVO_ELEMENTS = [
    NOVO_BUTTON_ELEMENTS,
    NOVO_TAB_ELEMENTS,
    NOVO_TOAST_ELEMENTS,
    NOVO_CARD_ELEMENTS,
    NOVO_CARD_EXTRA_ELEMENTS,
    NOVO_LOADING_ELEMENTS
];
