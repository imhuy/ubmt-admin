import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' or 'class',
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        white: "#FAFAFA",
        primary: {
          500: "#E25148",
          blue: {
            500: "#345CC1",
          },
        },
        select: {
          500: "#FFEAF4",
          700: "#F14658",
        },
        success: {
          600: "#2c9e80",
          500: "#24B592",
        },
        secondary: {
          700: "#38405B",
          600: "#2f3138",
          500: "#71717A",
          400: "#A1A1AA",
          300: "#2d303a",
        },
        dark: {
          700: "#1c1d24",
          800: "#171B28",
          900: "#11141E",
        },
      },
      fontFamily: {
        workSansExtraLight: "WorkSans-ExtraLight",
        workSansLight: "WorkSans-Light",
        workSansThin: "WorkSans-Thin",
        workSansRegular: "WorkSans-Regular",
        workSansMedium: "WorkSans-Medium",
        workSansSemiBold: "WorkSans-SemiBold",
        workSansBold: "WorkSans-Bold",
        workSansBlack: "WorkSans-Black",
      },
      screens: {
        // xs: { max: "575px" },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
export default config;
