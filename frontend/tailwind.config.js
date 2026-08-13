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
        // Primary — sampled directly from the TripnVibe logo icon/wordmark (#02B4C2)
        teal: {
          50: '#e6fbfc',
          100: '#c3f3f6',
          200: '#8fe4ea',
          300: '#54cfda',
          400: '#1fb9c6',
          500: '#02b4c2',
          600: '#039ba8',
          700: '#077c87',
          800: '#0c6068',
          900: '#0d4a50',
        },
        // Highlight — warm complementary accent, used sparingly for celebratory moments
        amber: {
          400: '#ffb84d',
          500: '#ffa11f',
        },
        // Secondary — sampled from the logo's mountain silhouette / wordmark (#011e33 / #012035)
        navy: {
          50: '#eef3f7',
          100: '#d2e1ea',
          200: '#a5c2d3',
          300: '#759fb8',
          400: '#4c7998',
          500: '#325d7c',
          600: '#20415c',
          700: '#152e43',
          800: '#0e2033',
          900: '#011f34',
        },
        cream: {
          50: '#f8fbfc',
          100: '#eef5f6',
          200: '#deebed',
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(1, 31, 52, 0.08), 0 8px 24px -6px rgba(1, 31, 52, 0.08)',
        lift: '0 8px 16px -4px rgba(1, 31, 52, 0.12), 0 20px 40px -12px rgba(1, 31, 52, 0.16)',
        glass: '0 8px 32px 0 rgba(1, 31, 52, 0.14)',
      },
      backgroundImage: {
        brand: 'linear-gradient(135deg, #1fb9c6 0%, #02b4c2 55%, #039ba8 100%)',
        night: 'linear-gradient(135deg, #152e43 0%, #011f34 100%)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backdropBlur: {
        xs: '2px',
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
