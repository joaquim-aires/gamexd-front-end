/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          200: '#F0ECF0',
          300: '#DCD8DC',
          400: '#CDC6CD',
          500: '#817A85',
          600: '#696678',
          700: '#494657',
          800: '#373545',
          900: '#171524',
        },
        primary: {
          300: '#D8ABF4',
          400: '#B58CCD',
          600: '#8B5AA8',
        },
        miscelaneous: {
          heart: '#E483E4',
          game: '#64C25C',
          list: '#56CFEA',
          star: '#CDA744',
        },
        semantic: {
          danger: '#E15275',
        },
      },
      fontFamily: {
        roboto: 'Roboto',
      },
    },
  },
  plugins: [],
}
