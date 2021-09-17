import Editor from "@monaco-editor/react";

import { globals, Output } from "../state";
import { READ_ONLY_EDITOR_OPTIONS } from "../values";

type Props = {
  output: Output;
}

export const Out = ({ output }: Props) => {
  const theme: string = globals(s => s.theme);

  return <Editor
    height="200px"
    language="json"
    theme={theme}
    value={JSON.stringify(output, null, 2)}
    options={READ_ONLY_EDITOR_OPTIONS}
  />
}