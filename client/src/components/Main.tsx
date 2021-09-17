import 'react-edit-text/dist/index.css';

import { ErrorDisplay } from "./ErrorDisplay";
import { Export } from "./Export";
import { EventEditor } from "./EventEditor";
import { ProgramEditor } from "./ProgramEditor";
import { Result } from "./Result";
import { Out } from "./Out";
import { Title } from "./Title";
import { Event, Output, state } from "../state";
import { ErrorHandler } from "./ErrorHandler";
import { useEffect } from 'react';

type Props = {
  hash?: string;
}

export const MainWithHash = ({ hash }: Props) => {
  const setScenarioFromHash: (h: string) => void = state(s => s.setScenarioFromHash);

  useEffect(() => {
    setScenarioFromHash(hash);
    window.location.href = '/';
  });

  return <Main />
}

export const Main = () => {
  const resolve: () => void = state(s => s.resolve);
  const result: Event | null = state(s => s.result);
  const output: Output | null = state(s => s.output);

  return <ErrorHandler>
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
  </ErrorHandler>  
}