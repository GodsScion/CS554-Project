import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import SignOutButton from "./SignOut";
import "../App.css";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <nav className="navigation">
      <div className="flex">
        <h3 className="App-title">Marvel API</h3>
      </div>
      <ul>
        <li>
          <NavLink className="showlink" to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink className="showlink" to="/characters/page/1">
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink className="showlink" to="/comics/page/1">
            Comics
          </NavLink>
        </li>
        <li>
          <NavLink className="showlink" to="/stories/page/1">
            Stories
          </NavLink>
        </li>

        <li>
          <NavLink to="/">Landing</NavLink>
        </li>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/account">Account</NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/">Landing</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign-up</NavLink>
        </li>

        <li>
          <NavLink to="/signin">Sign-In</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
