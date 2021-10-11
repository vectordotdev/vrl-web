import { state } from "../data/state";
import { Example, Parameter, VrlFunction, vrlInfo } from "../data/vrl";
import { ClipboardCopyIcon } from "@heroicons/react/solid";
import { useState } from "react";

type Props = {
  example: Example;
}

const ExampleSection = ({ example }: Props) => {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const setProgram: (p: string) => void = state.store(s => s.setProgram);
  const removeEvent: () => void = state.store(s => s.removeEvent);

  return <li className="flex flex-col space-y-1">
    <p className="font-semibold">
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
            className="w-4 h-4 text-white"
          />
        </button>
      )}
    </div>
  </li>;
}

export const Help = () => {
  const functions: VrlFunction[] = vrlInfo.store(s => s.functions);
  const showFunctions: boolean = vrlInfo.store(s => s.showFunctions);
  const toggleShowFunctions: () => void = vrlInfo.store(s => s.toggleShowFunctions);

  return <div className="flex flex-col space-y-4">
    <p className="text-3xl font-semibold">
      Vector Remap Language help center
    </p>

    <div>
      <button onClick={toggleShowFunctions} className="w-36 bg-gray-200 hover:bg-gray-300 text-black rounded py-2 font-semibold">
        {showFunctions ? "Hide functions" : "Show functions"}
      </button>
    </div>

    {showFunctions && (
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {functions.map((f: VrlFunction) => (
          <li key={f.name} className="border rounded-md py-3 px-5 flex flex-col space-y-2">
            <p className="text-xl font-bold font-mono overflow-auto">
              {f.name}
            </p>

            <div className="flex flex-col space-y-4">
              {f.parameters.length > 0 && (
                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-semibold">
                    Parameters
                  </p>

                  <ul className="flex flex-col space-y-1.5">
                    {f.parameters.map((p: Parameter) => (
                      <li className="flex items-center">
                        <span className="w-1/2">
                          <span className="font-mono font-light">
                            {p.name}
                          </span>
                        </span>

                        <span className="flex-1 font-semibold">
                          {p.kind === "unknown type" ? "any" : p.kind}
                        </span>

                        <span className="flex-1">
                          <span className={`py-1 px-1.5 rounded text-black ${p.required ? "bg-red-200" : "bg-blue-200"}`}>
                            {p.required ? "required" : "optional"}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {f.examples.length > 0 && (
                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-semibold">
                    Examples
                  </p>
      
                  <ul className="flex flex-col space-y-1.5">
                    {f.examples.map((e: Example) => <ExampleSection example={e} />)}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
}