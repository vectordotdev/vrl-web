import { state } from "../data/state";

export const Export = () => {
  const getHashUrl: () => string = state.store(s => s.getHashUrl);

  const copyToClipboard = () => {
    const hashUrl: string = getHashUrl();

    navigator.clipboard.writeText(hashUrl);
  }

  return <nav className="flex items-center space-x-8">
    <p className="text-xl font-semibold text-black dark:text-gray-200">
      Export
    </p>

    <button
      onClick={copyToClipboard}
      className={`shadow rounded
        focus:bg-primary focus:text-black dark:focus:bg-primary dark:focus:text-black
        py-1.5 px-3
        font-bold
        bg-gray-700 dark:bg-gray-100
        text-gray-100 dark:text-black
        hover:bg-black dark:hover:bg-gray-200`}
    >
      Copy URL to clipboard
    </button>
  </nav>
}