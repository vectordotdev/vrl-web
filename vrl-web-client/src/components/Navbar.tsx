import useDarkMode, { DarkMode } from "use-dark-mode";
import { VectorDarkIcon } from "../icons/VectorDarkIcon";
import { VectorLightIcon } from "../icons/VectorLightIcon";
import { darkModeConfig, darkModeUserPreference } from "../mode";
import { Scenario, state } from "../state";

export const Navbar = () => {
  const darkMode: DarkMode = useDarkMode(darkModeUserPreference, darkModeConfig);
  const setTheme: (t: boolean) => void = state.store(s => s.setTheme);
  const scenarios: Scenario[] = state.store(s => s.scenarios);
  const setScenario: (idx: number) => void = state.store(s => s.setScenario);
  const buttonText: string = (darkMode.value) ? "Light" : "Dark";

  const vectorIcon: JSX.Element = (darkMode.value) ?
    <VectorDarkIcon /> :
    <VectorLightIcon />;

  const darkModeToggle = () => {
    darkMode.toggle();
    setTheme(darkMode.value);
  }

  return <nav className="flex items-center justify-between shadow-md h-16">
    <div>
      <p className="text-xl tracking-tight font-semibold">
        {vectorIcon}
      </p>
    </div>

    <div className="flex items-center space-x-8">
      <span className="text-lg text-black dark:text-gray-200 tracking-tight">
        The VRL Playground
      </span>

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