import { Code } from "./Code"

export function Resolved({ output, resolved }) {
  return <>
    {resolved != null && (
      <div className="mt-4 grid grid-cols-2 gap-x-8">
        <div>
          <p className="text-lg font-semibold">
            Resolved
          </p>
    
          <Code code={resolved} />
        </div>
    
        {output != null && (
          <div>
            <p className="text-lg font-semibold">
              Output
            </p>
    
            <Code code={output} />
          </div>
        )}
      </div>
    )}
  </>
}