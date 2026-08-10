/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        // Warm sunset primary — the energetic/CTA color
        coral: {
          50: '#fff4ed',
          100: '#ffe4d3',
          200: '#ffc4a3',
          300: '#ff9d6b',
          400: '#ff7a3d',
          500: '#fb5a1e',
          600: '#ec4113',
          700: '#c42f10',
          800: '#9c2814',
          900: '#7e2413',
        },
        amber: {
          400: '#ffb84d',
          500: '#ffa11f',
        },
        // Deep teal/indigo secondary — the grounding color
        deep: {
          50: '#eef7f7',
          100: '#d3e9e9',
          200: '#a3d0d0',
          300: '#6fb3b3',
          400: '#3d8f90',
          500: '#246667',
          600: '#1c4f52',
          700: '#173e42',
          800: '#122f33',
          900: '#0c1f22',
        },
        cream: {
          50: '#fffdf9',
          100: '#fdf6ec',
          200: '#f8ecd9',
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(23, 62, 66, 0.08), 0 8px 24px -6px rgba(23, 62, 66, 0.08)',
        lift: '0 8px 16px -4px rgba(23, 62, 66, 0.12), 0 20px 40px -12px rgba(23, 62, 66, 0.16)',
      },
      backgroundImage: {
        sunset: 'linear-gradient(135deg, #ff7a3d 0%, #fb5a1e 55%, #ec4113 100%)',
        dusk: 'linear-gradient(135deg, #173e42 0%, #0c1f22 100%)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
        floatSlow: 'floatSlow 4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
