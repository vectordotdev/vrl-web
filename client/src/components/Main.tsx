import { Scenario, state } from "../state"

export const Main = (): JSX.Element => {
  const scenario: Scenario = state(s => s.scenario);

  return <main>
    <p>
      {scenario.title}
    </p>
  </main>
}