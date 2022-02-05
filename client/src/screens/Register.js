import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
export default function Register() {

  useEffect(() => {
    document.title = "Agents | Register";
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    console.log(username, password, email, confirmPassword);
  };

  const Register = async (e) => {
    if (password === confirmPassword) {
      const user  = {
        username,
        password,
        confirmPassword,
        email
      }
      try {
        setLoading(true);
        const response = (await axios.post("/api/users/register", user)).data;
        setLoading(false);
        setSuccess(true);
        setUsername("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
       alert("User registration successful");
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    else {
      alert("Password and confirm password do not match");
    }
  };

  return (
    <div className={'container'}>
      {loading && <Loader />}
      {error && <Error />}
      <div className="row box-shadow justify-content-center mt-5">
        {success && <Success message={'Registration successful'} />}
        <div className="col-md-6">
          <div className="">
            <h1>Register</h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleOnChange}
              className={"form-control "}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleOnChange}
              className={"form-control mt-3"}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleOnChange}
                className={"form-control mt-3"}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleOnChange}
              className={"form-control mt-3"}
            />
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={Register}
            >
              Register
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
