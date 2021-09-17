import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";

import "../style.css";

import { Footer } from "./Footer";
import { Main, MainWithHash } from "./Main";
import { Navbar } from "./Navbar";
import { NotFound } from "./NotFound";

export type Params = {
  hash?: string;
}

type Props = RouteComponentProps<Params>;

export const App = () => {
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