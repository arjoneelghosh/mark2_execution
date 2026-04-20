/** @type {import('tailwindcss').Config} */
const tokenColor = (token) => `rgb(var(${token}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: tokenColor('--navy-950-rgb'),
          900: tokenColor('--navy-900-rgb'),
          850: tokenColor('--navy-850-rgb'),
          800: tokenColor('--navy-800-rgb'),
          700: tokenColor('--navy-700-rgb'),
          600: tokenColor('--navy-600-rgb'),
          500: tokenColor('--navy-500-rgb'),
          400: tokenColor('--navy-400-rgb'),
          300: tokenColor('--navy-300-rgb'),
          200: tokenColor('--navy-200-rgb'),
          100: tokenColor('--navy-100-rgb'),
          50: tokenColor('--navy-50-rgb'),
        },
        accent: {
          blue: tokenColor('--accent-blue-rgb'),
          glow: tokenColor('--accent-glow-rgb'),
          soft: tokenColor('--accent-soft-rgb'),
          muted: tokenColor('--accent-muted-rgb'),
        },
        glass: {
          white: tokenColor('--chip-bg-rgb'),
          border: tokenColor('--border-rgb'),
          hover: tokenColor('--panel-soft-rgb'),
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'title': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'subtitle': ['1.25rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgb(var(--accent-blue-rgb) / 0.15)',
        'glow-md': '0 0 30px rgb(var(--accent-blue-rgb) / 0.2)',
        'glow-lg': '0 0 50px rgb(var(--accent-blue-rgb) / 0.25)',
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        panel: 'var(--shadow-panel)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ring-breathe': 'ringBreathe 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(74, 144, 217, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(74, 144, 217, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        ringBreathe: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '250': '250ms',
        '280': '280ms',
      },
    },
  },
  plugins: [],
};
