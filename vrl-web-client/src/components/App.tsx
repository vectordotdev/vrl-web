import { useEffect } from "react";

import { state } from "../state";
import { vrlInfo } from "../vrl";

import { Drawer } from "./Drawer";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Router } from "./Router";

export const App = () => {
  const setFunctions: () => void = vrlInfo.store(s => s.setFunctions);
  const drawer: boolean = state.store(s => s.drawer);

  useEffect(() => {
    // Fetch the VRL functions upon initial render
    setFunctions();
  }, [setFunctions]);

  return <div className="font-sans antialiased">
    {drawer && <Drawer />}

    {drawer && <DarkOverlay />}

    <div className="main-container">
      <Navbar />

      <Router />

      <Footer />
    </div>

  </div>
}

const DarkOverlay = () => {
  return <div className="dark-overlay"></div>
}