import '../style.css';
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { Context, ContextProvider } from '../state';
import { Footer } from './Footer';
import { NotFound } from './NotFound';

import { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const ModeSelector = () => {
  const { darkModeState, } = useContext(Context);
  const [darkMode] = darkModeState;

  if (darkMode) {
    document.documentElement.classList.add('dark');
  }

  return <></>
}

export const App = () => {
  return <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
    <ContextProvider>
      <ModeSelector />

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
    </ContextProvider>
  </div>
}