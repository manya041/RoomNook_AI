/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f8',
          100: '#edeef0',
          200: '#dcdfe5',
          300: '#b5bbc8',
          400: '#8992a7',
          500: '#5d677f',
          600: '#3c4458',
          700: '#272d3c',
          800: '#181c28',
          900: '#0f121a',
          950: '#090a10'
        },
        champagne: {
          50: '#fdf9f2',
          100: '#faf0de',
          200: '#f3dfbd',
          300: '#e6c38e',
          400: '#d7a763',
          500: '#c88d42',
          600: '#a96f2d',
          700: '#895424',
          800: '#6b401f',
          900: '#58341c'
        },
        emerald: {
          50: '#e9fef6',
          100: '#c6f7e6',
          200: '#94eccf',
          300: '#5fdab6',
          400: '#34c49c',
          500: '#16a382',
          600: '#11826b',
          700: '#0f6958',
          800: '#0d5346',
          900: '#0b453b'
        },
        plum: {
          50: '#f7f2fb',
          100: '#ede0f7',
          200: '#d8bbea',
          300: '#c194de',
          400: '#ab72d0',
          500: '#8f52b7',
          600: '#743a95',
          700: '#5a2c72',
          800: '#422154',
          900: '#30193d'
        },
        ivory: '#f9f6f1',
        charcoal: '#0b0d12',
        midnight: '#080a0f'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif']
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.75rem',
        '3xl': '2.5rem',
        'fluid': '2.75rem'
      },
      boxShadow: {
        'soft': '0 10px 35px -20px rgba(15, 18, 26, 0.45), 0 20px 25px -15px rgba(15, 18, 26, 0.35)',
        'elegant': '0 25px 45px -20px rgba(12, 14, 20, 0.55), 0 15px 25px -15px rgba(12, 14, 20, 0.4)',
        'glow': '0 0 0 1px rgba(255,255,255,0.04), 0 25px 60px -15px rgba(52,196,156,0.35)',
        'aura': '0 40px 80px -30px rgba(203, 167, 102, 0.45)'
      },
      backgroundImage: {
        'hero-radiance': 'radial-gradient(circle at top left, rgba(203,167,102,0.35), transparent 45%), radial-gradient(circle at bottom right, rgba(52,196,156,0.35), transparent 40%)',
        'surface-glass': 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))'
      },
      blur: {
        'xl': '28px'
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      transitionTimingFunction: {
        'club': 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      animation: {
        'float': 'float 12s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.8s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out both'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.65 },
          '50%': { opacity: 1 }
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [],
}
