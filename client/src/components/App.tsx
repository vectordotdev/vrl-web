import { useEffect } from "react";
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";

import "../style.css";

import { Footer } from "./Footer";
import { Main, MainWithHash } from "./Main";
import { Navbar } from "./Navbar";
import { NotFound } from "./NotFound";
import { state } from "../state";

export type Params = {
  hash?: string;
}

type Props = RouteComponentProps<Params>;

export const App = () => {
  const setAesthetic: () => void = state(s => s.setAesthetic);

  useEffect(() => {
    setAesthetic();
  });

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