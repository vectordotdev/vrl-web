import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

type Props = {
  children: ReactNode;
}

const handleError = (e: Error, info: {componentStack: string}) => {
  console.log(info.componentStack);
  alert(e.message);
}

const ErrorDisplay = ({ error, resetErrorBoundary }: FallbackProps) => {
  return <>
    <p>
      An error has occurred: {error.message}
    </p>

    <button onClick={resetErrorBoundary}>
      Reset
    </button>
  </>
}

export const ErrorHandler = ({ children }: Props) => {
  return <ErrorBoundary FallbackComponent={ErrorDisplay} onError={handleError}>
    {children}
  </ErrorBoundary>
}