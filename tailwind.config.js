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
          card: 'rgba(11, 23, 50, 0.65)',
          'card-hover': 'rgba(16, 33, 72, 0.8)',
          sidebar: 'rgba(7, 15, 34, 0.85)',
          border: 'rgba(0, 229, 255, 0.15)',
          'border-active': 'rgba(0, 229, 255, 0.5)',
          cyan: '#00e5ff',
          'cyan-glow': '#38ef7d',
          blue: '#0088ff',
          'electric-blue': '#00a6ff',
          text: '#f1f5f9',
          muted: '#8e9eb5',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.35)',
        'glow-cyan-sm': '0 0 12px rgba(0, 229, 255, 0.25)',
        'glow-blue': '0 0 30px rgba(0, 136, 255, 0.4)',
        'glow-pill': '0 0 15px rgba(0, 166, 255, 0.5)',
        'glow-ring': '0 0 35px rgba(0, 229, 255, 0.6)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '28px' },
        }
      }
    },
  },
  plugins: [],
}
