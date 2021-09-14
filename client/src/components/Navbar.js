import data from '../scenarios.yaml';
import { useGlobalState } from "../state";

export function Navbar() {
  const [_resolved, setResolved] = useGlobalState('resolved');
  const [_output, setOutput] = useGlobalState('output');
  const [_scenario, setScenario] = useGlobalState('scenario');

  function updateScenario(id) {
    const scenario = data.filter(s => s.id === id)[0];
    setScenario(scenario);
    setResolved(null);
    setOutput(null);
  }

  return <nav className="bg-gray-200 py-2 px-4">
    <div className="flex justify-between items-center">
      <span className="text-3xl font-bold">
        <a href="/">
          The VRL Playground
        </a>
      </span>

      <ul className="flex space-x-2">
        {data.map(s => (
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