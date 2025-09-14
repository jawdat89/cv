/** @type {import('tailwindcss').Config} */
const formsPlugin = require("@tailwindcss/forms");
const tailwindRtl = require("tailwindcss-rtl");

module.exports = {
  darkMode: "class", // Enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Include all relevant files
  safelist: [
    {
      pattern: /^col-span-\d+$/, // This ensures all col-span-* classes are included
    }
  ],
  theme: {
    stroke: {
      'secondary-darkest': '#212121',
      'stone-100': '#F5F5F5',
    },
    extend: {
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      screens: {
        sm: "30rem", // 480px
        md: "48rem", // 768px
        lg: "61rem", // 976px
        xl: "90rem", // 1440px
        "2xl": "96rem", // 1536px
        "3xl": "100rem", // 1600px
        "4xl": "120rem", // 1920px
        "5xl": "128rem", // 2048px
        "6xl": "160rem", // 2560px
        "7xl": "192rem", // 3072px
        "8xl": "224rem", // 3584px
        "9xl": "256rem", // 4096px
        "10xl": "288rem", // 4608px
        "11xl": "320rem", // 5120px
      },
      fontFamily: {
        heebo: ["Heebo", "sans-serif"],
        lemonada: ["Lemonada", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      opacity: {
        0: "0",
        20: "0.2",
        40: "0.4",
        50: "0.5",
        60: "0.6",
        80: "0.8",
        100: "1",
      },
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        110: "110",
        120: "120",
        130: "130",
        140: "140",
        150: "150",
        160: "160",
        170: "170",
        180: "180",
        190: "190",
        200: "200",
      },
      colors: {
        primary: {
          lightest: "#E3F2FD",
          lighter: "#BBDEFB",
          light: "#64B5F6",
          DEFAULT: "#1E88E5",
          dark: "#1565C0",
          darkest: "#0D47A1",
        },
        secondary: {
          lightest: "#F5F5F5",
          lighter: "#E0E0E0",
          light: "#BDBDBD",
          DEFAULT: "#757575",
          dark: "#424242",
          darkest: "#212121",
        },
        accent: {
          orange: {
            light: "#FFE0B2",
            DEFAULT: "#FF9800",
            dark: "#F57C00",
          },
          green: {
            light: "#C8E6C9",
            DEFAULT: "#4CAF50",
            dark: "#388E3C",
          },
          yellow: {
            light: "#FFF9C4",
            DEFAULT: "#FFEB3B",
            dark: "#FBC02D",
          },
        },
        neutral: {
          white: "#FFFFFF",
          black: "#000000",
          transparentBlack: {
            20: "#00000033",
            40: "#00000066",
          },
        },
      },
      spacing: {
        header: '4rem',
        px: "1px",
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        8: "2rem",
        16: "4rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'inner-option': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        px: "1px",
        0: "0",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        'fade-in': 'fadeIn var(--animate-duration, 0.6s) ease-out var(--animate-delay, 0s) forwards',
        'slide-in-from-bottom': 'slideInFromBottom var(--animate-duration, 0.6s) ease-out var(--animate-delay, 0s) forwards',
        'slide-in-from-left': 'slideInFromLeft var(--animate-duration, 0.6s) ease-out var(--animate-delay, 0s) forwards',
        'slide-in-from-right': 'slideInFromRight var(--animate-duration, 0.6s) ease-out var(--animate-delay, 0s) forwards',
        'slide-in-from-top': 'slideInFromTop var(--animate-duration, 0.6s) ease-out var(--animate-delay, 0s) forwards',
        'zoom-in': 'zoomIn var(--animate-duration, 0.6s) ease-out var(--animate-delay, 0s) forwards',
        'progress-fill': 'progressFill var(--animate-duration, 1.5s) ease-out var(--animate-delay, 0s) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(0.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-0.5rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(0.5rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromTop: {
          '0%': { opacity: '0', transform: 'translateY(-0.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width, 100%)' },
        },
      },
    },
  },
  plugins: [formsPlugin, tailwindRtl],
};
