import { state } from "../state";

const Hash = () => {
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

export const Export = () => {
  return <div>
    <Hash />
  </div>
}