module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // options: {
  // safelist: ['sm:grid-cols-2', 'sm:grid-cols-4' ],
  // },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},  
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
