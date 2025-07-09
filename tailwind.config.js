// /** @type {import('tailwindcss').Config} */
// module.exports = {

//   darkMode: ["class", '[data-theme="light"]'],
//    theme: {
//     extend: {
//     colors: {
//         primary: "#7B1E19",    
//         secondary: "#F59E0B",  
//         danger: "#DC2626",     
//         success: "#16A34A",    
//         customGray: "#F3F4F6", 
     
//       },
//     },
 
//   daisyui: {
//     themes: ["light", "dark"],
//   }
//    },
//     content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
//   ],
//   plugins: [require("@tailwindcss/typography"), require("daisyui")],

// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ correct way to enable class-based dark mode

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#7B1E19",
        secondary: "#93201a",
        danger: "#DC2626",
        success: "#16A34A",
        customGray: "#F3F4F6",
        white:'#fff',
        whiteGraph:'#dcdddd',
          "neutral": "#1f2937",  // customize to your dark bg
        "neutral-content": "#ffffff",  // text color on that bg
      },
    },
     
  },
  

  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: ["light", "dark"], 
  },
};
