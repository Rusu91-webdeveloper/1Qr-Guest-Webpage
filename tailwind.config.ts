import type { Config } from "tailwindcss";

function extractColorVars(
  colorObj: Record<string, any>,
  colorGroup = ""
): Record<string, string> {
  return Object.entries(colorObj).reduce((vars, [key, value]) => {
    const newVars =
      typeof value === "string"
        ? { [`--${colorGroup}${key}`]: value }
        : extractColorVars(value, `${colorGroup}${key}-`);
    return { ...vars, ...newVars };
  }, {});
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};

export default config;
