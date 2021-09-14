import '../style.css';
import { Footer } from "./Footer";
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { NotFound } from './NotFound';
import { useGlobalState } from "../state";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

export function App() {
  const [scenario] = useGlobalState('scenario');

  return <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
    <Navbar />

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main scenario={scenario} />
        </Route>

        <Route path="/h/:hash">
          <Main scenario={scenario} />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>

    <Footer />
  </div>
}