import { EditText, onSaveProps } from "react-edit-text";

import { state } from "../state"

export const Title = () => {
  const title: string = state.store(s => s.title);
  const setTitle: (t: string) => void = state.store(s => s.setTitle);
  const defaultTitle: string = "My custom VRL scenario";

  const onSave = (p: onSaveProps) => {
    if (!p.value) {
      setTitle(defaultTitle);
    } else {
      setTitle(p.value);
    }
  }

  return <div className="editable-title">
    <EditText
      value={title}
      onChange={setTitle}
      className="editor"
      onSave={onSave}
    />
  </div>
}