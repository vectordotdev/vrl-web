import { globals, state } from '../state';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import '../style.css';

import { Footer } from './Footer';
import { Main } from './Main';
import { Navbar } from './Navbar';
import { NotFound } from './NotFound';


export const App = (): JSX.Element => {
  const setMode: () => void = globals(s => s.setMode);

  useEffect(() => {
    setMode();
  });

  return <div className="page">
    <Navbar />

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/h/:hash">
          <Main />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>

    <Footer />
  </div> 
}