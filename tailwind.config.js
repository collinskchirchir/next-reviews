/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{jsx,tsx,}',
    './components/**/*.{jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
        serif: ['var(--font-crimson-pro)'],
        mono: ['var(--font-jetbrains-mono)']
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

