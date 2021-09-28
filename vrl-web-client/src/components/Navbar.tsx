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

  return <nav className="flex items-center justify-between py-5 px-8 bg-gray-100 dark:bg-black shadow-sm">
    <div className="h-12">
      {vectorIcon}
    </div>

    <div className="flex items-center space-x-4">
      <span className="text-lg text-black font-semibold dark:text-gray-200 tracking-tight">
        The VRL Playground
      </span>

      <button onClick={darkModeToggle} className="font-bold toggler">
        {darkMode.value ?
          <SunIcon className="h-6 w-6 text-yellow-400" /> :
          <MoonIcon className="h-6 w-6 text-blue-500" />}
      </button>

      <ScenarioSelector />
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

  return <div className="relative inline-block text-left">
    <div>
      <button onClick={toggleOpen} type="button" className="inline-flex space-x-2 items-center justify-center w-full rounded-sm border border-gray-300 dark:border-gray-800 shadow-sm px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary" id="menu-button" aria-expanded="true" aria-haspopup="true">
        <span className="text-lg text-gray-700 dark:text-gray-300 truncate tracking-tight">
          Built-in scenarios
        </span>
        <ChevronDownIcon className="h-5 w-5 text-secondary dark:text-primary" />
      </button>
    </div>

    {open && (
      <div
        className="z-50 origin-top-right absolute right-0 mt-3 w-56 shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}>

        <ul className="py-1" role="none">
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