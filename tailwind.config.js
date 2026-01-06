/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#dcf1ff',
          200: '#bce4ff',
          300: '#8ed2ff',
          400: '#59b8ff',
          500: '#2e9aff',
          600: '#0073aa', // Bluehost Primary Blue
          700: '#005b8a',
          800: '#004d73',
          900: '#004060', // Darker Blue for depth
          950: '#00293f',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#2e3a46', // Bluehost Dark Footer/Text
          900: '#111827',
          950: '#030712',
        },
        success: {
          50: '#ecfdf5',
          600: '#25cc62', // Action Green
          700: '#15803d',
        }
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'float': '0 20px 60px rgba(0, 77, 115, 0.15)', // Blue-tinted shadow for emphasis
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
