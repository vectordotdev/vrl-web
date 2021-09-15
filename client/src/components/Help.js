import { Docs } from "./Docs";
import { Functions } from "./Functions";

export const Help = () => {
  return <div className="mt-8">
    <p className="text-3xl font-semibold">
      Help center
    </p>

    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <Docs />

      <Functions />
    </div>
  </div>
}