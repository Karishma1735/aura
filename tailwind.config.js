/** Palette: Charcoal #122620 · Cream #f4ebd0 · Tan #b68d40 · Gold #d6ad60. Brand tokens live here. Change a hex and the whole app re-themes. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#122620', deep: '#0B1A15', tint: '#E6D8AE', mist: '#d6ad60' },
        tan: '#b68d40',
        bronze: '#8A6A2B',
        cream: { DEFAULT: '#f4ebd0', warm: '#ECDFB9' },
        ink: '#122620',
        royal: '#0B1A15',
        danger: '#A32A2A',
        success: { DEFAULT: '#3F7D58', deep: '#2F6245' },
        warning: '#D98E04',
      },
      fontFamily: {
        display: ['Fraunces', 'DM Serif Display', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Instrument Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '24px' },
      boxShadow: {
        brand: '0 18px 40px -18px rgba(18,38,32,.35)',
        soft: '0 6px 20px -10px rgba(11,26,21,.25)',
      },
      keyframes: {
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 28s linear infinite' },
    },
  },
  plugins: [],
}
