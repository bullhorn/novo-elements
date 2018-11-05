export type FormField = {
  dataSpecialization: string;
  inputType: string;
  options: string;
  multiValue: boolean;
  dataType: string;
  type: string;
  associatedEntity?: { entity: string };
  optionsUrl?: string;
  optionsType?: string;
};
