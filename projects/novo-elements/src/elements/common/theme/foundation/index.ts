// import { zIndices } from './z-index';
import { border, BorderStyles } from './border';
import { breakpoint, BreakpointStyles } from './breakpoint';
import { color, ColorStyles } from './color';
import { shadow, ShadowStyles } from './shadow';
import { spacing, Spacing } from './spacing';
import { typography, TypographyStyles } from './typography';

export const theme = {
  ...typography,
  breakpoint,
  color,
  shadow,
  spacing,
  border,
};

export type Theme<T = string> = {
  breakpoints: BreakpointStyles<T>;
  border: BorderStyles<T>;
  spacing: Spacing<T>;
  color: ColorStyles<T>;
  shadow: ShadowStyles<T>;
} & TypographyStyles<T>;
