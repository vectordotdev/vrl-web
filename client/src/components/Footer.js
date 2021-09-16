import { VRL_WEB_SERVER_ADDRESS } from "../values";

export const Footer = () => {
  return <footer className="py-4 px-8 bg-gray-100 dark:bg-gray-500">
    <p className="text-sm dark:text-gray-50">
      Made with 💜 by Datadog. Server hosted at <a href={VRL_WEB_SERVER_ADDRESS} target="_blank" className="font-bold dark:text-white">{VRL_WEB_SERVER_ADDRESS}</a>.
    </p>
  </footer>
}