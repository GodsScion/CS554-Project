import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { createNativeUser } from "../firebase/firebase";
import FormInput from "./FormInput";
import { UserContext } from "../contexts/userContext";
//import SocialSignIn from "./SocialSignIn";
import Button from "./Button";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",

  username: "",
  password: "",
};

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstName, lastName, email, password } = formFields;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const history = useNavigate();

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
    try {
      await axios
        .post("http://localhost:4000/users/signup", {
          data: dataBody,
        })
        .then(function (response) {
          console.log(response.data);
          history("/", { replace: true });
        });
    } catch (error) {
      // alert(error.response.data);
      return;
    }
    try {
      const { user } = await createNativeUser(email, password);
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>

      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>
            First Name:
            <FormInput
              label="First Name"
              type="text"
              required
              onChange={handleChange}
              value={firstName}
              name="firstName"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Last Name:
            <FormInput
              label="Last Name"
              type="text"
              required
              onChange={handleChange}
              value={lastName}
              name="lastName"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Email:
            <FormInput
              label="Email"
              type="email"
              required
              onChange={handleChange}
              value={email}
              name="email"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <FormInput
              label="Password"
              type="password"
              required
              onChange={handleChange}
              value={password}
              name="password"
            />
          </label>
        </div>

        <Button type="submit">Sign Up</Button>
      </form>
      <br />
    </div>
  );
}

export default SignUp;
