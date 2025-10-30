import { NovoDataTable } from './data-table.component';
export type ListInteractionEvent = 'init' | 'change';
export type ListInteraction = {
    script: (novoDataTable: NovoDataTable<any>, columnId: string) => void;
    action: string;
    event: ListInteractionEvent[];
};
export type ListInteractionDictionary = {
    [key: string]: ListInteraction[];
};
