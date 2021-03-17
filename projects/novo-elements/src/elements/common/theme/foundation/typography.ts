export const typography: TypographyStyles = {
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  lineHeight: {
    normal: 'normal',
    none: '1',
    shorter: '1.25',
    short: '1.375',
    base: '1.5',
    tall: '1.625',
    taller: '2',
  },

  fontWeight: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  font: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },

  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.5rem',
    '2xl': '3rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
};

export interface TypographyStyles<T = string | number> {
  letterSpacing: {
    tighter: T;
    tight: T;
    normal: T;
    wide: T;
    wider: T;
    widest: T;
  };

  lineHeight: {
    normal: T;
    none: T;
    shorter: T;
    short: T;
    base: T;
    tall: T;
    taller: T;
  };

  fontWeight: {
    hairline: T;
    thin: T;
    light: T;
    normal: T;
    medium: T;
    semibold: T;
    bold: T;
    extrabold: T;
    black: T;
  };

  font: {
    heading: T;
    body: T;
    mono: T;
  };

  fontSize: {
    xs: T;
    sm: T;
    md: T;
    lg: T;
    xl: T;
    '2xl': T;
    '3xl': T;
    '4xl': T;
  };
}
