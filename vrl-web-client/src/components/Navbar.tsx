import { useState } from "react";
import useDarkMode, { DarkMode } from "use-dark-mode";
import { VectorDarkIcon } from "../icons/VectorDarkIcon";
import { VectorLightIcon } from "../icons/VectorLightIcon";
import { darkModeConfig, darkModeUserPreference } from "../mode";
import { Scenario, state } from "../state";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@heroicons/react/solid";

export const Navbar = () => {
  const darkMode: DarkMode = useDarkMode(darkModeUserPreference, darkModeConfig);
  const setTheme: (t: boolean) => void = state.store(s => s.setTheme);

  const vectorIcon: JSX.Element = (darkMode.value) ?
    <VectorDarkIcon /> :
    <VectorLightIcon />;

  const darkModeToggle = () => {
    darkMode.toggle();
    setTheme(darkMode.value);
  }

  return <nav className="navbar">
    <div className="menu">
      <div className="brand">
        {vectorIcon}
      </div>

      <div className="sub-menu">
        <span className="site-title">
          The VRL Playground
        </span>

        <ScenarioSelector />

        <button onClick={darkModeToggle} className="toggler">
          {darkMode.value ?
            <SunIcon className="sun-icon" /> :
            <MoonIcon className="moon-icon" />}
        </button>
      </div>
    </div>
  </nav>
}

const ScenarioSelector = () => {
  const scenarios: Scenario[] = state.store(s => s.scenarios);
  const setScenario: (idx: number) => void = state.store(s => s.setScenario);

  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const selectScenario = (id: number) => {
    setScenario(id);
    setOpen(false);
  };

  return <div className="toggler">
    <div>
      <button
        className="toggle"
        onClick={toggleOpen} type="button" id="menu-button" aria-expanded="true" aria-haspopup="true">
        <span className="title">
          Built-in scenarios
        </span>
        <ChevronDownIcon className="chevron" />
      </button>
    </div>

    {open && (
      <div
        className="dropdown"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}>

        <ul role="none">
          {scenarios.map((scenario: Scenario, idx: number) => (
            <li className="block hover:bg-gray-50 dark:hover:bg-gray-700">
              <button
                onClick={() => selectScenario(idx)}
                className="block px-4 py-2 text-sm dark:text-gray-200"
                role="menuitem"
                id={`menu-item-${idx}`}
                tabIndex={-1}>
                {scenario.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>;
}