import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        apeach1: "url('/user.png')",
        apeach2: "url('/user2.png')",
      },

      gridTemplateColumns: {
        'repeat-8': 'repeat(auto-fill, minmax(320px, 1fr));',
      },

      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUpFromBottom: 'slideUpFromBottom 0.3s ease-out 0s 1',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        slideUpFromBottom: {
          '0%': {
            transform: 'translateY(70%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
