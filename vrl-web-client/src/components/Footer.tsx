import { VRL_WEB_SERVER_ADDRESS } from '../values';

import { Export } from "./Export";

export const Footer = () => {
  return <footer className="bg-gray-100 dark:bg-black py-4 px-6">
    <Export />

    <p className="text-black dark:text-gray-200">
      Made with 💜 by Datadog. Server running at{" "}
      <a href={VRL_WEB_SERVER_ADDRESS}
        className="font-semibold hover:text-secondary dark:hover:text-primary"
        target="_blank">{VRL_WEB_SERVER_ADDRESS}</a>.
    </p>
  </footer>
}