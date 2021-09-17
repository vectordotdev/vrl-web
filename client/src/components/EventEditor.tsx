import Editor from "@monaco-editor/react";

import { Event, globals, state } from "../state";
import { EDITABLE_EDITOR_OPTIONS } from "../values";

export const EventEditor = (): JSX.Element => {
  const event: Event = state(s => s.event)
  const setEvent: (s: string) => void = state(s => s.setEvent);
  const theme: string = globals(s => s.theme);

  const onEventChange = (val: string): void => {
    setEvent(val);
  }

  return <Editor
    height="200px"
    language="json"
    theme={theme}
    onChange={onEventChange}
    value={JSON.stringify(event, null, 2)}
    options={EDITABLE_EDITOR_OPTIONS}
  />
}