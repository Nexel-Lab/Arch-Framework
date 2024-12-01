import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './global/**/*.{js,ts,jsx,tsx}',
    './packages/**/*.{js,ts,jsx,tsx}',
    // './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1536px',
      el: '2560px',
    },
    fontFamily: {
      inter: ['var(--font-inter)'],
      prompt: ['var(--font-prompt)'],
    },
    letterSpacing: {
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.25em',
      wider: '.5em',
      widest: '2.5em',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      fontSize: {
        '2xs': '.5rem',
        '1xs': '.65rem',
        '10xl': '10rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config

export default config
