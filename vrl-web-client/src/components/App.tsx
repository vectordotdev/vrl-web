import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { vrlInfo } from "../data/vrl";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Router } from "./Router";

export const App = () => {
  const setVrlInfo: () => void = vrlInfo.store(s => s.setVrlInfo);

  const [count, setCount] = useState(0);
  useHotkeys('ctrl+k', () => setCount(prevCount => prevCount + 1));

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