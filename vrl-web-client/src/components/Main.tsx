import { useEffect } from 'react';
import 'react-edit-text/dist/index.css';

import { ErrorDisplay } from "./ErrorDisplay";
import { EventEditor } from "./EventEditor";
import { ProgramEditor } from "./ProgramEditor";
import { Result } from "./Result";
import { Out } from "./Out";
import { Title } from "./Title";
import { Event, Output, state } from "../state";
import { ErrorHandler } from "./ErrorHandler";
import { Docs } from './Docs';

type Props = {
  hash?: string;
}

export const MainWithHash = ({ hash }: Props) => {
  const setScenarioFromHash: (h: string) => void = state.store(s => s.setScenarioFromHash);

  useEffect(() => {
    setScenarioFromHash(hash);
    window.location.href = '/';
  }, [setScenarioFromHash]);

  return <Main />
}

export const Main = () => {
  const resolve: () => void = state.store(s => s.resolve);
  var event: Event | null = state.store(s => s.event);
  const result: Event | null = state.store(s => s.result);
  const output: Output | null = state.store(s => s.output);

  return <ErrorHandler>
    <main className="flex-grow bg-gray-50 dark:bg-gray-800 py-8 px-6">
      <Title />

      <div className="mt-6 flex flex-col space-y-4">
        <div>
          <p className="title">
            Program
          </p>

          <ProgramEditor />
        </div>

        {event && (
          <div>
            <p className="title">
              Event
            </p>

            <EventEditor event={event} />
          </div>
        )}
      </div>

      {(result || output) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {result && (
            <div>
              <p className="title">
                Result
              </p>

              <Result result={result} />
            </div>
          )}
  
          {output && (
            <div>
              <p className="title">
                Output
              </p>

              <Out output={output} />
            </div>
          )}
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
  </ErrorHandler>  
}