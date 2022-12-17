import React from "react";
import { doSignOut } from "../firebase/functions";

const SignOutButton = () => {
  return (
    <button type="button" onClick={doSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
