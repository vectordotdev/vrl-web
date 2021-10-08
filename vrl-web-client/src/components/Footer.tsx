import { VRL_WEB_SERVER_ADDRESS } from '../data/values';

import { Export } from "./Export";

export const Footer = () => {
  return <footer>
    <section className="export-section">
      <Export />
    </section>

    <section className="sub-footer">
      <p className="sub-footer-text">
        Made with 💜 by Datadog. Server running at{" "}
        <a href={VRL_WEB_SERVER_ADDRESS}
          className="link"
          target="_blank">{VRL_WEB_SERVER_ADDRESS}</a>.
      </p>
    </section>
  </footer>
}