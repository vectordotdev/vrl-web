import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";
import { ErrorHandler } from "./ErrorHandler";
import { Help } from "./Help";
import { Main, Props } from "./Main";
import { NotFound } from "./NotFound";

export type RouteParams = RouteComponentProps<Props>;

export const Router = () => {
  return <BrowserRouter>
    <Switch>
      <ErrorHandler>
        <main>
          <Route exact path="/" render={() => <Main hash={null} />} />

          <Route path="/h/:hash" render={({ match }: RouteParams) => <Main hash={match.params.hash} />} />

          <Route path="/scenarios/:scenarioId" render={({ match }: RouteParams) => <Main scenarioId={match.params.scenarioId} />} />

          <Route path="/help" render={() => <Help />} />
        </main>
      </ErrorHandler>

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
}