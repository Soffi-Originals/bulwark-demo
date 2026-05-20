import type { Config } from 'tailwindcss'

/**
 * All tokens are CSS variables defined in src/index.css.
 * Editing a CSS var live-updates the whole UI — designed for runtime theming.
 */
const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'hsl(var(--color-canvas) / <alpha-value>)',
        surface: {
          DEFAULT: 'hsl(var(--color-surface) / <alpha-value>)',
          raised: 'hsl(var(--color-surface-raised) / <alpha-value>)',
          sunken: 'hsl(var(--color-surface-sunken) / <alpha-value>)',
        },
        fg: {
          DEFAULT: 'hsl(var(--color-fg) / <alpha-value>)',
          muted: 'hsl(var(--color-fg-muted) / <alpha-value>)',
          subtle: 'hsl(var(--color-fg-subtle) / <alpha-value>)',
          inverted: 'hsl(var(--color-fg-inverted) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'hsl(var(--color-border) / <alpha-value>)',
          subtle: 'hsl(var(--color-border-subtle) / <alpha-value>)',
          strong: 'hsl(var(--color-border-strong) / <alpha-value>)',
        },
        brand: {
          DEFAULT: 'hsl(var(--color-brand) / <alpha-value>)',
          hover: 'hsl(var(--color-brand-hover) / <alpha-value>)',
          fg: 'hsl(var(--color-brand-fg) / <alpha-value>)',
        },
        critical: {
          DEFAULT: 'hsl(var(--color-critical) / <alpha-value>)',
          fg: 'hsl(var(--color-critical-fg) / <alpha-value>)',
          subtle: 'hsl(var(--color-critical-subtle) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--color-warning) / <alpha-value>)',
          fg: 'hsl(var(--color-warning-fg) / <alpha-value>)',
          subtle: 'hsl(var(--color-warning-subtle) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--color-success) / <alpha-value>)',
          fg: 'hsl(var(--color-success-fg) / <alpha-value>)',
          subtle: 'hsl(var(--color-success-subtle) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--color-info) / <alpha-value>)',
          fg: 'hsl(var(--color-info-fg) / <alpha-value>)',
          subtle: 'hsl(var(--color-info-subtle) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          fg: 'hsl(var(--color-accent-fg) / <alpha-value>)',
          subtle: 'hsl(var(--color-accent-subtle) / <alpha-value>)',
        },
      },
      borderColor: {
        DEFAULT: 'hsl(var(--color-border))',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        xs: ['var(--text-xs)', { lineHeight: 'var(--leading-xs)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--leading-sm)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--leading-base)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--leading-lg)' }],
        xl: ['var(--text-xl)', { lineHeight: 'var(--leading-xl)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-2xl)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-3xl)' }],
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        focus: '0 0 0 3px hsl(var(--color-brand) / 0.25)',
      },
      spacing: {
        '4.5': '1.125rem',
      },
    },
  },
}

export default config
