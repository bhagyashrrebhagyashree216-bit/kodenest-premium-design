/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F3',
        'text-primary': '#111111',
        'text-secondary': '#444444',
        'text-muted': '#666666',
        accent: '#8B0000',
        'accent-hover': '#6B0000',
        success: '#4A6741',
        warning: '#B8860B',
        border: '#E0DED9',
        'border-light': '#EBE9E4',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-lg': ['36px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-md': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-sm': ['22px', { lineHeight: '1.35' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.4' }],
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '10': '40px',
        '16': '64px',
      },
      maxWidth: {
        'text': '720px',
      },
      borderRadius: {
        'DEFAULT': '6px',
        'lg': '8px',
      },
      transitionDuration: {
        'DEFAULT': '150ms',
        '200': '200ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'ease-in-out',
      },
    },
  },
  plugins: [],
}

