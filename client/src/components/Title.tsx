import { EditText } from "react-edit-text";
import { state } from "../state"

export const Title = () => {
  const title: string = state(s => s.title);
  const setTitle: (t: string) => void = state(s => s.setTitle);

  const defaultTitleText = "My VRL scenario"

  return <div className="py-2">
    <EditText
      value={title}
      onChange={setTitle}
      className="text-3xl font-semibold dark:text-white focus:bg-gray-200
      dark:focus:bg-gray-300 dark:focus:text-black dark:focus:ring-0"
      onSave={(p: onSaveProps) => {
        if (p.value.length == 0) {
          setTitle(defaultTitleText);
        }
      }}
    />
  </div>
}