/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rail: {
          navy: '#0b1e38',
          blue: '#1d4ed8',
          royal: '#1e40af',
          sky: '#38bdf8',
          crimson: '#dc2626',
          saffron: '#f97316',
          gold: '#eab308',
          emerald: '#10b981',
          track: '#475569',
          light: '#f8fafc',
          cardDark: '#131d2e',
          cardBorder: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    },
  },
  plugins: [],
}
