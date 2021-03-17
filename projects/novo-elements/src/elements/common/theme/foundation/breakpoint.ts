export const breakpoint: BreakpointStyles = { default: '48em', sm: '30em', md: '48em', lg: '62em', xl: '80em' };

export interface BreakpointStyles<T = string> {
  default: T;
  sm: T;
  md: T;
  lg: T;
  xl: T;
}
