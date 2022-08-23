/** Interface for a text control that is used to drive interaction with a novo-chip-list. */
export interface NovoChipTextControl {
  /** Unique identifier for the text control. */
  id: string;

  /** The text control's placeholder text. */
  placeholder: string;

  /** Whether the text control has browser focus. */
  focused: boolean;

  /** Whether the text control is empty. */
  empty: boolean;

  /** Focuses the text control. */
  focus(options?: FocusOptions): void;

  clearValue(): void;
}
