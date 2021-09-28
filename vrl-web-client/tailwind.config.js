module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{js,tsx}", "./src/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#28d9f2",        // Vector blue
        'primary-dark': '#00a9bc', // Vector d
        secondary: "#f44af5",      // Vector magenta
      }
    }
  },
  variants: {},
  plugins: [],
}
