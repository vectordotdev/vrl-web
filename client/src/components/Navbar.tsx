import useDarkMode, { DarkMode } from "use-dark-mode";
import { darkModeUserPreference, Scenario, state } from "../state";

export const Navbar = () => {
  const darkMode: DarkMode = useDarkMode(darkModeUserPreference);
  const scenarios: Scenario[] = state(s => s.scenarios);
  const setScenario: (idx: number) => void = state(s => s.setScenario);

  const buttonText: string = (darkMode.value) ? "Light" : "Dark";

  return <nav className="flex items-center justify-between shadow-md">
    <div>
      <p className="text-xl tracking-tight font-semibold">
        <a href="/">
          The VRL Playground
        </a>
      </p>
    </div>

    <div className="flex space-x-8">
      <button onClick={darkMode.toggle} className="font-bold toggler">
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