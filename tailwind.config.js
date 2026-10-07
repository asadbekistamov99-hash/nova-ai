/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nova: {
          bg: '#050a18',
          'bg-deep': '#030611',
          'bg-secondary': '#07132b',
          card: 'rgba(11, 23, 50, 0.65)',
          'card-hover': 'rgba(16, 33, 72, 0.8)',
          sidebar: 'rgba(7, 15, 34, 0.85)',
          border: 'rgba(0, 229, 255, 0.15)',
          'border-light': 'rgba(0, 229, 255, 0.25)',
          'border-active': 'rgba(0, 229, 255, 0.5)',
          cyan: '#00e5ff',
          'cyan-dark': '#00b8cc',
          'cyan-glow': '#38ef7d',
          blue: '#0088ff',
          'blue-dark': '#0062cc',
          'electric-blue': '#00a6ff',
          text: '#f1f5f9',
          'text-secondary': '#cbd5e1',
          muted: '#8e9eb5',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.35)',
        'glow-cyan-sm': '0 0 12px rgba(0, 229, 255, 0.25)',
        'glow-cyan-md': '0 0 16px rgba(0, 229, 255, 0.2)',
        'glow-blue': '0 0 30px rgba(0, 136, 255, 0.4)',
        'glow-blue-sm': '0 0 16px rgba(0, 136, 255, 0.25)',
        'glow-pill': '0 0 15px rgba(0, 166, 255, 0.5)',
        'glow-ring': '0 0 35px rgba(0, 229, 255, 0.6)',
        'inner-glow': 'inset 0 0 12px rgba(0, 229, 255, 0.1)',
        'elevation-1': '0 2px 4px rgba(0, 0, 0, 0.25)',
        'elevation-2': '0 4px 8px rgba(0, 0, 0, 0.3)',
        'elevation-3': '0 8px 16px rgba(0, 0, 0, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      spacing: {
        'gutter': '1rem',
        'safe': 'env(safe-area-inset-top, 0px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-smooth': 'smoothPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '28px' },
        },
        smoothPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateY(4px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      scale: {
        '98': '0.98',
        '102': '1.02',
      }
    },
  },
  plugins: [],
}
