import { SCENARIOS } from "./values";

import { createContext } from "react";
import useLocalStorage from "use-local-storage";

export const key = (s) => {
  return `__vrl_scenario_${s}`;
}

const keys = {
  title: key("title"),
  event: key("event"),
  program: key("program"),
  output: key("output"),
  result: key("result"),
  errorMsg: key("error_msg"),
  darkMode: key("dark_mode")
}

const defaultScenario = SCENARIOS[0];
const defaults = {
  title: defaultScenario.title,
  event: defaultScenario.event,
  program: defaultScenario.program
}

const defaultDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const Context = createContext();

export const ContextProvider = (props) => {
  const [darkMode, setDarkMode] = useLocalStorage(keys.darkMode, defaultDarkMode);
  const [title, setTitle] = useLocalStorage(keys.title, defaults.title);
  const [event, setEvent] = useLocalStorage(keys.event, defaults.event);
  const [program, setProgram] = useLocalStorage(keys.program, defaults.program);
  const [output, setOutput] = useLocalStorage(keys.output, null);
  const [result, setResult] = useLocalStorage(keys.result, null);
  const [errorMsg, setErrorMsg] = useLocalStorage(keys.errorMsg, null);

  return <Context.Provider
    value={{
      darkModeState: [darkMode, setDarkMode],
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