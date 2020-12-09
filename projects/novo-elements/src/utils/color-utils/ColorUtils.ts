type ColorType = HSL | HSLA | HSV | HSVA | RGB | RGBA | string;
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSLA extends HSL {
  a: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface HSVA extends HSV {
  a: number;
}

export class Color {
  source: string;
  isValid: boolean = true;

  constructor(value: HSLA | HSVA | RGBA | string) {
    if (Color.isHSL(value)) {
      // let { h, s, l, a = 1 } = value as HSLA;
      this.source = rgbToHex(hslToRgb(value as HSL));
    } else if (Color.isHSV(value)) {
      this.source = rgbToHex(hsvToRgb(value as HSV));
    } else if (Color.isRGB(value)) {
      this.source = rgbToHex(value as RGB);
    } else if (Color.isValidHex(value.toString())) {
      this.source = value as string;
    } else {
      this.isValid = false;
      console.error(`Invalid color: ${value}`);
    }
  }

  get hex(): string {
    return this.source;
  }
  get rgb(): RGB {
    return hexToRgb(this.source);
  }
  get hsl(): HSL {
    return rgbToHsl(hexToRgb(this.source));
  }
  get hsv(): HSV {
    return rgbToHsv(hexToRgb(this.source));
  }

  static isValidHex(h: string) {
    const clean = h.replace('#', '').toLowerCase();
    const a = parseInt(clean, 16);
    return a.toString(16).padStart(6, '0') === clean;
  }

  static isRGB(obj: any) {
    const keys = ['r', 'g', 'b'];
    return keys.every((item) => obj.hasOwnProperty(item));
  }
  static isRGBA(obj: any) {
    const keys = ['r', 'g', 'b', 'a'];
    return keys.every((item) => obj.hasOwnProperty(item));
  }
  static isHSL(obj: any) {
    const keys = ['h', 's', 'l'];
    return keys.every((item) => obj.hasOwnProperty(item));
  }
  static isHSLA(obj: any) {
    const keys = ['h', 's', 'l', 'a'];
    return keys.every((item) => obj.hasOwnProperty(item));
  }
  static isHSV(obj: any) {
    const keys = ['h', 's', 'v'];
    return keys.every((item) => obj.hasOwnProperty(item));
  }
  static isHSVA(obj: any) {
    const keys = ['h', 's', 'v', 'a'];
    return keys.every((item) => obj.hasOwnProperty(item));
  }
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex({ r, g, b }: RGB) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl({ r, g, b }: RGB): HSL {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, l };
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb({ h, s, l }: HSL): RGB {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p1, q1, t1) {
      if (t1 < 0) {
        t1 += 1;
      }
      if (t1 > 1) {
        t1 -= 1;
      }
      if (t1 < 1 / 6) {
        return p1 + (q1 - p1) * 6 * t1;
      }
      if (t1 < 1 / 2) {
        return q1;
      }
      if (t1 < 2 / 3) {
        return p1 + (q1 - p1) * (2 / 3 - t1) * 6;
      }
      return p1;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgbToHsv({ r, g, b }: RGB): HSV {
  (r = r / 255), (g = g / 255), (b = b / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, v };
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb({ h, s, v }: HSV): RGB {
  let r, g, b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
}
