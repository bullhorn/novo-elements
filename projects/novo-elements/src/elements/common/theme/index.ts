import { css, CSSResult, unsafeCSS } from '@bullhorn/highland-core';
import { theme, Theme } from './foundation';
import { ColorThemeArgs, createColorTheme } from './foundation/color';
import { camelToKebab, flatten } from './utils';

export { theme };

function traverse(obj: any, parent?: string) {
  if (obj !== null && typeof obj == 'object') {
    Object.entries(obj).forEach(([key, value]) => {
      // key is either an array index or object key
      obj[key] = traverse(value, parent ? `${parent}.${key}` : key);
    });
    return obj;
  } else {
    return variable(parent!, obj);
  }
}

export const variables: Theme<CSSResult> = traverse(theme);

export function themeGet(desc: string) {
  const val = desc.split('.').reduce((a, b) => a && (a as any)[b], theme);
  return val;
}

export function get(obj: object, key: string | number | undefined, def?: unknown, p?: number, undef?: unknown): any {
  const path = key && typeof key === 'string' ? key.split('.') : [key];
  for (p = 0; p < path.length; p++) {
    obj = obj ? (obj as any)[path[p]!] : undef;
  }
  return obj === undef ? def : obj;
}

export function variable(path: string, value: any): CSSResult {
  if (!path || typeof path !== 'string') return unsafeCSS(`var(--unknown-var)`);
  const key = `--${camelToKebab(path.split('.').join('-'))}`;
  // let value = themeGet(path);
  return unsafeCSS(`var(${key}, ${value})`);
}

export function wrap(cssVar: string, path: CSSResult | string) {
  return unsafeCSS(`var(${cssVar}, ${path})`);
}

export interface ThemeStyles {
  backgroundColor?: string | CSSResult;
  textColor?: string | CSSResult;
  textColorRgb?: string | CSSResult;
  paddingX?: string | CSSResult;
  paddingY?: string | CSSResult;
  marginX?: string | CSSResult;
  marginY?: string | CSSResult;
  border?: string | CSSResult;
  borderTop?: string | CSSResult;
  borderBottom?: string | CSSResult;
  borderLeft?: string | CSSResult;
  borderRight?: string | CSSResult;
  borderRadius?: string | CSSResult;
  borderColor?: string | CSSResult;
  borderStyle?: string | CSSResult;
  height?: string | CSSResult;
  width?: string | CSSResult;
  size?: string | CSSResult;
  strokeWidth?: string | CSSResult;
  fontSize?: string | CSSResult;
  gap?: string | CSSResult;
}

/*
--x-color: ${inputTextColor};
--x-fill: ${inputFillColor};
--x-label-color: ${inputLabelColor};
--x-helper-text-color: ${inputLabelColor};
--x-error-text-color: ${inputTextColorActive};
--x-border-color: ${inputBorderColor};
--x-border-style: ${inputBorderStyle};
--x-border-top: ${inputBorderTopWidth} var(--x-border-style) var(--x-border-color);
--x-border-bottom: ${inputBorderBottomWidth} var(--x-border-style) var(--x-border-color);
--x-border-left: ${inputBorderLeftWidth} var(--x-border-style) var(--x-border-color);
--x-border-right: ${inputBorderRightWidth} var(--x-border-style) var(--x-border-color);
--x-border-radius: ${inputBorderRadius}; 
*/

export function createVars(namespace: string | null, styles: ThemeStyles) {
  // backgroundColor?: string;
  // textColor?: string;
  // paddingX?: string;
  // paddingY?: string;
  // border?: string;
  // borderTop?: string;
  // borderBottom?: string;
  // borderLeft?: string;
  // borderRight?: string;
  // borderRadius?: string;
  const result: ThemeStyles = Object.entries(styles).reduce((obj, [key, value]) => {
    const varName = namespace ? `--${namespace}-${camelToKebab(key)}` : `--${camelToKebab(key)}`;
    if (key === 'border') {
      obj['borderTop'] = unsafeCSS(`var(${varName}-top, ${value} var(--border-style) var(--border-color))`);
      obj['borderLeft'] = unsafeCSS(`var(${varName}-left, ${value} var(--border-style) var(--border-color))`);
      obj['borderRight'] = unsafeCSS(`var(${varName}-right, ${value} var(--border-style) var(--border-color))`);
      obj['borderBottom'] = unsafeCSS(`var(${varName}-bottom, ${value} var(--border-style) var(--border-color))`);
    }
    obj[key] = unsafeCSS(`var(${varName}, ${value})`);
    return obj;
  }, {} as any);

  return result;
}
export function toCssVarString(styles: ThemeStyles) {
  return Object.entries(styles).map(([key, value]) => {
    return unsafeCSS(`--${camelToKebab(key)}: ${value};`);
  });
}

export function createNamespace(namespace: string, styles: ThemeStyles) {
  const variables = createVars(namespace, styles);
  const strings = toCssVarString(variables).join('');
  return css`
    :host {
      ${unsafeCSS(strings)}
    }
  `;
}

export function createVariant(namespace: string, selector: string, styles: ThemeStyles) {
  const variables = createVars(namespace, styles);
  const strings = toCssVarString(variables).join('');
  return css`
    :host(${unsafeCSS(selector)}) {
      ${unsafeCSS(strings)}
    }
  `;
}

export interface CreateThemeArgs {
  color: ColorThemeArgs;
}

function flatten(obj: any, parent?: string): string[] {
  if (obj !== null && typeof obj == 'object') {
    return Object.entries(obj).map(([key, value]) => {
      // key is either an array index or object key
      // obj[key] = traverse(value, parent ? `${parent}.${key}` : key);
      return flatten(value, parent ? `${parent}-${key}` : key).flat();
    });
  } else {
    return [`--${parent}: ${obj};`];
  }
}

export function makeTheme(args: CreateThemeArgs) {
  const theme: any = args;
  if (theme.color) {
    theme.color = createColorTheme(theme.color);
  }
  const results: string[] = flatten(theme).flat();

  const sheet = css`
    :root {
      ${unsafeCSS(results.join('\n'))}
    }
  `;

  return sheet;
}
export function useTheme(theme: CSSResult, element = globalThis.document) {
  if (element && document.adoptedStyleSheets) {
    element.adoptedStyleSheets = [...(element.adoptedStyleSheets ?? []), theme.styleSheet];
  }
  return theme;
}

export function createTheme(args: CreateThemeArgs) {
  return useTheme(makeTheme(args));
}

export const ThemeDefaults = css`
  :host {
    --border-radius: 0.5rem;
    --border-radius-input: 0.313rem;
    --button-padding: 0.75rem 1.375rem;
    --input-padding: 0.625rem 0.5rem;
    --textarea-padding: 0.438rem 0.813rem;
    --select-padding: 0.438rem 0.5rem;
    --dialog-width: 18.75rem;

    --color-surface: #ffffff;
    --color-black: #252a33;
    --color-background: #f5f5f8;
    --color-primary: #2c6fb7;
    --color-primary-light: #679dea;
    --color-primary-dark: #004587;
    --color-secondary: #69c9b9;
    --color-secondary-light: #9cfceb;
    --color-secondary-dark: #349889;
    --color-gray-lightest: #e1e3e4;
    --color-gray-light: #c4c7ca;
    --color-gray-dark: #9fa4a8;
    --color-gray-darkest: #6c737a;
    --color-warning: #fcb61a;
    --color-warning-light: #fdd375;
    --color-warning-lightest: #fef0d1;
    --color-error: #bc1c16;
    --color-error-light: #ea3b35;
    --color-error-lightest: #fef0d1;
    --color-success: #00870a;
    --color-success-light: #15b821;
    --color-success-lightest: #fef0d1;
    --color-box-shadow: rgba(159, 164, 168, 0.6);

    --font-letter-spacing: 0.018rem;
    --font-size-paragraph-medium: 0.938rem;
    --font-size-subtitle: 0.938rem;
    --font-size-title: 1.4rem;
    --font-size-input: 0.938rem;
    --font-size-label: 0.875rem;
    --font-family: sans-serif;
    --font-size-table-header: 1rem;
    --font-size-table-content: 0.875rem;

    --highland-dot-size: 0.5em;
  }
`;

// export const ThemeLight = css`
//   /* Base (background) */
//   --lumo-base-color: #fff;

//   /* Tint */
//   --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
//   --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
//   --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
//   --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
//   --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
//   --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
//   --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
//   --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
//   --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
//   --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
//   --lumo-tint: #fff;

//   /* Shade */
//   --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
//   --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
//   --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
//   --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
//   --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
//   --lumo-shade-50pct: hsla(214, 45%, 20%, 0.5);
//   --lumo-shade-60pct: hsla(214, 43%, 19%, 0.61);
//   --lumo-shade-70pct: hsla(214, 42%, 18%, 0.72);
//   --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
//   --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
//   --lumo-shade: hsl(214, 35%, 15%);

//   /* Contrast */
//   --lumo-contrast-5pct: var(--lumo-shade-5pct);
//   --lumo-contrast-10pct: var(--lumo-shade-10pct);
//   --lumo-contrast-20pct: var(--lumo-shade-20pct);
//   --lumo-contrast-30pct: var(--lumo-shade-30pct);
//   --lumo-contrast-40pct: var(--lumo-shade-40pct);
//   --lumo-contrast-50pct: var(--lumo-shade-50pct);
//   --lumo-contrast-60pct: var(--lumo-shade-60pct);
//   --lumo-contrast-70pct: var(--lumo-shade-70pct);
//   --lumo-contrast-80pct: var(--lumo-shade-80pct);
//   --lumo-contrast-90pct: var(--lumo-shade-90pct);
//   --lumo-contrast: var(--lumo-shade);

//   /* Text */
//   --lumo-header-text-color: var(--lumo-contrast);
//   --lumo-body-text-color: var(--lumo-contrast-90pct);
//   --lumo-secondary-text-color: var(--lumo-contrast-70pct);
//   --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
//   --lumo-disabled-text-color: var(--lumo-contrast-30pct);

//   /* Primary */
//   --lumo-primary-color: hsl(214, 90%, 52%);
//   --lumo-primary-color-50pct: hsla(214, 90%, 52%, 0.5);
//   --lumo-primary-color-10pct: hsla(214, 90%, 52%, 0.1);
//   --lumo-primary-text-color: var(--lumo-primary-color);
//   --lumo-primary-contrast-color: #fff;

//   /* Error */
//   --lumo-error-color: hsl(3, 100%, 61%);
//   --lumo-error-color-50pct: hsla(3, 100%, 60%, 0.5);
//   --lumo-error-color-10pct: hsla(3, 100%, 60%, 0.1);
//   --lumo-error-text-color: hsl(3, 92%, 53%);
//   --lumo-error-contrast-color: #fff;

//   /* Success */
//   --lumo-success-color: hsl(145, 80%, 42%); /* hsl(144,82%,37%); */
//   --lumo-success-color-50pct: hsla(145, 76%, 44%, 0.55);
//   --lumo-success-color-10pct: hsla(145, 76%, 44%, 0.12);
//   --lumo-success-text-color: hsl(145, 100%, 32%);
//   --lumo-success-contrast-color: #fff;

//   [theme~='dark'] {
//     /* Base (background) */
//     --lumo-base-color: hsl(214, 35%, 21%);

//     /* Tint */
//     --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
//     --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
//     --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
//     --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
//     --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
//     --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
//     --lumo-tint-60pct: hsla(214, 82%, 90%, 0.6);
//     --lumo-tint-70pct: hsla(214, 87%, 92%, 0.7);
//     --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
//     --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
//     --lumo-tint: hsl(214, 100%, 98%);

//     /* Shade */
//     --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
//     --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
//     --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
//     --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
//     --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
//     --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
//     --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
//     --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
//     --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
//     --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
//     --lumo-shade: hsl(214, 33%, 13%);

//     /* Contrast */
//     --lumo-contrast-5pct: var(--lumo-tint-5pct);
//     --lumo-contrast-10pct: var(--lumo-tint-10pct);
//     --lumo-contrast-20pct: var(--lumo-tint-20pct);
//     --lumo-contrast-30pct: var(--lumo-tint-30pct);
//     --lumo-contrast-40pct: var(--lumo-tint-40pct);
//     --lumo-contrast-50pct: var(--lumo-tint-50pct);
//     --lumo-contrast-60pct: var(--lumo-tint-60pct);
//     --lumo-contrast-70pct: var(--lumo-tint-70pct);
//     --lumo-contrast-80pct: var(--lumo-tint-80pct);
//     --lumo-contrast-90pct: var(--lumo-tint-90pct);
//     --lumo-contrast: var(--lumo-tint);

//     /* Text */
//     --lumo-header-text-color: var(--lumo-contrast);
//     --lumo-body-text-color: var(--lumo-contrast-90pct);
//     --lumo-secondary-text-color: var(--lumo-contrast-70pct);
//     --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
//     --lumo-disabled-text-color: var(--lumo-contrast-30pct);

//     /* Primary */
//     --lumo-primary-color: hsl(214, 86%, 55%);
//     --lumo-primary-color-50pct: hsla(214, 86%, 55%, 0.5);
//     --lumo-primary-color-10pct: hsla(214, 90%, 63%, 0.1);
//     --lumo-primary-text-color: hsl(214, 100%, 70%);
//     --lumo-primary-contrast-color: #fff;

//     /* Error */
//     --lumo-error-color: hsl(3, 90%, 63%);
//     --lumo-error-color-50pct: hsla(3, 90%, 63%, 0.5);
//     --lumo-error-color-10pct: hsla(3, 90%, 63%, 0.1);
//     --lumo-error-text-color: hsl(3, 100%, 67%);

//     /* Success */
//     --lumo-success-color: hsl(145, 65%, 42%);
//     --lumo-success-color-50pct: hsla(145, 65%, 42%, 0.5);
//     --lumo-success-color-10pct: hsla(145, 65%, 42%, 0.1);
//     --lumo-success-text-color: hsl(145, 85%, 47%);
//   }

//   html {
//     color: var(--lumo-body-text-color);
//     background-color: var(--lumo-base-color);
//   }

//   [theme~='dark'] {
//     color: var(--lumo-body-text-color);
//     background-color: var(--lumo-base-color);
//   }

//   h1,
//   h2,
//   h3,
//   h4,
//   h5,
//   h6 {
//     color: var(--lumo-header-text-color);
//   }

//   a {
//     color: var(--lumo-primary-text-color);
//   }

//   blockquote {
//     color: var(--lumo-secondary-text-color);
//   }

//   code,
//   pre {
//     background-color: var(--lumo-contrast-10pct);
//     border-radius: var(--lumo-border-radius-m);
//   }
// `;
