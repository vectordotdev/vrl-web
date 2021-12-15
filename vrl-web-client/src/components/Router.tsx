import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";
import { Main, Props } from "./Main";
import { NotFound } from "./NotFound";

export type RouteParams = RouteComponentProps<Props>;

export const Router = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Main hash={null} />} />

      <Route path="/h/:hash" render={({ match }: RouteParams) => <Main hash={match.params.hash} />} />

      <Route path="/scenarios/:scenarioId" render={({ match }: RouteParams) => <Main scenarioId={match.params.scenarioId} />} />

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
}