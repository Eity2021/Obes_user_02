/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#7B1E19",
        secondary: "#ad2a26",
        danger: "#DC2626",
        success: "#16A34A",
        customGray: "#F3F4F6",
        white:'#fff',
        whiteGraph:'#dcdddd',
          "neutral": "#1f2937",  
        "neutral-content": "#ffffff",  
      },
    },
     
  },
  

  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: ["light"], 
  },
};
