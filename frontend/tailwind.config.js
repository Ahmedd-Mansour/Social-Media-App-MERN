/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors:{
      'white': '#ffffff',
      'red' : '#e82c2a' ,
      'error-color': '#f57c00',
    }
  },
  plugins: [],
};
