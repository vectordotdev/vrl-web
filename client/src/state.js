import { SCENARIOS } from "./values";

import { createContext, useContext, useState } from "react";

const defaultScenario = SCENARIOS[0];
const defaults = {
  title: defaultScenario.title,
  event: defaultScenario.event,
  program: defaultScenario.program
}

export const Context = createContext();

export const ContextProvider = (props) => {
  const [title, setTitle] = useState(defaults.title);
  const [event, setEvent] = useState(defaults.event);
  const [program, setProgram] = useState(defaults.program);
  const [output, setOutput] = useState(null);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  return <Context.Provider
    value={{
      titleState: [title, setTitle],
      eventState: [event, setEvent],
      programState: [program, setProgram],
      outputState: [output, setOutput],
      resultState: [result, setResult],
      errorState: [errorMsg, setErrorMsg]
    }}
  >
    {props.children}
  </Context.Provider>
}