import {
  defineConfig,
  defineKeyframes,
  defineSemanticTokens,
} from "@pandacss/dev";

const keyframes = defineKeyframes({
  gradientAnimation: {
    "0%": { backgroundPosition: "0% 0%" },
    "50%": { backgroundPosition: "0% 100%" },
    "100%": { backgroundPosition: "0% 0%" },
  },
});

const semanticTokens = defineSemanticTokens({
  sizes: {
    menuHeight: {
      value: "{spacing.20}",
    },
  },
  fonts: {
    fontPrimary: {
      value: "var(--font-lora)",
    },
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Enforce real CSS values
  strictPropertyValues: true,

  // Enforce design system tokens
  strictTokens: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      keyframes,
      semanticTokens,
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
