import { EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFieldInteractionEvent } from './FormInterfaces';
export declare class NovoFormGroup extends UntypedFormGroup {
    fieldInteractionEvents: EventEmitter<IFieldInteractionEvent>;
    layout: string;
    edit: boolean;
    currentEntity: string;
    currentEntityId: string;
    associations: object;
    fieldsets: any[];
    _value: any;
    controls: {
        [key: string]: any;
    };
    novoControls: any[];
    enableAllControls(): void;
    disableAllControls(): void;
}
