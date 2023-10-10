/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        palette: {
          1: "#011119",
          2: "#051923",
          3: "#003554",
          4: "#006494",
          5: "#0582ca",
          6: "#00a6fb",
        },
      },
    },
  },
  plugins: [],
};
