module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{js,tsx}", "./src/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#28d9f2",   // Vector blue
        secondary: "#f44af5", // Vector magenta
      }
    }
  },
  variants: {},
  plugins: [],
}
