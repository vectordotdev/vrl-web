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

  return <ErrorHandler>
    <main>
      <div className="container">
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
            <p className="cell-title">
              Event
            </p>

            <EventEditor event={event} />
          </div>
        </div>

        <div className="mt-4">
          <ErrorDisplay />
        </div>
      </div>
    </main>
  </ErrorHandler>  
}