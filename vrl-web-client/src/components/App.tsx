import { useEffect } from "react";
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";

import "../style.css";
import { vrlInfo } from "../vrl";

import { Footer } from "./Footer";
import { Main, MainWithHash } from "./Main";
import { Navbar } from "./Navbar";
import { NotFound } from "./NotFound";
import { Router } from "./Router";

export const App = () => {
  const setFunctions: () => void = vrlInfo.store(s => s.setFunctions);

  useEffect(() => {
    // Fetch the VRL functions upon initial render
    setFunctions();
  }, [setFunctions]);

  return <div className="font-sans antialiased min-h-screen flex flex-col dark:bg-black">
    <Navbar />

    <Router />

    <Footer />
  </div>
}