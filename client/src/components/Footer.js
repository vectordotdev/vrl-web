import { VRL_WEB_SERVER_ADDRESS } from "../values";

export function Footer() {
  return <footer>
    <p>
      Made with 💜 by Datadog. Server hosted at {VRL_WEB_SERVER_ADDRESS}.
    </p>
  </footer>
}