import data from "./scenarios.yaml";

export function App() {
  const scenarios = data;

  return <>
    <nav>
      <h1>
        The VRL Playground
      </h1>
    </nav> 

    <main>
      <h2>
        Scenarios
      </h2>

      <span>
        {scenarios.map(s => (
          <div>
            <h3>
              {s.title}
            </h3>

            <p>
              Event
            </p>

            <span>
              {JSON.stringify(s.event)}
            </span>

            <p>
              Program
            </p>

            <span>
              {s.program}
            </span>
          </div>
        ))}
      </span>
    </main>
  </>;
}