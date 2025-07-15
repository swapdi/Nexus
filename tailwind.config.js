export default {
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'coin-flip': 'coinFlip 4s ease-in-out infinite'
      },
      keyframes: {
        coinFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(360deg)' }
        }
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d'
      },
      backfaceVisibility: {
        hidden: 'hidden'
      },
      perspective: {
        1000: '1000px'
      }
    }
  }
};
