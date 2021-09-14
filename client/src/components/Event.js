import { Code } from "./Code";

export function Event({ event }) {
  return <div>
    <p className="text-lg font-semibold">
      Event
    </p>

    <Code code={event} />
  </div>
}