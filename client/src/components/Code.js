export function Code({ code }) {
  const formatted = (typeof code === 'object') ? JSON.stringify(code, null, 2) : code;

  return <pre className="font-mono bg-black text-white p-3 text-sm rounded">
    {formatted}
  </pre>
}