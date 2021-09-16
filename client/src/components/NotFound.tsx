export const NotFound = (): JSX.Element => {
  return <main>
    <p>
      The route {window.location.pathname} isn't recognized.
    </p>

    <a href="/">
      Return home
    </a>
  </main>
}