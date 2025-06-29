/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'system-ui', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        display: ['Playfair Display', 'serif'],
        handwriting: ['Playwrite GB S', 'cursive'],
        pixel: ['Tiny5', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      lineHeight: {
        'relaxed': '1.75',
      },
    },
    fontFamily: {
      'sans': ['Prompt', 'system-ui', 'sans-serif'],
      'prompt': ['Prompt', 'sans-serif'],
      'mono': ['Geist Mono', 'monospace'],
      'display': ['Playfair Display', 'serif'],
      'handwriting': ['Playwrite GB S', 'cursive'],
      'pixel': ['Tiny5', 'monospace'],
    },
  },
  plugins: [],
  corePlugins: {
    fontFamily: true,
  },
};