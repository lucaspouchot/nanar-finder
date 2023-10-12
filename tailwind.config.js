const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    plugin(function ({ addBase, addUtilities, theme }) {
      addBase({
        header: {
          zIndex: 30,
        },
        main: {
          margin: '2rem auto 0 auto',
          maxWidth: theme('screens.xl'),
          paddingBottom: '5.4rem',
          zIndex: 20,
        },
        footer: {
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '3.4rem',
        }
      });
      addUtilities({
        '.dark #root': {
          backgroundColor: theme('colors.slate.800') + ' !important',
        },
        '#root': {
          position: 'relative',
          backgroundColor: theme('colors.gray.200') + ' !important',
          minHeight: "100vh",
        },
        '.dark a.active': {
          color: theme('colors.white') + ' !important',
        },
        'a.active': {
          color: theme('colors.black') + ' !important',
        },
        ".shadow-top": {
          boxShadow: "0 -2px 4px -1px rgba(0,0,0,0.1)",
        },
      });
    }),
  ],
}
