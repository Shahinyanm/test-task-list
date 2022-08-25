/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors:{
        'main':'#45852D'
      },
      maxWidth:{
        'content':"1440px"
      },
      width:{
        '36p':'36px'
      }
    },
  },
  plugins: [],
}
