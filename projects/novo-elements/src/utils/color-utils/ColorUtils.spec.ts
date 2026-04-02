import { Color, RGB, RGBA, HSL, HSLA, HSV, HSVA } from './ColorUtils';

describe('Element: ColorUtils', () => {
  describe('Color.isRGB()', () => {
    it('should return true for valid RGB object', () => {
      const rgb: RGB = { r: 255, g: 100, b: 50 };
      expect(Color.isRGB(rgb)).toBe(true);
    });

    it('should return false for object missing properties', () => {
      expect(Color.isRGB({ r: 255, g: 100 })).toBe(false);
    });
  });

  describe('Color.isRGBA()', () => {
    it('should return true for valid RGBA object', () => {
      const rgba: RGBA = { r: 255, g: 100, b: 50, a: 0.5 };
      expect(Color.isRGBA(rgba)).toBe(true);
    });

    it('should return false for RGBA missing alpha property', () => {
      expect(Color.isRGBA({ r: 255, g: 100, b: 50 })).toBe(false);
    });

    it('should return false for object missing RGB properties', () => {
      expect(Color.isRGBA({ r: 255, g: 100, a: 0.5 })).toBe(false);
    });
  });

  describe('Color.isHSL()', () => {
    it('should return true for valid HSL object', () => {
      const hsl: HSL = { h: 0.5, s: 0.8, l: 0.6 };
      expect(Color.isHSL(hsl)).toBe(true);
    });

    it('should return false for object missing properties', () => {
      expect(Color.isHSL({ h: 0.5, s: 0.8 })).toBe(false);
    });
  });

  describe('Color.isHSLA()', () => {
    it('should return true for valid HSLA object', () => {
      const hsla: HSLA = { h: 0.5, s: 0.8, l: 0.6, a: 0.9 };
      expect(Color.isHSLA(hsla)).toBe(true);
    });

    it('should return false for HSLA missing alpha property', () => {
      expect(Color.isHSLA({ h: 0.5, s: 0.8, l: 0.6 })).toBe(false);
    });

    it('should return false for object missing HSL properties', () => {
      expect(Color.isHSLA({ h: 0.5, s: 0.8, a: 0.9 })).toBe(false);
    });
  });

  describe('Color.isHSV()', () => {
    it('should return true for valid HSV object', () => {
      const hsv: HSV = { h: 0.5, s: 0.8, v: 0.9 };
      expect(Color.isHSV(hsv)).toBe(true);
    });

    it('should return false for object missing properties', () => {
      expect(Color.isHSV({ h: 0.5, s: 0.8 })).toBe(false);
    });
  });

  describe('Color.isHSVA()', () => {
    it('should return true for valid HSVA object', () => {
      const hsva: HSVA = { h: 0.5, s: 0.8, v: 0.9, a: 0.7 };
      expect(Color.isHSVA(hsva)).toBe(true);
    });

    it('should return false for HSVA missing alpha property', () => {
      expect(Color.isHSVA({ h: 0.5, s: 0.8, v: 0.9 })).toBe(false);
    });

    it('should return false for object missing HSV properties', () => {
      expect(Color.isHSVA({ h: 0.5, s: 0.8, a: 0.7 })).toBe(false);
    });
  });

  describe('Color.isValidHex()', () => {
    it('should return true for valid hex color with hash', () => {
      expect(Color.isValidHex('#ff6432')).toBe(true);
    });

    it('should return true for valid hex color without hash', () => {
      expect(Color.isValidHex('ff6432')).toBe(true);
    });

    it('should return true for valid hex with uppercase', () => {
      expect(Color.isValidHex('#FF6432')).toBe(true);
    });

    it('should return false for invalid hex color', () => {
      expect(Color.isValidHex('#gggggg')).toBe(false);
    });

    it('should return false for hex color with wrong length', () => {
      expect(Color.isValidHex('#fff')).toBe(false);
    });

    it('should return false for empty hex', () => {
      expect(Color.isValidHex('')).toBe(false);
    });
  });

  describe('Color Constructor', () => {
    it('should initialize from valid hex string', () => {
      const color = new Color('#ff6432');
      expect(color.isValid).toBe(true);
      expect(color.hex).toBe('#ff6432');
    });

    it('should initialize from valid hex string without hash', () => {
      const color = new Color('ff6432');
      expect(color.isValid).toBe(true);
      expect(color.hex).toBe('ff6432');
    });

    it('should initialize from RGBA object', () => {
      const rgba: RGBA = { r: 255, g: 100, b: 50, a: 1 };
      const color = new Color(rgba);
      expect(color.isValid).toBe(true);
      expect(color.hex).toBe('#ff6432');
    });

    it('should initialize from HSLA object', () => {
      const hsla: HSLA = { h: 0.0278, s: 1, l: 0.6, a: 1 };
      const color = new Color(hsla);
      expect(color.isValid).toBe(true);
      expect(color.hex).toBeTruthy();
    });

    it('should initialize from HSVA object', () => {
      const hsva: HSVA = { h: 0.0417, s: 0.8039, v: 1, a: 1 };
      const color = new Color(hsva);
      expect(color.isValid).toBe(true);
      expect(color.hex).toBeTruthy();
    });

    it('should set isValid to false for invalid color', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const color = new Color('invalid');
      expect(color.isValid).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid color: invalid');
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Color Getters', () => {
    let color: Color;

    beforeEach(() => {
      color = new Color('#ff6432');
    });

    it('should return hex value from hex getter', () => {
      expect(color.hex).toBe('#ff6432');
    });

    it('should return RGB object from rgb getter', () => {
      const rgb = color.rgb;
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(100);
      expect(rgb.b).toBe(50);
    });

    it('should return HSL object from hsl getter', () => {
      const hsl = color.hsl;
      expect(hsl.h).toBeDefined();
      expect(hsl.s).toBeDefined();
      expect(hsl.l).toBeDefined();
      expect(typeof hsl.h).toBe('number');
      expect(typeof hsl.s).toBe('number');
      expect(typeof hsl.l).toBe('number');
    });

    it('should return HSV object from hsv getter', () => {
      const hsv = color.hsv;
      expect(hsv.h).toBeDefined();
      expect(hsv.s).toBeDefined();
      expect(hsv.v).toBeDefined();
      expect(typeof hsv.h).toBe('number');
      expect(typeof hsv.s).toBe('number');
      expect(typeof hsv.v).toBe('number');
    });
  });

  describe('Color Conversions', () => {
    it('should convert RGBA to HSL and back to RGB', () => {
      const originalRgba: RGBA = { r: 255, g: 100, b: 50, a: 1 };
      const color = new Color(originalRgba);
      const convertedRgb = color.rgb;

      expect(convertedRgb.r).toBeCloseTo(originalRgba.r, 0);
      expect(convertedRgb.g).toBeCloseTo(originalRgba.g, 0);
      expect(convertedRgb.b).toBeCloseTo(originalRgba.b, 0);
    });

    it('should convert hex to RGB correctly', () => {
      const color = new Color('#ffffff');
      const rgb = color.rgb;
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(255);
      expect(rgb.b).toBe(255);
    });

    it('should convert hex to RGB for black', () => {
      const color = new Color('#000000');
      const rgb = color.rgb;
      expect(rgb.r).toBe(0);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(0);
    });

    it('should convert RGBA to hex for red', () => {
      const rgba: RGBA = { r: 255, g: 0, b: 0, a: 1 };
      const color = new Color(rgba);
      expect(color.hex).toBe('#ff0000');
    });

    it('should convert RGBA to hex for green', () => {
      const rgba: RGBA = { r: 0, g: 255, b: 0, a: 1 };
      const color = new Color(rgba);
      expect(color.hex).toBe('#00ff00');
    });

    it('should convert RGBA to hex for blue', () => {
      const rgba: RGBA = { r: 0, g: 0, b: 255, a: 1 };
      const color = new Color(rgba);
      expect(color.hex).toBe('#0000ff');
    });
  });
});