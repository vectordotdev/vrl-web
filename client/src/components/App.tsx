import '../style.css'
import { useStore } from '../state'
import { useEffect } from 'react'

const Navbar = (): JSX.Element => {
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

const Main = (): JSX.Element => {
  return <main className="flex-grow">
    <p>
      Main
    </p>
  </main>
}

const Footer = (): JSX.Element => {
  return <footer>
    <p>
      Footer
    </p>
  </footer>
}

export const App = (): JSX.Element => {
  const setMode: () => void = useStore(s => s.setMode)

  useEffect(() => {
    setMode();
  });

  return <div className="min-h-screen flex flex-col dark:bg-black">
    <Navbar />

    <Main />

    <Footer />
  </div> 
}