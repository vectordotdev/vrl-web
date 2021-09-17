import { VRL_WEB_SERVER_ADDRESS } from '../values'

export const Footer = () => {
  return <footer>
    <p>
      Made with 💜 by Datadog. Server running at <a href={VRL_WEB_SERVER_ADDRESS} target="_blank">{VRL_WEB_SERVER_ADDRESS}</a>.
    </p>
  </footer>
}