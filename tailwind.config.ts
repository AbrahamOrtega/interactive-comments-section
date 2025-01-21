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
        // Primary
        moderateBlue: "#5457b6",
        softRed: "#ed6468",
        lightGrayishBlue: "#c3c4ef",
        paleRed: "#ffb8bb",

        // Neutral
        darkBlue: "#324152",
        grayishBlue: "#67727e",
        lightGray: "#eaecf1",
        veryLightGray: "#f5f6fa",
      },
    },
  },
  plugins: [],
} satisfies Config;
