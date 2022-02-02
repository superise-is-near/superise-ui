module.exports = {
  theme: {},
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
  variants: {
    extend: {
      borderColor: ['focus-visible', 'first', 'last'],
      borderWidth: ['last']
    }
  },
};
