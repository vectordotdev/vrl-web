import { useEffect } from "react";

import { vrlInfo } from "../vrl";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Router } from "./Router";

export const App = () => {
  const setVrlInfo: () => void = vrlInfo.store(s => s.setVrlInfo);

  useEffect(() => {
    setVrlInfo();
  }, [setVrlInfo]);

  return <article>
    <Navbar />

    <Router />

    <Footer />
  </article>
}