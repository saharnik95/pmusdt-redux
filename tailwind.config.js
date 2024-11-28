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
        boxShadow: "0px 4px 20px 0px rgba(64, 165, 120, 0.5)",
        PinkboxShadow: "0px 4px 20px 0px rgba(240, 90, 126, 0.5)",

        custom: "0px 0px 20px 0px rgba(29, 141, 148, 0.5)", // Hex `#1D8D9480` to RGBA
      },

      backgroundImage: {
        "custom-text-gradient":
          "linear-gradient(89.99deg, #1D8D94 30.54%, #99D9A6 99.99%)",
      },
      "custom-gradient":
        "linear-gradient(111.42deg, #40A578 5.33%, #99D9A6 47.9%)",

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
          input: "#242C39",
          buttonBackground: "#1D8D94",
          fail: "#F66066",
          danger: "#F66066",
        },
        topBar: {
          text: "#596B89",
          success: "#40A578",
          pink: "#F05A7E",
          input: "",
          buttonBackground: "#",
        },
        table: {
          successText: "#035610",
          failText: "#60140F",
          pendingText: "#603E0F",
          pending: "#F3AC76",
          pink: "#F05A7E",
          input: "",
          buttonBackground: "#",
        },
      },
    },
  },
  plugins: [],
};
