import { VRL_RESOLVE_ENDPOINT } from '../values';
import { Context } from '../state';

import axios from "axios";
import { useContext } from "react";

export function Main() {
  const { eventState, programState, outputState, resultState } = useContext(Context);
  const [event] = eventState;
  const [program] = programState;
  const [output, setOutput] = outputState;
  const [result, setResult] = resultState;

  function resolve() {
    const resolvePayload = { event, program };

    axios.post(VRL_RESOLVE_ENDPOINT, resolvePayload)
      .then(res => {
        const result = res.data;

        console.log(result.success);
        if (result.success) {
          setOutput(result.success.output);
          setResult(result.success.result);
        }
      });
  }

  return <main>
    <p className="title">
      Event
    </p>
    
    <pre>
      {JSON.stringify(event, null, 2)}
    </pre>

    <p className="title">
      Program
    </p>

    <pre>
      {program}
    </pre>

    {output && (
      <>
        <div>
        <p className="title">
            Output
          </p>

          <pre>
            {JSON.stringify(output, null, 2)}
          </pre>
        </div>

        {result && (
          <div>
            <p className="title">
              Resolved
            </p>

            <pre>
              {JSON.stringify(result)}
            </pre>
          </div>
        )}
      </>
    )}

    {!output && !result && (
      <div className="mt-8">
        <button onClick={resolve}>
          Resolve
        </button>
      </div>
    )}
  </main>
}