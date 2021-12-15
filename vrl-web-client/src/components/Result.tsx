import Editor from "@monaco-editor/react";
import { editorHeight } from "../data/constants";
import { Event, state } from "../data/state";
import { READ_ONLY_EDITOR_OPTIONS } from "../data/values";

type Props = {
  result: Event;
}

export const Result = ({ result }: Props) => {
  const theme: string = state.store(s => s.theme);

  return <Editor
    height={editorHeight}
    language="json"
    theme={theme}
    value={JSON.stringify(result, null, 2)}
    options={READ_ONLY_EDITOR_OPTIONS}
  />
}