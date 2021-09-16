import { computeHash } from '../helpers';
import { Context, key } from '../state';
import { EDITOR_OPTIONS, HOST, VRL_RESOLVE_ENDPOINT } from '../values';
import { Help } from './Help';

import axios from "axios";
import { useContext, useEffect } from "react";
import { useParams } from 'react-router';
import Editor from '@monaco-editor/react';
import useLocalStorage from 'use-local-storage';

const keys = {
  hashUrl: key("hash_url"),
}

export const Main = () => {
  // Optional URL parameter for the /h/:hash endpoint
  const { hash } = useParams();

  // Global state hooks
  const { titleState, eventState, programState, outputState, resultState, errorState, } = useContext(Context);
  const [title, setTitle] = titleState;
  const [event, setEvent] = eventState;
  const [program, setProgram] = programState;
  const [output, setOutput] = outputState;
  const [result, setResult] = resultState;
  const [errorMsg, setErrorMsg] = errorState;

  // Hooks specific to this component
  const [hashUrl, setHashUrl] = useLocalStorage(keys.hashUrl, null);

  // If a hash is supplied via the /h/:hash endpoint, set the global state accordingly
  const getHashedScenario = (h) => {
    return JSON.parse(atob(h));
  }

  const setScenario = (scenario) => {
    setTitle(scenario.title);
    setEvent(scenario.event);
    setProgram(scenario.program);
    setOutput(scenario.output);
    setResult(scenario.result);
  }

  useEffect(() => {
    if (hash != null) {
      const scenario = getHashedScenario(hash);
      setScenario(scenario);
    }
  }, [setTitle, setEvent, setProgram, setOutput, setResult]);

  // Resolve the event+program by POSTing to the VRL server's /resolve endpoint
  const resolve = () => {
    const resolvePayload = { event, program };

    axios.post(VRL_RESOLVE_ENDPOINT, resolvePayload)
      .then(res => {
        const result = res.data;

        if (result.success) {
          setOutput(result.success.output);
          setResult(result.success.result);
          setErrorMsg(null);
        } else if (result.error) {
          setErrorMsg(result.error);
          setResult(null);
          setOutput(null);
        }
      })
      .catch(e => {
        const msg = `Server error: ${e}`;
        setErrorMsg(msg);
        setResult(null);
        setOutput(null);
      });
  }

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(hashUrl);
  }

  const exportHash = () => {
    const hashed = computeHash(title, event, program, output, result);
    const url = `${HOST}/h/${hashed}`;
    setHashUrl(url);
    setErrorMsg(null);
  }

  const onProgramChange = (val) => {
    setProgram(val);
  }

  const onEventChange = (val) => {
    setEvent(JSON.parse(val));
  }

  return <main className="flex-grow py-6 px-4 dark:bg-gray-800 dark:text-gray-100">
    <p className="text-3xl mb-6">
      {title}
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p className="title">
          Event
        </p>
        
        <Editor
          height="400px"
          language="json"
          value={JSON.stringify(event, null, 2)}
          onChange={onEventChange}
          options={EDITOR_OPTIONS}
        />
      </div>

      <div>
        <p className="title">
          Program
        </p>

        <Editor
          height="400px"
          language="ruby"
          value={program}
          onChange={onProgramChange}
          options={EDITOR_OPTIONS}
        />
      </div>
    </div>

    {errorMsg && (
      <p className="text-xl text-red-500 font-bold">
        {errorMsg}
      </p>
    )}

    {output && (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {result && (
          <div>
            <p className="title">
              Resulting event
            </p>

          <Editor
            height="400px"
            language="json"
            value={JSON.stringify(result, null, 2)}
            options={EDITOR_OPTIONS}
          />
          </div>
        )}

        <div>
          <p className="title">
            Output
          </p>

          <Editor
            height="400px"
            language="javascript"
            value={JSON.stringify(output, null, 2)}
            options={EDITOR_OPTIONS}
          />
        </div>
      </div>
    )}

    <div className="mt-8 flex space-x-2">
      <button className="button" onClick={resolve}>
        Resolve
      </button>

      {!errorMsg && (
        <button className="button" onClick={exportHash}>
          Export
        </button>
      )}
    </div>

    {hashUrl && (
      <div className="mt-6">
        <div className="flex space-x-2">
          <button className="button" onClick={copyUrlToClipboard}>
            Copy URL to clipboard
          </button>

          <button className="button" onClick={() => window.location = hashUrl}>
            Navigate to exported URL
          </button>
        </div>
      </div>
    )}

    <Help />
  </main>
}