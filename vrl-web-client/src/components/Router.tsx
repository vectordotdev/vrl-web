import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";
import { Main } from "./Main";
import { NotFound } from "./NotFound";

export type RouteParams = RouteComponentProps<{ hash?: string; }>;

export const Router = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Main hash={null} />} />

      <Route path="/h/:hash" render={({ match }: RouteParams) => <Main hash={match.params.hash} />} />

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
}