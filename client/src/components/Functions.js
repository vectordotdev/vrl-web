import axios from "axios";
import { useEffect, useState } from "react"
import { VRL_FUNCTIONS_ENDPOINT } from "../values";

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
    if (localStorage.getItem(VRL_FUNCTIONS_STORAGE_KEY) != null) {
      setFunctions(JSON.parse(localStorage.getItem()))
    } else {
      axios.get(VRL_FUNCTIONS_ENDPOINT)
        .then(res => {
          setFunctions(res.data.functions);
        });
    }
  });

  const displayFunctions = () => {
    setShowFunctions(true);
  }

  const hideFunctions = () => {
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