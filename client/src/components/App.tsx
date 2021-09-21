import { useEffect } from "react";
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";

import "../style.css";

import { Footer } from "./Footer";
import { Main, MainWithHash } from "./Main";
import { Navbar } from "./Navbar";
import { NotFound } from "./NotFound";
import { state } from "../state";
import { VrlFunctions, vrlInfo } from "../vrl";

type Props = RouteComponentProps<{ hash? : string }>;

export const App = () => {
  const setFunctions: () => void = state.store(s => s.setFunctions);
  const setVrlFunctions: () => void = vrlInfo.store(s => s.setFunctions);
  const functions: VrlFunctions = vrlInfo.store(s => s.functions);

  useEffect(() => {
    // Fetch the VRL functions upon initial render
    setFunctions();
    setVrlFunctions();
  }, [setFunctions, setVrlFunctions]);

  return <div className="page">
    <Navbar />

    <div>
      {JSON.stringify(functions)}
    </div>

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/h/:hash" render={({ match }: Props) => <MainWithHash hash={match.params.hash} />} />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>

    <Footer />
  </div> 
}