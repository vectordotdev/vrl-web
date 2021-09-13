import data from "./scenarios.yaml";
import axios from "axios";
import { createGlobalState } from 'react-hooks-global-state';
import './style.css';

const initialState = { scenario: data[0], output: null, resolved: null };
const { useGlobalState } = createGlobalState(initialState);
const vrlWebServerAddress = process.env.VRL_WEB_SERVER_ADDRESS;
const resolveEndpoint = `${vrlWebServerAddress}/resolve`;
const functionsEndpoint = `${vrlWebServerAddress}/functions`;

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

  return <nav className="bg-gray-200 py-2 px-4">
    <div className="flex justify-between items-center">
      <span className="text-3xl font-bold">
        The VRL Playground
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

function Event(props) {
  return <div>
    <p className="text-lg font-semibold">
      Event
    </p>

    <Code code={props.event} />
  </div>
}

function Program(props) {
  return <div>
    <p className="text-lg font-semibold">
      Program
    </p>

    <Code code={props.program} />
  </div>
}

function Code(props) {
  const formatted = (typeof props.code === 'object') ? JSON.stringify(props.code, null, 2) : props.code;

  return <pre className="font-mono bg-black text-white p-3 text-sm rounded">
    {formatted}
  </pre>
}

function Main(props) {
  const [resolved, setResolved] = useGlobalState('resolved');
  const [output, setOutput] = useGlobalState('output');

  function resolve() {
    const payload = {
      event: props.scenario.event,
      program: props.scenario.program
    }

    axios.post(resolveEndpoint, payload)
      .then(res => {
        console.log(res);

        setOutput(res.data.success.output);
        setResolved(res.data.success.result);
      });
  }

  return <div className="p-4">
    <div className="grid grid-cols-2 gap-x-8">
      <Event event={props.scenario.event} />

      <Program program={props.scenario.program} />
    </div>

    <div className="mt-4 grid grid-cols-2 gap-x-8">
      {resolved != null && (
        <>
          <div>
            <p className="text-lg font-semibold">
              Resolved
            </p>

            <Code code={resolved} />
          </div>

          {output != null && (
            <div>
              <p className="text-lg font-semibold">
                Output
              </p>

              <Code code={output} />
            </div>
          )}
        </>
      )}
    </div>

    <div className="mt-6">
      <button onClick={resolve} className="border py-1.5 px-2 rounded-md bg-gray-200">
        Resolve
      </button>
    </div>
  </div>
}

export function App() {
  const [scenario] = useGlobalState('scenario');

  return <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
    <Navbar />

    <Main scenario={scenario} />
  </div>
}