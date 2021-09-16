import { Event, Output, Program, Scenario, state } from "../state";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Export } from "./Export";

const EventEditor = (): JSX.Element => {
  const event: Event = state(s => s.event)

  return <div>
    <p className="text-2xl">
      Event
    </p>

    <p>
      {JSON.stringify(event, null, 2)}
    </p>
  </div>
}

const ProgramEditor = (): JSX.Element => {
  const program: Program = state(s => s.program)

  return <div>
    <p className="text-2xl">
      Program
    </p>

    <p>
      {program}
    </p>
  </div>
}

const Result = (): JSX.Element => {
  const result: Event | null = state(s => s.result);

  return <>
    {result && <div>
      <p className="text-2xl">
        Result
      </p>
      
      <p>
        {JSON.stringify(result)}
      </p>
    </div>}
  </>
}

const Out = (): JSX.Element => {
  const output: Output | null = state(s => s.output);

  return <>
    {output && <div>
      <p className="text-2xl">
        Output
      </p>
      
      <p>
        {JSON.stringify(output)}
      </p>
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