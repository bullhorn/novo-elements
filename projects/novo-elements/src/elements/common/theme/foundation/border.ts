export const border: BorderStyles = {
  width: {
    none: 0,
    thin: '1px',
    thick: '2px',
  },
  style: {
    solid: 'solid',
    dashed: 'dashed',
  },
  radius: {
    none: '0',
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
};

export interface BorderStyles<T = string | number> {
  width: {
    none: T;
    thin: T;
    thick: T;
  };
  style: {
    solid: T;
    dashed: T;
  };
  radius: {
    none: T;
    xs: T;
    sm: T;
    md: T;
    lg: T;
    xl: T;
    full: T;
  };
}
