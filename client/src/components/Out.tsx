import Editor from "@monaco-editor/react";
import { Output } from "../state";
import { READ_ONLY_EDITOR_OPTIONS } from "../values";

export const Out = ({ output }: { output: Output }): JSX.Element => {
  return <Editor
    height="400px"
    language="json"
    theme="vs-dark"
    value={JSON.stringify(output, null, 2)}
    options={READ_ONLY_EDITOR_OPTIONS}
  />
}