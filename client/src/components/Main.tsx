import { Event, Output, Program, Scenario, state } from "../state";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Export } from "./Export";
import Editor from '@monaco-editor/react';

const EDITOR_OPTIONS = {}

const EventEditor = (): JSX.Element => {
  const event: Event = state(s => s.event)
  const setEvent: (s: string) => void = state(s => s.setEvent);

  const onEventChange = (val: string) => {
    setEvent(val);
  }

  return <div>
    <p className="title">
      Event
    </p>

    <Editor
      height="400px"
      language="json"
      theme="vs-dark"
      onChange={onEventChange}
      value={JSON.stringify(event, null, 2)}
      options={EDITOR_OPTIONS}
    />
  </div>
}

const ProgramEditor = (): JSX.Element => {
  const program: Program = state(s => s.program);
  const setProgram: (s: string) => void = state(s => s.setProgram);

  const onEventChange = (val: string) => {
    setProgram(val);
  }

  return <div>
    <p className="title">
      Program
    </p>

    <Editor
      height="400px"
      language="ruby"
      theme="vs-dark"
      value={program}
      options={EDITOR_OPTIONS}
      onChange={onEventChange}
    />
  </div>
}

const Result = (): JSX.Element => {
  const result: Event | null = state(s => s.result);

  return <>
    {result && <div>
      <p className="title">
        Result
      </p>
      
      <Editor
        height="400px"
        language="ruby"
        theme="vs-dark"
        readOnly={true}
        value={JSON.stringify(result)}
        options={EDITOR_OPTIONS}
      />
    </div>}
  </>
}

const Out = (): JSX.Element => {
  const output: Output | null = state(s => s.output);

  return <>
    {output != null && <div>
      <p className="title">
        Output
      </p>
      
      <Editor
        height="400px"
        language="ruby"
        theme="vs-dark"
        readOnly={true}
        value={JSON.stringify(output)}
        options={EDITOR_OPTIONS}
      />
    </div>}
  </>
}

const ErrorDisplay = (): JSX.Element => {
  const errorMsg: string | null = state(s => s.errorMsg);

  return <div>
    {errorMsg && (
      <p className="text-lg text-red-500">
        {errorMsg}
      </p>
    )}
  </div>
}

export const Main = (): JSX.Element => {
  const { hash } = useParams();
  const setScenarioFromHash: (hash: string) => void = state(s => s.setScenarioFromHash);

  useEffect(() => {
    if (hash != null) {
      setScenarioFromHash(hash);
      window.location.href = '/';
    }
  });

  const title: string = state(s => s.title);
  const resolve: () => void = state(s => s.resolve);
  
  return <>
    <main>
      <p className="text-3xl font-semibold">
        {title}
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-8">
          <EventEditor />

          <ProgramEditor />
        </div>

        <div className="flex flex-col space-y-8">
          <Result />

          <Out />
        </div>
      </div>

      <ErrorDisplay />

      <div className="mt-12">
        <button onClick={() => resolve()}>
          Resolve
        </button>
      </div>
    </main>

    <Export />
  </>  
}