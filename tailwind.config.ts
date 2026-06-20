import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        "text-primary": "var(--color-text-primary)",
        "text-muted": "var(--color-text-muted)",
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        success: "var(--color-success)",
        "result-bg": "var(--color-result-bg)",
      },
      fontFamily: {
        sans: ['"Segoe UI Variable"', '"Segoe UI"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Segoe UI Variable"', '"Segoe UI"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Consolas', '"Courier New"', 'monospace'],
      },
      borderRadius: {
        xl: "4px",
        lg: "4px",
        md: "4px",
        sm: "2px",
      },
      boxShadow: {
        sm: "0 2px 4px rgba(0,0,0,0.04), 0 0 2px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
