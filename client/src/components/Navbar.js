import { useContext } from "react";
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

  const updateScenario = id => {
    const scenario = SCENARIOS.filter(s => s.id === id)[0];
    setTitle(scenario.title);
    setEvent(scenario.event);
    setProgram(scenario.program);
    setOutput(null);
    setResult(null);
    setErrorMsg(null);
  }

  return <nav className="bg-gray-200 py-2 px-4">
    <div className="flex justify-between items-center">
      <span className="text-2xl font-bold tracking-tight">
        <a href="/">
          The Vector Remap Language Playground {darkMode}
        </a>
      </span>

      <ul className="flex space-x-2">
        {SCENARIOS.map(s => (
          <li key={s.id} className="hover:text-gray-700">
            <button onClick={() => updateScenario(s.id)}>
              {s.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </nav>
}