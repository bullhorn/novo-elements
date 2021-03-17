export const spacing: Spacing = {
  none: '0',
  px: '1px',
  xs: '0.2rem',
  sm: '0.4rem',
  md: '0.8rem',
  lg: '1.6rem',
  xl: '3.2rem',
};

export interface Spacing<T = string> {
  none: T;
  px: T;
  xs: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}
