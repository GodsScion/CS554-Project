//import { Route, Redirect } from "react-router-dom";
//import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
/*
const PrivateRoute = ({ component: RouteComponenet, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("Private Route Comp current user", currentUser);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"signin"} />
        )
      }
    />
  );
};

export default PrivateRoute;*/

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);
  console.log("Private Route Comp current user", currentUser);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
