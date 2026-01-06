/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode glass
        'glass': {
          DEFAULT: 'rgba(255,255,255,0.65)',
          'border': 'rgba(255,255,255,0.35)',
          'hover': 'rgba(255,255,255,0.8)',
        },
        
        // Dark mode glass
        'glass-dark': {
          DEFAULT: 'rgba(0,0,0,0.4)',
          'border': 'rgba(255,255,255,0.15)',
          'hover': 'rgba(0,0,0,0.6)',
        },
        
        // Accent colors
        accent: {
          DEFAULT: '#5b8cff',
          dark: '#4a7cef',
        },
        danger: '#ff6b6b',
        success: '#51cf66',
        warning: '#ffd43b',
        
        // Text colors
        'text-glass': {
          DEFAULT: 'rgba(0,0,0,0.8)',
          secondary: 'rgba(0,0,0,0.6)',
          dark: 'rgba(255,255,255,0.9)',
          'secondary-dark': 'rgba(255,255,255,0.7)',
        }
      },
      backgroundColor: {
        'glass': 'rgba(255,255,255,0.65)',
        'glass-hover': 'rgba(255,255,255,0.8)',
        'glass-dark': 'rgba(0,0,0,0.4)',
        'glass-hover-dark': 'rgba(0,0,0,0.6)',
      },
      borderColor: {
        'glass': 'rgba(255,255,255,0.35)',
        'glass-dark': 'rgba(255,255,255,0.15)',
      },
      textColor: {
        'glass': 'rgba(0,0,0,0.8)',
        'glass-secondary': 'rgba(0,0,0,0.6)',
        'glass-dark': 'rgba(255,255,255,0.9)',
        'glass-secondary-dark': 'rgba(255,255,255,0.7)',
      },
      backdropBlur: {
        'xl': '22px',
        '2xl': '30px'
      },
      borderRadius: {
        'xl': '18px',
        '2xl': '24px'
      },
      boxShadow: {
        'glass': '0 20px 60px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
        'glass-dark': '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-hover': '0 25px 80px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
        'glass-hover-dark': '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)'
      },
      animation: {
        'scale-in': 'scaleIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'bounce-subtle': 'bounceSubtle 0.4s ease-out'
      },
      keyframes: {
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        bounceSubtle: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}