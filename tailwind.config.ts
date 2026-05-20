import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}

export default config
