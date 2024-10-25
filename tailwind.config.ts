import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Add additional directories if needed
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#1DA1F2",
        // secondary: "#14171A",
        // accent: "#FFAD1F",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      // "dark",
      // Custom themes can be added here
    ],
  },
  plugins: [require("daisyui")],
  
};

export default config;
