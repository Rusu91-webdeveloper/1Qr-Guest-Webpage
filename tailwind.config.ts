import type { Config } from "tailwindcss";

// Import flattenColorPalette as a CommonJS module
const plugin = require("tailwindcss/plugin");
const flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      let allColors = flattenColorPalette(theme("colors"));
      let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    }),
  ],
};

export default config;
