import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import { Navigate } from "react-router-dom";

//import {doChangePassword} from '../firebase/FirebaseFunctions';

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  const [userData, setUserData] = useState(undefined);
  const [isSubmit, setIsSubmit] = useState(false);

  console.log(currentUser);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { email, firstName, lastName } = event.target.elements;
    setIsSubmit(true);
  };

  let dataBody = {
    firstName: firstName,
    lastName: lastName,

    password: password,
  };

  if (currentUser.providerData[0].providerId === "password") {
    return (
      <div>
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <h2>Change Password</h2>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>
              Current Password:
              <input
                className="form-control"
                name="currentPassword"
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                autoComplete="off"
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              New Password:
              <input
                className="form-control"
                name="newPasswordOne"
                id="newPasswordOne"
                type="password"
                placeholder="Password"
                autoComplete="off"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Confirm New Password:
              <input
                className="form-control"
                name="newPasswordTwo"
                id="newPasswordTwo"
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                required
              />
            </label>
          </div>

          <button type="submit">Change Password</button>
        </form>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          You are signed in using a Social Media Provider, You cannot change
          your password
        </h2>
      </div>
    );
  }
}

export default ChangePassword;
