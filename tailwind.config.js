/** Palette: Blue Gray #88a9c3 · Midnight #2b4257 · Navy #14202e · Royal #091235. Brand tokens live here. Change a hex and the whole app re-themes. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#2b4257', deep: '#14202e', tint: '#D5E1EB', mist: '#88a9c3' },
        cream: { DEFAULT: '#EEF3F7', warm: '#E1EAF1' },
        ink: '#091235',
        royal: '#091235',
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
        brand: '0 18px 40px -18px rgba(43,66,87,.35)',
        soft: '0 6px 20px -10px rgba(20,32,46,.25)',
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
