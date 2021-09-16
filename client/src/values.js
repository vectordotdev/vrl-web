// We have to do this in a JS file due to Parcel
import data from "./scenarios.yaml";

export const SCENARIOS = data;

export const EDITABLE_EDITOR_OPTIONS = {
  contextmenu: false,
  fontSize: 14,
  padding: {
    top: 0,
    bottom: 0,
  },
  scrollBeyondLastLine: false,
  lineNumbers: "off",
  wordWrap: "on"
}

export const READ_ONLY_EDITOR_OPTIONS = {
  contextmenu: false,
  fontSize: 14,
  padding: {
    top: 0,
    bottom: 0,
  },
  scrollBeyondLastLine: false,
  lineNumbers: "off",
  readOnly: true,
  wordWrap: "on"
}

export const HOST = process.env.HOST;
export const VRL_WEB_SERVER_ADDRESS = process.env.VRL_WEB_SERVER_ADDRESS;
export const VRL_RESOLVE_ENDPOINT = `${VRL_WEB_SERVER_ADDRESS}/resolve`;
export const VRL_FUNCTIONS_ENDPOINT = `${VRL_WEB_SERVER_ADDRESS}/functions`;