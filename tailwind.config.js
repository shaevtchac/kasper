/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '531px',
      md: '701px',
      lg: '901px',
      xl: '1280px',
    },

    fontFamily: {
      openSans: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#00c7fc',
        primarytr: '#00c7fc88',
        secondary: '#a8a8a8',
        menubg: '#00000088',
      },
      variables: {
        '--responsive-spacing': {
          sm: '1em',
          md: '#ff0000',
          lg: '#00ff00',
          xl: '#0000ff',
        },
      },
    },
  },

  plugins: [],
};
