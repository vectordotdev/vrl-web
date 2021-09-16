import { VRL_WEB_SERVER_ADDRESS } from '../values'

export const Footer = (): JSX.Element => {
  return <footer>
    <p>
      Made with 💜 by Datadog. Server running at <strong>{VRL_WEB_SERVER_ADDRESS}</strong>.
    </p>
  </footer>
}