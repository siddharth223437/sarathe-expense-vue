module.exports =  {
  important: true,
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito']
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    }
  },
  variants: {
    backgroundColor: ['responsive','hover','focus','active','odd','even','first','last'],
    border: ['hover'],
    animation: ['responsive','hover', 'focus'],
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
