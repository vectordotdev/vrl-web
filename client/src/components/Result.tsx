import Editor from "@monaco-editor/react";

import { Event, state } from "../state";
import { READ_ONLY_EDITOR_OPTIONS } from "../values";

type Props = {
  result: Event;
}

export const Result = ({ result }: Props) => {
  const theme: string = state.store(s => s.theme);

  return <Editor
    height="200px"
    language="json"
    theme={theme}
    readOnly={true}
    value={JSON.stringify(result, null, 2)}
    options={READ_ONLY_EDITOR_OPTIONS}
  />
}