/** @type {import('tailwindcss').Config} */
module.exports = {
  images: {
    domains: ["i.ibb.co"],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--bg-base)",
        "bg-surface": "var(--bg-surface)",
        "color-primary": "var(--color-primary)",
        "color-accent": "var(--color-accent)",
        "color-gold": "var(--color-gold)",
        "color-text": "var(--color-text)",
        "color-muted": "var(--color-muted)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
    fontFamily: {
      body: ["Anton"],
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss-base-font-size"),
    require("tailwindcss-animated"),
  ],
};
