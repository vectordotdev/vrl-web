import { useEffect } from 'react';
import 'react-edit-text/dist/index.css';
import { Event, Output, state } from "../data/state";
import { ErrorHandler } from "./ErrorHandler";
import { EventEditor } from "./EventEditor";
import { Out } from "./Out";
import { ProgramEditor } from "./ProgramEditor";
import { Result } from './Result';
import { Title } from "./Title";

export type Props = {
  hash?: string;
  scenarioId?: string;
}

export const Main = ({ hash, scenarioId }: Props) => {
  const resolve: () => void = state.store(s => s.resolve);
  var event: Event | null = state.store(s => s.event);
  const output: Output | null = state.store(s => s.output);
  const result: Event | null = state.store(s => s.result);
  var errorMsg: string | null = state.store(s => s.errorMsg);

  const resetPath = () => {
    window.location.href = '/';
  }

  if (hash) {
    const setScenarioFromHash: (h: string) => void = state.store(s => s.setScenarioFromHash);

    useEffect(() => {
      setScenarioFromHash(hash);
      resetPath();
    }, [setScenarioFromHash]);
  }

  if (scenarioId) {
    const id: number = parseInt(scenarioId);
    const setScenario: (id: number) => void = state.store(s => s.setScenario);

    useEffect(() => {
      setScenario(id);
      resetPath();
    }, [setScenario]);
  }

  return <ErrorHandler>
    <main>
      <div className="inner">
        <div className="top-container">
          <Title />

          <button onClick={resolve} className="resolve">
            Resolve
          </button>
        </div>

        <div className="main-grid">
          <div className="cell">
            <p className="cell-title">
              Program
            </p>

            <p className="text">
              The VRL program to run against the target event
            </p>

            <ProgramEditor />
          </div>

          <div className="cell">
            <div className="event-title">
              <span className={event ? "event" : "no-event"}>
                Event
              </span>
            </div>

            <p className={event ? "text" : "text-light"}>
              The Vector event targeted by the VRL program
            </p>

            <EventEditor event={event} />
          </div>
        </div>

        <div className="main-grid">
          <div className="cell">
            <div className="event-title">
              <span className={result ? "event" : "no-event"}>
                Result
              </span>
            </div>

            <p className={result ? "text" : "text-light"}>
              The resulting event after the supplied program has been applied to the supplied{!result && (" — click Resolve to see the result")}
            </p>

            {result && (
              <Result result={result} />
            )}
          </div>

          <div className="cell">
            <div className="output-title">
              <span className={(output || errorMsg) ? "output" : "no-output"}>
                Output
              </span>

              {errorMsg && (
                <span className="sirens">
                  🚨 error 🚨
                </span>
              )}
            </div>

            <p className={output ? "text" : "text-light"}>
              The output of the program applied to the event (the result of the last expression in the program).{!output && (" — click Resolve to see the output")}
            </p>

            <Out />
          </div>
        </div>
      </div>

      {/*
      <div className="mt-10">
        <Help />
      </div>
      */}
    </main>
  </ErrorHandler>  
}