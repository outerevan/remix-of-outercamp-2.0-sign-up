import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/WaitlistForm.tsx",
    "./src/widget/**/*.{ts,tsx}",
  ],
  // No prefix — same class names as main site.
  // Use `important` selector to win specificity over WP theme styles.
  important: "[data-outercamp-waitlist]",
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        forest: {
          DEFAULT: "hsl(var(--forest))",
          light: "hsl(var(--forest-light))",
        },
        sand: {
          DEFAULT: "hsl(var(--sand))",
          light: "hsl(var(--sand-light))",
        },
        warm: "hsl(var(--warm))",
        earth: "hsl(var(--earth))",
        clay: "hsl(var(--clay))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
