/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        overlay: "rgba(0, 0, 0, 0.38)",
        modalBackground: "rgba(0, 0, 0, 0.25)",
        modalHeader: "#333333",
        labelColor: "#4F4F4F",
      },
      fontFamily: {
        body: ['Montserrat'],
        pop: ['Poppins'],
        noto: ['Noto Sans'],
      },
      backgroundColor: {
        'popbg': "rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        '3xl': '0px 4px 12px rgba(0, 0, 0, 0.1)',
        '4xl': '0px 1px 6px rgba(0, 0, 0, 0.1)',
      },
      dropShadow: {
        '5xl': '0px 4px 10px rgba(61, 180, 109, 0.2)',
        '6xl': '0px 1px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}