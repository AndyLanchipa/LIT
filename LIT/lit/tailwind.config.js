/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "1/8": "12.5%",
        "1/10": "10%",
      },
      height: {
        "1/8": "12.5%",
        "1/10": "10%",
      },
    },
  },
  plugins: [],
};
