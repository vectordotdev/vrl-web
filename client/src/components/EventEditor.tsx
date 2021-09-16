import { Event, state } from "../state";
import Editor from '@monaco-editor/react';
import { EDITABLE_EDITOR_OPTIONS } from "../values";

export const EventEditor = (): JSX.Element => {
  const event: Event = state(s => s.event)
  const setEvent: (s: string) => void = state(s => s.setEvent);

  const onEventChange = (val: string) => {
    setEvent(val);
  }

  return <Editor
    height="400px"
    language="json"
    theme="vs-dark"
    onChange={onEventChange}
    value={JSON.stringify(event, null, 2)}
    options={EDITABLE_EDITOR_OPTIONS}
  />
}