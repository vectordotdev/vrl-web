export function NotFound() {
  const path = location.pathname;

  function goHome() {
    window.location = '/';
  }

  return <div className="p-4 flex-grow flex flex-col space-y-4">
    <p className="text-xl">
      <span className="text-red-500 font-bold">OOPS!</span> The path <span className="font-mono font-bold">{path}</span> isn't recognized.
    </p>

    <div>
      <button onClick={goHome} className="bg-blue-500 rounded pt-1.5 pb-2 px-3 text-gray-100 font-bold hover:bg-blue-600 hover:text-white hover:shadow-sm hover:shadow-md">
        Back to main page
      </button>
    </div>
  </div>
}