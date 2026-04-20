/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060a18',
          900: '#0a1128',
          850: '#0d1630',
          800: '#111d3a',
          700: '#162550',
          600: '#1e3468',
          500: '#274580',
          400: '#3a5fa0',
          300: '#5a80c0',
          200: '#8aaae0',
          100: '#b8d0f0',
          50: '#e0ecff',
        },
        accent: {
          blue: '#4a90d9',
          glow: '#5ba0e8',
          soft: '#3d7cc7',
          muted: '#2a5a9a',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.04)',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.06)',
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
        'glow-sm': '0 0 15px rgba(74, 144, 217, 0.15)',
        'glow-md': '0 0 30px rgba(74, 144, 217, 0.2)',
        'glow-lg': '0 0 50px rgba(74, 144, 217, 0.25)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4)',
        'panel': '0 16px 64px rgba(0, 0, 0, 0.5)',
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
