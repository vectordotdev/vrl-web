import { state } from "../state";

const Hash = () => {
  const hashUrl: string = state.store(s => s.hashUrl);
  const setHashUrl: () => void = state.store(s => s.setHashUrl);

  const copyToClipboard = () => {
    setHashUrl();
    navigator.clipboard.writeText(hashUrl);
  }

  return <nav>
    <p className="text-xl font-semibold text-black dark:text-gray-200">
      Export
    </p>

    <button onClick={copyToClipboard}>
      Copy URL to clipboard
    </button>
  </nav>
}

export const Export = () => {
  return <div>
    <Hash />
  </div>
}