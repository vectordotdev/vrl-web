import data from "./scenarios.yaml";
import axios from "axios";
import { createGlobalState } from 'react-hooks-global-state';

var n = 0;
const initialState = { scenario: data[n], output: null, resolved: null };
const { useGlobalState } = createGlobalState(initialState);

function Navbar() {
  const [resolved, setResolved] = useGlobalState('resolved');
  const [output, setOutput] = useGlobalState('output');
  const [scenario, setScenario] = useGlobalState('scenario');

  function updateScenario(id) {
    const scenario = data.filter(s => s.id === id)[0];
    setScenario(scenario);
    setResolved(null);
    setOutput(null);
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
      {JSON.stringify(props)}
    </span>
  </div>
}

function Main(props) {
  const [resolved, setResolved] = useGlobalState('resolved');
  const [output, setOutput] = useGlobalState('output');

  function resolve() {
    const payload = {
      event: props.scenario.event,
      program: props.scenario.program
    }

    axios.post('http://localhost:8080/resolve', payload)
      .then(res => {
        console.log(res);

        setOutput(res.data.success.output);
        setResolved(res.data.success.result);
      });
  }

  return <div>
    <Event event={props.scenario.event} />

    <Program program={props.scenario.program} />

    {resolved != null && (
      <div>
        <p>
          Resolved
        </p>

        <span>
          {JSON.stringify(resolved)}
        </span>

        {output != null && (
          <div>
            <p>
              Output
            </p>

            <span>
              {JSON.stringify(output)}
            </span>
          </div>
        )}
      </div>
    )}

    <button onClick={resolve}>
      Resolve
    </button>
  </div>
}

export function App() {
  const [scenario] = useGlobalState('scenario');

  return <>
    <Navbar />

    <Main scenario={scenario} />
  </>
}