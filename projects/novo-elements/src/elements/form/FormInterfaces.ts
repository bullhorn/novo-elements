export interface NovoFormGroup {
  layout?: any;
  controls: any[];
  fieldsets: any[];
  value: any;
  valid?: boolean;
  getRawValue?: any;
}

export interface NovoFieldset {
  title?: string;
  icon?: string;
  key?: string;
  controls: any[];
  isEmbedded?: boolean;
  isInlineEmbedded?: boolean;
  hidden?: boolean;
}

export interface IFieldInteractionEvent {
  controlKey: string;
  prop: string;
  value: any;
}

export interface FormField {
  dataSpecialization: string;
  inputType: string;
  options: string;
  multiValue: boolean;
  dataType: string;
  type: string;
  associatedEntity?: { entity: string };
  optionsUrl?: string;
  optionsType?: string;
}

export type ResultsTemplateType = 'entity-picker';
