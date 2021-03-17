import { darken, lighten, meetsContrastGuidelines, parseToRgb, rgba } from 'polished';

const contrastColor = (color: string, light = '#fff', dark = '#000') => {
  if (meetsContrastGuidelines(color, light).AALarge) {
    return light;
  }
  return dark;
};

// Base Colors
const transparent = 'transparent';
const current = 'currentColor';
const black = '#000';
const white = '#fff';
const base = white;
const primary = '#0070E0';
const success = '#00BF88';
const danger = '#F06449';
const warning = '#f6b042';
const dark = '#40464D';
const medium = '#C7CED5';
const light = '#f4f5f8';

export interface ColorThemeArgs {
  base: string;
  primary: string;
  success: string;
  danger: string;
  dark: string;
  medium: string;
  light: string;
}

export interface ColorScale<T = string> {
  default: T;
  rgb: T;
  shade: T;
  tint: T;
  contrast: T;
  contrastRgb: T;
  50: T;
  10: T;
}

// Theme Colors
export const defaultThemeColors: ColorThemeArgs = {
  base,
  primary,
  success,
  danger,
  dark,
  medium,
  light,
};

export function createColor(color: string): ColorScale {
  return {
    default: color,
    rgb: Object.values(parseToRgb(color)).join(','),
    shade: darken(0.2, color),
    tint: lighten(0.2, color),
    contrast: contrastColor(color),
    contrastRgb: Object.values(parseToRgb(contrastColor(color))).join(','),
    50: rgba(color, 0.5),
    10: rgba(color, 0.1),
  };
}

export function createColorTheme(args: ColorThemeArgs) {
  const { base, primary, success, danger, dark, medium, light } = Object.assign(defaultThemeColors, args);
  // Typography Colors
  // Todo: use `base` to set these
  const baseText = '#3d464d';
  const headerText = '#333';
  const labelText = rgba(baseText, 0.87);
  const helperText = rgba(baseText, 0.6);
  const disabledText = rgba(baseText, 0.38);

  return {
    transparent,
    current,
    black,
    white,
    // Typography Colors
    text: {
      header: headerText,
      body: baseText,
      label: labelText,
      helper: helperText,
      disabled: disabledText,
    },
    base: createColor(base),
    // Theme Colors
    primary: createColor(primary),
    success: createColor(success),
    warning: createColor(warning),
    danger: createColor(danger),
    dark: createColor(dark),
    medium: createColor(medium),
    light: createColor(light),
  };
}

export const color: ColorStyles = createColorTheme(defaultThemeColors);

export interface ColorStyles<T = string> {
  transparent: T;
  current: T;
  black: T;
  white: T;
  // Typography Colors
  text: {
    header: T;
    body: T;
    label: T;
    helper: T;
    disabled: T;
  };
  base: ColorScale<T>;
  // Theme Colors
  primary: ColorScale<T>;
  success: ColorScale<T>;
  warning: ColorScale<T>;
  danger: ColorScale<T>;
  dark: ColorScale<T>;
  medium: ColorScale<T>;
  light: ColorScale<T>;
}
