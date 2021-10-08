import { useEffect, useState } from "react";

import { vrlInfo } from "../data/vrl";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Router } from "./Router";

export const App = () => {
  const setVrlInfo: () => void = vrlInfo.store(s => s.setVrlInfo);

  // Initial page load logic
  useEffect(() => {
    setVrlInfo();
  }, [setVrlInfo]);

  return <article>
    <Navbar />   

    <Router />

    <Footer />
  </article>
}