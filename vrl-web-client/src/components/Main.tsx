import { useEffect } from 'react';
import 'react-edit-text/dist/index.css';

import { Event, Output, state } from "../data/state";

import { ErrorHandler } from "./ErrorHandler";
import { EventEditor } from "./EventEditor";
import { Out } from "./Out";
import { ProgramEditor } from "./ProgramEditor";
import { Title } from "./Title";

type Props = {
  hash?: string;
}

export const Main = ({ hash }: Props) => {
  const resolve: () => void = state.store(s => s.resolve);
  var event: Event | null = state.store(s => s.event);
  const output: Output | null = state.store(s => s.output);
  var errorMsg: string | null = state.store(s => s.errorMsg);

  if (hash) {
    const setScenarioFromHash: (h: string) => void = state.store(s => s.setScenarioFromHash);

    useEffect(() => {
      setScenarioFromHash(hash);
      window.location.href = '/';
    }, [setScenarioFromHash]);
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

            <ProgramEditor />
          </div>

          <div className="cell">
            <div className="event-title">
              <span className={event ? "event" : "no-event"}>
                Event
              </span>
            </div>

            <EventEditor event={event} />
          </div>
        </div>

        <div>
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

            <Out />
          </div>
        </div>
      </div>
    </main>
  </ErrorHandler>  
}