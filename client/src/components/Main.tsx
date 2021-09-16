import { Event, Program, Scenario, state } from "../state"

const EventEditor = (): JSX.Element => {
  const event: Event = state(s => s.event)()

  return <div>
    <p>
      {JSON.stringify(event, null, 2)}
    </p>
  </div>
}

const ProgramEditor = (): JSX.Element => {
  const program: Program = state(s => s.program)()

  return <div>
    <p>
      {program}
    </p>
  </div>
}

export const Main = (): JSX.Element => {
  const scenario: Scenario = state(s => s.scenario);

  return <main>
    <p className="text-3xl font-semibold">
      {scenario.title}
    </p>

    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <EventEditor />

      <ProgramEditor />
    </div>
  </main>
}