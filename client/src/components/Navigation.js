import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { signOutUser } from "../firebase/firebase";

import { NavLink } from "react-router-dom";
//import { AuthContext } from "../firebase/Auth";
//import SignOutButton from "./SignOut";
import "../App.css";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const history = useNavigate();

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
    history("/", { replace: true });
  };
  return (
    <>
      <nav className="navigation">
        <div className="flex">
          <h3 className="App-title">RMC</h3>
        </div>
        <ul>

          <li>
            <NavLink to="/">Landing</NavLink>
          </li>
          {currentUser ? (
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
          ) : null}
          {currentUser ? (
            <li>
              <NavLink to="/account">Account</NavLink>
            </li>
          ) : null}

          <li>
            <NavLink to="/">Landing</NavLink>
          </li>
         <li>
          <NavLink to="/courses">Courses page</NavLink>
        </li>
        <li>
          <NavLink to="/discussions">Discussions</NavLink>
        </li>
          <li>
            <NavLink to="/signup">Sign-up</NavLink>
          </li>

          <li>
            <NavLink to="/signin">Sign-In</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navigation;
