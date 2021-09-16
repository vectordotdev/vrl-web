import { VRL_WEB_SERVER_ADDRESS } from "../values";

export const Footer = () => {
  return <footer>
    <p className="font-light text-sm">
      Made with 💜 by Datadog. Server hosted at <a href={VRL_WEB_SERVER_ADDRESS} target="_blank" className="font-bold">{VRL_WEB_SERVER_ADDRESS}</a>.
    </p>
  </footer>
}