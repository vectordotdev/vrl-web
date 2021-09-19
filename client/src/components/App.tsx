import { useEffect } from "react";
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";
import { state } from "../state";

import "../style.css";

import { Footer } from "./Footer";
import { Main, MainWithHash } from "./Main";
import { Navbar } from "./Navbar";
import { NotFound } from "./NotFound";

type Props = RouteComponentProps<{ hash? : string }>;

export const App = () => {
  const [functions, setFunctions] = state(s => [s.functions, s.setFunctions]);

  useEffect(() => {
    // Fetch the VRL functions upon initial render
    setFunctions();
  }, [setFunctions]);

  return <div className="page">
    <Navbar />

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