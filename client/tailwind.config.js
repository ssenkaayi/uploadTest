/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'regal-violet': 'rgb(113, 99, 186, 255)',
        'menu':'#e0e0e058',
        'menu-color':'#fff',
        'base':'#ebe9e9',
        "dashbord":"rgba(113,99,186,255)",
        "search-bar":"rgba(237, 237,237)",
        "card":"rgba(229,223,223)",
        
      
      },
      width:{
        'sidebar':'110px',
        'hover':'240px',
        "card-w":"290px",
        "login-w":"450px",
        "invoice":"600px"
       
      },
      height:{
        'sidebar':'100vh',
        'logo':'80px',
        'menu':'88%',
        "card-h":"150px",
       
      },
      padding:{
        'sidebar-padding':'0 1.7rem',
        'logo':'16px',
        'header':'10px 2rem',
        'primary':['0'],
        'search-box':'4px 14px',
        "record":"2rem",
        "tr":"15px"
      },
      transitionProperty:{
        'sidebar':'transition-all 0.5s linear',
        'li':'transition-all 0.5s ease-in-out'
      },
      margin:{
        'li':'8px 0',
        'primary':['0'],
        "record":"1rem",
        "login":"36px 0"

      },

      color:{
        'menu-color':'#fff'
        
      },
      fontFamily: {
        'primary':['Poppins']
        
      },
      gap:{
        'body':'1rem',
        "card":"8px"
      },
      zIndex:{
        'sidebar':'200',
        'header':'999'
      }
      
  
    },

  },
  plugins: [],
}