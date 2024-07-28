/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],

  theme: {
    extend: {
      colors: {
        black: "#1c1b1b",
        gray: "#6a6a6a",
        green: "#228b22",
        cardColor: "#efeff1",
        borderColor: "#d9d9d9",
      },
      width: {
        400: "400px",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        body: {
          "@apply font-normal text-black tracking-widest": {},
          fontFamily: "Lato, sans-serif",
        },
        ".wrapper": {
          "@apply relative flex flex-col gap-8 w-full min-h-screen overflow-hidden":
            {},
        },
        ".container": {
          "@apply mx-auto px-6": {},
          maxWidth: "1200px",
        },
        ".btn-primary": {
          "@apply flex items-center justify-center px-6 w-max h-12 border border-black text-black uppercase text-xs text-center transition-all duration-500 ease-in-out":
            {},
          background: "linear-gradient(to left, white 50%, black 50%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "right",
        },
        ".btn-primary:hover": {
          "@apply text-white": {},
          backgroundPosition: "left",
        },
        ".btn-primary:disabled": {
          "@apply text-white border-transparent": {},
          background: "gray",
        },
      });
    },
  ],
};
