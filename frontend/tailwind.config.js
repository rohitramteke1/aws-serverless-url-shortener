/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/css/**/*.css" // 👈 Add this only if you're using @layer component styles
    ],
    theme: {
      extend: {},
    },
    plugins: [
        require('tailwind-scrollbar-hide')
      ],
      
  };
  