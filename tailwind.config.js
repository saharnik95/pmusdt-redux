/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure the content paths are correct
  ],
  theme: {
    extend: {
      fontFamily: {
        niramit: ["Niramit", "sans-serif"],
        russoone: ["Russo One", "sans-serif"],
      },

      boxShadow: {
        custom: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)", // Hex `#1D8D9480` to RGBA
      },

      backgroundImage: {
        "custom-text-gradient":
          "linear-gradient(89.99deg, #1D8D94 30.54%, #99D9A6 99.99%)",
      },
      colors: {
        primary: {
          background: "#242c39",
          foreground: "#E4E4E4",
        },
        footer: {
          border: "#2E3E59",
          text: "#ABABAB",
        },
        form: {
          background: "#2A3342",
          text: "#ABABAB",
          input: "#242C39",
          buttonBackground: "#1D8D94",
        },
      },
    },
  },
  plugins: [],
};
