import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'IBM Plex Mono', 'Space Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#ffffff',
          secondary: '#fafafa',
          tertiary: '#f4f4f5',
          dark: '#111111',
        },
        border: {
          light: '#e4e4e7',
          subtle: '#f4f4f5',
        },
        pastel: {
          green: '#22c55e',
          blue: '#3b82f6',
          purple: '#a855f7',
          pink: '#ec4899',
          yellow: '#eab308',
          orange: '#f97316',
          teal: '#14b8a6',
        },
        accent: {
          teal: '#0d9488',
          tealLight: '#2dd4bf',
        }
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px rgba(0, 0, 0, 0.08)',
        'nav': '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};

export default config;
