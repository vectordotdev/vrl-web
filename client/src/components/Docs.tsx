import { state } from "../state"

const Functions = () => {
  const functions: string[] = state.store(s => s.functions);
  const showFunctions: boolean = state.store(s => s.showFunctions);
  const toggleShowFunctions: () => void = state.store(s => s.toggleShowFunctions);

  return <div>
    <p className="text-lg">
      VRL functions
    </p>

    <button onClick={toggleShowFunctions} className="my-3">
      {showFunctions ? "Hide" : "Show"} functions
    </button>

    {showFunctions && (
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {functions.map((func: string, idx: number) => (
          <li key={idx} className="font-mono text-sm overflow-auto hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-500">
            <a href={`https://vrl.dev/functions/#${func}`} target="_blank">
              {func}
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