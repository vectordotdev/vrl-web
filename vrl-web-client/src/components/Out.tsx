import Editor from "@monaco-editor/react";
import { editorHeight } from "../data/constants";

import { Output, state } from "../data/state";
import { READ_ONLY_EDITOR_OPTIONS } from "../data/values";

export const Out = () => {
  const theme: string = state.store(s => s.theme);
  const output: Output | null = state.store(s => s.output);
  let errorMsg: string | null = state.store(s => s.errorMsg);

  if (errorMsg != null) {
    errorMsg = errorMsg.substring(1);
  }

  return <>
    {output && (
      <Editor
        height={editorHeight}
        language="json"
        theme={theme}
        value={JSON.stringify(output, null, 2)}
        options={READ_ONLY_EDITOR_OPTIONS}
      />
    )}

    {errorMsg && (
      <Editor
        height={editorHeight}
        language="rust"
        theme={theme}
        value={errorMsg}
        options={READ_ONLY_EDITOR_OPTIONS}
      />
    )}
  </>
}