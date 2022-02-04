module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,ts,jsx,tsx}']
  },
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
