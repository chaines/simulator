module.exports = {
  darkMode: 'class',
  future: {},
  purge: {
    content: ['./src/**/*.scss', './src/**/*.tsx'],
    options: {
      safelist: [
        /^(text|border)-red-(4|6)00/,
        /^(text|border)-blue-(4|6)00/,
        /^(text|border)-purple-(4|6)00/,
        /^(text|border)-green-(4|6)00/,
      ],
    },
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
