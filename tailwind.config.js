<<<<<<< HEAD
// tailwind.config.js
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {},
};
export const plugins = [require('tailwindcss-primeui')];
=======
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primaryyellow: '#debc3b', /* Bleu */
        primaryorange: '#cf8103', /* Jaune */
        primarybrown: '#774a02', /* Fond clair */
        primarygreen: '#818b35', /* Texte foncé */
        secondarygreen: '#d0cba4',
      },
    },
  },
  plugins: [],
}

>>>>>>> origin/develop
