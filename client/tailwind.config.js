/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium color palette
        primary: {
          DEFAULT: '#1E40AF',
          light: '#3B82F6',
          dark: '#1E3A8A',
          hover: '#2563EB',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
          hover: '#FACC15',
        },
        accent: {
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          emerald: '#10B981',
        },
        background: {
          DEFAULT: '#0A0F1E',
          alt: '#0F172A',
        },
        surface: {
          DEFAULT: '#1E293B',
          light: '#334155',
          hover: '#475569',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
          disabled: '#64748B',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1E40AF 0%, #8B5CF6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'gradient-dark': 'linear-gradient(to bottom right, #0F172A, #1E3A8A, #0B1120)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
