import Editor from "@monaco-editor/react";
import { editorHeight } from "../contants";

import { Program, state } from "../state";
import { EDITABLE_EDITOR_OPTIONS } from "../values";

export const ProgramEditor = () => {
  const program: Program = state.store(s => s.program);
  const setProgram: (s: string) => void = state.store(s => s.setProgram);
  const theme: string = state.store(s => s.theme);

  const onEventChange = (val: string): void => {
    setProgram(val);
  }

  return <Editor
    height={editorHeight}
    language="ruby"
    theme={theme}
    value={program}
    options={EDITABLE_EDITOR_OPTIONS}
    onChange={onEventChange}
  />
}