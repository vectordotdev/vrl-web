import { useEffect } from "react";
import { EditText, EditTextarea, onSaveProps } from "react-edit-text";

import 'react-edit-text/dist/index.css';

import { Params } from "./App";
import { ErrorDisplay } from "./ErrorDisplay";
import { Export } from "./Export";
import { EventEditor } from "./EventEditor";
import { ProgramEditor } from "./ProgramEditor";
import { Result } from "./Result";
import { Out } from "./Out";
import { Event, Output, state } from "../state";
import { Title } from "./Title";

export const MainWithHash = ({ hash }: Params) => {
  const setScenarioFromHash: (h: string) => void = state(s => s.setScenarioFromHash);

  useEffect(() => {
    setScenarioFromHash(hash);
  });

  return <Main />
}

export const Main = () => {
  const resolve: () => void = state(s => s.resolve);
  const result: Event | null = state(s => s.result);
  const output: Output | null = state(s => s.output);
 
  return <>
    <main>
      <Title />

      <div className="mt-6 flex flex-col space-y-4">
        <div>
          <p className="title">
            Program
          </p>

          <ProgramEditor />
        </div>

        <div>
          <p className="title">
            Event
          </p>

          <EventEditor />
        </div>
      </div>


      {(result && output) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 space-x-6">
          <div>
            <p className="title">
              Result
            </p>
  
            <Result result={result}/>
          </div>
  
          <div>
            <p className="title">
              Output
            </p>
  
            <Out output={output} />
          </div>
        </div>
      )}

      <div className="mt-4">
        <ErrorDisplay />
      </div>

      <div className="mt-12">
        <button onClick={() => resolve()}>
          Resolve
        </button>
      </div>
    </main>

    <Export />
  </>  
}