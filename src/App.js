import data from "./scenarios.yaml";
import { createGlobalState } from 'react-hooks-global-state';

var n = 0;
const initialState = { scenario: data[n] };
const { useGlobalState } = createGlobalState(initialState);

export function App() {
  const [scenario, setScenario] = useGlobalState('scenario');

  const changeScenario = () => {
    n = (n == 0) ? 1 : 0;
    setScenario(data[n]);
  }

  return <>
    <h1>
      The VRL Playground
    </h1>

    <p>
      {JSON.stringify(scenario)}
    </p>

    <button onClick={changeScenario}>
      Change it up
    </button>
  </>
}