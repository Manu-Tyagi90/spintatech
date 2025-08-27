/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2540',
        'primary-80': '#0A2540cc',
        secondary: '#F6F9FC',
        accent: '#00C49A',
      },
    },
  },
  plugins: [],
}
