import { state } from "../data/state";
import { Example, Parameter, VrlFunction, vrlInfo } from "../data/vrl";
import { ClipboardCopyIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const ExampleSection = ({ example }: { example: Example }) => {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const setProgram: (p: string) => void = state.store(s => s.setProgram);
  const removeEvent: () => void = state.store(s => s.removeEvent);

  return <li className="flex flex-col space-y-1">
    <p className="font-semibold dark:text-gray-200">
      {example.title}
    </p>

    <div
      className="flex items-start justify-between bg-black rounded py-2 px-3"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      <span className="text-gray-200 text-sm font-mono overflow-auto">
        {example.source}
      </span>

      {showIcon && (
        <button
          onClick={() => {
            setProgram(example.source);
            removeEvent();
          }}
        >
          <ClipboardCopyIcon
            className="w-4 h-4 text-primary"
          />
        </button>
      )}
    </div>
  </li>;
}

const FunctionSection = ({ f }: { f: VrlFunction }) => {
  const key: string = `vrl-func-${f.name}`;
  const [showBody, setShowBody] = useLocalStorage<boolean>(key, false);

  return <li key={f.name} className={`rounded-md py-4 px-6 flex flex-col space-y-2 ${showBody && "bg-gray-100 dark:bg-gray-700"}`}>
    <div className="flex items-center justify-between space-x-4">
      <p className={`text-xl font-extrabold font-mono overflow-auto dark:text-gray-200 ${showBody && "text-black"}`}>
        {f.name}
      </p>
    
      <button onClick={() => setShowBody(!showBody)}>
        {showBody ?
          <ChevronUpIcon className="h-6 w-6 text-secondary dark:text-primary" /> :
          <ChevronDownIcon className="h-6 w-6 text-secondary dark:text-primary" /> }
      </button>
    </div>

    {showBody && <div className="flex flex-col space-y-4">
      {f.parameters.length > 0 && (
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-semibold dark:text-gray-200">
            Parameters
          </p>

          <ul className="flex flex-col space-y-1.5">
            {f.parameters.map((p: Parameter) => (
              <li className="flex items-center justify-between">
                <div className="flex w-full justify-between">
                  <div className="flex-1">
                    <span className="font-mono font-light dark:text-gray-200">
                      {p.name}
                    </span>
                  </div>

                  <div className="flex-1">
                    <span className="font-mono font-semibold dark:text-gray-200">
                      {p.kind === "unknown type" ? "any" : p.kind}
                    </span>
                  </div>
                </div>

                <span className={`py-0.5 px-1.5 rounded text-white ${p.required ? "bg-red-500" : "bg-blue-500"}`}>
                  {p.required ? "required" : "optional"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {f.examples.length > 0 && (
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-semibold dark:text-gray-200">
            Examples
          </p>

          <ul className="flex flex-col space-y-1.5">
            {f.examples.map((e: Example) => <ExampleSection example={e} />)}
          </ul>
        </div>
      )}
    </div>}
  </li>
}

export const Help = () => {
  const functions: VrlFunction[] = vrlInfo.store(s => s.functions);
  const showFunctions: boolean = vrlInfo.store(s => s.showFunctions);
  const toggleShowFunctions: () => void = vrlInfo.store(s => s.toggleShowFunctions);

  return <div className="flex flex-col space-y-4">
    <p className="text-3xl font-semibold dark:text-gray-200">
      Vector Remap Language help center
    </p>

    <div>
      <button onClick={toggleShowFunctions} className="w-36 bg-gray-200 hover:bg-gray-300 text-black rounded py-2 font-semibold">
        {showFunctions ? "Hide functions" : "Show functions"}
      </button>
    </div>

    {showFunctions && (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {functions.map((f: VrlFunction) => <FunctionSection f={f} />)}
      </ul>
    )}
  </div>
}