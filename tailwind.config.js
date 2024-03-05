/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      

      colors: {
        'jaune': '#F6CB05',
        'rouge': '#F51B03',
        'jaune_leger': '#FFE25D',
        'withe': '#FFFFFF',
  
    
      },
    },
    fontFamilly:{
      sans:['Poppins-Regular','Helvetica']
     },

    fontSize: {
      'smx':'8px',
      sm:'12px', 
      base:'14px',
      lg: '17px', 
      xl:'25px',
      '2xl':'35px'
    },
    boxShadow: {
      '3xl': '0px 0px 8px 5px rgba(0, 0, 0, 0.09)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      'lg':'10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    }

   
   
  },
  
  plugins: [],
};
