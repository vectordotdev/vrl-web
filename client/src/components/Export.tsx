import { state } from "../state";

const Hash = (): JSX.Element => {
  const hashUrl: string = state(s => s.hashUrl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashUrl);
  }

  return <nav>
    <div className="mt-2 flex items-center space-x-6">
      <p className="text-xl font-semibold">
        Export
      </p>

      <button onClick={copyToClipboard}>
        Copy URL to clipboard
      </button>
    </div>
  </nav>
}

export const Export = (): JSX.Element => {
  return <div>
    <Hash />
  </div>
}