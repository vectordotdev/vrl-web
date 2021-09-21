import { state } from "../state";
import { VrlFunctions, vrlInfo } from "../vrl";

const Functions = () => {
  const functions: VrlFunctions = vrlInfo.store(s => s.functions);
  const showFunctions: boolean = vrlInfo.store(s => s.showFunctions);
  const toggleShowFunctions: () => void = vrlInfo.store(s => s.toggleShowFunctions);

  Object.keys(functions).map((key: string) => {
    console.log(key);
  })

  return <div>
    <p className="text-lg">
      VRL functions
    </p>

    <button onClick={toggleShowFunctions} className="my-3">
      {showFunctions ? "Hide" : "Show"} functions
    </button>

    {showFunctions && (
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.keys(functions).map((key: string) => (
          <li key={key} className="font-mono text-sm overflow-auto hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-500">
            <a href={`https://vrl.dev/functions/#${key}`} target="_blank">
              {key}
            </a>
          </li>
        ))}
      </ul> 
    )}
  </div>
}

export const Docs = () => {
  return <div>
    <p className="text-2xl">
      VRL help center
    </p>

    <div className="mt-4 grid grid-cols-1 gap-8">
      <Functions />
    </div>
  </div>
}