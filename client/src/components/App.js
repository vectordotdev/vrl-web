import '../style.css';
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { ContextProvider } from '../state';
import { Footer } from './Footer';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotFound } from './NotFound';

export const App = () => {
  return <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
    <ContextProvider>
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