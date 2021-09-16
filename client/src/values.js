import data from './scenarios.yaml';

export const HOST = process.env.HOST;
export const VRL_WEB_SERVER_ADDRESS = process.env.VRL_WEB_SERVER_ADDRESS;
export const VRL_RESOLVE_ENDPOINT = `${VRL_WEB_SERVER_ADDRESS}/resolve`;
export const VRL_FUNCTIONS_ENDPOINT = `${VRL_WEB_SERVER_ADDRESS}/functions`;
export const SCENARIOS = data;

export const EDITOR_OPTIONS = {
  lineNumbers: false,
  padding: {
    bottom: 10,
    top: 10,
  },
  theme: "hc-black",
  fontSize: 16,
  renderLineHighlight: "none",
  wordWrap: "off",
  autoClosingQuotes: true,
  snippetSuggestions: "inline"
};