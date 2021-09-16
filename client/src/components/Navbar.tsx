import { useStore } from '../state'

export const Navbar = (): JSX.Element => {
  const darkMode: boolean = useStore(s => s.darkMode);
  const toggleDarkMode: () => void = useStore(s => s.toggleDarkMode);

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