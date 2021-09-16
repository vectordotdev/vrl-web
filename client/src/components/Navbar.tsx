import { state } from '../state'

export const Navbar = (): JSX.Element => {
  const darkMode: boolean = state(s => s.darkMode);
  const toggleDarkMode: () => void = state(s => s.toggleDarkMode);

  const buttonText: string = (darkMode) ? "Light" : "Dark";

  return <nav>
    <p>
      Navbar
    </p>

    <button onClick={toggleDarkMode}>
      {buttonText}
    </button>
  </nav>
}