import data from "./scenarios.yaml";
import { createGlobalState } from 'react-hooks-global-state';

var n = 0;
const initialState = { scenario: data[n] };
const { useGlobalState } = createGlobalState(initialState);

function Navbar() {
  const [scenario, setScenario] = useGlobalState('scenario');

  function updateScenario(id) {
    const scenario = data.filter(s => s.id === id)[0];
    setScenario(scenario);
  }

  return <nav>
    <span>
      The VRL Playground
    </span>

    <ul>
      {data.map(s => (
        <li key={s.id}>
          <button onClick={() => updateScenario(s.id)}>
            {s.title}
          </button>
        </li>
      ))}
    </ul>
  </nav>
}

function Event(props) {
  return <div>
    <p>
      Event
    </p>

    <span>
      {JSON.stringify(props.event)}
    </span>
  </div>
}

function Program(props) {
  return <div>
    <p>
      Program
    </p>

    <span>
      {props.program}
    </span>
  </div>
}

function Main(props) {
  return <div>
    <Event event={props.scenario.event} />

    <Program program={props.scenario.program} />
  </div>
}

export function App() {
  const [scenario] = useGlobalState('scenario');

  return <>
    <Navbar />

    <Main scenario={scenario} />
  </>
}