import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  NativeSignIn,
  signInWithGooglePopup,
  auth,
} from "../firebase/firebase";
import FormInput from "./FormInput";
import Button from "./Button";
const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const history = useNavigate();

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
    const user = auth.currentUser;

    const url = `http://localhost:4000/`;
    const { data } = await axios.post(url, { data: user.email });

    if (data === null) {
      let dataBody = { email: user.email, flag: "G" };
      axios
        .post("http://localhost:4000/users/signup", {
          data: dataBody,
        })
        .then(function (response) {
          console.log(response.data);
          history("/users/profile", { replace: true });
        });
    } else {
      history("/", { replace: true });
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

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
    try {
      await axios
        .post("http://localhost:4000/users/login", {
          data: dataBody,
        })
        .then(function (response) {
          console.log(response.data);
          history("/", { replace: true });
        });
    } catch (error) {
      alert(error.response.data);
      return;
    }
    try {
      await NativeSignIn(email, password);
      resetFormFields();
    } catch (error) {
      console.log("Error signing in", error);
    }
    history("/", { replace: true });
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

  //if (currentUser) {
  //return <Navigate to="/home" />;
  //}
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            value={email}
            name="email-signin"
          />
        </div>
        <div className="form-group">
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            value={password}
            name="password-signin"
          />
        </div>
        <Button type="submit">Sign In</Button>
        <Button type="button" buttonType="google" onClick={SignInWithGoogle}>
          Google sign in
        </Button>{" "}
      </form>

      <br />
    </div>
  );
}

export default SignIn;
