import { vrlWebServerAddress } from "../values";

export function Footer() {
  return <footer className="bg-gray-200 py-3 px-4">
    <p>
      Connected to the server at <strong>{vrlWebServerAddress}</strong>.
    </p>
  </footer>
}