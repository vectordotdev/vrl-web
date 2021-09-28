import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

type Props = {
  children: ReactNode;
}

const handleError = (e: Error, info: {componentStack: string}) => {
  console.error(e.message);
  console.error(info.componentStack);
}

const ErrorDisplay = ({ error, resetErrorBoundary }: FallbackProps) => {
  return <main>
    <p>
      An error has occurred: {error.message}
    </p>

    <button onClick={resetErrorBoundary}>
      Reset
    </button>
  </main>
}

export const ErrorHandler = ({ children }: Props) => {
  return <ErrorBoundary FallbackComponent={ErrorDisplay} onError={handleError}>
    {children}
  </ErrorBoundary>
}