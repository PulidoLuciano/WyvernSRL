/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    screens:{
      mobileS: "320px",
      mobileM: "375px",
      mobileL: "425px",
      tablet: "768px",
      laptop: "1024px",
      laptopL: "1440px",
      monitor: "1920px"
    },
    colors:{
      "primary": "#463772",
      "secondary": "#806FB6",
      "green": "#50FF50",
      "red": "#FF5050",
      "blue": "#5050FF",
      "yellow": "#FFFF50",
      "white": "#FEFEFE",
      "black": "#010101",
    },
    extend: {
    },
  },
  plugins: [],
}

