import React from "react";
import "./App.less";
import { Provider } from "mobx-react";
import MainLayout from "layouts/MainLayout";
import MainStore from "stores/mainStore";

import { Route, Router, Switch } from "react-router";
import { browserHistory } from "./routing";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import Login from "./pages/login";

const routingStore = new RouterStore();

const stores = {
  main: new MainStore()
};

export const history = syncHistoryWithStore(browserHistory, routingStore);

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route key="login" exact path="/login" component={Login} />
            {/* <Route
              key="register"
              exact
              path="/account-register"
              component={Register}
            />
            <Route
              key="forgetpassword"
              exact
              path="/forgetpassword"
              component={ForgetPw}
            />  */}
            <Route component={MainLayout} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
