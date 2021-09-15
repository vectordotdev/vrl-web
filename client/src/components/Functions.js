import axios from "axios";
import { useEffect, useState } from "react"
import { VRL_FUNCTIONS_ENDPOINT } from "../values";

const VRL_SHOW_FUNCTIONS_KEY = "__show_vrl_functions";
const VRL_FUNCTIONS_STORAGE_KEY = "__vrl_functions"

const FunctionLink = ({ name, idx }) => {
  const url = `https://vrl.dev/functions/#${name}`;

  return <li key={idx} className="font-mono overflow-auto">
    <a href={url}>
      {name}
    </a>
  </li>
}

export const Functions = () => {
  const [showFunctions, setShowFunctions] = useState(false);
  const [functions, setFunctions] = useState(null);

  useEffect(() => {
    if (localStorage.getItem(VRL_SHOW_FUNCTIONS_KEY) === "true") {
      setShowFunctions(true);
    } else {
      setShowFunctions(false);
    }

    if (localStorage.getItem(VRL_FUNCTIONS_STORAGE_KEY)) {
      setFunctions(JSON.parse(localStorage.getItem(VRL_FUNCTIONS_STORAGE_KEY)));
    } else {
      axios.get(VRL_FUNCTIONS_ENDPOINT)
        .then(res => {
          const funcs = res.data.functions;
          localStorage.setItem(VRL_FUNCTIONS_STORAGE_KEY, JSON.stringify(funcs));
          setFunctions(funcs);
        });
    }
  }, [setFunctions, setShowFunctions]);

  const displayFunctions = () => {
    localStorage.setItem(VRL_SHOW_FUNCTIONS_KEY, true);
    setShowFunctions(true);
  }

  const hideFunctions = () => {
    localStorage.setItem(VRL_SHOW_FUNCTIONS_KEY, false);
    setShowFunctions(false);
  }

  return <div className="mt-8">
    <p className="title">
      Functions
    </p>

    {!showFunctions && (
      <button onClick={displayFunctions}>
        Show available VRL functions
      </button>
    )}

    {showFunctions && (
      <>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {functions.map((func, idx) => (
            <FunctionLink name={func} idx={idx} />
          ))}
        </ul>

        <div className="mt-6">
          <button onClick={hideFunctions}>
            Hide functions
          </button>
        </div>
      </>
    )}
  </div>
}