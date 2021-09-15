import { HOST, VRL_RESOLVE_ENDPOINT } from '../values';
import { Context } from '../state';

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router';

export const Main = () => {
  const [hashUrl, setHashUrl] = useState(null);

  const { hash } = useParams();

  const { titleState, eventState, programState, outputState, resultState, errorState } = useContext(Context);
  const [title, setTitle] = titleState;
  const [event, setEvent] = eventState;
  const [program, setProgram] = programState;
  const [output, setOutput] = outputState;
  const [result, setResult] = resultState;
  const [errorMsg, setErrorMsg] = errorState;

  useEffect(() => {
    if (hash != null) {
      const h = atob(hash);
      const obj = JSON.parse(h);
      setTitle(obj.title);
      setEvent(obj.event);
      setProgram(obj.program);
      setOutput(obj.output);
      setResult(obj.result);
    }
  }, [setTitle, setEvent, setProgram, setOutput, setResult]);

  const resolve = () => {
    const resolvePayload = { event, program };

    axios.post(VRL_RESOLVE_ENDPOINT, resolvePayload)
      .then(res => {
        const result = res.data;

        if (result.success) {
          setOutput(result.success.output);
          setResult(result.success.result);
        } else if (result.error) {
          setErrorMsg(result.error);
        }
      })
      .catch(e => {
        const msg = `Server error: ${e}`;
        setErrorMsg(msg);
      });
  }

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(hashUrl);
  }

  const exportHash = () => {
    const hashable = { title, event, program, output, result };
    const s = JSON.stringify(hashable);
    console.log(s);
    const hashed = btoa(s);
    const url = `${HOST}/h/${hashed}`;
    setHashUrl(url);
    setErrorMsg(null);
  }

  return <main>
    <p className="text-3xl mb-6">
      {title}
    </p>

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

    {errorMsg && (
      <p className="text-xl text-red-500 font-bold">
        {errorMsg}
      </p>
    )}

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
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </>
    )}

    {hashUrl && (
      <div>
        <pre>
          {hashUrl}
        </pre>

        <div className="flex space-x-2">
          <button onClick={copyUrlToClipboard}>
            Copy URL to clipboard
          </button>

          <button onClick={() => window.location = hashUrl}>
            Navigate to exported URL
          </button>
        </div>
      </div>
    )}

    <div className="mt-8 flex space-x-2">
      {!output && !result && (
        <button onClick={resolve}>
          Resolve
        </button>
      )}

      <button onClick={exportHash}>
        Export
      </button>
    </div>
  </main>
}