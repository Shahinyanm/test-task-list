/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors:{
        'main':'#45852D',
        'secondary':'#D8D8D8',
      },
      maxWidth:{
        'content':"1440px"
      },
      width:{
        '12p':'14px',
        '16p':'16px',
        '20p':'20px',
        '36p':'36px'
      }
    },
  },
  plugins: [],
}
