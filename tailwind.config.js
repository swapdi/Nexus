export default {
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['acid', 'night'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'night'
  },
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  }
};
