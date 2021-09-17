import { useEffect } from "react";
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";

import "../style.css";

import { Footer } from "./Footer";
import { Main, MainWithHash } from "./Main";
import { Navbar } from "./Navbar";
import { NotFound } from "./NotFound";
import { darkModeUserPreference, state } from "../state";
import useDarkMode, { DarkMode } from "use-dark-mode";

export type Params = {
  hash?: string;
}

type Props = RouteComponentProps<Params>;

const init = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const App = () => {
  const darkMode: DarkMode = useDarkMode(darkModeUserPreference);

  useEffect(() => init(darkMode.value));

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