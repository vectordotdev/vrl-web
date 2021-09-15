import { VRL_WEB_SERVER_ADDRESS } from "../values";

export const Footer = () => {
  return <footer>
    <p className="font-light text-sm">
      Made with 💜 by Datadog. Server hosted at <span className="font-bold">{VRL_WEB_SERVER_ADDRESS}</span>.
    </p>
  </footer>
}