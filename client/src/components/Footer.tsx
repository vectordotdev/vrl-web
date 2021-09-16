import { VRL_WEB_SERVER_ADDRESS } from '../values'

const AwayLink = ({ text, href }: { text: string, href: string }): JSX.Element => {
  return <a href={href}>
    {text}
  </a>
}

export const Footer = (): JSX.Element => {
  return <footer>
    <p>
      Made with 💜 by Datadog. Server running at <a href={VRL_WEB_SERVER_ADDRESS} target="_blank">{VRL_WEB_SERVER_ADDRESS}</a>.
    </p>
  </footer>
}