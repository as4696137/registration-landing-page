/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Dela Gothic One"', "cursive"],
        sans: ['"Noto Sans TC"', "sans-serif"],
      },
      // --- Design system tokens (see src/design-system/tokens.json) ---
      colors: {
        brand: {
          DEFAULT: "#ffff41", // neon yellow — primary accent
          hover: "#ffff00",
        },
        ink: "#000000", // borders & default text
        surface: "#ffffff", // cards / default surface
        muted: "#888888",
        body: "#333333",
        danger: "#d61f69", // form validation / error accent (AA on white)
        tag: {
          yellow: "#ffff41",
          teal: "#00ffc7",
          pink: "#ff6996",
        },
        section: {
          green: "#92f590",
          mint: "#9bf3e0",
          blue: "#0000ff",
        },
      },
      fontSize: {
        "display-sm": ["40px", { lineHeight: "120%" }],
        "display-md": ["65px", { lineHeight: "120%" }],
        "display-lg": ["80px", { lineHeight: "120%" }],
      },
      boxShadow: {
        // mirrors the hard offset drop-shadows used across the site
        "hard-sm": "0 5px 0 rgba(0,0,0,0.25)",
        "hard-md": "0 10px 0 rgba(0,0,0,0.25)",
        "hard-lg": "0 15px 0 rgba(0,0,0,0.25)",
        "hard-diagonal": "10px 15px 0 rgba(0,0,0,0.25)",
        "hard-solid": "0 10px 0 rgba(0,0,0,1)",
      },
      dropShadow: {
        "hard-sm": ["0 5px 0 rgba(0,0,0,0.25)"],
        "hard-md": ["0 10px 0 rgba(0,0,0,0.25)"],
        "hard-lg": ["0 15px 0 rgba(0,0,0,0.25)"],
        "hard-diagonal": ["10px 15px 0 rgba(0,0,0,0.25)"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        // navbar 星形按鈕底持續自轉
        "star-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        // 頁面轉場：星形黃底從按鈕大小放大到覆蓋全螢幕，再淡出。
        "transition-star-grow": {
          from: { transform: "scale(1) rotate(0deg)" },
          to: {
            transform: "scale(var(--transition-scale)) rotate(180deg)",
          },
        },
        "transition-fade": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        "star-spin": "star-spin 12s linear infinite",
        "transition-star-grow":
          "transition-star-grow 650ms cubic-bezier(0.83,0,0.17,1) forwards",
        "transition-fade": "transition-fade 450ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
