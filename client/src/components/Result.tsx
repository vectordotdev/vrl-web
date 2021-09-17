import Editor from "@monaco-editor/react";

import { Event, globals } from "../state";
import { READ_ONLY_EDITOR_OPTIONS } from "../values";

export const Result = ({ result }: { result: Event }): JSX.Element => {
  const theme: string = globals(s => s.theme);

  return <Editor
    height="200px"
    language="json"
    theme={theme}
    readOnly={true}
    value={JSON.stringify(result, null, 2)}
    options={READ_ONLY_EDITOR_OPTIONS}
  />
}