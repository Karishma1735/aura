/** Brand tokens live here. Change a hex and the whole app re-themes. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cherry: { DEFAULT: '#C8102E', deep: '#9B0E24', tint: '#F4D3D8' },
        cream: { DEFAULT: '#FFF6E5', warm: '#F6E9D2' },
        ink: '#2B1416',
        success: { DEFAULT: '#3F7D58', deep: '#2F6245' },
        warning: '#D98E04',
      },
      fontFamily: {
        display: ['Fraunces', 'DM Serif Display', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Instrument Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '24px' },
      boxShadow: {
        cherry: '0 18px 40px -18px rgba(200,16,46,.35)',
        soft: '0 6px 20px -10px rgba(155,14,36,.25)',
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
