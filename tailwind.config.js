module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-gray-a': '#161b22',
        'custom-gray-b': '#0d1117',
        'custom-pink-a': '#fcefed'
      },
    },
  },
  plugins: [],
}
