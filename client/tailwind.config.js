/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
        },
        "clr-neutral": "hsl(var(--clr-neutral))",
        background: "hsl(var(--background))",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)",
      },
    },
  },
  plugins: [],
};
