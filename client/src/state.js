import { SCENARIOS } from "./values";

import { createContext, useState } from "react";

const defaultScenario = SCENARIOS[0];
const defaults = {
  event: defaultScenario.event,
  program: defaultScenario.program,
}

export const Context = createContext();

export const ContextProvider = (props) => {
  const [event, setEvent] = useState(defaults.event);
  const [program, setProgram] = useState(defaults.program);
  const [output, setOutput] = useState(null);
  const [result, setResult] = useState(null);

  return <Context.Provider
    value={{
      eventState: [event, setEvent],
      programState: [program, setProgram],
      outputState: [output, setOutput],
      resultState: [result, setResult]
    }}
  >
    {props.children}
  </Context.Provider>
}