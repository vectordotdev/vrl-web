export const NotFound = () => {
  const path = location.pathname;

  return <main>
    <p>
      Oopsie! The path <strong>{path}</strong> wasn't found.
    </p>

    <button className="button" onClick={() => window.location = '/'}>
      Go back home
    </button>
  </main>
}