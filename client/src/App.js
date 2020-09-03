import React, { Fragment } from "react";
import "./App.css";
import "../src/components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";

//Layout Components
import Navbar from "../src/components/layout/Navbar";
import About from "../src/components/pages/About";

//Home Component
import Home from "../src/components/pages/Home";

//Auth Components
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";

//Contact State
import ContactState from "./context/contact/ContactState";

//Auth State
import AuthState from "./context/auth/AuthState";

//Alert State
import AlertState from "./context/alert/AlertState";

//Alert Component
import Alerts from "./components/layout/Alerts";

import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
