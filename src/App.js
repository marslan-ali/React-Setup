import React from "react";
import User from "./Components/User";
import ResetEmail from "./Components/ResetEmail";
import ResetPassword from "./Components/ResetPassword";
import Home from "./Components/Home";

import {  BrowserRouter as Router,Route,Switch } from "react-router-dom";

function App() {
 

  return (
    <Router >
      <Switch>
          <Route exact path="/">
         <User/>
          </Route>
          <Route exact path="/API/user/resetLink">
            <ResetEmail />
          </Route>
          <Route exact path="/API/user/resetPassword">
            <ResetPassword />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
       
        </Switch>
    </Router>
  );
}

export default App;
