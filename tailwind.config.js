/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.js', './src/**/*.ts', './src/**/*.jsx', './src/**/*.tsx', './src/**/*.mdx'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
