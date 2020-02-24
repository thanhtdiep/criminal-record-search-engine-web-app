import React from "react";
import { Switch, Route } from "react-router-dom";
import Search from "./Search";
import Register from "./Register";
import Login from "./Login";
import Offence from "./Offence";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <div className="content-wrap">
    <Switch>
      <Route exact path="/" component={Register} />
      <Route path="/Register" component={Register} />
      <Route path="/Login" component={Login} />
      <Route path="/Offence" component={Offence} />
      <Route path="/Search" component={Search} />
    </Switch>
  </div>
);

export default Main;
