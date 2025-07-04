import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './nuxt.config.{ts,js}',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        light: {
          one: '#222',
          two: '#444',
          bg:  '#eee',
          soft: '#f3f4f6'
        },
        dark: {
          one: '#f1f5f9',
          two: '#cbd5e1',
          bg:  '#0f172a',
          soft: '#1e293b'
        }
      }
    }
  },
  plugins: []
};

export default config;
