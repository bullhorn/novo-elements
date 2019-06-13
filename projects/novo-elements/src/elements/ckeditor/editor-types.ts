import { VFile } from 'vfile';

// import 'CKEDITOR';

export type Editor = any; // CKEDITOR.editor;
export type CKEventInfo = any; // CKEDITOR.eventInfo;

export type InclusionSuggestionArgs = {
  offset: number;
  suggestion: Suggestion;
};

export type Suggestion = {
  start: number;
  stop: number;
  id: string;
  problematicTerm: string;
  suggestedReplacements: string[];
  explanation: string;
};
