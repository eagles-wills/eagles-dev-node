import React, { Fragment } from "react";
import "./App.css";
import { Alert, Landing, Login, Navbar, Register } from "./component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
