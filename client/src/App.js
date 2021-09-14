import axios from "axios";
import './style.css';
import { Navbar } from "./Navbar";
import { useGlobalState } from "./state";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useParams
} from "react-router-dom";

const host = process.env.HOST;
const vrlWebServerAddress = process.env.VRL_WEB_SERVER_ADDRESS;
const resolveEndpoint = `${vrlWebServerAddress}/resolve`;

function Event({ event }) {
  return <div>
    <p className="text-lg font-semibold">
      Event
    </p>

    <Code code={event} />
  </div>
}

function Program({ program }) {
  return <div>
    <p className="text-lg font-semibold">
      Program
    </p>

    <Code code={program} />
  </div>
}

function Code({ code }) {
  const formatted = (typeof code === 'object') ? JSON.stringify(code, null, 2) : code;

  return <pre className="font-mono bg-black text-white p-3 text-sm rounded">
    {formatted}
  </pre>
}

function Footer() {
  return <footer className="bg-gray-200 py-3 px-4">
    <p>
      Connected to the server at <strong>{vrlWebServerAddress}</strong>.
    </p>
  </footer>
}

function Main({ scenario }) {
  let { hash } = useParams();

  const { event, program } = scenario;

  const [hashUrl, setHashUrl] = useState(null);
  const [resolved, setResolved] = useGlobalState('resolved');
  const [output, setOutput] = useGlobalState('output');
  const showResolveButton = (resolved === null && output === null);
  
  if (hash != null) {
    const unhashed = atob(hash);
    const obj = JSON.parse(unhashed);
    console.log(obj);
  }

  function exportScenario() {
    const hashInput = {
      event, program, output, resolved
    }

    const hash = btoa(JSON.stringify(hashInput));
    const url = `${host}/h/${hash}`;

    setHashUrl(url);
  }

  function resolve() {
    const payload = { event: event, program: program };

    axios.post(resolveEndpoint, payload)
      .then(res => {
        console.log(res);

        setOutput(res.data.success.output);
        setResolved(res.data.success.result);
      });
  }

  return <div className="p-4 flex-grow">
    <div className="grid grid-cols-2 gap-x-8">
      <Event event={event} />

      <Program program={program} />
    </div>

    <div className="mt-4 grid grid-cols-2 gap-x-8">
      {resolved != null && (
        <>
          <div>
            <p className="text-lg font-semibold">
              Resolved
            </p>

            <Code code={resolved} />
          </div>

          {output != null && (
            <div>
              <p className="text-lg font-semibold">
                Output
              </p>

              <Code code={output} />
            </div>
          )}
        </>
      )}
    </div>

    {showResolveButton && (
      <div className="mt-6">
        <button onClick={resolve} className="border py-1.5 px-2 rounded-md bg-gray-200 hover:bg-gray-300">
          Resolve
        </button>
      </div>
    )}

    <div className="mt-6">
      <button onClick={exportScenario} className="border py-1.5 px-2 rounded-md bg-gray-200 hover:bg-gray-300">
        Export
      </button>
    </div>

    {hashUrl && (
      <div className="mt-8">
        <p>
          Your URL for this scenario:
        </p>

        <pre className="mt-2 bg-black text-white p-2 rounded text-sm">
          {hashUrl}
        </pre>

        <p className="mt-3">
          Or click <a href={hashUrl} className="text-blue-500 font-semibold" target="_blank">here</a>
        </p>
      </div>
    )}
  </div>
}

export function NotFound() {
  return <div>
    <p>
      NOT FOUND
    </p>
  </div>
}

export function App() {
  const [scenario] = useGlobalState('scenario');

  return <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
    <Navbar />

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main scenario={scenario} />
        </Route>

        <Route path="/h/:hash">
          <Main scenario={scenario} />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>

    <Footer />
  </div>
}