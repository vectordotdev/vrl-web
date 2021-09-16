import Editor from "@monaco-editor/react";
import { Program, state } from "../state";
import { EDITABLE_EDITOR_OPTIONS } from "../values";

export const ProgramEditor = (): JSX.Element => {
  const program: Program = state(s => s.program);
  const setProgram: (s: string) => void = state(s => s.setProgram);

  const onEventChange = (val: string) => {
    setProgram(val);
  }

  return <Editor
    height="400px"
    language="ruby"
    theme="vs-dark"
    value={program}
    options={EDITABLE_EDITOR_OPTIONS}
    onChange={onEventChange}
  />
}