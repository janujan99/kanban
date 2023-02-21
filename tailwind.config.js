/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          darkpurple: "#635fc7",
          lightpurple: "#a8a4ff",
          darkred: "#ea5555",
          lightred: "#ff9898",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
