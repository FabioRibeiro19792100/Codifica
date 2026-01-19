/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        background: 'hsl(35, 25%, 92%)',
        foreground: 'hsl(0, 0%, 5%)',
        primary: {
          DEFAULT: 'hsl(252, 70%, 65%)', // Roxo do Codifica+
          foreground: 'hsl(35, 25%, 92%)',
        },
        secondary: {
          DEFAULT: 'hsl(35, 20%, 85%)',
          foreground: 'hsl(0, 0%, 5%)',
        },
        muted: {
          DEFAULT: 'hsl(35, 20%, 85%)',
          foreground: 'hsl(0, 0%, 35%)',
        },
        accent: {
          DEFAULT: 'hsl(252, 70%, 75%)', // Roxo mais claro
          foreground: 'hsl(0, 0%, 5%)',
        },
        border: 'hsl(35, 15%, 80%)',
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
