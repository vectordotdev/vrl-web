import { useState } from "react";
import useDarkMode, { DarkMode } from "use-dark-mode";
import { VectorDarkIcon } from "../icons/VectorDarkIcon";
import { VectorLightIcon } from "../icons/VectorLightIcon";
import { darkModeConfig, darkModeUserPreference } from "../mode";
import { Scenario, state } from "../state";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const ScenarioSelector = () => {
  const scenarios: Scenario[] = state.store(s => s.scenarios);
  const current: Scenario = state.store(s => s.scenario);
  const setScenario: (idx: number) => void = state.store(s => s.setScenario);

  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  const selectScenario = (id: number) => {
    setScenario(id);
    setOpen(false);
  }

  return <div className="relative inline-block text-left">
    <div>
      <button onClick={toggleOpen} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
        {scenarios[0].title}
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    {open && (
      <div
        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}>

        <div className="py-1" role="none">
          {scenarios.map((scenario: Scenario, idx: number) => (
            <button
              onClick={() => selectScenario(idx)}
              className={`block px-4 py-2 text-sm ${idx === current.id ? `bg-gray-100 text-gray-900` : `text-gray-700`}`}
              role="menuitem"
              id={`menu-item-${idx}`}
              tabIndex={-1}>
              {scenario.title}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
}

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

  return <nav className="flex items-center justify-between shadow-md h-16">
    <div>
      <p className="text-xl tracking-tight font-semibold">
        {vectorIcon}
      </p>
    </div>

    <div className="flex items-center space-x-6">
      <span className="text-lg text-black dark:text-gray-200 tracking-tight">
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