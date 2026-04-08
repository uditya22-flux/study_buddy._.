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
        primary: {
          DEFAULT: "#6366f1", // Indigo
          dark: "#818cf8",
        },
        secondary: {
          DEFAULT: "#8b5cf6", // Purple
          dark: "#a78bfa",
        },
        background: {
          light: "#f4f5f7",
          dark: "#0f0f1a",
        },
        surface: {
          light: "#ffffff",
          dark: "#1a1a2e",
        },
        accent: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          green: "#10b981",
          amber: "#f59e0b",
          coral: "#ef4444",
          teal: "#14b8a6",
          pink: "#ec4899",
          orange: "#f97316",
        },
        text: {
          primary: {
            light: "#1a1a2e",
            dark: "#e2e2f0",
          },
          muted: {
            light: "#6b7280",
            dark: "#9ca3af",
          }
        }
      },
      borderRadius: {
        's': '8px',
        'm': '12px',
        'l': '16px',
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(99, 102, 241, 0.25)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}
