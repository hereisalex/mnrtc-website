import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mac: {
          platinum: "#dddddd",
          "platinum-light": "#eeeeee",
          "platinum-dark": "#cccccc",
          gray: "#999999",
          "gray-dark": "#666666",
          blue: "#0000dd",
          "blue-highlight": "#0066ff",
          white: "#ffffff",
          black: "#000000",
          pinstripe: "#f0f0f0",
          desktop: "#c0c0c0",
        },
      },
      fontFamily: {
        chicago: ["Impact", "Arial Black", "sans-serif"],
        geneva: ["Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        "mac-inset": "inset 1px 1px 0 #666666, inset -1px -1px 0 #ffffff",
        "mac-outset": "inset -1px -1px 0 #666666, inset 1px 1px 0 #ffffff",
        "mac-window": "2px 2px 4px rgba(0, 0, 0, 0.3), 4px 4px 8px rgba(0, 0, 0, 0.1)",
        "mac-dropdown": "2px 2px 4px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
} satisfies Config;

