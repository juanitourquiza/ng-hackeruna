/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Wired.com inspired palette
        'white': '#FFFFFF',
        'black': '#121212',
        'gray-text': '#555555',
        'gray-light': '#F5F5F5',
        'gray-border': '#E0E0E0',
        'accent-blue': '#0077FF',
        // Dark mode palette
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-text': '#E0E0E0',
        'dark-text-secondary': '#A0A0A0',
        'dark-border': '#333333',
        primary: '#0077FF',
        'background-light': '#FFFFFF',
        'background-dark': '#121212',
        'surface-light': '#F5F5F5',
        'surface-dark': '#1E1E1E',
        'text-light-primary': '#121212',
        'text-dark-primary': '#E0E0E0',
        'text-light-secondary': '#555555',
        'text-dark-secondary': '#A0A0A0',
        'border-light': '#E0E0E0',
        'border-dark': '#333333',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0',
        'lg': '0',
        'xl': '0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
