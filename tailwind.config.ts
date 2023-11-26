import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '1xl': '1.4rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
        '4xl': '2.25rem',
        '5xl': '2.7rem',
        '6xl': '3.25rem',
        '7xl': '3.75rem',
        '8xl': '5rem',
        '9xl': '6rem',
      },

      width: {
        '992': '992px',
        '1200': '1200px',
      },

      maxWidth: {
        '1200': '1200px',
      },

      minWidth: {
        '50': '50px',
      },

      borderWidth: {
        'b-1': '1px',
      },

      borderRadius: {
        xm: '4px',
      },

      zIndex: {
        '5000': '5000',
      },

      backgroundImage: {
        apeach1: "url('/user.png')",
        apeach2: "url('/user2.png')",
      },

      scale: {
        0.97: '0.97',
      },

      gridTemplateColumns: {
        'repeat-8': 'repeat(auto-fill, minmax(320px, 1fr));',
      },

      boxShadow: {
        custom: '0px 3px 8px rgba(0, 0, 0, 0.24)',
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
