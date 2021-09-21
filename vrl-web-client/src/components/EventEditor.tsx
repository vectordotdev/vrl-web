import Editor from "@monaco-editor/react";

import { Event, state } from "../state";
import { EDITABLE_EDITOR_OPTIONS } from "../values";

type Props = {
  event: Event;
}

export const EventEditor = ({ event }: Props) => {
  const setEvent: (s: string) => void = state.store(s => s.setEvent);
  const theme: string = state.store(s => s.theme);

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