import { useEffect } from "react";
import useDarkMode, { DarkMode, DarkModeConfig } from "use-dark-mode";
import { darkModeConfig, darkModeUserPreference, Scenario, state } from "../state";

export const Navbar = () => {
  const setTheme: (t: boolean) => void = state(s => s.setTheme);
  const darkMode: DarkMode = useDarkMode(darkModeUserPreference, darkModeConfig);
  const scenarios: Scenario[] = state(s => s.scenarios);
  const setScenario: (idx: number) => void = state(s => s.setScenario);
  const buttonText: string = (darkMode.value) ? "Light" : "Dark";

  const darkModeToggle = () => {
    darkMode.toggle();
    setTheme(darkMode.value);
  }

  return <nav className="flex items-center justify-between shadow-md">
    <div>
      <p className="text-xl tracking-tight font-semibold">
        <a href="/">
          The VRL Playground
        </a>
      </p>
    </div>

    <div className="flex space-x-8">
      <button onClick={darkModeToggle} className="font-bold toggler">
        {buttonText}
      </button>

      <ul className="flex items-center space-x-3">
        {scenarios.map((s: Scenario, idx: number) => (
          <li key={idx}>
            <button onClick={() => setScenario(idx)}>
              {s.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </nav>
}