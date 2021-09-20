import { state } from "../state";

export const ErrorDisplay = () => {
  var errorMsg: string | null = state.store(s => s.errorMsg);

  // Remove initial newline character
  if (errorMsg != null) {
    errorMsg = errorMsg.substring(1);
  }

  return <>
    {errorMsg && (
      <div>
        <p className="text-xl text-red-500 font-semibold">
          Error output
        </p>

        <pre className="mt-2 text-sm p-8 bg-black text-red-200">
          {errorMsg}
        </pre>
      </div>
    )}
  </>
}