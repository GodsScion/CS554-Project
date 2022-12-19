import React, { useState, useContext } from "react";
import axios from "axios";
import SocialSignIn from "./SocialSignIn";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import {
  doSignInWithEmailAndPassword,
  // doPasswordReset,
} from "../firebase/functions";
const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { currentUser } = useContext(AuthContext);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    //let { email, password } = event.target.elements;
    let dataBody = {
      email: email,
      password: password,
    };
    console.log(dataBody);
    try {
      await axios
<<<<<<< Updated upstream
        .post(
          "http://localhost:4000/login",
          {
            data: dataBody,
          }
        )
=======
        .post("http://localhost:4000/users/login", dataBody)
>>>>>>> Stashed changes
        .then(function (response) {
          console.log(response.data);
        });
    } catch (error) {
      alert(error.response.data);
      return;
    }

    try {
<<<<<<< Updated upstream
      await doSignInWithEmailAndPassword(email.value, password.value);
=======
      await doSignInWithEmailAndPassword(email, password);
>>>>>>> Stashed changes
    } catch (error) {
      alert(error);
    }
  };

  /*const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    if (email) {
      doPasswordReset(email);
      alert("Password reset email was sent");
    } else {
      alert(
        "Please enter an email address below before you click the forgot password link"
      );
    }
  };*/

  //const handleOnSubmit = async (event) => {};

  if (currentUser) {
    return <Navigate to="/home" />;
  }
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>
<<<<<<< Updated upstream
            email:
            <input label="Email" type="email" required name="email-signin" />
=======
            Email:
            <input
              className="form-control"
              required
              onChange={handleChange}
              value={email}
              name="email"
              type="email"
              placeholder="Email"
            />
>>>>>>> Stashed changes
          </label>
        </div>
        <div className="form-group">
          <label>
<<<<<<< Updated upstream
            email:
            <input
              label="Password"
              type="password"
              required
              name="password-signin"
=======
            Password:
            <input
              className="form-control"
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
              onChange={handleChange}
              value={password}
              name="password"
>>>>>>> Stashed changes
            />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>

      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignIn;
