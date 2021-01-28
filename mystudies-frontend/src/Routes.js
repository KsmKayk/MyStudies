import React from "react";
// import {isAuthenticated} from "./Services/auth";
import { BrowserRouter as Router, Route,Switch,Redirect } from "react-router-dom";

import Home   from "./Components/Home";


// const PrivateRoute = ({component: Component, ...rest}) => (
//   <Route {...rest} render={props => ( 
//     isAuthenticated() ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{pathname: "/", state: {from: props.location} }}/>
//     )
//   )}/>
// )


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"           component={Home} />
        {/* <Route exact path="/register"   component={Register} />
        <PrivateRoute exact path="/home"   component={Home} />
        <PrivateRoute exact path="/edit/:id"   component={Edit} />
        <PrivateRoute exact path="/delete/:id"   component={Delete} /> */}
      </Switch>
    </Router>
  );
}