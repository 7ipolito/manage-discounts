import { withUt } from 'uploadthing/tw'
/** @type {import('tailwindcss').Config} */

export default withUt({
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(18rem, 18rem) 1fr',
      },
      colors: {
        blue: { primary: '#007FBA', hover: '#005a87' },
        grey: { primary: '#455A64', secondary: '#37474F' },
      },
    },
  },
  keyframes: {
    overlayShow: {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    contentShow: {
      from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
      to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
    },
  },
  animation: {
    overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
    contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/forms')],
})
