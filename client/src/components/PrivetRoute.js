import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let loggedIn = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={() => {
        if (loggedIn) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
