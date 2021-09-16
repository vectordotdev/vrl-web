import Editor from "@monaco-editor/react";
import { Event } from "../state";
import { READ_ONLY_EDITOR_OPTIONS } from "../values";

export const Result = ({ result }: { result: Event }): JSX.Element => {
  return <Editor
    height="400px"
    language="json"
    theme="vs-dark"
    readOnly={true}
    value={JSON.stringify(result, null, 2)}
    options={READ_ONLY_EDITOR_OPTIONS}
  />
}