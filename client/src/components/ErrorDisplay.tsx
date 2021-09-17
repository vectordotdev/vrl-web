import { state } from "../state";

export const ErrorDisplay = (): JSX.Element => {
  const errorMsg: string | null = state(s => s.errorMsg);

  return <div>
    {errorMsg && (
      <p className="mt-2 text-lg text-red-500 dark:text-red-500">
        {errorMsg}
      </p>
    )}
  </div>
}