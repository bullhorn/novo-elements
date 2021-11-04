export interface Schema {
  /** Name of the project. */
  project: string;

  /** Whether Angular browser animations should be set up. */
  animations: boolean;

  /** Name of pre-built theme to install. */
  theme: 'indigo-pink' | 'deeppurple-amber' | 'pink-bluegrey' | 'purple-green' | 'custom';

  /** Whether to set up global typography styles. */
  typography: boolean;
}
