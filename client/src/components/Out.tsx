import Editor from "@monaco-editor/react";

import { globals, Output } from "../state";
import { READ_ONLY_EDITOR_OPTIONS } from "../values";

export const Out = ({ output }: { output: Output }): JSX.Element => {
  const theme: string = globals(s => s.theme);

  return <Editor
    height="200px"
    language="json"
    theme={theme}
    value={JSON.stringify(output, null, 2)}
    options={READ_ONLY_EDITOR_OPTIONS}
  />
}