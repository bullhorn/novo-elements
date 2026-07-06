import { DEFAULT_THEME, normalizeThemeName } from './theme-options';

describe('Theme: normalizeThemeName', () => {
  it('defaults to bh2022-light', () => {
    expect(DEFAULT_THEME).toBe('bh2022-light');
  });

  it('passes through canonical names', () => {
    expect(normalizeThemeName('bh2022-light')).toBe('bh2022-light');
    expect(normalizeThemeName('bh2022-dark')).toBe('bh2022-dark');
    expect(normalizeThemeName('bh2026-light')).toBe('bh2026-light');
    expect(normalizeThemeName('bh2026-dark')).toBe('bh2026-dark');
  });

  it('maps legacy modern* names onto the bh2022 base (masses stay on the current look)', () => {
    // modern-light was the overloaded pre-project default -> bh2022-light (do not silently GA 2026)
    expect(normalizeThemeName('modern-light')).toBe('bh2022-light');
    expect(normalizeThemeName('modern-dark')).toBe('bh2022-dark');
    // 'modern' was the pre-rename key for the 2026 refresh
    expect(normalizeThemeName('modern')).toBe('bh2026-light');
  });

  it('maps other legacy aliases', () => {
    expect(normalizeThemeName('classic')).toBe('bh2022-light');
    expect(normalizeThemeName('light')).toBe('bh2022-light');
    expect(normalizeThemeName('dark')).toBe('bh2022-dark');
  });

  it('falls back to the default for undefined / unknown names', () => {
    expect(normalizeThemeName(undefined)).toBe('bh2022-light');
    expect(normalizeThemeName('')).toBe('bh2022-light');
    expect(normalizeThemeName('nonsense')).toBe('bh2022-light');
  });
});
