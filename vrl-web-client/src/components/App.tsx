import { useEffect } from "react";

import { vrlInfo } from "../vrl";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Router } from "./Router";

export const App = () => {
  const setFunctions: () => void = vrlInfo.store(s => s.setFunctions);

  useEffect(() => {
    // Fetch the VRL functions upon initial render
    setFunctions();
  }, [setFunctions]);

  return <article>
    <Navbar />

    <Router />

    <Footer />
  </article>
}

const DarkOverlay = () => {
  return <div className="dark-overlay"></div>
}