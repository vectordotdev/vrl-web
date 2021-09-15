const LINKS = [
  {
    title: "Expressions",
    href: "https://vrl.dev/expressions"
  },
  {
    title: "Functions",
    href: "https://vrl.dev/functions"
  },
  {
    title: "Examples",
    href: "https://vrl.dev/examples"
  },
  {
    title: "Errors",
    href: "https://vrl.dev/errors"
  },
  {
    title: "Command-line interface",
    href: "https://vector.dev/docs/reference/cli/#vrl"
  }
];

export const Docs = () => {
  return <div>
    <p className="title">
      Docs
    </p>

    <ul className="flex space-x-3">
      {LINKS.map((link, idx) => (
        <li key={idx} className="tracking-tight font-semibold hover:text-blue-500">
          <a href={link.href} target="_blank">
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
}