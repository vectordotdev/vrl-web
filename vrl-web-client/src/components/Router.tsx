import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";
import { Main, MainWithHash } from "./Main";
import { NotFound } from "./NotFound";


type Props = RouteComponentProps<{ hash?: string; }>;

export const Router = () => {
  return <BrowserRouter>
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
}