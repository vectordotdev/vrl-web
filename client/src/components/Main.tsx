import { Event, Output, Program, Scenario, state } from "../state";
import { useEffect } from "react";

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

const Hash = (): JSX.Element => {
  const hashUrl: string = state(s => s.hashUrl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashUrl);
  }

  return <div>
    <p>
      Export
    </p>
    
    <div className="flex space-x-10">
      <button onClick={copyToClipboard}>
        Copy URL to clipboard
      </button>

      <a href={hashUrl}>
        Go to URL
      </a>
    </div>
  </div>
}

export const Main = (): JSX.Element => {
  const scenario: Scenario = state(s => s.scenario);
  const resolve: () => void = state(s => s.resolve);
  
  return <main>
    <p className="text-3xl font-semibold">
      {scenario.title}
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

    <div className="mt-8">
      <Hash />
    </div>

    <div className="mt-12">
      <button onClick={() => resolve()}>
        Resolve
      </button>
    </div>
  </main>
}