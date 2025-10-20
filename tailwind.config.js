/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./.vitepress/**/*.js",
    "./.vitepress/**/*.vue",
    "./.vitepress/**/*.ts",
    "./**/*.md",
  ],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
}
