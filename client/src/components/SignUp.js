import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/functions";
import { AuthContext } from "../firebase/Auth";
import SocialSignIn from "./SocialSignIn";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",

  password: "",
};

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, lastName, email, password } = formFields;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  // const [pwMatch, setPwMatch] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormErrors(formFields);
    setIsSubmit(true);
    //const { displayName, email, passwordOne } = e.target.elements;
    let dataBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,

      password: password,
    };
    console.log(email.value);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      alert(error);
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/users/signup",
        dataBody
      );
      console.log(data.data.id);
    } catch (error) {
      console.log(error);
      // alert(error.response.data);
      return;
    }
  };

  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <h1>Sign up</h1>

      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>
            First Name:
            <input
              className="form-control"
              required
              onChange={handleChange}
              name="firstName"
              value={firstName}
              type="text"
              placeholder="FirstName"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Last Name:
            <input
              className="form-control"
              required
              onChange={handleChange}
              value={lastName}
              name="lastName"
              type="text"
              placeholder="LastName"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
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
          </label>
        </div>
        <div className="form-group">
          <label>
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
            />
          </label>
        </div>

        <button id="submitButton" name="submitButton" type="submit">
          Sign Up
        </button>
      </form>
      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignUp;
