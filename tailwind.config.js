/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B2635',
        secondary: '#A23B72',
        accent: '#5C1A1F',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        text: '#2D2D2D',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontWeight: {
        extrabold: '800',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'sketch': '2px 2px 0px rgba(139, 38, 53, 0.15), 4px 4px 0px rgba(139, 38, 53, 0.1)',
        'sketch-lg': '3px 3px 0px rgba(139, 38, 53, 0.2), 6px 6px 0px rgba(139, 38, 53, 0.12)',
        'sketch-hover': '4px 4px 0px rgba(139, 38, 53, 0.25), 8px 8px 0px rgba(139, 38, 53, 0.15)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.sketch-border': {
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'currentColor',
          boxShadow: '2px 2px 0px rgba(139, 38, 53, 0.15), 3px 3px 0px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            border: '2px solid currentColor',
            pointerEvents: 'none',
            opacity: '0.3',
            transform: 'rotate(0.5deg)',
          },
        },
        '.sketch-border-lg': {
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: 'currentColor',
          boxShadow: '3px 3px 0px rgba(139, 38, 53, 0.2), 4px 4px 0px rgba(0, 0, 0, 0.08)',
        },
      })
    },
  ],
}


