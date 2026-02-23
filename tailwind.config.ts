import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forge-dark': '#0F1419',
        'forge-stone': '#16213E',
        'forge-ember': '#D8660B',
        'forge-gold': '#C4A062',
        'forge-light': '#FFF8F0',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
