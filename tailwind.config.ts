import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#e8fcff",
        night: "#06090e",
        glow: "#59f5cd",
        signal: "#66d8ff",
        ember: "#ffb35f"
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(89, 245, 205, 0.28), 0 10px 45px rgba(102, 216, 255, 0.2)"
      },
      backgroundImage: {
        "mesh-grid":
          "radial-gradient(circle at 20% 15%, rgba(89,245,205,0.18), transparent 45%), radial-gradient(circle at 80% 15%, rgba(102,216,255,0.2), transparent 40%), radial-gradient(circle at 50% 90%, rgba(255,179,95,0.08), transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;
