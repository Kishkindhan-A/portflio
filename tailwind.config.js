/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          50:  '#FAFCFF',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        // Premium Emerald Green Accent (accessible contrast on white)
        emerald: {
          glow:  '#10B981',
          light: '#059669',
          dim:   '#047857',
        },
        // Secondary Sky / Electric Blue
        sky: {
          accent: '#0284C7',
          dim:    '#0369A1',
        },
        // Status
        status: {
          green:  '#059669',
          orange: '#D97706',
        },
        // High-contrast foregrounds for white canvas
        fg: {
          primary:  '#0F172A',
          muted:    '#475569',
          subtle:   '#64748B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-green': '0 0 24px rgba(16, 185, 129, 0.22)',
        'glow-sky':   '0 0 24px rgba(2, 132, 199, 0.18)',
        'card':       '0 2px 10px rgba(15, 23, 42, 0.03), 0 12px 32px -4px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 8px 24px rgba(15, 23, 42, 0.06), 0 20px 48px -6px rgba(15, 23, 42, 0.1)',
        'glass':      '0 4px 20px rgba(15, 23, 42, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':  'spin 18s linear infinite',
        scan:         'scan 2.4s ease-in-out infinite',
        float:        'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { opacity: '0.35' },
          '50%':      { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
