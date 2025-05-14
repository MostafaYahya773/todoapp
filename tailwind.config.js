/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primaryColor: '#FF6767',
      blackColor: '#000000',
      whiteColor: '#ffffff',
      textColor: '#747474',
      completedColor: '#05A301',
      inProgressColor: '#0225FF',
      notStartedColor: '#F21E1E',
    },
  },
  plugins: [],
};
