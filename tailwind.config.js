/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#8b5cf6",

          "secondary": "#3b82f6",

          "accent": "#d946ef",

          "neutral": "#f3f4f6",

          "base-100": "#111827",

          "info": "#f3f4f6",

          "success": "#259D69",

          "warning": "#FACE3D",

          "error": "#EC6F8E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
