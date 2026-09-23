/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060709',
          900: '#0a0b0e',
          850: '#0f1117',
          800: '#141720',
          700: '#1e2230',
          600: '#2b3044',
        },
        gold: {
          100: '#fcf8e8',
          200: '#f7edbf',
          300: '#efdc8f',
          400: '#e5c158',
          500: '#d4af37', // Classic Horology Gold
          600: '#b89228',
          700: '#94701e',
          800: '#75541c',
        },
        rosegold: {
          300: '#e8b4b8',
          400: '#d9949a',
          500: '#b76e79',
          600: '#9b535d',
        },
        platinum: {
          100: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
        champagne: '#F7E7CE',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Cinzel', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(10, 11, 14, 0.95) 50%, rgba(183, 110, 121, 0.1) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #d4af37 0%, #f7edbf 50%, #d4af37 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'glass-gold': 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.03) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 45px -5px rgba(212, 175, 55, 0.45)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'reverse-spin': 'reverse-spin 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-subtle': 'pulse-subtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
