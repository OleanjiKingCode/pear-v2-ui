// Design tokens mapping from Figma
// This provides proper CSS-safe variable names and direct color values

export const colors = {
  // Brand colors
  brand: {
    primary: '#a2db5c', // lime-200
    secondary: '#202919',
    accent: '#14b8a6', // teal-500
  },

  // Text colors
  text: {
    primary: '#fafafa', // neutral-50
    secondary: '#d4d4d4', // neutral-300
    tertiary: '#a3a3a3', // neutral-400
    inverse: '#0a0a0a', // neutral-950
    disabled: '#525252', // neutral-600
    warning: '#f59e0b', // amber-500
    profit: '#4ade80', // green-400
    loss: '#f87171', // red-400
    long: '#bbf7d0', // green-200
    short: '#fecaca', // red-200
  },

  // Background colors
  background: {
    base: '#0a0a0a', // neutral-950
    raised: '#0f110f', // carbon-900
    float: '#111411', // carbon-925
    overlay: '#131513', // carbon-950
    elevated: '#151515', // carbon-975
    subtle: '#09090b', // zinc-950
  },

  // Border colors
  borders: {
    default: '#262626', // neutral-800
    subtle: '#26262680', // neutral-800 with 50% opacity
    strong: '#fafafa', // neutral-50
    high: '#a2db5c', // brand-primary
    warning: '#f59e0b', // amber-500
  },

  // State colors
  states: {
    success: '#22c55e', // green-500
    error: '#ef4444', // red-500
    warning: {
      default: '#f59e0b33', // amber-500 with opacity
      hover: '#f59e0b0d',
    },
    info: '#0891b2', // cyan-600
    long: {
      default: '#14532d66',
      hover: '#14532d33',
    },
    short: {
      default: '#7f1d1d66',
      hover: '#7f1d1d4d',
    },
  },

  // Button colors
  buttons: {
    primary: {
      active: '#a2db5c', // lime-200
      hover: '#8bbd4e', // lime-400
      disabled: '#57782f', // lime-800
    },
    secondary: {
      active: '#202919',
      hover: '#20291980',
      disabled: '#2029194d',
    },
    tertiary: {
      active: '#262626', // neutral-800
      hover: '#171717', // neutral-900
      disabled: '#171717',
    },
    auxiliary: {
      active: '#14b8a6', // teal-500
      hover: '#0d9488', // teal-600
      disabled: '#0f766e', // teal-700
    },
  },

  // Input colors
  input: {
    base: '#1a1d1a', // carbon-910
    dark: '#161816', // carbon-905
    light: '#1e211e', // carbon-915
  },

  // Icons
  icons: {
    active: '#fafaf9', // stone-50
    subtle: '#a8a29e', // stone-400
    cta: '#a2db5c', // brand-primary
    warn: '#f59e0b', // amber-500
    profit: '#4ade80', // green-400
    loss: '#f87171', // red-400
    aux: '#14b8a6', // teal-500
  },
} as const

// Spacing tokens from Figma
export const spacing = {
  '0': 0,
  px: 1,
  '2px': 2,
  '3px': 4,
  '4px': 6,
  '5px': 8,
  '6px': 10,
  '7px': 12,
  '8px': 14,
  '9px': 16,
  '10px': 20,
  '11px': 24,
  '12px': 32,
} as const

// Radius tokens from Figma
export const radius = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: 9999,
} as const

// Typography tokens from Figma
export const typography = {
  body: {
    lg: { fontSize: 18, lineHeight: 27 },
    md: { fontSize: 16, lineHeight: 24 },
    sm: { fontSize: 14, lineHeight: 21.7 },
    xs: { fontSize: 12, lineHeight: 19.2 },
    '2xs': { fontSize: 10, lineHeight: 16 },
    '3xs': { fontSize: 8, lineHeight: 12.8 },
  },
  heading: {
    h1: { fontSize: 48, lineHeight: 52.8 },
    h2: { fontSize: 36, lineHeight: 40.32 },
    h3: { fontSize: 32, lineHeight: 36.48 },
    h4: { fontSize: 30, lineHeight: 35.4 },
    h5: { fontSize: 24, lineHeight: 28.8 },
    h6: { fontSize: 20, lineHeight: 24 },
  },
  label: {
    lg: { fontSize: 18, lineHeight: 25.2 },
    md: { fontSize: 14, lineHeight: 19.6 },
    sm: { fontSize: 12, lineHeight: 16.8 },
    xs: { fontSize: 10, lineHeight: 14 },
  },
} as const

export type ColorTokens = typeof colors
export type SpacingTokens = typeof spacing
export type RadiusTokens = typeof radius
export type TypographyTokens = typeof typography
