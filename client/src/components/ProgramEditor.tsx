import Editor from "@monaco-editor/react";

import { globals, Program, state } from "../state";
import { EDITABLE_EDITOR_OPTIONS } from "../values";

export const ProgramEditor = (): JSX.Element => {
  const program: Program = state(s => s.program);
  const setProgram: (s: string) => void = state(s => s.setProgram);
  const theme: string = globals(s => s.theme);

  const onEventChange = (val: string): void => {
    setProgram(val);
  }

  return <Editor
    height="200px"
    language="ruby"
    theme={theme}
    value={program}
    options={EDITABLE_EDITOR_OPTIONS}
    onChange={onEventChange}
  />
}