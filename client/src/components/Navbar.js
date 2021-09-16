import { useContext, useEffect } from "react";
import { Context } from "../state";
import { SCENARIOS } from "../values";

export const Navbar = () => {
  const { darkModeState, titleState, eventState, programState, outputState, resultState, errorState } = useContext(Context);
  const [darkMode, setDarkMode] = darkModeState;
  const [, setTitle] = titleState; 
  const [, setEvent] = eventState;
  const [, setProgram] = programState;
  const [, setOutput] = outputState;
  const [, setResult] = resultState;
  const [, setErrorMsg] = errorState;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const updateScenario = id => {
    const scenario = SCENARIOS.filter(s => s.id === id)[0];
    setTitle(scenario.title);
    setEvent(scenario.event);
    setProgram(scenario.program);
    setOutput(null);
    setResult(null);
    setErrorMsg(null);
  }

  const modeButtonText = (darkMode) ? "light" : "dark";

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return <nav className="bg-gray-200 py-4 px-8 dark:bg-gray-600">
    <div className="flex justify-between items-center">
      <span className="text-2xl font-bold tracking-tight dark:text-gray-100">
        <a href="/">
          The Vector Remap Language Playground {darkMode}
        </a>
      </span>

      <ul className="flex space-x-2 items-center">
        <li>
          <button
            className={`pr-3 font-bold text-lg ${darkMode ? "text-yellow-400 hover:text-gray-200" : "text-black hover:text-gray-600"}`}
            onClick={handleDarkMode}>

            Switch to {modeButtonText}
          </button>
        </li>

        {SCENARIOS.map(s => (
          <li key={s.id} className="hover:text-gray-700">
            <button className="button" onClick={() => updateScenario(s.id)}>
              {s.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </nav>
}