import { Code } from "./Code";

export function Program({ program }) {
  return <div>
    <p className="text-lg font-semibold">
      Program
    </p>

    <Code code={program} />
  </div>
}