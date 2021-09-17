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

export const MainWithHash = ({ hash }: Params) => {
  const setScenarioFromHash: (h: string) => void = state(s => s.setScenarioFromHash);

  useEffect(() => {
    setScenarioFromHash(hash);
  });

  return <Main />
}

export const Main = () => {
  const title: string = state(s => s.title);
  const setTitle: (title: string) => void = state(s => s.setTitle);
  const resolve: () => void = state(s => s.resolve);
  const result: Event | null = state(s => s.result);
  const output: Output | null = state(s => s.output);

  const defaultTitleText = "My VRL scenario"
 
  return <>
    <main>
      <div className="py-2">
        <EditText
          value={title}
          onChange={setTitle}
          className="text-3xl font-semibold dark:text-white focus:bg-gray-200
           dark:focus:bg-gray-300 dark:focus:text-black dark:focus:ring-0"
          onSave={(p: onSaveProps) => {
            if (p.value.length == 0) {
              setTitle(defaultTitleText);
            }
          }}
        />
      </div>

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